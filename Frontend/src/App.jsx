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
import Store from './Components/Seller/Store/Store';
import MainDiv from './Components/Seller/MainDiv';
import AllItems from './Components/Alltems';
import Kitchen from './Components/AllCategories/Kitchen';
import MenFashion from './Components/AllCategories/MenFashion';
import Watches from './Components/AllCategories/Watches';
import Furniture from './Components/AllCategories/Furniture';
import Books from './Components/AllCategories/Books';
import Perfumes from './Components/AllCategories/Perfumes';
import GetSingleItem from './Components/GetSingleItem';
import Gateway from './Components/Gateway/StripePayment';
import { useContext } from 'react';
import { SellerContext } from './Components/ContextApi/Seller/SellerProvider';
import { Navigate } from 'react-router'; 
import SelectedItems from './Components/SelectedItems';
function App() {

  const { sellerLoginStatus } = useContext(SellerContext)

  const ProtectedRoute = ({children}) => {
    const isAuthenticated =  localStorage.getItem('sellerLoginStatus')
    if (!isAuthenticated) {
      return <Navigate to="/sellerlogin" replace />
    }
    return children
    }
  return (
    <div>
      <div>

      </div>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route index element={<Main />} />
          <Route path='/sellerpage' element={<Seller />} />
          <Route path='/cart' element=
          {<AddToCart />}
>
          </Route>
          <Route path='/allitems' element={<AllItems />} />
          <Route path='/men' element={<MenFashion/>} />
          <Route path='/kitchen' element={<Kitchen/>} />
          <Route path='/furniture' element={<Furniture/>} />
          <Route path='/books' element={<Books/>} />
          <Route path='/perfumes' element={<Perfumes/>} />
          <Route path='/watches' element={<Watches/>} />
          <Route path='/single/:id' element={<GetSingleItem/>} />
          <Route path='/selecteditems' element={<SelectedItems/>} />
        </Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>

        {/* start of seller routes */}

        <Route path='/sellerlogin' element={<SellerLogin />}></Route>
        <Route path='/sellersignup' element={<SellerSignup />}></Route>
        <Route path='selleraccount/startselling' element={<StartSelling />}></Route>

        <Route path='/selleraccount' element={<SellerAccount />}>
          <Route index element={<MainDiv />} />
          <Route path='store' element={
            <ProtectedRoute>  
            <Store />
            </ProtectedRoute>
            } />
        </Route>

        {/* end of seller routes */}

        <Route path='/payment' element={<Gateway/>}></Route>


      </Routes>
    </div>
  )
}

export default App
