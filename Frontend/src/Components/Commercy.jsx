import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import { NavLink } from "react-router-dom";
const Commercy = () => {


  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };


  return (
    <div className='mb-10 slider-container  ' >
      <Slider {...settings} className="">
        <div className="" >
          <NavLink to='/men'>

          
      <div style={{ backgroundImage: "url('https://images.unsplash.com/photo-1744135995122-ac93a80e4f74?q=80&w=386&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }} className='bg-gradient-to-r from-black  to-sky-900 p-24 text-center rounded-2xl shadow-sm  h-[300px]  bg-contain  mx-3 '>
        <h1 className='text-4xl font-bold text-white font-primary flex items-center justify-center'>Try Men's Latest Fashion</h1>

      </div>
          </NavLink>
        </div>



        <div className="relative">
          <NavLink to="/kitchen">

      <div style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", }} className='bg-gradient-to-r from-black  to-sky-900 p-24 text-center rounded-2xl shadow-sm mx-3   h-[300px]   bg-contain '>
        <h1 className='text-4xl font-bold text-white font-primary '>kitchen essentials</h1>

      </div>
          </NavLink>
        </div>




        <div className="">
          <NavLink to="/watches">

      <div style={{ backgroundImage: "url('https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", }} className='bg-gradient-to-r from-black  to-sky-900 p-24 text-center rounded-2xl shadow-sm  mx-3  h-[300px]   bg-contain'>
        <h1 className='text-4xl font-bold text-white font-primary '>watches </h1>

      </div>
          </NavLink>
      
        </div>



        <div>

          <NavLink to="/furniture">
          <div style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", }} className='bg-gradient-to-r from-black  to-sky-900 p-24 text-center rounded-2xl shadow-sm  mx-3  h-[300px]   bg-contain'>
        <h1 className='text-4xl font-bold text-white font-primary '>furniture</h1>

      </div>


          </NavLink>

        </div>


        <div>
          <NavLink to="/books">
          

          
          <div style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", }} className='bg-gradient-to-r from-black  to-sky-900 p-24 text-center rounded-2xl shadow-sm  mx-3  h-[300px]   bg-contain'>
        <h1 className='text-4xl font-bold text-white font-primary '>books</h1>

      </div>

      </NavLink>
          
        </div>


        <div>
          <NavLink to="/perfumes">
          <div style={{ backgroundImage: "url('https://images.unsplash.com/photo-1718466044521-d38654f3ba0a?q=80&w=773&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)", }} className='bg-gradient-to-r from-black  to-sky-900 p-24 text-center rounded-2xl shadow-sm  mx-3  h-[300px]    bg-contain'>
        <h1 className='text-4xl font-bold text-white font-primary '>perfumes</h1>

      </div>
      </NavLink>
        </div>
      </Slider>
    </div>
  )
}

export default Commercy









