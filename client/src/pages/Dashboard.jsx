import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSideBar from '../components/DashSideBar';
import DashProfile from '../components/DashProfile';

function Dashboard() {
  const location = useLocation();
  const [tab,setTab] = useState('')

  useEffect(() => {
    const URLparams = new URLSearchParams(location.search) // // URL searchParams comes from the javascript constructor
    const tabFromUrl = URLparams.get('tab')
    // console.log(tabFromUrl)
    if(tabFromUrl) {
      setTab(tabFromUrl)
    }
  },[location.search])

  return (
  
        <div className='min-h-screen flex flex-col md:flex-row'>
          <div className=''>
            {/* Sidebar */}
              <DashSideBar/>
          </div>
          {/* Profile if the tab is equal to the profile then we wiill show the dashprofile */}
          {tab === 'profile' && <DashProfile/>}
        </div>

   
  )
}

export default Dashboard