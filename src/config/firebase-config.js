import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// Initialize Firebase
let config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DB_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_ID,
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
}

firebase.initializeApp(config)

const firestore = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()
const twitterProvider = new firebase.auth.TwitterAuthProvider()
const googleProvider = new firebase.auth.GoogleAuthProvider()

export { firebase, firestore, auth, twitterProvider, googleProvider, storage }
