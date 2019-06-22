import * as types from '../types'


export function apiLoading(state) {
  if(state) {
    return {
      type: types.API_LOADING,
      payload: true,
    }
  } 
  else {
    return {
      type: types.API_LOADED,
      payload: false,
    }
  }
}

export function setUserInfo(state) {
  if(state) {
    return {
      type: types.SET_USER_INFO,
      payload: state,
    }
  } 
}

export function setAccessiblePaths(state) {
  if(state) {
    return {
      type: types.SET_ACCESSIBLE_PATHS,
      payload: state,
    }
  } 
}