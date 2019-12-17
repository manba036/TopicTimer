var React = require('react');

var Cookie = require('../utils/cookie');

var TimerActions = require('../actions/TimerActions');

var TopicStore = require('../stores/TopicStore');
var StateStore = require('../stores/StateStore');
var TopicConstants = require('../constants/TopicConstants');

var Main = require('./Main.jsx');
var Setting = require('./Setting.jsx');
var Usage = require('./Usage.jsx');
var Info = require('./Info.jsx');

module.exports = React.createClass({

  getInitialState: function(){
    return {
      topics: [],
      states: {}
    };
  },

  // Store の変更を監視
  componentDidMount: function() {
    TopicStore.addChangeListener(this._onChange);
    StateStore.addChangeListener(this._onChange);

    var topics = Cookie.get('topics');
    if (topics) {
      TimerActions.updateTopics( topics, null );
    }
    var memos = Cookie.get('memos');
    if (memos) {
      TimerActions.clearMemos();
      TimerActions.setMemo(memos);
    }
  },
  componentWillUnmount: function() {
    TopicStore.removeChangeListener(this._onChange);
    StateStore.removeChangeListener(this._onChange);
  },

  componentDidUpdate: function(){
    Cookie.set('topics', TopicStore.get().join("\n"));
    Cookie.set('memos', StateStore.get().memos);
  },

  // Store に変更があった時の処理
  _onChange: function() {
    this.setState({
      topics: TopicStore.get(),
      states: StateStore.get(),
    });
  },

  render: function() {
    return (
      <div id='content'>
        <Main {...this.state.states} total={this.state.topics.find(topic => topic.description === TopicConstants.total_label)}/>
        <Setting topics={this.state.topics} />
        <Usage />
        <Info />
      </div>
    );
  }

});
