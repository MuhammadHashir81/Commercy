import React, { useContext, useState } from 'react'
import { FaUser } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { IoCartSharp } from "react-icons/io5";
import { AddToCartContext } from './ContextApi/AddToCart/AddToCartProvider';
import { FiShoppingCart } from "react-icons/fi";
import { AuthenticationContext } from './ContextApi/AuthenticationProvider';
import { Toaster } from 'react-hot-toast';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Login from './Login';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { cartItems } = useContext(AddToCartContext)
  const { loginPicture, logOutUser, isLoginUser } = useContext(AuthenticationContext)
  const [countSelectedItems, setCountSelectedItems] = useState(cartItems.length)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


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


  return (

    <div className='max-w-screen-2xl mx-auto px-14 py-6' >

      {/* modal start */}

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Login/>
          </Box>
        </Modal>
      </div>

      {/* modal end */}

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
        <div className='flex space-x-3 '>
          
          <NavLink className={({ isActive }) =>
            '`${isActive ? "" : "text-black"} font-primary ` text-amber-500 shadow-2xl font-semibold'} to='/sellerpage '>Become a Seller</NavLink>
          <button type="button" onClick={handleLogOut} className={` bg-red-500 px-2 py-1 rounded-md text-white cursor-pointer ${isLoginUser ? "block" : "hidden"} `}
          >logout</button>
          <NavLink to='/cart' className='flex bg px-2   rounded-2xl ' >
            <span>{cartItems.length}</span>
            <FiShoppingCart size={25} />
          </NavLink>
          {loginPicture === null ?
            <NavLink to='/login'>

              <FaUser size={20} />

            </NavLink>
            :
            <img
              srcSet={loginPicture}
              alt="picture" className="w-8 h-8 rounded-full"
            />





          }
        </div>

      </div>
    </div>
  )
}

export default Navbar






