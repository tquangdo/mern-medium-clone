import { combineReducers } from 'redux'
import reducerArticle from './reducers/reducerArticle'
import reducerUser from './reducers/reducerUser'
import reducerCommon from './reducers/reducerCommon'
import { connectRouter } from 'connected-react-router'

const myReducer = history => combineReducers({
  reducerArticle,
  reducerUser,
  reducerCommon,
  router: connectRouter(history),
})

export default myReducer
