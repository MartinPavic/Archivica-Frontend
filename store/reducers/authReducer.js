import { AuthActionTypes } from '../actions/authActions';

const initialState = {
  loggedIn: false, 
  token: '',
  refreshToken: '',
  loading: false, 
  error: false,
}

export const authState = (state = initialState, action) => {
  switch(action.type) {
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
      default: 
        return state
  }
}