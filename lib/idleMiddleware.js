"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** When context has already been created, it can be shared to middleware component. */

var createIdleMiddleware = exports.createIdleMiddleware = function createIdleMiddleware() {
  var context = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  //const createDispatcher = configureDispatcher(context)
  var isIdleAction = function isIdleAction(_ref) {
    var meta = _ref.meta;
    return meta && meta.idle;
  };

  return function (store) {
    return function (next) {
      return function (action) {
        if (!isIdleAction(action)) return next(action);

        var idle = action.meta.idle;
        var dispatch = store.dispatch;
        var getState = store.getState;
        //const dispatcher = createDispatcher(dispatch, getState)

        if (!actionNames.includes(action.type)) return next(action);
        return next(action);
      };
    };
  };
};

exports.default = createIdleMiddleware();