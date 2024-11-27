import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
// import { serverURL } from '../../../api/utils/serverUrl';


import {signInStart,signInSuccess,signInFailure} from '../redux/user/userSlice'
function SignIn() {

  const [formData , setFormData] = useState({});
  // const [errorMessage , setErrorMessage] = useState(null)
  // const [loading , setLoading] = useState(false)
  const {loading , error : errorMessage} = useSelector(state => state.user)

  const navigate = useNavigate();
  const dispatch = useDispatch()

  // CHANGING AUR WRITING ON THE INPUT FIELDS
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]:e.target.value.trim() });
  }

  // FUNCTION FOR SUBMITING THE DETAILS FROM THE INPUT FILEDS TO THE DATABASE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.email || !formData.password) {
      return dispatch(signInFailure('All fields are required')) //if any fields are empty
    }

    try {

      dispatch(signInStart())   // FUNCTION IS WRIITEN IN THE USERSLICE PAGE IT WILL HANDLE THE ERROR AND LOADING

      const res = await fetch('/api/auth/signin',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });


      const data = await res.json();

      if(data.success === false) {
        dispatch(signInFailure(data.message));  // if user already exists in the database 
      }

      if(res.ok) {
        dispatch(signInSuccess(data))   //IF EVERY THING IS CORRECT THE WE WILL DISPATCH SIGNIN SUCCESS
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }
  // console.log(formData)

  // ...formData --> his copies the existing properties of formData into a new object. It ensures we keep the previous data in the state.
  // [e.target.id]: e.target.value): -->  e.target.id: Refers to the id attribute of the input field that triggered the change.
  // e.target.value: Captures the new value typed into that input field.
  // Using [e.target.id] dynamically updates the property in the state object corresponding to the input's id.

  return (
   <>
      <div className='min-h-screen mt-24  '>
          <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5' >
            <div className='flex-1'>
            <Link to={"/"} className=' font-bold dark:text-white text-4xl'>
                    <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Code</span> Craft
            </Link>
              <p className='text-sm mt-5'>
              Start your journey with us today. Share your thoughts, explore ideas, and connect with a community that values your voice.
              </p>
            </div>
            <div className='flex-1'>

                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                   <div>
                    <Label value='Your Email' />
                    <TextInput type='email'  placeholder='xyz@gmail.com' id='email' onChange={handleChange}/>
                   </div>

                   <div>
                    <Label value='Your username' />
                    <TextInput type='password'  placeholder='Password' id='password' onChange={handleChange}/>
                   </div>
                   <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                    {
                      loading ? (
                        <>
                          <Spinner size='sm'/>
                          <span className='pl-3'>Loading...</span>
                        </>
                      ) : 'Sign In'
                    }
                   </Button>
                </form>
                <div className='flex gap-2 text-sm mt-5'>
                  <span>Dont have an account?</span>
                  <Link to={'/signup'} className='text-blue-500'>
                    Sign Up
                  </Link>
                </div>
                {
                  errorMessage && (
                    <Alert className='mt-5' color='failure'>
                      {errorMessage}
                    </Alert>
                  )
                }
            </div>
          </div>
      </div>
   </>
  )
}

export default SignIn