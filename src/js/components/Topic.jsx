var React = require('react');
var Topic = require('../utils/topic');
var TopicConstants = require('../constants/TopicConstants');
var Controller = require('./Controller.jsx');

module.exports = React.createClass({
  propTypes: {
    topic: React.PropTypes.instanceOf(Topic).isRequired,
    topics: React.PropTypes.array.isRequired,
    edit: React.PropTypes.func.isRequired
  },
  render: function() {
    var topic = this.props.topic;
    var over = ( topic && topic.remain.isOver() ) ? 'over' : '';
    return (
      <tr className='topic'>
        <td>
          <Controller topic={topic} total={this.props.topics.find(topic => topic.description === TopicConstants.total_description)}/>
        </td>
        <td className='time' onClick={this.props.edit}>
          {topic.entire.toString()}/<span className={over}>{topic.elapsed.toString()}/{topic.remain.toString()}</span>
        </td>
        <td className='description' onClick={this.props.edit}>
          <span className={over}>{topic.description}</span>
        </td>
      </tr>
    );
  }
});
