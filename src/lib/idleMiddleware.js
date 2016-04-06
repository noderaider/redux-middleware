/** When context has already been created, it can be shared to middleware component. */
import { createAction } from 'redux-actions'

const createIdleMiddleware = (context = {}) => {
  //const createDispatcher = configureDispatcher(context)
  const isIdleAction = ({ type, payload, meta }) => ['IDLEMONITOR_JS_ACTIVITY', 'IDLEMONITOR_JS_ACTIVE', 'IDLEMONITOR_JS_INACTIVE', 'IDLEMONITOR_JS_EXPIRED'].includes(type)
  let cancel = () => {}

  return store => next => action => {
    if(!isIdleAction(action))
      return next(action)

    //const { idle } = action.meta
    const { dispatch, getState } = store
    switch(action.type) {
      case 'IDLEMONITOR_JS_ACTIVE':
        //cancel()
        console.warn('SCHEDULING INACTIVE!')
        cancel = dispatch(createAction('IDLEMONITOR_JS_INACTIVE', payload => payload, () => { meta: { delay: 6000 } }))
        break
      case 'IDLEMONITOR_JS_INACTIVE':
        //cancel()
        console.warn('SCHEDULING EXPIRED!')
        cancel = dispatch(createAction('IDLEMONITOR_JS_EXPIRED', payload => payload, () => { meta: { delay: 6000 } }))
        break
      case 'IDLEMONITOR_JS_EXPIRED':
        dispatch(createAction('FORGET_TOKENS')())
    }

    return next(action)
  //return { next: 'EXPIRED', delay: 6000 }

  //swal.close()
  }
}


export default createIdleMiddleware()
