'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMetaRouter = undefined;

var _timeoutScheduler = require('./timeoutScheduler');

var _timeoutScheduler2 = _interopRequireDefault(_timeoutScheduler);

var _idleMiddleware = require('./idleMiddleware');

var _idleMiddleware2 = _interopRequireDefault(_idleMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import errorHandler from './errorHandler'

/**
 * Lets you dispatch special actions with a { meta } field.
 *
 * This middleware will chain through all middleware specified in metaMap in
 * order and return the result.
 */
var createMetaRouter = exports.createMetaRouter = function createMetaRouter() {
  var metaMap = arguments.length <= 0 || arguments[0] === undefined ? new Map([['delay', _timeoutScheduler2.default]
  /*, [ 'identity', identityHandler ]
    , [ 'api', apiDispatcher ]
    , [ 'route', routeHandler ]*/
  , ['idle', _idleMiddleware2.default]
  //, [ 'err', errorHandler ]
  ]) : arguments[0];
  return function (store) {
    return function (next) {
      return function (action) {
        if (!action.meta) return next(action);
        console.warn('META TYPE DETECTED', action.meta);
        var metaTypes = Object.keys(action.meta);
        var result = metaTypes.filter(function (x) {
          return metaMap.has(x);
        }).map(function (x) {
          return metaMap.get(x);
        }).reduce(function (last, middleware) {
          return middleware(store)(next)(last);
        }, action);
        console.warn('META TYPE RESULT', result);
        return next(result);
      };
    };
  };
};
/*import identityHandler from './identityHandler'
import apiDispatcher from './apiDispatcher'
import routeHandler from './routeHandler'
*/


exports.default = createMetaRouter();