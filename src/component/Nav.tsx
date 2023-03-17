import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Spinner from './Spinner';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"; // for firebase authentication
import {auth} from '../firebase'

const Nav = () => {
    let location = useLocation();
    let navigate = useNavigate()

    let [isLoading, setIsLoading] = useState(false); // use to determine when the spinner comes out

    let handleLogout = () => {

      setIsLoading(false) // sets spinner display to true

      signOut(auth).then(() => {
        // Sign-out successful.
        localStorage.removeItem('islogin')
        setIsLoading(false)
          navigate("/login", { replace: true });
          setIsLoading(false); // sets spinner display to false
        // setTimeout(() => {
        //   setIsLoading(false)
        //   navigate("/login", { replace: true });
        //   setIsLoading(false); // sets spinner display to false
        // }, 1000);
      }).catch((error) => {
        // An error happened.
        setIsLoading(false)
      });
    }
  
  return (
    <div className='sticky top-0 p-3 bg-gray-700 text-white h-[70px]'>
        <div className='flex justify-between items-center'>
          <span>NavBs</span>
          <div className='flex gap-3 justify-center items-center'>
              <span><Link className={`text-decoration-none fs-5 ${location.pathname == '/' ? 'text-slate-300' : 'text-white'}`} to='/'>Home</Link></span>
              <span><Link className={`text-decoration-none fs-5 ${location.pathname == '/about' ? 'text-slate-300' : 'text-white'}`} to='/about'>About</Link></span>
              <button className='bg-blue-500 hover:bg-blue-600 p-2 rounded' onClick={()=> handleLogout()}>Logout</button>
          </div>
        </div>
    </div>
  )
}

export default Nav