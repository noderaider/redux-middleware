import { createAction } from 'redux-action'

export const SHOW_ALERT = 'SHOW_ALERT'
export const HIDE_ALERT = 'SHOW_ALERT'


const defaultProps =  { title: 'Still There?'
                      , text: 'You will be logged out due to inactivity shortly.'
                      , animation: 'slide-from-top'
                      , showConfirmButton: false
                      , html: true
                      , type: 'warning'
                      }

export const showAlert = createAction(SHOW_ALERT, (props = defaultProps) => props, ({ duration = 0 }) => ({ alert: { id: duration } }))

const sweetAlert = store => next => action => {
  let swalTimeout = null
  if(postState.actionName === 'INACTIVE') {
    log.info('SWAL ACTIVE => SHOW')
    swal( )
  } else if(postState.actionName === 'EXPIRED') {
    log.info('SWAL EXPIRED => HIDE IN 2 SECONDS')
    dispatch(forgetTokens())
    swalTimeout = setTimeout(() => swal.close(), 2000)
  } else {
    log.info('SWAL ELSE => HIDE NOW')
    clearTimeout(swalTimeout)
    swal.close()
  }


}

export default thunk
