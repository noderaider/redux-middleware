"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Schedules actions with { meta: { delay: N } } to be delayed by N milliseconds.
 * Makes `dispatch` return a function to cancel the timeout in this case.
 */
var timeoutScheduler = function timeoutScheduler(store) {
  return function (next) {
    return function (action) {
      if (!action.meta || !action.meta.delay) return next(action);

      var timeoutID = setTimeout(function () {
        console.warn("TIMEOUT SCHEDULER => type: " + action.type + " delay: " + action.meta.delay + " MS");
        next(action);
      }, action.meta.delay);

      return function cancel() {
        console.warn("TIMEOUT CANCELLED => " + timeoutID);
        clearTimeout(timeoutID);
      };
    };
  };
};

exports.default = timeoutScheduler;