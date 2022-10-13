import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDqsVPfxYRIs6rP1iOBr4U7zHL4Ol6MkmQ",
    authDomain: "vue-invoice-app-7.firebaseapp.com",
    projectId: "vue-invoice-app-7",
    storageBucket: "vue-invoice-app-7.appspot.com",
    messagingSenderId: "796443171354",
    appId: "1:796443171354:web:f933d6744304eb687dcfa3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp.firestore()