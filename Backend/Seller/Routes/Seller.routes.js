import express from 'express'
import { Router } from 'express'
import { sellerGoogleLogin,sellerLogOut,sellerLogin,sellerSignup,sellerValidationRules, } from '../Controllers/SellerAuth.controller.js'
import { verifySellerToken } from '../Middleware/Seller.Midldware.js'
import { sellerUpload } from '../Controllers/SellerProduct.controller.js'
import multer from 'multer'
const upload = multer({ dest: 'uploads/' })


export const sellerRouter = Router()

sellerRouter.post('/seller-signup',sellerValidationRules, sellerSignup)
sellerRouter.post('/seller-google-login',sellerGoogleLogin)
sellerRouter.post('/seller-login', sellerLogin)
sellerRouter.get('/seller-logout', verifySellerToken, sellerLogOut)
sellerRouter.post('/upload-product',verifySellerToken, upload.single("image"), sellerUpload)