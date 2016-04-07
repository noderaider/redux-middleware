import { applyMiddleware } from 'redux'

//import metaRouter from './metaRouter'
export timeoutScheduler from './timeoutScheduler'
export idleMiddleware from './idleMiddleware'
export thunk from './thunk'
export readyStatePromise from './readyStatePromise'
export createLogger from './logger'
export crashReporter from './crashReporter'


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

