import React from 'react';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router";
import Home from './Components/Home';
import Main from './Components/Main';
import MoreLiked from './Components/MoreLiked';
import TopSearches from './Components/TopSearches';
import Login from './Components/Login';
import Signup from './Components/Signup';
import AddToCart from './Components/AddToCart';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}>
        <Route index element={<Main/>}/>
        <Route path='/moreliked' element={<MoreLiked/>}/>
        <Route path='/topsearches' element={<TopSearches/>}/>
        <Route path='/cart' element={<AddToCart/>}></Route>
        </Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </div>
  )
}

export default App
