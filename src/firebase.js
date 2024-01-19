// For Firebase JS SDK v7.20.0 and later, measurementId is 
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import  { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  // APIKEY
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider(firebaseApp);


  export {auth, provider,firebaseApp};
  
  export default db;


  
