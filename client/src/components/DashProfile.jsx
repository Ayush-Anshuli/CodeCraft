import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {Button, TextInput} from 'flowbite-react'
import { CiUser } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";


function DashProfile() {
    const { currentUser } = useSelector(state => state.user)
    const [profile, setProfile] = useState(null)
    const [profileURL , setProfileURL] = useState(()=>localStorage.getItem('profileImage' || currentUser.profilePicture))

    const profilePicker = useRef();

    const handleProfileUpdate = (e) => {
        const imageFile = e.target.files[0];

        if(imageFile) {  //CHECKING THAT THE FILES EXISTS OR NOT
            //IF FILES EXISTS THEN WE SET THE PICTURE 
            setProfile(e.target.files[0])
            setProfileURL(URL.createObjectURL(imageFile))  // URL.createObjectURL will create the URL of that image

            const reader = new FileReader()
            reader.onload = () => {
                const baseImage = reader.result;
                setProfile(baseImage)
                setProfileURL(baseImage)
                localStorage.setItem('profileImage',baseImage)
            }
            reader.readAsDataURL(imageFile)
        }

    }
    return (
        <div className='max-w-lg mx-auto w-full p-3 '>
            <h1 className='my-12 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col gap-6'>
                {/* We will get the user imgage from the currentuser by the help of the useSelector */}
                
                <input type='file' accept='image/*' onChange={handleProfileUpdate} ref={profilePicker} className='hidden'/>
                    <div className='w-32 h-32 self-center cursor-pointer'>
                        <img src={ profileURL ||  currentUser.profilePicture} alt='user' className='rounded-full w-full h-full object-cover border-8 border-[lightgray]' onClick={() => profilePicker.current.click()} />
                        {/* we are using useRef() hook by using it we can change the profile  */}
                    </div>

                <TextInput type='text' id='user' icon={CiUser} defaultValue={currentUser.username}  />
                <TextInput type='email' id='email' icon={MdOutlineMailOutline} defaultValue={currentUser.email}/>
                <TextInput type='password' id='password' icon={RiLockPasswordLine} placeholder='Password' />

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