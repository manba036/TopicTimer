var AppDispatcher = require('../dispatcher/AppDispatcher');
var TimerConstants = require('../constants/TimerConstants');
var TopicConstants = require('../constants/TopicConstants');
var StateStore = require('../stores/StateStore');
var Topic = require('../utils/topic');
var sha1 = require('sha1');

var _timer = null;
var audio3 = new Audio('./lib/3.mp3');
var audio1 = new Audio('./lib/1.mp3');
var audio0 = new Audio('./lib/0.mp3');
var audioX = new Audio('./lib/over.mp3');

module.exports = {

  // トピック一覧を更新する
  updateTopics: function(str) {
    AppDispatcher.dispatch({
      actionType: TimerConstants.UPDATE_TOPICS,
      topics: this._parseTopics(str)
    });
  },

  // トピックをセットする
  setTopic: function(topic, total) {
    if (topic.description === total.description) {
      this.pauseCounting();
    }
    AppDispatcher.dispatch({
      actionType: TimerConstants.UPDATE_STATES,
      states: { selected: topic },
    });
  },

  // カウントを開始する
  startCounting: function(topic, total){
    if (topic) {
      this.setTopic(topic, total);
    }
    clearInterval(_timer);
    this._scrollTop();
    _timer = setInterval(this.countDown, 1000);
    AppDispatcher.dispatch({
      actionType: TimerConstants.UPDATE_STATES,
      states: { total: total, counting: true },
    });
  },

  // カウントを一時停止する
  pauseCounting: function() {
    clearInterval(_timer);
    AppDispatcher.dispatch({
      actionType: TimerConstants.UPDATE_STATES,
      states: {
        counting: false,
      }
    });
  },

  // カウントを停止する
  stopCounting: function(topic, total) {
    if ( topic.equal( StateStore.get().selected ) ) {
      this.pauseCounting();
    }
    AppDispatcher.dispatch({
      actionType: TimerConstants.RESET_TOPIC,
      topic: topic,
      total: total
    });
  },

  // カウントダウンする
  countDown: function(){
    var state = StateStore.get();
    if (state.selected) {
      AppDispatcher.dispatch({
        actionType: TimerConstants.COUNTDOWN_TOPIC,
        topic: state.selected,
        total: state.total,
        callback: function(remainTime, entireTime) {
          if (remainTime === 1 && state.bell) {
            audio0.play();
          }
          else if (remainTime === (1*60+1) && state.bell) {
            audio1.play();
          }
          else if (entireTime >= (6*60) && remainTime === (3*60+1) && state.bell) {
            audio3.play();
          }
          else if (remainTime < 0 && (remainTime % 60) === 0 && state.bell) {
            audioX.play();
          }
        }
      });
    }
  },

  // Bell の ON/OFF を切り替える
  toggleBell: function(){
    AppDispatcher.dispatch({
      actionType: TimerConstants.TOGGLE_BELL
    });
  },

  // 文字列の各行をパースしてTopicオブジェクトを生成する
  _parseTopics: function(str){
    var prev = null;
    topics = str
      .split("\n").filter(function(v){ return !! v.trim() }) // 改行で分割して空行を除去
      .map(function(v, idx){
        try {
          // トピックオブジェクトを生成
          var topic = new Topic(v);

          // ユニークキーを設定
          topic.key = sha1( JSON.stringify([ topic.entire.toString(), topic.description, idx ]) );

          // 前後のトピック情報を設定
          if (prev) {
            topic.prev = prev;
            prev.next = topic;
          }
          topic.next = null;
          prev = topic;

          return topic;
        } catch (e) {
          console.warn(e);
          return;
        }
      })
      .filter(function(v){ return !! v }); // パースできなかった行を除外
    var total = topics.find(topic => topic.description === TopicConstants.total_description);
    total.entire._time = 0;
    total.elapsed._time = 0;
    total.remain._time = 0;
    topics.forEach(function(topic) {
      if (topic.description !== total.description) {
        total.entire._time += topic.entire._time;
        total.elapsed._time += topic.elapsed._time;
        total.remain._time += topic.remain._time;
      }
    });
    return topics;
  },

  // スムーススクロールする
  _scrollTop: function() {
    var _id = setInterval(function(){
      var x = document.documentElement.scrollLeft || document.body.scrollLeft;
      var y = document.documentElement.scrollTop || document.body.scrollTop;
      window.scrollTo(x, y * 15 / 16);
      if (y == 0) { clearInterval(_id); }
    }, 10);
  }

};
