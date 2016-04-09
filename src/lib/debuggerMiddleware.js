
const debuggerMiddleware = store => next => action => {
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
  return next(action)
}

export default debuggerMiddleware
