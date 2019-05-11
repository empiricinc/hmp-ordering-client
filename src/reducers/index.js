import { combineReducers } from 'redux'
import users from './users'
// import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
// import allReducers from './reducers'

export default (history) => combineReducers({
  users,
  router: connectRouter(history),
});

// const allReducers = combineReducers({
  
// })

// export default allReducers;
