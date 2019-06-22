import { combineReducers } from 'redux'
import * as types from '../types'

const loading = (state = false, action) => {
  switch(action.type) {
    case types.API_LOADING:
      return true
    case types.API_LOADED:
      return false
    default:
      return state
  }
}
const user = (state = null, action) => {
  switch(action.type) {
    case types.SET_USER_INFO:
      return action.payload
    default:
      return state
  }
}
const accessiblePaths = (state = [], action) => {
  switch(action.type) {
    case types.SET_ACCESSIBLE_PATHS:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  loading,
  user,
  accessiblePaths,
})

