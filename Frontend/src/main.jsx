import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import AuthenticationProvider from './Components/ContextApi/AuthenticationProvider.jsx';
import AddToCartProvider from './Components/ContextApi/AddToCart/AddToCartProvider.jsx';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import SellerProvider from './Components/ContextApi/Seller/SellerProvider.jsx';
import ShowItemsProvider from './Components/ContextApi/ShowItems.jsx/ShowItems.jsx';
import { StripePostPaymentProvider } from './Components/ContextApi/StripePostPaymentProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='489577581420-2oucd5ndaojgt4oquei56qf3a6maspqp.apps.googleusercontent.com'>
      <ShowItemsProvider>
        <StripePostPaymentProvider>


    <BrowserRouter>
    <AddToCartProvider>
    <AuthenticationProvider>  
      <SellerProvider>
    <App />
      </SellerProvider>
    </AuthenticationProvider>
    </AddToCartProvider>
    </BrowserRouter>
        </StripePostPaymentProvider>

      </ShowItemsProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
// client id
    // 489577581420-2oucd5ndaojgt4oquei56qf3a6maspqp.apps.googleusercontent.com
    // client secret 
    // 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
