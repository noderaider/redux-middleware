import timeoutScheduler from './timeoutScheduler'
/*import identityHandler from './identityHandler'
import apiDispatcher from './apiDispatcher'
import routeHandler from './routeHandler'
*/
import idleMiddleware from './idleMiddleware'
//import errorHandler from './errorHandler'

/**
 * Lets you dispatch special actions with a { meta } field.
 *
 * This middleware will chain through all middleware specified in metaMap in
 * order and return the result.
 */
export const createMetaRouter = (metaMap = new Map( [ [ 'delay', timeoutScheduler ]
                                                  /*, [ 'identity', identityHandler ]
                                                    , [ 'api', apiDispatcher ]
                                                    , [ 'route', routeHandler ]*/
                                                    , [ 'idle', idleMiddleware ]
                                                  //, [ 'err', errorHandler ]
                                                    ] )) => store => next => action => {
  if(!action.meta)
    return next(action)
  console.warn('META TYPE DETECTED', action.meta)
  const metaTypes = Object.keys(action.meta)
  let result = metaTypes.filter(x => metaMap.has(x))
                        .map(x => metaMap.get(x))
                        .reduce((last, middleware) => middleware(store)(next)(last), action)
  console.warn('META TYPE RESULT', result)
  return next(result)
}

export default createMetaRouter()
