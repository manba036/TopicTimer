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
    bell: React.PropTypes.bool
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
      </Page>
    );
  }
});
