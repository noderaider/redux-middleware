"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Lets you dispatch special actions with a { promise } field.
 *
 * This middleware will turn them into a single action at the beginning,
 * and a single success (or failure) action when the `promise` resolves.
 *
 * For convenience, `dispatch` will return the promise so the caller can wait.
 */
var readyStatePromise = function readyStatePromise(store) {
  return function (next) {
    return function (action) {
      if (!action.promise) {
        return next(action);
      }

      function makeAction(ready, data) {
        var newAction = Object.assign({}, action, { ready: ready }, data);
        delete newAction.promise;
        return newAction;
      }

      next(makeAction(false));
      return action.promise.then(function (result) {
        return next(makeAction(true, { result: result }));
      }, function (error) {
        return next(makeAction(true, { error: error }));
      });
    };
  };
};

exports.default = readyStatePromise;