import { Api } from '../../services/api';

export const AuthActionTypes = {
	POST_REGISTER_REQUEST: 'POST_REGISTER_REQUEST',
	POST_REGISTER_FAILURE: 'POST_REGISTER_FAILURE',
	POST_REGISTER_SUCCESS: 'POST_REGISTER_SUCCESS',

	POST_LOGIN_REQUEST: 'POST_LOGIN_REQUEST',
	POST_LOGIN_FAILURE: 'POST_LOGIN_FAILURE',
	POST_LOGIN_SUCCESS: 'POST_LOGIN_SUCCESS',

	SIGN_OUT: 'SIGN_OUT'
}

export const registerRequest = () => 
	({
		type: AuthActionTypes.POST_LOGIN_REQUEST,
		loading: true, 
		error: false
	})

export const registerFailure = () => 
	({
		type: AuthActionTypes.POST_LOGIN_FAILURE,
		loading: false, 
		error: true
	})

export const registerSuccess = (data) => 
	({
		type: AuthActionTypes.POST_LOGIN_SUCCESS,
		loading: false,
		error: false,
		payload: data
	})

export const register = (registerForm) => (
	async (dispatch) => {
		console.log(registerForm)
		await dispatch(registerRequest())
		try {
			const response = await Api.postRegister(registerForm.email, registerForm.password, registerForm.firstName, registerForm.lastName)
			if(response) {
				dispatch(registerSuccess(response))
				} 
			} catch(error) {
				dispatch(registerFailure())
			}
	}
)