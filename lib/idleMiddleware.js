'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxActions = require('redux-actions');

var createIdleMiddleware = function createIdleMiddleware() {
  var context = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  //const createDispatcher = configureDispatcher(context)
  var isIdleAction = function isIdleAction(_ref) {
    var type = _ref.type;
    var payload = _ref.payload;
    var meta = _ref.meta;
    return ['IDLEMONITOR_JS_ACTIVITY', 'IDLEMONITOR_JS_ACTIVE', 'IDLEMONITOR_JS_INACTIVE', 'IDLEMONITOR_JS_EXPIRED'].includes(type);
  };
  var cancel = function cancel() {};

  return function (store) {
    return function (next) {
      return function (action) {
        if (!isIdleAction(action)) return next(action);

        //const { idle } = action.meta
        var dispatch = store.dispatch;
        var getState = store.getState;

        switch (action.type) {
          case 'IDLEMONITOR_JS_ACTIVE':
            //cancel()
            console.warn('SCHEDULING INACTIVE!');
            cancel = dispatch((0, _reduxActions.createAction)('IDLEMONITOR_JS_INACTIVE', function (payload) {
              return payload;
            }, function () {
              meta: {
                delay: 6000;
              }
            }));
            break;
          case 'IDLEMONITOR_JS_INACTIVE':
            //cancel()
            console.warn('SCHEDULING EXPIRED!');
            cancel = dispatch((0, _reduxActions.createAction)('IDLEMONITOR_JS_EXPIRED', function (payload) {
              return payload;
            }, function () {
              meta: {
                delay: 6000;
              }
            }));
            break;
          case 'IDLEMONITOR_JS_EXPIRED':
            dispatch((0, _reduxActions.createAction)('FORGET_TOKENS')());
        }

        return next(action);
        //return { next: 'EXPIRED', delay: 6000 }

        //swal.close()
      };
    };
  };
}; /** When context has already been created, it can be shared to middleware component. */


exports.default = createIdleMiddleware();