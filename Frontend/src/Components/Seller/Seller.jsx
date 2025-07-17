import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import {NavLink} from 'react-router-dom'
const Seller = () => {
 
    const sellerClick = ()=>{

    }
  return (
    <div className='min-w-full h-screen'>
        
        <div 
        className='relative w-full h-full bg-cover bg-center  '
        style={{backgroundImage:"url('https://images.unsplash.com/photo-1643906226799-59eab234e41d?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>

            <div className='absolute inset-0 bg-black opacity-40'></div>
        
        <div className='absolute flex justify-center items-center inset-0 text-white  z-20'>
            <div className='flex flex-col space-y-8'>
            <h1 className='text-4xl'>Start selling on Commercy</h1>
            <NavLink  className='bg-black text-white py-4 transition-all duration-300  ease-in hover:rounded-4xl cursor-pointer text-center' onClick={sellerClick} to='/selleraccount'>Start Selling</NavLink>
            </div>
        </div>
        </div>

    </div>

  )
}

export default Seller





