'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showAlert = exports.HIDE_ALERT = exports.SHOW_ALERT = undefined;

var _reduxAction = require('redux-action');

var SHOW_ALERT = exports.SHOW_ALERT = 'SHOW_ALERT';
var HIDE_ALERT = exports.HIDE_ALERT = 'SHOW_ALERT';

var defaultProps = { title: 'Still There?',
  text: 'You will be logged out due to inactivity shortly.',
  animation: 'slide-from-top',
  showConfirmButton: false,
  html: true,
  type: 'warning'
};

var showAlert = exports.showAlert = (0, _reduxAction.createAction)(SHOW_ALERT, function () {
  var props = arguments.length <= 0 || arguments[0] === undefined ? defaultProps : arguments[0];
  return props;
}, function (_ref) {
  var _ref$duration = _ref.duration;
  var duration = _ref$duration === undefined ? 0 : _ref$duration;
  return { alert: { id: duration } };
});

var sweetAlert = function sweetAlert(store) {
  return function (next) {
    return function (action) {
      var swalTimeout = null;
      if (postState.actionName === 'INACTIVE') {
        log.info('SWAL ACTIVE => SHOW');
        swal();
      } else if (postState.actionName === 'EXPIRED') {
        log.info('SWAL EXPIRED => HIDE IN 2 SECONDS');
        dispatch(forgetTokens());
        swalTimeout = setTimeout(function () {
          return swal.close();
        }, 2000);
      } else {
        log.info('SWAL ELSE => HIDE NOW');
        clearTimeout(swalTimeout);
        swal.close();
      }
    };
  };
};

exports.default = thunk;