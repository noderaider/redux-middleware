# redux-middleware

**common redux middleware**

[![NPM](https://nodei.co/npm/redux-middleware.png?stars=true&downloadRank=true)](https://nodei.co/npm/redux-middleware/)

[![NPM](https://nodei.co/npm-dl/redux-middleware.png?months=1)](https://nodei.co/npm/redux-middleware/)

**Disclaimer: This library is in early development alongside redux-addons. It will be changing rapidly and is not ready for production use.**

`npm i -S redux-middleware`

Will install middlewares to:

`ES5   => 'redux-middleware/lib'`

`ES6+  => 'redux-middleware/src/lib'`

## Usage


##### configureStore.js

```js
import { createStore } from 'redux'
import { applyLogicalMiddleware } from 'redux-middleware'
import rootReducer from '../reducers'

const createStore = applyLogicalMiddleware()(createStore)

export default function configureStore() {
  return createStore(rootReducer, initialState)
}
```


##### middleware.js

```js
import { applyMiddleware } from 'redux'

import metaRouter from 'redux-middleware/lib/metaRouter'
import thunk from 'redux-middleware/lib/thunk'
import readyStatePromise from 'redux-middleware/lib/readyStatePromise'
import logger from 'redux-middleware/lib/logger'
import crashReporter from 'redux-middleware/lib/crashReporter'


/** Default array of useful redux middleware */
export default function middleware() {
  return  [ metaRouter
          , thunk
          , readyStatePromise
          , logger
          , crashReporter
          ]
}

export const applyLogicalMiddleware = () => applyMiddleware(...middleware())
```



##### metaRouter.js (Needs work)

```js
import timeoutScheduler from './timeoutScheduler'
import identityHandler from './identityHandler'
import apiDispatcher from './apiDispatcher'
import routeHandler from './routeHandler'
import idleMiddleware from './idleMiddleware'
import errorHandler from './errorHandler'

/**
 * Lets you dispatch special actions with a { meta } field.
 *
 * This middleware will chain through all middleware specified in metaMap in
 * order and return the result.
 */
export const createMetaRouter = (metaMap = new Map( [ [ 'delay', timeoutScheduler ]
                                                    , [ 'identity', identityHandler ]
                                                    , [ 'api', apiDispatcher ]
                                                    , [ 'route', routeHandler ]
                                                    , [ 'idle', idleMiddleware ]
                                                    , [ 'err', errorHandler ]
                                                    ] )) => store => next => action => {
  if(!action.meta)
    return next(action)
  const supportedTypes = metaMap.keys()
  const metaTypes = Object.keys(action.meta)
  let result = metaTypes.filter(x => supportedTypes.includes(x))
                        .map(x => metaMap.get(x))
                        .reduce((last, middleware) => middleware(last), action)
  return next(result)
}

export default createMetaRouter()

```
