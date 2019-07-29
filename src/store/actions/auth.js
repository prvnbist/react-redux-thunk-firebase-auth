import {
    auth,
    firebase,
    firestore,
    twitterProvider,
    googleProvider,
} from '../../config/firebase-config'

export const signIn = ({ email, password }, history) => {
    return dispatch => {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                history.push('/dashboard')
                dispatch({ type: 'LOGIN_SUCCESS' })
            })
            .catch(err => {
                dispatch({ type: 'LOGIN_ERROR', err })
                setTimeout(() => {
                    return dispatch({ type: 'CLEAR_ERRORS' })
                }, 3000)
            })
    }
}

export const signOut = history => dispatch => {
    auth.signOut()
        .then(() => {
            history.push('/')
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        })
        .catch(err => console.log(err))
}

export const signUp = ({ name, email, password, username }, history) => {
    return async dispatch => {
        const usersRef = await firestore.collection('users')
        const usernames = await usersRef.where('username', '==', username)
        const username_results = await usernames
            .get()
            .then(querySnapshot => {
                let users = []
                querySnapshot.forEach(doc => {
                    users.push(doc.data())
                })
                return users
            })
            .catch(function(error) {
                console.log('Error getting documents: ', error)
            })
        console.log(username_results)
        if (username_results.length === 0) {
            auth.createUserWithEmailAndPassword(email, password)
                .then(res => {
                    firestore
                        .collection('users')
                        .doc(res.user.uid)
                        .set({
                            name: name,
                            username: username,
                            email: email,
                            createdAt: Date.now(),
                        })
                    return res.user.uid
                })
                .then(() => {
                    history.push('/dashboard')
                    dispatch({
                        type: 'SIGNUP_SUCCESS',
                    })
                })
                .catch(err => {
                    dispatch({ type: 'SIGNUP_ERROR', err: err.message })
                    setTimeout(() => {
                        return dispatch({ type: 'CLEAR_ERRORS' })
                    }, 3000)
                })
        } else {
            dispatch({
                type: 'SIGNUP_ERROR',
                err:
                    username_results.length !== 0 ? 'Username is taken!' : null,
            })
            setTimeout(() => {
                return dispatch({ type: 'CLEAR_ERRORS' })
            }, 3000)
        }
    }
}

export const signInWithTwitter = history => {
    return dispatch => {
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
                            image: user.profile.profile_image_url_https.replace(
                                '_normal',
                                ''
                            ),
                            bio: user.profile.description,
                            createdAt: Date.now(),
                            provider: 'twitter',
                        })
                }
            })
            .then(() => {
                dispatch({ type: 'LOGIN_SUCCESS' })
                history.push('/dashboard')
            })
            .catch(err => console.log(err))
    }
}

export const signInWithGoogle = history => {
    return dispatch => {
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
                            email: user.profile.email,
                            createdAt: Date.now(),
                            provider: 'google',
                        })
                }
            })
            .then(() => {
                history.push('/dashboard')
                dispatch({ type: 'LOGIN_SUCCESS' })
            })
            .catch(err => console.log(err))
    }
}
