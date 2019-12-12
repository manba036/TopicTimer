var Time = require('./time.js');
var clone = require('clone');
var sprintf = require('sprintf');

var Topic = function(str) {
  var str = str.split(',', 4);
  this.remain = new Time(str[0]);
  this.elapsed = ( str.length <= 2 ) ? (new Time('00:00')) : (new Time(str[1]));
  this.entire = ( str.length <= 2 ) ? (new Time(str[0])) : (new Time(str[2]));
  this.description = ( str.length < 2 ) ? '' : (( str.length == 2 ) ? str[1] : str[3]);
  this.key = null;
}

Topic.prototype.toString = function() {
  return sprintf('%s,%s,%s,%s',
    this.remain.toString(),
    this.elapsed.toString(),
    this.entire.toString(),
    this.description
  );
};

Topic.prototype.equal = function(topic) {
  return topic instanceof Topic && this.key && this.key === topic.key;
}

module.exports = Topic;
