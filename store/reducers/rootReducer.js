import { combineReducers } from 'redux'

import { authState } from './authReducer'


export const rootReducer = combineReducers({
  authState,
})