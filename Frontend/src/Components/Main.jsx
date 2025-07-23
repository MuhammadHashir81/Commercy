import React, { useEffect, useState, useRef } from 'react'
import Commercy from './Commercy'
import { Swiper, SwiperSlide } from 'swiper/react';
import Swal from 'sweetalert2'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { FaArrowRight } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AddToCartContext } from './ContextApi/AddToCart/AddToCartProvider';
import { ShowItemsContext } from './ContextApi/ShowItems.jsx/ShowItems';


const Main = () => {
    const {  addToCartFunc } = useContext(AddToCartContext)
    const [fashion,setFashion] = useState([])
    console.log(fashion)
    const handleAddCart = (id) => {
        console.log(id)
        
   
    }
useEffect(() => {
  const fetchData = async () => {
    const response = await fetch('images.json'); // fetch the file
    const data = await response.json();         // extract JSON
    setFashion(data);                           // set the data
  };

  fetchData();
}, []);

    

    

    // add to cart 


    const handleAddToCart = (item) => {
        addToCartFunc(item.id,item.title,item.description,item.image,item.price)
    }
    return (
        <div className=' max-w-screen-2xl mx-auto px-10 py-6 '>
            <Commercy />
            <div className='mt-20'>   
                <div className='flex mb-4 justify-between items-center'>
                <h1 className='text-5xl font-bold mb-6'>Shop on Commercy </h1>
                <div className='flex items-center space-x-2'>
                 <NavLink to="/selecteditems" className='flex items-center space-x-2 bg-amber-500 px-10 py-2 cursor-pointer  mt-3 text-lg font-semibold)' ><p className='font-open'>Selected Items</p> <FaArrowRight  /></NavLink>   
                <NavLink to="/allitems" className='bg-amber-500 px-10 py-2 cursor-pointer  mt-3 text-lg  )' ><p className='font-open'>Explore Commercy</p> </NavLink>
                </div>
                </div>
                <div className='flex flex-wrap items-center bg-gray-100'>
                
                        {
                            fashion.length > 0 && fashion.map((single, index) => (
                                <div className='w-[30%]  m-3 bg-white p-4 transition-all hover:scale-105 duration-200 ease-snappy' key={single.id} >
                                        <h3 className='text-2xl font-bold font-open my-4 '>{single.title}</h3>
                                        <div>

                                    <NavLink to={`/${single.category}`}>
                                        <img src={single.image} className=' w-full h-[450px] object-cover  shadow-lg  ' alt="" />
                                        <div className=''>
                                        <p
                                         className='hover:text-blue-500 font-semibold my-2 text-sm text-gray-600 font-open'>{single.description}</p>
                                         </div>
                                         </NavLink>
                                        </div>
                                        <div>
                                    </div>
                                </div>


                            ))
                        }

                </div>

            </div>

        </div>
    )
}

export default Main













