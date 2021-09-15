import Firebase from "firebase";
import'firebase/auth';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAWACGh4y0MuMxfin3ojK1KjEd47k0NmTg",
    authDomain: "shoping-list-19dc3.firebaseapp.com",
    projectId: "shoping-list-19dc3",
    storageBucket: "shoping-list-19dc3.appspot.com",
    messagingSenderId: "645507550153",
    appId: "1:645507550153:web:0de5eb22d3fcba53c33618"
  };

  // Initialize Firebase
  const firebase =Firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const auth= firebase.auth()

  export {firebase, db ,auth};
