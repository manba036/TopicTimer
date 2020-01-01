import React from "react";
import ReactDOM from "react-dom";
import Page from "./Page.jsx";
import Nav from "./Nav.jsx";
import Memo from "./Memo.jsx";

import TimerActions from "../actions/TimerActions";
import StateStore from "../stores/StateStore";
import TopicConstants from "../constants/TopicConstants";

class Memos extends React.Component {
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
    var memos = StateStore.get().memos;
    if (memos !== "") {
      memos = TopicConstants.memo_format + "\n" + memos;
    }
    this.setState({
      editting: true,
      formText: memos,
      beforeEdit: memos
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

  // 編集完了したらメモ一覧を更新する
  onSubmit(e) {
    this.setState({ editting: false });
    if (this.state.beforeEdit !== this.state.formText) {
      var memos = this.state.formText;
      memos = memos.replace(TopicConstants.memo_format, "").trim();
      TimerActions.clearMemos();
      if (memos !== "") {
        TimerActions.setMemo(memos);
      }
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
    var placeholder = "";
    var content = "";

    // 編集時はテキストエリアを表示
    if (this.state.editting) {
      placeholder = "メモがありません";
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
    // 編集時以外はメモ一覧を表示
    else {
      var memo_string = StateStore.get().memos;
      var memo_list = memo_string.split("\n").map(function(memo, index) {
        return <Memo key={index} memo={memo} edit={this.edit} />;
      }, this);
      if (memo_string.length) {
        content = (
          <table>
            <tbody>
              <tr className="memo_table">
                <td className="header">全体経過時間</td>
                <td className="header">議題</td>
                <td className="header">経過時間</td>
                <td className="header"></td>
              </tr>
              {memo_list}
            </tbody>
          </table>
        );
      } else {
        content = (
          <div className="empty" onClick={this.edit}>
            クリックしてメモを編集
          </div>
        );
      }
    }
    return (
      <Page name="memos">
        <Nav current="memos" />
        <div className="pageContent">
          <h2>メモ</h2>
          {content}
        </div>
      </Page>
    );
  }
}

export default Memos;
