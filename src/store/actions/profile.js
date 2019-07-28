import { auth, firestore } from '../../config/firebase-config'

export const updateProfile = details => async dispatch => {
    dispatch({ type: 'UPDATING_PROFILE', payload: 'update' })
    const usersRef = await firestore.collection('users')
    const usernames = await usersRef.where('username', '==', details.username)
    const username_results = await usernames
        .get()
        .then(querySnapshot => {
            let users = []
            querySnapshot.forEach(doc => {
                if (doc.id !== auth.currentUser.uid) users.push(doc.data())
            })
            return users
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    const emails = await usersRef.where('email', '==', details.email)
    const email_results = await emails
        .get()
        .then(querySnapshot => {
            let users = []
            querySnapshot.forEach(doc => {
                if (doc.id !== auth.currentUser.uid) users.push(doc.data())
            })
            return users
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    if (username_results.length === 0 && email_results.length === 0) {
        firestore
            .collection('users')
            .doc(auth.currentUser.uid)
            .update(details)
        dispatch({ type: 'UPDATE_PROFILE_SUCCESS' })
        setTimeout(() => {
            return dispatch({ type: 'CLEAR_PROFILE_STATE' })
        }, 3000)
    } else {
        dispatch({
            type: 'UPDATE_PROFILE_FAILURE',
            payload: {
                username:
                    username_results.length !== 0 ? 'Username is taken!' : null,
                email: email_results.length !== 0 ? 'Email is taken!' : null,
            },
        })
        setTimeout(() => {
            return dispatch({ type: 'CLEAR_PROFILE_STATE' })
        }, 3000)
    }
}

export const deleteProfile = history => async dispatch => {
    dispatch({ type: 'DELETING_PROFILE', payload: 'delete' })
    try {
        await firestore
            .collection('users')
            .doc(auth.currentUser.uid)
            .delete()

        await auth.currentUser.delete()
        dispatch({ type: 'DELETE_PROFILE_SUCCESS' })
        history.push('/')
    } catch (err) {
        dispatch({ type: 'DELETE_PROFILE_ERROR', payload: err })
    }
    setTimeout(() => {
        return dispatch({ type: 'CLEAR_PROFILE_STATE' })
    }, 3000)
}
