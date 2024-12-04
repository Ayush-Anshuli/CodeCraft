import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
function AdminPrivateRoute() {
    const {currentUser} = useSelector(state => state.user)
  return currentUser.isAdmin ? <Outlet/> : <Navigate to={'/CreatePost'} />
}

export default AdminPrivateRoute

// THIS LOGIC STATES THAT WITHOUT SIGNIN USER CANNOT VISIT THEIR DASHBOARDAdminPrivateRoute