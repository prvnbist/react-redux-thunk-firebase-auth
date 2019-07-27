import auth from './auth'
import profile from './profile'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth,
    profile,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
})

export default rootReducer
