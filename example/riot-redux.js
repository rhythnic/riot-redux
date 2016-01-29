var ReduxMixin = (function (){
  var _store;

  function valueByPath(node, path) {
    for (var i = 0; i < path.length; i++) {
      if (!node || !hasOwnProperty.call(node, path[i])) {
        return undefined;
      }
      node = node[path[i]];
    }
    return node;
  }

  riot.mixin('redux', {
    init: function () {
      this.store = _store;
      this.state = {};
      this.on('unmount', function () {
        this._unsubscribe();
      }.bind(this))
    },
    dispatch: function(type, data) {
      _store.dispatch(Object.assign({type: type}, data))
    },
    use: function (paths) {
      this._reduxUsePaths = Object.keys(paths).map(function (key) {
        return [key, paths[key].split('.')];
      });
      this._unsubscribe = _store.subscribe(this.getState.bind(this));
      this.getState();
    },
    getState: function () {
      var shouldUpdate = false;
      var state = _store.getState();
      var elementState = {};
      this._reduxUsePaths.forEach(function (path) {
        elementState[path[0]] = valueByPath(state, path[1]);
        if (elementState[path[0]] !== this.state[path[0]]) {
          shouldUpdate = true;
        }
      }, this);
      if (shouldUpdate) {
        this.update({state: elementState})
      }
    }
  })

  return function setReduxMixinStore(store) {
    _store = riot.observable(store);
    return _store;
  }
}())
