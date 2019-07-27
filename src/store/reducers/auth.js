const initState = {
    authError: null,
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            return {
                authError:
                    action.err === 'auth/network-request-failed'
                        ? 'Network issue, please try again!'
                        : 'Wrong email or password.',
            }
        case 'LOGIN_SUCCESS':
            return {
                authError: null,
            }
        case 'SIGNOUT_SUCCESS':
            return state
        case 'SIGNUP_SUCCESS':
            return {
                authError: null,
            }
        case 'SIGNUP_ERROR':
            return {
                authError: action.err,
            }
        case 'CLEAR_ERRORS':
            return {
                authError: null,
            }
        default:
            return state
    }
}

export default authReducer
