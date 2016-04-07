'use strict';

Object.defineProperty(exports, "__esModule", {
          value: true
});
exports.crashReporter = exports.createLogger = exports.readyStatePromise = exports.thunk = exports.idleMiddleware = exports.timeoutScheduler = undefined;
exports.default = middleware;

var _redux = require('redux');

var _timeoutScheduler2 = require('./timeoutScheduler');

var _timeoutScheduler3 = _interopRequireDefault(_timeoutScheduler2);

var _idleMiddleware2 = require('./idleMiddleware');

var _idleMiddleware3 = _interopRequireDefault(_idleMiddleware2);

var _thunk2 = require('./thunk');

var _thunk3 = _interopRequireDefault(_thunk2);

var _readyStatePromise2 = require('./readyStatePromise');

var _readyStatePromise3 = _interopRequireDefault(_readyStatePromise2);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _crashReporter2 = require('./crashReporter');

var _crashReporter3 = _interopRequireDefault(_crashReporter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.timeoutScheduler = _timeoutScheduler3.default;

//import metaRouter from './metaRouter'

exports.idleMiddleware = _idleMiddleware3.default;
exports.thunk = _thunk3.default;
exports.readyStatePromise = _readyStatePromise3.default;
exports.createLogger = _logger2.default;
exports.crashReporter = _crashReporter3.default;

/** Default array of useful redux middleware */

function middleware() {
          var logger = createLogger();
          return [idleMiddleware, timeoutScheduler, thunk, readyStatePromise, logger, crashReporter];
}