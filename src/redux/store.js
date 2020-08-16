import { applyMiddleware, createStore, compose } from 'redux'
//import { createLogger } from 'redux-logger'
import myReducer from './reducer'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory()
const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    shouldHotReload: false,
  }) : compose

const cauhinhStore = () => {
  const mWares = [thunk, routerMiddleware(history)]
  const enhancers = [applyMiddleware(...mWares)]
  const store = createStore(
    myReducer(history),
    composeEnhancers(...enhancers)
  )
  return store
}

export default cauhinhStore