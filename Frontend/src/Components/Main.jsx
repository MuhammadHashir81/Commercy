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


const Main = () => {
    const {  addToCartFunc } = useContext(AddToCartContext)
    const [fashion, setFashion] = useState([])
    const handleAddCart = (id) => {
        console.log(id)
        
   
    }

    useEffect(() => {
        const fetchData = async () => {
            const fetchingData = await fetch('images.json')
            const result = await fetchingData.json()
            setFashion(result)

        }
        fetchData()
    }, [])

    // add to cart 


    const handleAddToCart = (item) => {
        addToCartFunc(item.id,item.title,item.description,item.image,item.price)
    }
    return (
        <div className=' max-w-screen-2xl mx-auto px-10 py-6 '>
            <Commercy />
            <div className='mt-20'>   
                <h1 className='text-5xl font-bold mb-6'>Shop on Commercy </h1>
                <div className='flex flex-wrap items-center bg-gray-100'>
                
                        {
                            fashion.length > 0 && fashion.map((single, index) => (
                                <div className='w-[30%]  m-3 bg-white p-4 '>
                                        <h3 className='text-2xl font-bold font-open my-4 '>{single.title}</h3>
                                    <NavLink to={`$item/${single._id}`}>
                                        <img src={single.image} className=' w-full h-[450px] object-cover  shadow-md' alt="" />
                                    </NavLink>
                                    {/* <div className='mt-2 text-center'> */}
                                        <div className=''>
                                        <NavLink
                                         className=' font-semibold m-10 text-sm text-gray-600 font-open'>{single.description}</NavLink>
                                        </div>
                                        {/* <button onClick={() => handleAddToCart(single)} className='cursor-pointer bg-amber-500 text-black px-5 py-2 rounded-3xl ' >add to cart</button > */}
                                        <div>
                                        {/* <span>  ${single.price}</span> */}
                                        {/* </div> */}
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













