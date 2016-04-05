'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Lets you dispatch a function instead of an action.
 * This function will receive `dispatch` and `getState` as arguments.
 *
 * Useful for early exits (conditions over `getState()`), as well
 * as for async control flow (it can `dispatch()` something else).
 *
 * `dispatch` will return the return value of the dispatched function.
 */
var thunk = function thunk(store) {
  return function (next) {
    return function (action) {
      return typeof action === 'function' ? action(store.dispatch, store.getState) : next(action);
    };
  };
};

exports.default = thunk;