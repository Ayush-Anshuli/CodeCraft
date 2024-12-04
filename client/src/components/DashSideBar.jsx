import React, { useEffect, useState } from 'react'
import {Sidebar} from 'flowbite-react'
import { FaArrowRight,FaUser  } from "react-icons/fa";
import {Link, useLocation} from 'react-router-dom'
import { signoutsuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

function DashSideBar() {
   const location = useLocation()
   const [tab,setTab] = useState('')
   const dispatch = useDispatch()

   useEffect(() => {
         const URLparams = new URLSearchParams(location.search) //URLsearchParams is a javascript comes from the javascript concept
         const tabFromUrl = URLparams.get('tab')
         if(tabFromUrl) {
            setTab(tabFromUrl)
         }
   } , [location.search])

   const handleSignout = async () => {
      try {
          const res = await fetch('/api/user/signout',{
              method:'POST'
          })

          const data = await res.json()
          if( !res.ok ) {
              console.log(data.message)
          }else {
              dispatch(signoutsuccess())
          }
      } catch (error) {
          
      }
  }

  return (
   <>
         <Sidebar className='w-full md:w-56'>
               <Sidebar.Items>
                     <Sidebar.ItemGroup >
                        <Link to={'/dashboard?tab=profile'}>
                           <Sidebar.Item active={tab === 'profile'} className='cursor-pointer' label={'user'} labelColor='dark' icon={FaUser }>
                              Profile
                           </Sidebar.Item>
                        </Link>
                        <Sidebar.Item icon={FaArrowRight} className='cursor-pointer' onClick={handleSignout}>
                           Sign out
                        </Sidebar.Item>
                     </Sidebar.ItemGroup>
               </Sidebar.Items>
         </Sidebar>
   </>
  )
}

export default DashSideBar