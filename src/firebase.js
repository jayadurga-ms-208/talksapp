// For Firebase JS SDK v7.20.0 and later, measurementId is 
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import  { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCcY_KguBKJiv8Gh5zAZYjon19khE7kmFg",
  authDomain: "talksapp-ec39f.firebaseapp.com",
  databaseURL: "https://talksapp-ec39f-default-rtdb.firebaseio.com",
  projectId: "talksapp-ec39f",
  storageBucket: "talksapp-ec39f.appspot.com",
  messagingSenderId: "593017204235",
  appId: "1:593017204235:web:8e897fb66fa90a3a88210e",
  measurementId: "G-6HVZQ5SWD2"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider(firebaseApp);


  export {auth, provider,firebaseApp};
  
  export default db;


  