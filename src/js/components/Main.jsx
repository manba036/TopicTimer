var React = require('react');
var Topic = require('../utils/topic');
var Page = require('./Page.jsx').Page;
var Nav = require('./Nav.jsx');
var Controller = require('./Controller.jsx');
var TimerActions = require('../actions/TimerActions');

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
    var over        = ( selected         &&         selected.remain.isOver() ) ? 'over'       : '';
    var total_class = ( this.props.total && this.props.total.remain.isOver() ) ? 'total_over' : 'total';
    return (
      <Page name='main' className={over}>
        <div className='topicInfo'>
          <div className='description'>{selected ? selected.description : ''}</div>
          <div className='entireTime'>{selected ? selected.entire.toString() : ''}</div>
          <div className={total_class}>合計{this.props.total ? this.props.total.elapsed.toString() : ''}</div>
        </div>
        <Nav current='main' />
        {selected ? <Controller topic={selected} total={this.props.total} prev={true} stop={false} next={true}/> : ''}
        <div className='bell'>
          <a className={this.props.bell ? 'on' : 'off'} onClick={this.toggleBell}>
            <span className='popover'>Bell</span>
          </a>
        </div>
        <div className='remainTime'>{selected ? selected.remain.toString() : '00:00'}</div>
      </Page>
    );
  }
});
