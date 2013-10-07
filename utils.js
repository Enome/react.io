var utils = {

  indexInParent: function (node) {

    var children = node.parentNode.childNodes;

    for (var i = 0; i < children.length; i++) {
      if (children[i] === node) {
        return i;
      }
    }

    return -1;

  },

  nodePath: function (e) {
    var path = [];

    while (e !== document.body) {
      path.push(utils.indexInParent(e));
      e = e.parentNode;
    }

    return path.reverse().join('-');

  }

};

module.exports = utils;
