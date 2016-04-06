'use strict';

Object.defineProperty(exports, "__esModule", {
          value: true
});
exports.applyLogicalMiddleware = undefined;
exports.default = middleware;

var _redux = require('redux');

var _timeoutScheduler = require('./timeoutScheduler');

var _timeoutScheduler2 = _interopRequireDefault(_timeoutScheduler);

var _idleMiddleware = require('./idleMiddleware');

var _idleMiddleware2 = _interopRequireDefault(_idleMiddleware);

var _thunk = require('./thunk');

var _thunk2 = _interopRequireDefault(_thunk);

var _readyStatePromise = require('./readyStatePromise');

var _readyStatePromise2 = _interopRequireDefault(_readyStatePromise);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _crashReporter = require('./crashReporter');

var _crashReporter2 = _interopRequireDefault(_crashReporter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//import metaRouter from './metaRouter'


/** Default array of useful redux middleware */
function middleware() {
          var logger = (0, _logger2.default)();
          return [_idleMiddleware2.default, _timeoutScheduler2.default, _thunk2.default, _readyStatePromise2.default, logger, _crashReporter2.default];
}

var applyLogicalMiddleware = exports.applyLogicalMiddleware = function applyLogicalMiddleware() {
          return _redux.applyMiddleware.apply(undefined, _toConsumableArray(middleware()));
};