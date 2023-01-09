import { AuthActionTypes } from '../actions/authActions';


const initialState = {
  loggedIn: false, 
  user: null, 
  loading: false, 
  error: false,
}

export const authState = (state = initialState, action) => {
  const {payload, type} = action
  switch(type) {
    case AuthActionTypes.POST_REGISTER_REQUEST:
      return {
        ...state, 
        loading: true,
        error: false
      }
    case AuthActionTypes.POST_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }
    case AuthActionTypes.POST_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      }
    case AuthActionTypes.POST_LOGIN_REQUEST:
      return {
          ...state, 
          loading: true,
          error: false
        }
    case AuthActionTypes.POST_LOGIN_FAILURE:
      return {
          ...state,
          loading: false,
          error: true
        }
    case AuthActionTypes.POST_LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.payload, 
        loading: false,
        error: false,
      }
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        loggedIn: false, 
        user: null
      }
    default: 
      return state
  }
}