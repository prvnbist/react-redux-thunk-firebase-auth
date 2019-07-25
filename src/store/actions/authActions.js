import {
    auth,
    firebase,
    firestore,
    twitterProvider,
    googleProvider,
} from '../../config/fbConfig'

export const signIn = ({ email, password }, history) => {
    return (dispatch, getState) => {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                history.push('/')
                dispatch({ type: 'LOGIN_SUCCESS' })
            })
            .catch(err => {
                dispatch({ type: 'LOGIN_ERROR', err })
            })
    }
}

export const signOut = history => (dispatch, getState) => {
    auth.signOut()
        .then(() => {
            history.push('/login')
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        })
        .catch(err => console.log(err))
}

export const signUp = ({ name, email, password, username }, history) => {
    return (dispatch, getState) => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(res => {
                firestore
                    .collection('users')
                    .doc(res.user.uid)
                    .set({
                        name: name,
                        username: username,
                        createdAt: Date.now(),
                    })
                return res.user.uid
            })
            .then(() => {
                history.push('/')
                dispatch({
                    type: 'SIGNUP_SUCCESS',
                })
            })
            .catch(err => {
                dispatch({ type: 'SIGNUP_ERROR', err: err.message })
            })
    }
}

export const signInWithTwitter = history => {
    return (dispatch, getState) => {
        firebase
            .auth()
            .signInWithPopup(twitterProvider)
            .then(function(result) {
                var user = result.additionalUserInfo
                if (user.isNewUser) {
                    firestore
                        .collection('users')
                        .doc(result.user.uid)
                        .set({
                            name: user.profile.name,
                            username: user.username,
                            image: user.profile.profile_image_url_https,
                            description: user.profile.description,
                        })
                }
            })
            .then(() => {
                dispatch({ type: 'LOGIN_SUCCESS' })
                history.push('/')
            })
            .catch(err => console.log(err))
    }
}

export const signInWithGoogle = history => {
    return (dispatch, getState) => {
        firebase
            .auth()
            .signInWithPopup(googleProvider)
            .then(function(result) {
                var user = result.additionalUserInfo
                if (user.isNewUser) {
                    firestore
                        .collection('users')
                        .doc(result.user.uid)
                        .set({
                            name: user.profile.name,
                            image: user.profile.picture,
                        })
                }
            })
            .then(() => {
                history.push('/')
                dispatch({ type: 'LOGIN_SUCCESS' })
            })
            .catch(err => console.log(err))
    }
}
