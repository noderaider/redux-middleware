/** When context has already been created, it can be shared to middleware component. */

export const createIdleMiddleware = (context = {}) => {
  //const createDispatcher = configureDispatcher(context)
  const isIdleAction = ({ meta }) => meta && meta.idle

  return store => next => action => {
    if(!isIdleAction(action))
      return next(action)

    const { idle } = action.meta
    const { dispatch, getState } = store
    //const dispatcher = createDispatcher(dispatch, getState)
    if(!actionNames.includes(action.type))
      return next(action)
    return next(action)
  }
}


export default createIdleMiddleware()
