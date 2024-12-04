import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

// import { serverURL } from '../../../api/utils/serverUrl';
function SignUp() {

  const [formData , setFormData] = useState({});
  const [errorMessage , setErrorMessage] = useState(null)
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]:e.target.value.trim() });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields")  //if any fields are empty
    }

    try {
      setLoading(true);
      setErrorMessage(null)
      const res = await fetch('/api/auth/signup',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if(data.success === false) {
        return setErrorMessage(data.message);  // if user already exists in the database 
      }

      setLoading(false)
      if(res.ok) {
        navigate('/signin')
      }
    } catch (error) {
      console.log(error)
      setErrorMessage(error.message)
      setLoading(false)
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
                    <Label value='Your username' />
                    <TextInput type='text'  placeholder='John Brute' id='username' onChange={handleChange}/>
                   </div>

                   <div>
                    <Label value='Your Email' />
                    <TextInput type='email'  placeholder='xyz@gmail.com' id='email' onChange={handleChange}/>
                   </div>

                   <div>
                    <Label value='Your Password' />
                    <TextInput type='password'  placeholder='Password' id='password' onChange={handleChange}/>
                   </div>
                   <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                    {
                      loading ? (
                        <>
                          <Spinner size='sm'/>
                          <span className='pl-3'>Loading...</span>
                        </>
                      ) : 'Sign Up'
                    }
                   </Button>
                   {/* Google Auth Functionality */}
                   <OAuth/>
                </form>
                <div className='flex gap-2 text-sm mt-5'>
                  <span>Have an account?</span>
                  <Link to={'/signin'} className='text-blue-500'>
                    Sign In
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

export default SignUp