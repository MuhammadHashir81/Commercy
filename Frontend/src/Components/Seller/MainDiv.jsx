import React from 'react'
import { Toaster } from 'react-hot-toast'
import { NavLink } from 'react-router-dom'
const MainDiv = () => {
  return (
    <div>
        {/* seller div start */}
      <div className='bg-gray-50 mt-[70px] flex justify-between min-h-screen px-10'>
        <Toaster/>
        <div className='flex flex-col space-y-20 w-[50%] mt-[40px]  '>
          <h1 className='text-7xl font-bold  ' >Create a Commercy seller account</h1>
          <div className='flex items-center space-x-10'>

            <NavLink to="/sellerlogin" className='h-[70px] font-semibold text-2xl shadow-sm shadow-black rounded-4xl  w-[200px] transition-all duration-150 ease-in hover:shadow-md bg-amber-500  px-7 py-3 flex justify-center items-center'>Sign up</NavLink>
            <p className='text-xl font-semibold'>Get 10% back on your first
              $25,000 in branded sales</p>
          </div>
        </div>
        <div className='w-[50%] my-4'>

          <img src="https://media.istockphoto.com/id/1347494044/photo/smiling-young-asian-man-checking-electronic-banking-on-his-smartphone-as-he-received.webp?a=1&b=1&s=612x612&w=0&k=20&c=F4MBowFRoj4wWcMU1j2TvPCQWNcWA8FksRG4I1pt8ho=" alt="seller image" className='rounded-md w-[500px] h-[450px] object-cover' />


        </div>
      </div>
      {/* seller div end */}
    </div>

  )
}

export default MainDiv