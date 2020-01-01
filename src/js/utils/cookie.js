import store from "store";

export default {
  set: function(name, str, opts) {
    store.set(name, str);
  },

  get: function(name) {
    return store.get(name);
  }
};
