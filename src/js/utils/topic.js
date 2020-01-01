var Time = require("./time.js");
var sprintf = require("sprintf");

var Topic = function(s) {
  var str = s.split(",", 4);
  this.remain = str.length <= 2 ? new Time(str[0]) : new Time(str[2]);
  this.elapsed = str.length <= 2 ? new Time("00:00") : new Time(str[1]);
  this.entire = new Time(str[0]);
  this.description = str.length < 2 ? "" : str.length === 2 ? str[1] : str[3];
  this.key = null;
};

Topic.prototype.toString = function() {
  return sprintf(
    "%s,%s,%s,%s",
    this.entire.toString(),
    this.elapsed.toString(),
    this.remain.toString(),
    this.description
  );
};

Topic.prototype.equal = function(topic) {
  return topic instanceof Topic && this.key && this.key === topic.key;
};

module.exports = Topic;
