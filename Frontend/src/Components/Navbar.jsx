import React, { useContext,useState } from 'react'
import { FaUser } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { IoCartSharp } from "react-icons/io5";
import { AddToCartContext } from './ContextApi/AddToCart/AddToCartProvider';
import { FiShoppingCart } from "react-icons/fi";


const Navbar = () => {
  const {selectedItems,cartItems} = useContext(AddToCartContext)
  const [countSelectedItems,setCountSelectedItems] = useState(cartItems.length)
  return (
    <div className='max-w-screen-2xl mx-auto px-32 py-6' >

      <div className='flex justify-around  items-center'>
        <div className='logo '>
          <NavLink to='/'>
          <img src="./logo.jpg" alt="logo" className='rounded-3xl' width={100} />
          </NavLink>
        </div>
        <form >
          <label htmlFor="" value>
            <input type="text" placeholder='search your favourite' className='outline-2 outline-black  rounded-full px-4 py-2 w-[500px]' />
          </label>
        </form>
        <ul className='flex justify-around space-x-3'>
          <NavLink className={({ isActive }) =>
            `${isActive ? "border-b-2" : "text-black"} font-primary`} to='/moreliked'>More liked</NavLink>
          <NavLink className={({ isActive }) =>
            `${isActive ? "border-b-2" : "text-black"} font-primary`} to='/topsearches'>Top searches</NavLink>
        </ul>
        <div className='flex space-x-3 '>
         <NavLink to='/cart' className='flex bg px-2   rounded-2xl ' >
      <span>{cartItems.length}</span>
        <FiShoppingCart size={25}/>
         </NavLink>
        <NavLink to='/login'>
        <FaUser size={20}/>
        </NavLink>
        </div>

      </div>
    </div>
  )
}

export default Navbar






