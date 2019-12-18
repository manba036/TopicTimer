var React = require('react');
var Topic = require('../utils/topic');
var TimerActions = require('../actions/TimerActions');
var StateStore = require('../stores/StateStore');

module.exports = React.createClass({

  propTypes: {
    topic: React.PropTypes.instanceOf(Topic).isRequired,
    total: React.PropTypes.instanceOf(Topic).isRequired,
    prev: React.PropTypes.bool,
    stop: React.PropTypes.bool,
    next: React.PropTypes.bool,
  },

  getDefaultProps: function() {
    return {
      previous: false,
      stop: true,
      next: false,
    };
  },

  // TODO Store呼んでるのよくないっぽい
  isCounting: function() {
    var state = StateStore.get();
    return this.props.topic.equal( state.selected ) && state.counting;
  },

  toggle: function() {
    this.isCounting() ? this.pause() : this.start();
  },

  start: function() {
    TimerActions.startCounting(this.props.topic, this.props.total);
  },

  pause: function() {
    TimerActions.pauseCounting();
  },

  stop: function() {
    TimerActions.stopCounting(this.props.topic, this.props.total);
  },

  prev: function() {
    if (this.props.topic.prev) {
      TimerActions.setTopic(this.props.topic.prev, this.props.total);
    }
  },

  next: function() {
    if (this.props.topic.next) {
      TimerActions.setTopic(this.props.topic.next, this.props.total);
    }
  },

  // Enterキー判定
  onKeyDown: function(e) {
    var keyCode = false;
    if (e) {
      event = e;
      arg = e.currentTarget.getAttribute('data-arg');
    }
    if (event) {
      if (event.keyCode) {
        keyCode = event.keyCode;
      } else if (event.which) {
        keyCode = event.which;
      }
    }
    if (keyCode == 13) {
      if (arg == "prev") {
        this.prev();
      } else if (arg == "play") {
        this.toggle();
      } else if (arg == "next") {
        this.next();
      }
    }
  },

  render: function() {
    var prev_tabindex = "2"; 
    var play_tabindex = this.props.next ? "3" : "-1";
    var next_tabindex = "4"; 
    var is_not_total = this.props.topic.description !== this.props.total.description;
    var prev = this.props.prev                   ? <a className='prev' onClick={this.prev} onKeyDown={this.onKeyDown} data-arg="prev" tabIndex={prev_tabindex}></a> : '';
    var play = is_not_total                      ? <a className={this.isCounting() ? 'pause' : 'play'} onClick={this.toggle} onKeyDown={this.onKeyDown} data-arg="play" tabIndex={play_tabindex}></a> : '';
    var stop = (is_not_total && this.props.stop) ? <a className='stop' onClick={this.stop}></a> : '';
    var next = (is_not_total && this.props.next) ? <a className='next' onClick={this.next} onKeyDown={this.onKeyDown} data-arg="next" tabIndex={next_tabindex}></a> : '';
    return (
      <div className='controller'>
        {prev}
        {play}
        {stop}
        {next}
      </div>
    );
  }

});
