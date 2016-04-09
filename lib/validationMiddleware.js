'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debuggerMiddleware;
function debuggerMiddleware(_ref) {
  var _ref$useDebugger = _ref.useDebugger;
  var useDebugger = _ref$useDebugger === undefined ? false : _ref$useDebugger;

  return function (store) {
    return function (next) {
      return function (action) {
        if (!action) {
          console.warn('ACTION MUST EXIST');
          debugger;
        }
        if (!action.type) {
          console.warn('ACTION TYPE MUST EXIST');
          debugger;
        }
      };
    };
  };
}