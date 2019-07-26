import auth from './auth'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
})

export default rootReducer
