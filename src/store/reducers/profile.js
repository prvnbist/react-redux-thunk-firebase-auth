const initState = {
    failure: {
        username: null,
        email: null,
        delete: null,
    },
    success: null,
    status: {
        update: null,
        delete: null,
    },
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATING_PROFILE':
            return {
                ...state,
                status: {
                    ...state.status,
                    update:
                        action.payload === 'update' ? 'Updating profile' : null,
                },
            }
        case 'UPDATE_PROFILE_SUCCESS':
            return {
                ...state,
                status: {
                    update: null,
                    delete: null,
                },
                success: 'Profile succesfully updated!',
            }
        case 'UPDATE_PROFILE_FAILURE':
            return {
                ...state,
                status: {
                    update: null,
                    delete: null,
                },
                failure: {
                    ...state.failure,
                    username: action.payload.username,
                    email: action.payload.email,
                },
            }
        case 'DELETING_PROFILE':
            return {
                ...state,
                status: {
                    ...state.status,
                    delete:
                        action.payload === 'delete' ? 'Brace yourselves' : null,
                },
            }
        case 'DELETE_PROFILE_SUCCESS':
            return {
                ...state,
                status: {
                    update: null,
                    delete: null,
                },
                success: 'Profile deleted succesfully!',
            }
        case 'DELETE_PROFILE_FAILURE':
            return {
                ...state,
                status: {
                    update: null,
                    delete: null,
                },
                failure: {
                    ...state.failure,
                    delete: action.payload,
                },
            }
        case 'CLEAR_PROFILE_STATE':
            return {
                status: {
                    update: null,
                    delete: null,
                },
                failure: {
                    username: null,
                    email: null,
                    delete: null,
                },
                success: null,
            }
        default:
            return state
    }
}

export default authReducer
