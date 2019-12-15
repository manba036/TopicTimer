var React = require('react');
var TimerActions = require('../actions/TimerActions');
var TopicStore = require('../stores/TopicStore');
var TopicConstants = require('../constants/TopicConstants');
var Page = require('./Page.jsx').Page;
var Nav = require('./Nav.jsx');
var Topic = require('./Topic.jsx');

module.exports = React.createClass({
  propTypes: {
    topics: React.PropTypes.array.isRequired
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
    var value = TopicConstants.topic_format + "\n" + this.props.topics.join("\n");
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

  // 編集完了したらトピック一覧を更新する
  onSubmit: function() {
    this.setState({ editting: false });
    if (this.state.beforeEdit != this.state.formText) {
      var text = this.state.formText
      text = text.replace(TopicConstants.topic_format, '')
      text = text.replace(TopicConstants.total_regex, '');
      text += '\n0,' + TopicConstants.total_description
      TimerActions.updateTopics( text );
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
      var placeholder = '「分:秒,トピック名」の形式でトピックを入力します。\n\n　※「秒」と「トピック名」は省略可能です。';
      var content = (
        <textarea onChange={this.onUpdateForm} value={this.state.formText} ref='editForm' onBlur={this.onSubmit} placeholder={placeholder} />
      );
    }
    // 編集時以外はトピック一覧を表示
    else {
      var topics = this.props.topics.map(function(topic){ return <Topic topic={topic} key={topic.key} edit={this.edit} topics={this.props.topics} />; }, this);
      if ( topics.length ) {
        var content = (
          <table>
            <tr className='topic'>
              <td className='header'></td>
              <td className='header'>{TopicConstants.header}</td>
              <td className='header'></td>
            </tr>
            {topics}
          </table>
        );
      } else {
        var content = <div className='empty' onClick={this.edit}>クリックしてトピックを入力</div>;
      }
    }
    return (
      <Page name='setting'>
        <Nav current='setting' />
        <div className='pageContent'>
          <h2>議題</h2>
          {content}
        </div>
      </Page>
    );
  },
});
