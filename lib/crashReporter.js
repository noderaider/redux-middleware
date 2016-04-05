'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Sends crash reports as state is updated and listeners are notified.
 */
var crashReporter = function crashReporter(store) {
  return function (next) {
    return function (action) {
      try {
        return next(action);
      } catch (err) {
        console.error('Caught an exception!', err);
        /*
        Raven.captureException(err, {
          extra: {
            action,
            state: store.getState()
          }
        })
        throw err
        */
      }
    };
  };
};

exports.default = crashReporter;