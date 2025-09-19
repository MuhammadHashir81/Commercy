import { Router } from "express";
import { addCart, deleteSingleCartItem, fetchAllCartItems } from "../Controllers/cart.controller.js";
import { verifyToken } from "../Middleware/verifyToken.js";
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


export const cartRouter = Router()


cartRouter.post('/add-cart', verifyToken , addCart)
cartRouter.delete('/delete-cart/:id',verifyToken,deleteSingleCartItem)
cartRouter.get('/get-cart-items',verifyToken,fetchAllCartItems)
