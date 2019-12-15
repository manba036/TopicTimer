var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TimerConstants = require('../constants/TimerConstants');
var Time = require('../utils/time.js');
var assign = require('object-assign');
var clone = require('clone');

var CHANGE_EVENT = 'change';

var _topics = [];

var TopicStore = assign({}, EventEmitter.prototype, {

  // トピック一覧を取得する
  get: function() {
    return _topics;
  },

  // 変更を通知する
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    callback();
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppDispatcher.register(function(action) {

  switch(action.actionType) {

    case TimerConstants.UPDATE_TOPICS:
      if (action.topics) {
        _topics = action.topics;
        TopicStore.emitChange();
      }
      break;

    case TimerConstants.RESET_TOPIC:
      _topics.map(function(topic){
        if ( topic.equal( action.topic ) ) {
          action.total.remain._time += (topic.entire._time - topic.remain._time)
          action.total.elapsed._time -= topic.elapsed._time
          topic.remain = clone( topic.entire );
          topic.elapsed = new Time('00:00');
        }
      });
      TopicStore.emitChange();
      break;

    case TimerConstants.COUNTDOWN_TOPIC:
      if (action.topic.description !== action.total.description) {
        action.topic.remain.decrease();
        action.topic.elapsed.decrease(-1);
        action.total.remain.decrease();
        action.total.elapsed.decrease(-1);
      }
      if (typeof(action.callback) == 'function') {
        action.callback(action.topic.remain._time, action.topic.entire._time);
      }
      TopicStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = TopicStore;
