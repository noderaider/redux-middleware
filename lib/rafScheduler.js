"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Schedules actions with { meta: { raf: true } } to be dispatched inside a rAF loop
 * frame.  Makes `dispatch` return a function to remove the action from the queue in
 * this case.
 */
var rafScheduler = function rafScheduler(store) {
  return function (next) {
    var queuedActions = [];
    var frame = null;

    function loop() {
      frame = null;
      try {
        if (queuedActions.length) {
          next(queuedActions.shift());
        }
      } finally {
        maybeRaf();
      }
    }

    function maybeRaf() {
      if (queuedActions.length && !frame) {
        frame = requestAnimationFrame(loop);
      }
    }

    return function (action) {
      if (!action.meta || !action.meta.raf) {
        return next(action);
      }

      queuedActions.push(action);
      maybeRaf();

      return function cancel() {
        queuedActions = queuedActions.filter(function (a) {
          return a !== action;
        });
      };
    };
  };
};

exports.default = rafScheduler;