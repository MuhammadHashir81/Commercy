import React from 'react'
import Navbar from './Navbar'
import Main from './Main'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
const Home = () => {
  return (
    
    <div>        
          <Navbar/>
          <Outlet/>
          <Footer/>
    </div>
  )
}

export default Home