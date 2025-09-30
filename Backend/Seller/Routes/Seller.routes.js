import express from 'express'
import { Router } from 'express'
import { sellerGoogleLogin,sellerLogOut,sellerLogin,sellerSignup,sellerValidationRules, } from '../Controllers/SellerAuth.controller.js'
import { verifySellerToken } from '../Middleware/Seller.Midldware.js'
import { deleteSellerItem, fetchUserSpecificItems, sellerUpload, updateSellerItem } from '../Controllers/SellerProduct.controller.js'
import { sellerProductValidationRules } from '../Controllers/SellerProduct.controller.js'
import { getAllSellerItems } from '../../Controllers/seller.controller.js'
import multer from 'multer'


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()+file.originalname
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })



export const sellerRouter = Router()

sellerRouter.post('/seller-signup',sellerValidationRules, sellerSignup)
sellerRouter.post('/seller-google-login',sellerGoogleLogin)
sellerRouter.post('/seller-login', sellerLogin)
sellerRouter.get('/seller-logout', verifySellerToken, sellerLogOut)
sellerRouter.post('/upload-product',verifySellerToken,  upload.single("image"),sellerProductValidationRules, sellerUpload)

// fetching user specific items

sellerRouter.get('/allitems',verifySellerToken, fetchUserSpecificItems)

//delete item 
sellerRouter.delete('/delete-item/:id',verifySellerToken,deleteSellerItem)


// update item in seller product

sellerRouter.put('/update-item/:id',verifySellerToken,upload.single("image"),updateSellerItem)



// get seller specific items


sellerRouter.get('/get-items',verifySellerToken,getAllSellerItems)