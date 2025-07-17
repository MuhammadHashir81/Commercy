import React from 'react';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router";
import Home from './Components/Home';
import Main from './Components/Main';
import TopSearches from './Components/TopSearches';
import Login from './Components/Login';
import Signup from './Components/Signup';
import AddToCart from './Components/AddToCart';
import { GoogleLogin } from '@react-oauth/google';
import Seller from './Components/Seller/Seller';
import SellerAccount from './Components/Seller/SellerAccount';
import SellerLogin from './Components/Seller/SellerLogin'
import SellerSignup from './Components/Seller/SellerSignup';
import StartSelling from './Components/Seller/StartSelling';
function App() {
  return (
    <div>
      <div>
   
      </div>
      <Routes>
        <Route path='/' element={<Home/>}>
        <Route index element={<Main/>}/>
        <Route path='/sellerpage' element={<Seller/> }/>
        <Route path='/topsearches' element={<TopSearches/>}/>
        <Route path='/cart' element={<AddToCart/>}></Route>
        </Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/selleraccount' element={<SellerAccount/>}></Route>
        <Route path='/sellerlogin' element={<SellerLogin/>}></Route>
        <Route path='/sellersignup' element={<SellerSignup/>}></Route>
        <Route path='/startselling' element={<StartSelling/>}></Route>
      </Routes>
    </div>
  )
}

export default App
