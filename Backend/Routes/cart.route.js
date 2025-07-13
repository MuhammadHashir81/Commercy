import { Router } from "express";
import { addCart, deleteSingleCartItem, fetchAllCartItems } from "../Controllers/cart.controller.js";
import { verifyToken } from "../Middleware/middleware.js";

export const cartRouter = Router()


cartRouter.post('/add-cart', verifyToken, addCart)
cartRouter.delete('/delete-cart/:id',verifyToken,deleteSingleCartItem)
cartRouter.get('/get-cart-items',verifyToken,fetchAllCartItems)
