import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCbAJykuKsSxktYnBnxGmrWHxPcgLunv-k",
    authDomain: "sklepmuzyczny-33d22.firebaseapp.com",
    projectId: "sklepmuzyczny-33d22",
    storageBucket: "sklepmuzyczny-33d22.appspot.com",
    messagingSenderId: "345732602279",
    appId: "1:345732602279:web:b6a034a622fb78e6e63e82"
}

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)

export default firebase