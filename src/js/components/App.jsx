import React from "react";
import Main from "./Main.jsx";
import Setting from "./Setting.jsx";
import Memos from "./Memos.jsx";
import Usage from "./Usage.jsx";
import Info from "./Info.jsx";

import Cookie from "../utils/cookie";
import TimerActions from "../actions/TimerActions";
import TopicConstants from "../constants/TopicConstants";
import TopicStore from "../stores/TopicStore";
import StateStore from "../stores/StateStore";

class App extends React.Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this.state = {
      topics: [],
      states: {}
    };
  }

  // Store に変更があった時の処理
  _onChange() {
    this.setState({
      topics: TopicStore.get(),
      states: StateStore.get()
    });
  }

  // Store の変更を監視
  componentDidMount() {
    TopicStore.addChangeListener(this._onChange);
    StateStore.addChangeListener(this._onChange);

    var topics = Cookie.get("topics");
    if (topics) {
      TimerActions.updateTopics(topics, null);
    }
    var memos = Cookie.get("memos");
    if (memos) {
      TimerActions.clearMemos();
      TimerActions.setMemo(memos);
    }
  }

  componentWillUnmount() {
    TopicStore.removeChangeListener(this._onChange);
    StateStore.removeChangeListener(this._onChange);
  }

  componentDidUpdate() {
    Cookie.set("topics", TopicStore.get().join("\n"));
    Cookie.set("memos", StateStore.get().memos);
  }

  render() {
    return (
      <div id="content">
        <Main
          {...this.state.states}
          total={this.state.topics.find(
            topic => topic.description === TopicConstants.total_label
          )}
        />
        <Setting topics={this.state.topics} />
        <Memos />
        <Usage />
        <Info />
      </div>
    );
  }
}

export default App;
