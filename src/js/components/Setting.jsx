import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Page from "./Page.jsx";
import Nav from "./Nav.jsx";
import TopicRow from "./TopicRow.jsx";
import TopicConstants from "../constants/TopicConstants";

import TimerActions from "../actions/TimerActions";
import StateStore from "../stores/StateStore";

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.onUpdateForm = this.onUpdateForm.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      editting: false,
      formText: "",
      beforeEdit: ""
    };
  }

  // 編集モードに切り替え
  edit(e) {
    if (e) {
      e.preventDefault();
    }
    if (StateStore.get().counting) {
      return;
    }
    var value = this.props.topics.join("\n");
    if (value !== "") {
      value = TopicConstants.topic_format + "\n" + value;
    }
    this.setState({
      editting: true,
      formText: value,
      beforeEdit: value
    });
  }

  // 編集中のテキストを保持する
  onUpdateForm(e) {
    this.setState({ formText: e.target.value });
  }

  // Escキー判定
  onKeyDown(e) {
    var keyCode = false;
    var event = null;
    if (e) event = e;
    if (event) {
      if (event.keyCode) {
        keyCode = event.keyCode;
      } else if (event.which) {
        keyCode = event.which;
      }
    }
    if (keyCode === 27) {
      if (this.refs.editForm) {
        //this.refs.editForm.getDOMNode().focus();
        ReactDOM.findDOMNode(this.refs.editForm).focus();
      }
      this.onSubmit();
    }
  }

  // 編集完了したらトピック一覧を更新する
  onSubmit(e) {
    this.setState({ editting: false });
    if (this.state.beforeEdit !== this.state.formText) {
      var text = this.state.formText;
      text = text.replace(TopicConstants.topic_format, "");
      text = text.replace(TopicConstants.total_regex, "");
      text = text.trim();
      if (text !== "") {
        text += "\n0," + TopicConstants.total_label;
      }
      TimerActions.updateTopics(text);
    }
  }

  // 編集開始したらフォーカスする
  componentDidUpdate() {
    if (this.refs.editForm) {
      //this.refs.editForm.getDOMNode().focus();
      ReactDOM.findDOMNode(this.refs.editForm).focus();
    }
  }

  render() {
    var content = "";
    var placeholder = "";

    // 編集時はテキストエリアを表示
    if (this.state.editting) {
      placeholder =
        "「分:秒,トピック名」の形式でトピックを入力します。\n\n　※「秒」と「トピック名」は省略可能です。";
      content = (
        <textarea
          onChange={this.onUpdateForm}
          value={this.state.formText}
          ref="editForm"
          onBlur={this.onSubmit}
          onKeyDown={this.onKeyDown}
          placeholder={placeholder}
        />
      );
    }
    // 編集時以外はトピック一覧を表示
    else {
      var topics = this.props.topics.map(function(topic) {
        return (
          <TopicRow
            topic={topic}
            key={topic.key}
            edit={this.edit}
            topics={this.props.topics}
          />
        );
      }, this);
      if (topics.length) {
        content = (
          <table>
            <tbody>
              <tr className="topic">
                <td className="header"></td>
                <td className="header">{TopicConstants.header}</td>
                <td className="header"></td>
              </tr>
              {topics}
            </tbody>
          </table>
        );
      } else {
        content = (
          <div className="empty" onClick={this.edit}>
            クリックしてトピックを入力
          </div>
        );
      }
    }
    return (
      <Page name="setting">
        <Nav current="setting" />
        <div className="pageContent">
          <h2>議題</h2>
          {content}
        </div>
      </Page>
    );
  }
}

Setting.propTypes = {
  topics: PropTypes.array.isRequired
};

export default Setting;
