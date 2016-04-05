/**
 * Schedules actions with { meta: { delay: N } } to be delayed by N milliseconds.
 * Makes `dispatch` return a function to cancel the timeout in this case.
 */
const timeoutScheduler = store => next => action => {
  if (!action.meta || !action.meta.delay)
    return next(action)

  let timeoutID = setTimeout(() => {
    console.warn(`TIMEOUT SCHEDULER => type: ${action.type} delay: ${action.meta.delay} MS`)
    next(action)
  }, action.meta.delay)

  return function cancel() {
    console.warn(`TIMEOUT CANCELLED => ${timeoutID}`)
    clearTimeout(timeoutID)
  }
}

export default timeoutScheduler
