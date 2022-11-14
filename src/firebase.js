import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD8CVaHgWPtZ3_Zn1NrmohE8umk8U2U77g",
    authDomain: "whatsapp-clone-f77c0.firebaseapp.com",
    projectId: "whatsapp-clone-f77c0",
    storageBucket: "whatsapp-clone-f77c0.appspot.com",
    messagingSenderId: "480506028677",
    appId: "1:480506028677:web:6cbf45b05dd8b50283bfec",
    measurementId: "G-E3SBXDQQ7W"
  };

  //This special line of code connects with everything
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  //This is for database connection
  const db = firebaseApp.firestore();

  const auth = firebase.auth();

  const provider = new firebase.auth.GoogleAuthProvider();

  export{auth,provider}
  export default db;