import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Alert, Button, TextInput} from 'flowbite-react'
import { CiUser } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import {updateFailure, updateStart, updateSuccess} from '../redux/user/userSlice'

function DashProfile() {
    const { currentUser } = useSelector(state => state.user)
    const [profile, setProfile] = useState(null)
    const [profileURL , setProfileURL] = useState(()=>localStorage.getItem('profileImage' || currentUser.profilePicture))
    const [formData , setFormData] = useState({});
    const [updateUserSuccess,setupdateUserSuccess] = useState(null)
    const [noUpdatedProfile,setNoUpdatedProfile] = useState(null)
    const dispatch = useDispatch()

    const profilePicker = useRef();

    const handleProfileUpdate = (e) => {
        const imageFile = e.target.files[0];
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = () => {
                const baseImage = reader.result; // Base64 encoded image
                setProfile(baseImage); // Update local state
                setProfileURL(baseImage); // Update profile preview
                localStorage.setItem('profileImage', baseImage); // Save to localStorage
            };
            reader.readAsDataURL(imageFile);
        }
    };

    const handleChange = (e) => {

        // setFormData -> This is used to update the state variable formData.
        //...formData -> The spread operator (...) is used to copy the existing properties of the formData object into a new object.
        // [e.target.id] ->  Refers to the id attribute of the HTML input element that triggered the onChange event. It identifies which field to update.
        // e.target.value -> Represents the current value of the input field.

        // {...formData, [e.target.id]: e.target.value} ->>   This creates a new object by combining the current formData properties
        //                                                    with the updated key-value pair. If the key (e.target.id) already exists, 
        //                                                    its value is replaced with e.target.value.
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }
    console.log(formData)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setupdateUserSuccess(null)  //when we are requesting then it should be null
        setNoUpdatedProfile(null)
        if(Object.keys(formData).length === 0) {
            setNoUpdatedProfile('No Changes Made')
            return;
            
        }

        try {
            dispatch(updateStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(formData)
            })
            const data = await res.json()

            if(!res.ok) {
                dispatch(updateFailure(data.message));
                setNoUpdatedProfile(data.message)
            }
            else {
                dispatch(updateSuccess(data))
                setupdateUserSuccess('User Updated Successfully')
            }
        } catch (error) {
            dispatch(updateFailure(error.message))
            setNoUpdatedProfile(error.message)
        }
    }
    
    



    return (
        <div className='max-w-lg mx-auto w-full p-3 '>
            <h1 className='my-12 text-center font-semibold text-3xl'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6' >
                {/* We will get the user imgage from the currentuser by the help of the useSelector */}
                
                <input type='file' accept='image/*' onChange={handleProfileUpdate} ref={profilePicker} className='hidden'/>
                    <div className='w-32 h-32 self-center cursor-pointer'>
                        <img src={ profileURL ||  currentUser.profilePicture} alt='user' className='rounded-full w-full h-full object-cover border-8 border-[lightgray]' onClick={() => profilePicker.current.click()} />
                        {/* we are using useRef() hook by using it we can change the profile  */}
                    </div>

                <TextInput type='text' id='user' icon={CiUser} defaultValue={ currentUser.username}  onChange={handleChange}/>
                <TextInput type='email' id='email' icon={MdOutlineMailOutline}  defaultValue={currentUser.email} onChange={handleChange}/>
                <TextInput type='password' id='password' icon={RiLockPasswordLine} placeholder='Password'   defaultValue={formData.password} onChange={handleChange}/>

                <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                    Update
                </Button>

            </form>
            <div className='flex justify-between mt-5 font-bold '>
                <span className='text-red-500 cursor-pointer'>Delete</span>
                <span className='text-red-500 cursor-pointer'>Sign Out</span>
            </div>
                    {updateUserSuccess && (
                        <Alert color='success' className='mt-5'>{updateUserSuccess}</Alert>
                    )}    

                    {
                        noUpdatedProfile && (
                            <Alert color='failure' className='mt-5' >{noUpdatedProfile}</Alert>
                        )
                    }
            </div>

    )
}

export default DashProfile