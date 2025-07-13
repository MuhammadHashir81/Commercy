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
        <div className=' max-w-screen-2xl mx-auto px-32 py-6'>
            <Commercy />
            <div>
                <div className='flex space-x-6'>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {
                            fashion.length > 0 && fashion.map((single, index) => (
                                <SwiperSlide key={single._id} className='mb-10'>
                                    <NavLink to={`$item/${single._id}`}>
                                        <img src={single.image} className='w-full h-[400px] object-cover rounded-xl' alt="" />
                                    </NavLink>
                                    <div className='mt-2 text-center'>
                                        <h3 className='text-lg font-bold font-primary'>{single.title}</h3>
                                        <p className='m-4 text-sm text-gray-600 font-open'>{single.description}</p>
                                        <button onClick={() => handleAddToCart(single)} className='cursor-pointer bg-amber-500 text-black px-5 py-2 rounded-3xl ' >add to cart</button >
                                        <div>
                                        <span>${single.price}</span>
                                        </div>
                                    </div>
                                </SwiperSlide>


                            ))
                        }
                    </Swiper>

                </div>

            </div>
            <div className='mt-12 flex justify-center items-center'>

                <NavLink className='flex items-center justify-between bg-gradient-to-r from-black from-35% to-blue-800 text-white font-open w-[250px] h-[40px] px-10 py-8 rounded-xl '> Explore Commercy <FaArrowRight to='/shop' /> </NavLink>

            </div>
        </div>
    )
}

export default Main













