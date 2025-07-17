import React , {useEffect}  from 'react'
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { FaLock } from "react-icons/fa";
import { SellerContext} from '../ContextApi/Seller/SellerProvider';
import { FaUser } from "react-icons/fa";

import { NavLink } from 'react-router-dom'
import { useContext } from 'react';
const SellerAccount = () => {

 const {sellerLoginStatus,sellerLoginPicture,logOutUser} = useContext(SellerContext)

 const handleSellerLogout = ()=>{
  logOutUser()
 }
  
  return (
    <div className='max-w-screen-2xl mx-auto  py-6'>
      {/* navbar start */}
      <nav className='sticky px-14 mt-3'>
        <div className='flex  space-x-8'>

          <NavLink to='/'>
            <h3 className='font-bold font-primary text-4xl text-amber-500'>Commercy </h3>
          </NavLink>
          <ul className=' w-full flex items-center space-x-5'>
            <li className='font-primary font-semibold'><NavLink>Start</NavLink></li>
            <li className='font-primary font-semibold'><NavLink>Grow</NavLink></li>
            <li className='font-primary font-semibold'><NavLink>Services</NavLink></li>
            <li className='font-primary font-semibold'><NavLink>Resources</NavLink></li>
            <li className='font-primary font-semibold'><NavLink>Pricing</NavLink></li>
          </ul>
          <div className='flex space-x-2  h-[40px] '>
            {
              !sellerLoginStatus ? (
                  <>
                <NavLink to="/sellerlogin" className=' font-semibold rounded-4xl bg-gray-100 h-fit  px-7 py-3 flex items-center justify-between shadow-sm'><FaLock className='mr-2' /> Login</NavLink>
                <NavLink className='font-semibold shadow-sm rounded-4xl  bg-amber-500 h-fit px-7 py-3' to="/sellerlogin">Signup</NavLink>
                  </>
              ):(
                <>
                <button className='bg-red-500 rounded-md px-3 text-white cursor-pointer' onClick={handleSellerLogout}>logout</button>
                <FaUser/>
                </>
              )
            }
            {
                 sellerLoginStatus && sellerLoginPicture && (
                    <img src={sellerLoginPicture} alt="sellerloginpircure" className='rounded-full'/>
                  )
                }
          </div>
        </div>

      </nav>
      {/* navbar end */}

      {/* seller div start */}
      <div className='bg-gray-50 mt-[70px] flex justify-between min-h-screen px-10'>
        <div className='flex flex-col space-y-20 w-[50%] mt-[40px]  '>
          <h1 className='text-7xl font-bold  ' >Create a Commercy seller account</h1>
          <div className='flex items-center space-x-10'>

            <NavLink className='h-[70px] font-semibold text-2xl shadow-sm shadow-black rounded-4xl  w-[200px] transition-all duration-150 ease-in hover:shadow-md bg-amber-500  px-7 py-3 flex justify-center items-center'>Sign up</NavLink>
            <p className='text-xl font-semibold'>Get 10% back on your first
              $25,000 in branded sales</p>
          </div>
        </div>
        <div className='w-[50%] my-4'>

          <img src="https://images.unsplash.com/photo-1623120389902-6c846c80f4c8?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="seller image" className='rounded-md w-[500px] h-[450px] object-cover' />


        </div>
      </div>
      {/* seller div end */}



    </div>
  )
}

export default SellerAccount