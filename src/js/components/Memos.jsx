var React = require('react');
var TimerActions = require('../actions/TimerActions');
var StateStore = require('../stores/StateStore');
var TopicConstants = require('../constants/TopicConstants');
var Page = require('./Page.jsx').Page;
var Nav = require('./Nav.jsx');
var Memo = require('./Memo.jsx');

module.exports = React.createClass({
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
    if (StateStore.get().counting) { return; }
    var memos = StateStore.get().memos;
    if (memos != '') {
      memos = TopicConstants.memo_format + "\n" + memos;
    }
    this.setState({
      editting: true,
      formText: memos,
      beforeEdit: memos
    });
  },

  // 編集中のテキストを保持する
  onUpdateForm: function(e) {
    this.setState({ formText: e.target.value });
  },

  // Escキー判定
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
    if (keyCode == 27) {
      if (this.refs.editForm) {
        this.refs.editForm.getDOMNode().focus();
      }
      this.onSubmit();
    }
  },

  // 編集完了したらメモ一覧を更新する
  onSubmit: function() {
    this.setState({ editting: false });
    if (this.state.beforeEdit != this.state.formText) {
      var memos = this.state.formText;
      memos = memos.replace(TopicConstants.memo_format, '').trim();
      TimerActions.clearMemos();
      if (memos != '') {
        TimerActions.setMemo( memos );
      }
    }
  },

  // 編集開始したらフォーカスする
  componentDidUpdate: function(){
    if (this.refs.editForm) {
      this.refs.editForm.getDOMNode().focus();
    }
  },

  render: function(){
    // 編集時はテキストエリアを表示
    if (this.state.editting) {
      var placeholder = 'メモがありません';
      var content = (
        <textarea onChange={this.onUpdateForm} value={this.state.formText} ref='editForm' onBlur={this.onSubmit} onKeyDown={this.onKeyDown} placeholder={placeholder} />
      );
    }
    // 編集時以外はメモ一覧を表示
    else {
      var memo_string = StateStore.get().memos;
      var memo_list = memo_string.split('\n').map(function(memo){ return <Memo memo={memo} edit={this.edit} />; }, this);
      if ( memo_string.length ) {
        var content = (
          <table>
            <tr className='memo_table'>
              <td className='header'>全体経過時間</td>
              <td className='header'>議題</td>
              <td className='header'>経過時間</td>
              <td className='header'></td>
            </tr>
            {memo_list}
          </table>
        );
      } else {
        var content = <div className='empty' onClick={this.edit}>クリックしてメモを編集</div>;
      }
    }
    return (
      <Page name='memos'>
        <Nav current='memos' />
        <div className='pageContent'>
          <h2>メモ</h2>
          {content}
        </div>
      </Page>
    );
  },
});
