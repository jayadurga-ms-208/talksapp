import React from 'react'
import "./Login.css"
import { Button } from '@mui/material'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { firebaseApp } from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
  

const auth = getAuth(firebaseApp);

function Login() {
    const[{},dispatch] = useStateValue();

    const signIn = async () => {
        try {
            const provider = new GoogleAuthProvider(firebaseApp); 
            const result = await signInWithPopup(auth, provider);
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            }) 
            } catch (error) {
            alert(error.message); 
            }
    };
    
  return (
    <div className='login'>
        <div className='login__container'>
            <img src="https://cdn-icons-png.flaticon.com/256/4138/4138132.png" alt="" />
            <div className='login__text'>
                <h1>Sign in to WhatsApp</h1>
            </div>
            <Button onClick={signIn}> Sign in using google</Button>
        </div>
    </div>
  )
}

export default Login