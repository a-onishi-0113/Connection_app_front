import firebaseApp from '@/plugins/firebase'

export default function () {
  firebaseApp.auth().onAuthStateChanged(user => {
      console.log(user)
    // FirebaseAuthの認証状態を確認
  })
}