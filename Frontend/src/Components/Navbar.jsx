import React, { useContext, useState } from 'react'
import { FaUser } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { IoCartSharp } from "react-icons/io5";
import { AddToCartContext } from './ContextApi/AddToCart/AddToCartProvider';
import { FiShoppingCart } from "react-icons/fi";
import { AuthenticationContext } from './ContextApi/AuthenticationProvider';
import { Toaster } from 'react-hot-toast';
import { MdLogout } from "react-icons/md";


const Navbar = () => {
  const [isDropDown, setIsDropDown] = useState(false)
  const { cartItems } = useContext(AddToCartContext)
  const { loginPicture, logOutUser, isLoginUser } = useContext(AuthenticationContext)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
  };


  console.log(loginPicture);


  const handleLogOut = () => {
    logOutUser()

  }

  // handle logout drop down 

  const handleDropDown = () => {
    setIsDropDown(!isDropDown)
  }


  return (

    <div className='max-w-screen-2xl mx-auto px-14 py-6' >



      <Toaster />
      <div className='flex justify-between  items-center'>


        <div className='logo '>
          <NavLink to='/'>
            <h3 className='font-bold font-primary text-4xl text-amber-500'>Commercy </h3>
          </NavLink>
        </div>
        <form >
          <label htmlFor="" value>
            <input type="text" placeholder='search your favourite' className='outline-none bg-gray-100  rounded-full px-4  w-[700px] py-3' />
          </label>
        </form>
        <div className=''>
          <div className=' flex space-x-3  h-fit'>



            <NavLink className={({ isActive }) =>
              `${isActive ? "underline" : ""} font-primary  text-amber-500  font-semibold`} to='/sellerpage'  >Become a Seller</NavLink>
            <NavLink to='/cart' className='flex bg px-2   rounded-2xl ' >
              <span>{cartItems.length}</span>
              <FiShoppingCart size={25} />
            </NavLink>

            {!isLoginUser? (

              <NavLink to='/login'>
                <button className='bg-amber-500 w-[100px] h-[40px] rounded-md cursor-pointer'>login</button>

              </NavLink>
            )
              : (
                // <div className='relative' onClick={handleDropDown}>



                //   <img
                //     srcSet={loginPicture}
                //     alt="picture" className={`transition-all duration-1000 animate-fade-in w-8 h-8 rounded-full cursor-pointer `}

                //   />


                //   <div className={`z-50 mt-2 absolute w-20  px-3 py-2  ${isDropDown ? "block" : "hidden"} bg-amber-500 rounded-sm`}>
                //     <button onClick={handleLogOut} className='  flex items-center cursor-pointer space-x-14 '>  <MdLogout />
                //       logout</button>
                //   </div>

                // </div> 
                

                <button className='bg-amber-500 w-[100px] h-[40px] rounded-md cursor-pointer' onClick={handleLogOut}>logout</button>


              )


            }


          </div>
        </div>

      </div>


    </div>
  )
}

export default Navbar







