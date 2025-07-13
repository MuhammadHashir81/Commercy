import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import AuthenticationProvider from './Components/ContextApi/AuthenticationProvider.jsx';
import AddToCartProvider from './Components/ContextApi/AddToCart/AddToCartProvider.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AddToCartProvider>
    <AuthenticationProvider>
    <App />
    </AuthenticationProvider>
    </AddToCartProvider>
    </BrowserRouter>
  </StrictMode>,
)
