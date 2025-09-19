import React from 'react'
import { useContext } from 'react'
import { AddToCartContext } from './ContextApi/AddToCart/AddToCartProvider'
import { NavLink } from 'react-router-dom'
import { AuthenticationContext } from './ContextApi/AuthenticationProvider'
import { ShowItemsContext } from './ContextApi/ShowItems.jsx/ShowItems'

const AddToCart = () => {
  
  const { cartItems,deletingSingleCartItem   } = useContext(AddToCartContext)
  const {decrementInventory,singleItem} = useContext(ShowItemsContext)
  const {isLoginUser} = useContext(AuthenticationContext)
  console.log(isLoginUser)
  console.log(cartItems)

  // Stripe Payment Function 
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  console.log(totalPrice)

  const handlePayment = async () => {
    const response = await fetch("http://localhost:5000/payment/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      items:cartItems
        
      }),
      credentials: "include"
    });
    const data = await response.json();
     console.log(response)
     if (data.url) {
      window.location.href = data.url; 
      decrementInventory(singleItem._id)
    }
  };

  // Stripe Payment Function

const handleDelete = (id)=>{
        deletingSingleCartItem(id)
  }

  return (
    <div>
    
      <div className='max-w-screen-2xl mx-auto px-32 py-10 min-h-screen'>
         
         {
          isLoginUser ? (

            <h1 className='text-5xl  font-bold'>Cart Items</h1>
          ):(
            <div className='bg-black p-10 rounded-md'>
              <h1 className='text-white text-3xl font-bold my-8'>Login to see your cart</h1>
              <NavLink className='font-semibold shadow-sm rounded-4xl  bg-amber-500 h-fit px-7 py-3 ' to='/signup' >Signup</NavLink>
            </div>
          )
         }
        <div className='bg-gray-50 mt-20 flex flex-wrap  ' >
          
          {
            cartItems.map((single) => (
              <div key={single.productId} >
                <div className=' w-[300px] p-9   m-2 '>
                  <img src={`http://localhost:5000/uploads/${single.image}`} alt="image here" className='rounded-sm h-[300px] object-cover' />
                  <div className='mt-2 text-center '>
                    <h3 className='text-lg font-bold font-primary'>{single.title}</h3>
                    <h3 className='text-lg font-semibold text-gray-600 font-primary'>${single.price}</h3>
                    <button className='bg-black px-2 rounded-sm m-3 py-2 cursor-pointer text-white font-open' onClick={()=>handleDelete(single.productId)}>delete item</button>
                  </div>
                </div>
              </div>

            ))
          }
        </div>
        <div className='m-4 flex justify-between'>
          <div>
          <h4 className='font-medium'>subtotal</h4>
        <p>${totalPrice}</p>
          </div>
         <button  disabled={!isLoginUser}  className={`${!isLoginUser ? 'bg-gray-300' : 'bg-blue-500'} flex items-center px-5 text-md font-semibold cursor-pointer  `} onClick={()=>handlePayment()}  >checkout</button>
        </div>
      </div>
    </div>

  )
}

export default AddToCart









