/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Page from "./Page.jsx";
import Nav from "./Nav.jsx";
import Controller from "./Controller.jsx";

import Topic from "../utils/topic";
import TimerActions from "../actions/TimerActions";
import TopicConstants from "../constants/TopicConstants";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.onUpdateForm = this.onUpdateForm.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleBell = this.toggleBell.bind(this);
    this.state = {
      editting: false,
      formText: ""
    };
  }

  // 編集モードに切り替え
  edit(e) {
    if (e) {
      e.preventDefault();
    }
    var value = "";
    this.setState({
      editting: true,
      formText: value
    });
  }

  // 編集中のテキストを保持する
  onUpdateForm(e) {
    this.setState({ formText: e.target.value.trim() });
  }

  // Enter/Escキー判定
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
    if (arg === "submit") {
      if (keyCode === 13 || keyCode === 27) {
        this.onSubmit();
      }
    } else if (arg === "edit") {
      if (keyCode === 13) {
        this.edit();
      }
    }
  }

  // 編集完了したらトピック一覧を更新する
  onSubmit(e) {
    this.setState({ editting: false });
    var memo = this.state.formText;
    var selected = this.props.selected;
    var total = this.props.total;
    if (selected && memo !== undefined) {
      TimerActions.setMemo(
        total.elapsed +
          "," +
          selected.description +
          "," +
          selected.elapsed +
          "," +
          memo +
          "\n"
      );
    }
  }

  toggleBell() {
    TimerActions.toggleBell();
  }

  // 編集開始したらフォーカスする
  componentDidUpdate() {
    if (this.refs.editForm) {
      //this.refs.editForm.getDOMNode().focus();
      ReactDOM.findDOMNode(this.refs.editForm).focus();
    }
  }

  render() {
    var selected = this.props.selected;
    var over = selected && selected.remain.isOver() ? "over" : "";
    var total_over =
      this.props.total && this.props.total.remain.isOver() ? "over" : "";
    var total_entire = this.props.total
      ? this.props.total.entire.toString()
      : "";
    var total_elapsed = this.props.total
      ? this.props.total.elapsed.toString()
      : "";
    var total_remain = this.props.total
      ? this.props.total.remain.toString()
      : "";
    var content = "";
    var placeholder = "";

    if (this.state.editting) {
      placeholder = "Enter or Esc で入力完了";
      content = (
        <textarea
          onChange={this.onUpdateForm}
          value={this.state.formText}
          ref="editForm"
          onBlur={this.onSubmit}
          onKeyDown={this.onKeyDown}
          data-arg="submit"
          placeholder={placeholder}
        />
      );
    }
    // 編集時以外は「メモ入力」を表示
    else {
      content = (
        <span
          className="empty"
          onClick={this.edit}
          onKeyDown={this.onKeyDown}
          data-arg="edit"
          tabIndex="1"
        >
          メモ入力
        </span>
      );
    }

    return (
      <Page name="main" className={over}>
        <div className="topicInfo">
          <div className="description">
            {selected ? selected.description : ""}
          </div>
          <div className="entireTime">
            <div className="tooltip_under">
              <span>{selected ? selected.entire.toString() : ""}</span>
              <div className="tooltip_under_description">予定時間</div>
            </div>
          </div>
        </div>
        <Nav current="main" />
        {selected ? (
          <div className="total">
            <div className="tooltip_above">
              <span className={total_over}>
                合計&nbsp;{total_entire}/{total_elapsed}/{total_remain}
              </span>
              <div className="tooltip_above_description">
                {TopicConstants.header}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {selected ? (
          <Controller
            topic={selected}
            total={this.props.total}
            prev={true}
            stop={false}
            next={true}
          />
        ) : (
          ""
        )}
        <div className="bell">
          <a
            className={this.props.bell ? "on" : "off"}
            onClick={this.toggleBell}
          >
            <span className="popover">Bell</span>
          </a>
        </div>
        <div className="remainTime">
          <div className="tooltip_left">
            <span>{selected ? selected.remain.toString() : "00:00"}</span>
            <div className="tooltip_left_description">残り時間</div>
          </div>
        </div>
        <div className="memo">{content}</div>
      </Page>
    );
  }
}

Main.propTypes = {
  selected: PropTypes.instanceOf(Topic),
  total: PropTypes.instanceOf(Topic),
  bell: PropTypes.bool
};

export default Main;
