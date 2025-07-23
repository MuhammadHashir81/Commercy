import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShowItemsContext } from './ContextApi/ShowItems.jsx/ShowItems'
import { useParams } from "react-router-dom";
import { AddToCartContext } from './ContextApi/AddToCart/AddToCartProvider';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { Toaster ,toast} from 'react-hot-toast';



const GetSingleItem = () => {
    const {getSingleItem,singleItem,productQuantity,setProductQuantity,totalStock,setTotalStock,decrementInventory} = useContext(ShowItemsContext)
    const {addToCartFunc} = useContext(AddToCartContext)
    const {id} = useParams()
    
    useEffect(()=>{
        getSingleItem(id)

    },[])
    const handleAddToCart = ()=>{
      if (productQuantity <= 0) {
        toast.error('Please select a quantity greater than 0')
        return
        
      }
         const items = {
            productId:singleItem._id,
            description:singleItem.description,
            price:singleItem.price,
            image:singleItem.image,
            quantity:productQuantity
         }
        addToCartFunc(items)
        setProductQuantity(0)


    }

    // handleInrement

    
      const handleInrement = (id)=>{
      setProductQuantity(productQuantity + 1)
      setTotalStock(totalStock - 1)
    }

    const handleTotalStock = ()=>{
      console.log('hashir')
    }

    const handleStockMinus = ()=>{
      console.log('hashir')

    }
    

    // // handleDecrement

      const handleDecrement = ()=>{
     setProductQuantity(productQuantity-1)
      setTotalStock(totalStock + 1)
    }

    
    
    
  return (
    <div className='max-w-screen-2xl mx-auto px-14 py-6' >
          <Toaster/>
        <div className='flex flex-wrap items-center '>
                
                                <div className='w-full  p-4  m-3 flex space-x-5' key={singleItem._id} >
 
                                        <img src={`http://localhost:5000/uploads/${singleItem.image}`} alt="image not uploaded" className=' w-[80%] h-[450px] object-cover  shadow-md' name="image" />  
                                        <div className=' w-full flex flex-col'>
                                        
                                         <h3
                                         className='text-lg font-semibold text-gray-600 font-primary'>${singleItem.price}</h3>
                                         <hr />
                                        <button className='py-4 cursor-pointer mt-4 font-semibold text-xl bg-amber-500' onClick={handleAddToCart}>Add to Cart</button>
                                         <div className='w-28 mt-4 py-3 bg-gray-100 flex justify-between px-3'>
                                          
                                        <button className={`cursor-pointer `} disabled={productQuantity <= 1} onClick={handleDecrement}><span><FaMinus /></span> </button>
                                        <button><span>{productQuantity}</span> </button>
                                        <button className={`cursor-pointer`} disabled={totalStock <= 0} 
                                        onClick={()=>handleInrement(singleItem._id)}><FaPlus /> </button>
                                         </div>
                                        <p className='font-primary mb-4'>total stock{totalStock}</p>
                                        <p
                                         className='text-md font-normal  text-gray-600 font-primary'>{singleItem.description}</p>

                                        </div>
                                        
                                </div>



                </div>
                
        </div>
  )
}

export default GetSingleItem