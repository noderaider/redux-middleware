'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Lets you dispatch promises in addition to actions.
 * If the promise is resolved, its result will be dispatched as an action.
 * The promise is returned from `dispatch` so the caller may handle rejection.
 */
var vanillaPromise = function vanillaPromise(store) {
  return function (next) {
    return function (action) {
      if (typeof action.then !== 'function') {
        return next(action);
      }

      return Promise.resolve(action).then(store.dispatch);
    };
  };
};

exports.default = vanillaPromise;