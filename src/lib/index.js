import { applyMiddleware } from 'redux'

//import metaRouter from './metaRouter'
import timeoutScheduler from './timeoutScheduler'
import idleMiddleware from './idleMiddleware'
import thunk from './thunk'
import readyStatePromise from './readyStatePromise'
import createLogger from './logger'
import crashReporter from './crashReporter'


/** Default array of useful redux middleware */
export default function middleware() {
  const logger = createLogger()
  return  [ idleMiddleware
          , timeoutScheduler
          , thunk

          , readyStatePromise
          , logger
          , crashReporter
          ]
}

export const applyLogicalMiddleware = () => applyMiddleware(...middleware())
