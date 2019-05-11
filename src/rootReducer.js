import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import allReducers from './reducers'

export default (history) => combineReducers({
  router: connectRouter(history),
  allReducers,
});