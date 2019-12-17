var React = require('react');
var Topic = require('../utils/topic');
var Page = require('./Page.jsx').Page;
var Nav = require('./Nav.jsx');
var Controller = require('./Controller.jsx');
var TimerActions = require('../actions/TimerActions');
var TopicConstants = require('../constants/TopicConstants');

module.exports = React.createClass({

  propTypes: {
    selected: React.PropTypes.instanceOf(Topic),
    total: React.PropTypes.instanceOf(Topic),
    memo:  React.PropTypes.string,
    bell: React.PropTypes.bool
  },

  getInitialState: function() {
    return {
      editting: false,
      formText: '',
      beforeEdit: ''
    };
  },

  // 編集モードに切り替え
  edit: function(e){
    if (e) { e.preventDefault(); }
    var value = this.props.memo;
    this.setState({
      editting: true,
      formText: value,
      beforeEdit: value
    });
  },

  // 編集中のテキストを保持する
  onUpdateForm: function(e) {
    this.setState({ formText: e.target.value });
  },

  // Enter/Escキー判定
  onKeyDown: function(e) {
    var keyCode = false;
    if (e) event = e;
    if (event) {
      if (event.keyCode) {
        keyCode = event.keyCode;
      } else if (event.which) {
        keyCode = event.which;
      }
    }
    if (keyCode == 13 || keyCode == 27) {
      if (this.refs.editForm) {
        this.refs.editForm.getDOMNode().focus();
      }
      this.onSubmit();
    }
  },

  // 編集完了したらトピック一覧を更新する
  onSubmit: function() {
    this.setState({ editting: false });
    var memo = this.state.formText;
    this.props.memo = memo;
    var selected = this.props.selected;
    var total = this.props.total;
    if (selected && memo !== undefined) {
      TimerActions.setMemo(TopicConstants.memo_label + ',' + total.elapsed + ',' + selected.description + ',' + selected.elapsed + ',' + memo + '\n');
    }
  },

  // 編集開始したらフォーカスする
  componentDidUpdate: function(){
    if (this.refs.editForm) {
      this.refs.editForm.getDOMNode().focus();
    }
  },

  toggleBell: function() {
    TimerActions.toggleBell();
  },

  render: function() {
    var selected = this.props.selected;
    var over       = ( selected         &&         selected.remain.isOver() ) ? 'over' : '';
    var total_over = ( this.props.total && this.props.total.remain.isOver() ) ? 'over' : '';
    var total_entire  = this.props.total ? this.props.total.entire.toString()  : '';
    var total_elapsed = this.props.total ? this.props.total.elapsed.toString() : '';
    var total_remain  = this.props.total ? this.props.total.remain.toString()  : '';

    if (this.state.editting) {
      var placeholder = 'メモを入力します';
      var content = (
        <textarea onChange={this.onUpdateForm} value={this.state.formText} ref='editForm' onBlur={this.onSubmit} onKeyDown={this.onKeyDown} placeholder={placeholder} />
      );
    }
    // 編集時以外はトピック一覧を表示
    else {
      if (this.props.memo) {
        var content = <span className={over} onClick={this.edit} onKeyDown={this.edit} tabIndex="0">{this.props.memo}</span>;
      } else {
        var content = <span className='empty' onClick={this.edit} onKeyDown={this.edit} tabIndex="0">メモ入力</span>;
      }
    }

    return (
      <Page name='main' className={over}>
        <div className='topicInfo'>
          <div className='description'>{selected ? selected.description : ''}</div>
          <div className='entireTime'><div className='tooltip_under'><span>{selected ? selected.entire.toString() : ''}</span><div className='tooltip_under_description'>予定時間</div></div></div>
        </div>
        <Nav current='main' />
        {selected ? <div className='total'><div className='tooltip_above'><span className={total_over}>合計&nbsp;{total_entire}/{total_elapsed}/{total_remain}</span><div className='tooltip_above_description'>{TopicConstants.header}</div></div></div> : ''}
        {selected ? <Controller topic={selected} total={this.props.total} prev={true} stop={false} next={true}/> : ''}
        <div className='bell'>
          <a className={this.props.bell ? 'on' : 'off'} onClick={this.toggleBell}>
            <span className='popover'>Bell</span>
          </a>
        </div>
        <div className='remainTime'><div className='tooltip_left'><span>{selected ? selected.remain.toString() : '00:00'}</span><div className='tooltip_left_description'>残り時間</div></div></div>
        <div className='memo'>{content}</div>
      </Page>
    );
  }
});
