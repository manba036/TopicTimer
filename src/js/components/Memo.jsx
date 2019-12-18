var React = require('react');

module.exports = React.createClass({
  propTypes: {
    memo: React.PropTypes.string.isRequired,
    edit: React.PropTypes.func.isRequired
  },
  render: function() {
    var memo_info = this.props.memo.split(',', 4);
    var time1   = ( memo_info.length > 0 ) ? memo_info[0] : '';
    var topic   = ( memo_info.length > 1 ) ? memo_info[1] : '';
    var time2   = ( memo_info.length > 2 ) ? memo_info[2] : '';
    var comment = ( memo_info.length > 3 ) ? memo_info[3] : '';
    return (
      <tr className='memo_table'>
        <td className='time' onClick={this.props.edit}>{time1}  </td>
        <td className='text' onClick={this.props.edit}>{topic}  </td>
        <td className='time' onClick={this.props.edit}>{time2}  </td>
        <td className='text' onClick={this.props.edit}>{comment}</td>
      </tr>
    );
  }
});
