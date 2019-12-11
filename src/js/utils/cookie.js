var store = require('store');

module.exports = {

  set: function(name, str, opts) {
    store.set(name, str);
  },

  get: function(name) {
    return store.get(name);
  }

};
