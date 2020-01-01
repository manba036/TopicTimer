/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import PropTypes from "prop-types";
import Topic from "../utils/topic";
import TimerActions from "../actions/TimerActions";
import StateStore from "../stores/StateStore";

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.isCounting = this.isCounting.bind(this);
    this.toggle = this.toggle.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.stop = this.stop.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  // TODO Store呼んでるのよくないっぽい
  isCounting() {
    var state = StateStore.get();
    return this.props.topic.equal(state.selected) && state.counting;
  }

  toggle() {
    this.isCounting() ? this.pause() : this.start();
  }

  start() {
    TimerActions.startCounting(this.props.topic, this.props.total);
  }

  pause() {
    TimerActions.pauseCounting();
  }

  stop() {
    TimerActions.stopCounting(this.props.topic, this.props.total);
  }

  prev() {
    if (this.props.topic.prev) {
      TimerActions.setTopic(this.props.topic.prev, this.props.total);
    }
  }

  next() {
    if (this.props.topic.next) {
      TimerActions.setTopic(this.props.topic.next, this.props.total);
    }
  }

  // Enterキー判定
  onKeyDown(e) {
    var keyCode = false;
    var event = null;
    var arg = null;
    if (e) {
      event = e;
      arg = e.currentTarget.getAttribute("data-arg");
    }
    if (event) {
      if (event.keyCode) {
        keyCode = event.keyCode;
      } else if (event.which) {
        keyCode = event.which;
      }
    }
    if (keyCode === 13) {
      if (arg === "prev") {
        this.prev();
      } else if (arg === "play") {
        this.toggle();
      } else if (arg === "next") {
        this.next();
      }
    }
  }

  render() {
    var prev_tabindex = "2";
    var play_tabindex = this.props.next ? "3" : "-1";
    var next_tabindex = "4";
    var is_not_total =
      this.props.topic.description !== this.props.total.description;
    var prev = this.props.prev ? (
      <a
        className="prev"
        onClick={this.prev}
        onKeyDown={this.onKeyDown}
        data-arg="prev"
        tabIndex={prev_tabindex}
      ></a>
    ) : (
      ""
    );
    var play = is_not_total ? (
      <a
        className={this.isCounting() ? "pause" : "play"}
        onClick={this.toggle}
        onKeyDown={this.onKeyDown}
        data-arg="play"
        tabIndex={play_tabindex}
      ></a>
    ) : (
      ""
    );
    var stop =
      is_not_total && this.props.stop ? (
        <a className="stop" onClick={this.stop}></a>
      ) : (
        ""
      );
    var next =
      is_not_total && this.props.next ? (
        <a
          className="next"
          onClick={this.next}
          onKeyDown={this.onKeyDown}
          data-arg="next"
          tabIndex={next_tabindex}
        ></a>
      ) : (
        ""
      );
    return (
      <div className="controller">
        {prev}
        {play}
        {stop}
        {next}
      </div>
    );
  }
}

Controller.propTypes = {
  topic: PropTypes.instanceOf(Topic).isRequired,
  total: PropTypes.instanceOf(Topic).isRequired,
  prev: PropTypes.bool,
  stop: PropTypes.bool,
  next: PropTypes.bool
};

Controller.defaultProps = {
  previous: false,
  stop: true,
  next: false
};

export default Controller;
