import React from 'react'
import { useSelector } from 'react-redux'
import {Button, TextInput} from 'flowbite-react'
function DashProfile() {
    const { currentUser } = useSelector(state => state.user)
    return (
        <div className='max-w-lg mx-auto w-full p-3 '>
            <h1 className='my-12 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col gap-6'>
                {/* We will get the user imgage from the currentuser by the help of the useSelector */}
                <div className='w-32 h-32 self-center cursor-pointer'>
                    
                    <img src={currentUser.profilePicture} alt='user' className='rounded-full w-full h-full object-cover border-8 border-[lightgray]' />
                </div>

                <TextInput type='text' id='user' defaultValue={currentUser.username}  />
                <TextInput type='email' id='email' defaultValue={currentUser.email}/>
                <TextInput type='password' id='password' placeholder='Password' />

                <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                    Update
                </Button>

            </form>
            <div className='flex justify-between mt-5 font-bold '>
                <span className='text-red-500 cursor-pointer'>Delete</span>
                <span className='text-red-500 cursor-pointer'>Sign Out</span>
            </div>
        </div>

    )
}

export default DashProfile