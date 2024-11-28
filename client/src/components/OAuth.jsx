import { Button } from 'flowbite-react'
import React from 'react'
import { FaGoogle } from "react-icons/fa";
import { getAuth,GoogleAuthProvider, signInWithPopup  } from "firebase/auth";
import {app} from '../firebase'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { signInFailure, signInSuccess } from '../redux/user/userSlice';

function OAuth() {

  const auth = getAuth(app);   //We are paasing app from the firbase other firbase doesnt know that who is requesting
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOAuth = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({prompt : 'select_account'})  // BY using this it will ask user to signin with teir different google accounts

    try {
      const resultFromGoogle = await signInWithPopup(auth,provider)
      // console.log(resultFromGoogle)  Sending all these google information to the backend
      const googledata = await fetch('/api/auth/google', {
        method:"POST",
        headers:{'Content-Type' : 'application/json'},
        body : JSON.stringify({
          // WE NEED THESE DETAILS FROM THE GOOGLE AND SEND THESE DETAILS TO THE BACKEND SO OUR DATA GET SAVED
          name:resultFromGoogle.user.displayName,
          email:resultFromGoogle.user.email,
          googlePhotoUrl : resultFromGoogle.user.photoURL,
        })
      })
      const data = googledata.json();

      if(data.success === false) {
        dispatch(signInFailure(data.message))
      }

      if(googledata.ok) {
        dispatch(signInSuccess(googledata));
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <>
        <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleOAuth} >
            <FaGoogle className='w-6 h-6 mr-2'/>
            Continue with Google
        </Button>
    </>
  )
}

export default OAuth