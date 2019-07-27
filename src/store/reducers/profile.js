const initState = {
    failure: {
        username: null,
        email: null,
    },
    success: null,
    status: null,
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATING_PROFILE':
            return {
                ...state,
                status: 'Updating profile',
            }
        case 'UPDATE_PROFILE_SUCCESS':
            return {
                ...state,
                status: null,
                success: 'Profile succesfully updated!',
            }
        case 'UPDATE_PROFILE_FAILURE':
            return {
                ...state,
                status: null,
                failure: {
                    username: action.payload.username,
                    email: action.payload.email,
                },
            }
        case 'CLEAR_PROFILE_UPDATE_STATUS':
            return {
                ...state,
                failure: {
                    username: null,
                    email: null,
                },
                success: null,
            }
        default:
            return state
    }
}

export default authReducer
