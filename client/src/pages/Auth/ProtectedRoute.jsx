import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './AuthContext'

function ProtectedRoute({children}) {
    const {loggedIn} = useContext(AuthContext)

  return (
    <>
        {loggedIn ? children : <Navigate to={'/signup'}/> }
    </>
  )
}

export default ProtectedRoute