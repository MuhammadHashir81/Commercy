import React from 'react'
import { useContext } from 'react'
import { AddToCartContext } from './ContextApi/AddToCart/AddToCartProvider'

const AddToCart = () => {
  const { selectedItems,cartItems,deletingSingleCartItem } = useContext(AddToCartContext)
  console.log(cartItems)


  const handleDelete = (id)=>{
        deletingSingleCartItem(id)
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0)
  return (
    <div>
    
      <div className=' max-w-screen-2xl mx-auto px-32 py-10 '>
         
        <h1 className='text-5xl  font-bold'>Cart Items</h1>
        <div className='bg-gray-100 mt-20 flex flex-wrap  ' >
          
          {
            cartItems.map((single) => (
              <div key={single.productId} >
                <div className=' w-[300px] p-9   m-2 '>
                  <img src={single.image} alt="image here" className='rounded-sm ' />
                  <div className='mt-2 text-center '>
                    <h3 className='text-lg font-bold font-primary'>{single.title}</h3>
                    <p className='text-sm text-gray-600 font-open'>{single.description}</p>
                    <button className='bg-black px-2 rounded-sm m-3 py-2 cursor-pointer text-white font-open' onClick={()=>handleDelete(single.productId)}>delete item</button>
                  </div>
                </div>

              </div>

            ))
          }
        </div>
        <div className='m-4'>
          <h4 className='font-medium'>subtotal</h4>
        <p>${totalPrice}</p>
        </div>
      </div>
    </div>

  )
}

export default AddToCart