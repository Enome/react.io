var _ = require('lodash');
var utils = require('./utils');

var socketMixin = function (url) {

  var socket = window.io.connect(url);

  return {

    changeHandler: function (data) {
      if (!_.isEqual(data.state, this.state) && this.path === data.path) {
        this.setState(data.state);
      }
    },

    componentWillUpdate: function (props, state) {
      socket.emit('component-change', { path: this.path, state: state });
    },

    componentDidMount: function (root) {
      this.path = utils.nodePath(root);
      socket.on('component-change', this.changeHandler);
    },

    componentWillUnmount: function () {
      socket.removeListener('component-change', this.change);
    }

  };

};

module.exports = socketMixin;
