import { combineReducers } from 'redux'
import users from './users'
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
  users,
  router: connectRouter(history),
});

