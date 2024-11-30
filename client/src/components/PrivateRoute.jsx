import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
function PrivateRoute() {
    const {currentUser} = useSelector(state => state.user)
  return currentUser ? <Outlet/> : <Navigate to={'/signin'} />
}

export default PrivateRoute

// THIS LOGIC STATES THAT WITHOUT SIGNIN USER CANNOT VISIT THEIR DASHBOARD