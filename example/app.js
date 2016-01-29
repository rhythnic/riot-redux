var RootReducer = Redux.combineReducers({
  todo: TodoLogic.reducer
});

var Store = ReduxMixin(Redux.createStore(RootReducer /*, initialState */));

TodoLogic.setStore(Store);

riot.mount('todo');
