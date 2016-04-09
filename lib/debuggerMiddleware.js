"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var debuggerMiddleware = function debuggerMiddleware(store) {
  return function (next) {
    return function (action) {
      /*
      if(!action) {
        console.warn('ACTION MUST EXIST')
        debugger
      }
      if(!action.type) {
        console.warn('ACTION TYPE MUST EXIST')
        debugger
      }
      */
      return next(action);
    };
  };
};

exports.default = debuggerMiddleware;