import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth }  from "../context/AuthContext"
import { useNavigate } from 'react-router-dom';



const Logout = () => {

    const {logout} = useAuth()
    const navigate = useNavigate();


  useEffect(()=>{
    logout(navigate)
  },[logout])  

  return (
     <Navigate to='/login'/>
  )
}

export default Logout