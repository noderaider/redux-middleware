'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = createLogger;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/** redux-logger with different defaults. */

var IS_BROWSER = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object';

var repeat = function repeat(str, times) {
  return new Array(times + 1).join(str);
};
var pad = function pad(num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num;
};
var formatTime = function formatTime(time) {
  return '@ ' + pad(time.getHours(), 2) + ':' + pad(time.getMinutes(), 2) + ':' + pad(time.getSeconds(), 2) + '.' + pad(time.getMilliseconds(), 3);
};

// Use the new performance api to get better precision if available
var timer = typeof performance !== 'undefined' && typeof performance.now === 'function' ? performance : Date;

/**
 * parse the level option of createLogger
 *
 * @property {string | function | object} level - console[level]
 * @property {object} action
 * @property {array} payload
 * @property {string} type
 */

function getLogLevel(level, action, payload, type) {
  switch (typeof level === 'undefined' ? 'undefined' : _typeof(level)) {
    case 'object':
      return typeof level[type] === 'function' ? level[type].apply(level, _toConsumableArray(payload)) : level[type];
    case 'function':
      return level(action);
    default:
      return level;
  }
}

/**
 * Creates logger with followed options
 *
 * @namespace
 * @property {object} options - options for logger
 * @property {string | function | object} options.level - console[level]
 * @property {boolean} options.duration - print duration of each action?
 * @property {boolean} options.timestamp - print timestamp with each action?
 * @property {object} options.colors - custom colors
 * @property {object} options.logger - implementation of the `console` API
 * @property {boolean} options.logErrors - should errors in action execution be caught, logged, and re-thrown?
 * @property {boolean} options.collapsed - is group collapsed?
 * @property {boolean} options.predicate - condition which resolves logger behavior
 * @property {function} options.stateTransformer - transform state before print
 * @property {function} options.actionTransformer - transform action before print
 * @property {function} options.errorTransformer - transform error before print
 */

function createLogger() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$level = _ref.level;
  var level = _ref$level === undefined ? IS_BROWSER ? 'info' : 'trace' : _ref$level;
  var _ref$logger = _ref.logger;
  var logger = _ref$logger === undefined ? console : _ref$logger;
  var _ref$logErrors = _ref.logErrors;
  var logErrors = _ref$logErrors === undefined ? true : _ref$logErrors;
  var _ref$collapsed = _ref.collapsed;
  var collapsed = _ref$collapsed === undefined ? true : _ref$collapsed;
  var predicate = _ref.predicate;
  var _ref$duration = _ref.duration;
  var duration = _ref$duration === undefined ? false : _ref$duration;
  var _ref$timestamp = _ref.timestamp;
  var timestamp = _ref$timestamp === undefined ? true : _ref$timestamp;
  var _ref$stateTransformer = _ref.stateTransformer;
  var stateTransformer = _ref$stateTransformer === undefined ? function (state) {
    return state;
  } : _ref$stateTransformer;
  var _ref$actionTransforme = _ref.actionTransformer;
  var actionTransformer = _ref$actionTransforme === undefined ? function (actn) {
    return actn;
  } : _ref$actionTransforme;
  var _ref$errorTransformer = _ref.errorTransformer;
  var errorTransformer = _ref$errorTransformer === undefined ? function (error) {
    return error;
  } : _ref$errorTransformer;
  var _ref$colors = _ref.colors;
  var colors = _ref$colors === undefined ? { title: function title() {
      return '#000000';
    },
    prevState: function prevState() {
      return '#9E9E9E';
    },
    action: function action() {
      return '#03A9F4';
    },
    nextState: function nextState() {
      return '#4CAF50';
    },
    error: function error() {
      return '#F20404';
    }
  } : _ref$colors;


  // exit if console undefined
  if (typeof logger === 'undefined') return function () {
    return function (next) {
      return function (action) {
        return next(action);
      };
    };
  };

  var logBuffer = [];
  function printBuffer() {
    logBuffer.forEach(function (logEntry, key) {
      var started = logEntry.started;
      var startedTime = logEntry.startedTime;
      var action = logEntry.action;
      var prevState = logEntry.prevState;
      var error = logEntry.error;
      var took = logEntry.took;
      var nextState = logEntry.nextState;

      var nextEntry = logBuffer[key + 1];
      if (nextEntry) {
        nextState = nextEntry.prevState;
        took = nextEntry.started - started;
      }
      // message
      var formattedAction = actionTransformer(action);
      var isCollapsed = typeof collapsed === 'function' ? collapsed(function () {
        return nextState;
      }, action) : collapsed;

      var formattedTime = formatTime(startedTime);
      var titleCSS = colors.title ? 'color: ' + colors.title(formattedAction) + ';' : null;
      var title = 'action ' + (timestamp ? formattedTime : '') + ' ' + formattedAction.type + ' ' + (duration ? '(in ' + took.toFixed(2) + ' ms)' : '');

      // render
      try {
        if (isCollapsed) {
          if (colors.title) logger.groupCollapsed('%c ' + title, titleCSS);else logger.groupCollapsed(title);
        } else {
          if (colors.title) logger.group('%c ' + title, titleCSS);else logger.group(title);
        }
      } catch (e) {
        logger[level](title);
      }

      var prevStateLevel = getLogLevel(level, formattedAction, [prevState], 'prevState');
      var actionLevel = getLogLevel(level, formattedAction, [formattedAction], 'action');
      var errorLevel = getLogLevel(level, formattedAction, [error, prevState], 'error');
      var nextStateLevel = getLogLevel(level, formattedAction, [nextState], 'nextState');

      if (prevStateLevel) {
        if (colors.prevState) logger[prevStateLevel]('%c prev state', 'color: ' + colors.prevState(prevState) + '; font-weight: bold', prevState);else logger[prevStateLevel]('prev state', prevState);
      }

      if (actionLevel) {
        if (colors.action) logger[actionLevel]('%c action', 'color: ' + colors.action(formattedAction) + '; font-weight: bold', formattedAction);else logger[actionLevel]('action', formattedAction);
      }

      if (error && errorLevel) {
        if (colors.error) logger[errorLevel]('%c error', 'color: ' + colors.error(error, prevState) + '; font-weight: bold', error);else logger[errorLevel]('error', error);
      }

      if (nextStateLevel) {
        if (colors.nextState) logger[nextStateLevel]('%c next state', 'color: ' + colors.nextState(nextState) + '; font-weight: bold', nextState);else logger[nextStateLevel]('next state', nextState);
      }

      try {
        logger.groupEnd();
      } catch (e) {
        logger[level]('—— log end ——');
      }
    });
    logBuffer.length = 0;
  }

  return function (_ref2) {
    var getState = _ref2.getState;
    return function (next) {
      return function (action) {
        // exit early if predicate function returns false
        if (typeof predicate === 'function' && !predicate(getState, action)) return next(action);

        var logEntry = {};
        logBuffer.push(logEntry);

        logEntry.started = timer.now();
        logEntry.startedTime = new Date();
        logEntry.prevState = stateTransformer(getState());
        logEntry.action = action;

        var returnedValue = void 0;
        if (logErrors) {
          try {
            returnedValue = next(action);
          } catch (e) {
            logEntry.error = errorTransformer(e);
          }
        } else returnedValue = next(action);

        logEntry.took = timer.now() - logEntry.started;
        logEntry.nextState = stateTransformer(getState());

        printBuffer();

        if (logEntry.error) throw logEntry.error;
        return returnedValue;
      };
    };
  };
}