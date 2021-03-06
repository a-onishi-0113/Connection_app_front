import firebase from 'firebase'
import "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGE_SENDER_ID,
  appId: process.env.APP_ID
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase

