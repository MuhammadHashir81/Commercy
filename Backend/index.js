import express, { application } from 'express'
import { authRouter } from './Routes/authRoutes.js'
import mongoose from 'mongoose'
import cors from 'cors'
import { itemRouter } from './Routes/items.js'
import { cartRouter } from './Routes/cart.route.js'
import cookieParser from 'cookie-parser'
import { sellerRouter } from './Seller/Routes/Seller.routes.js'
import path from "path";
import { stripeRouter } from './StripeGateWay.js/stripe.route.js'
import specificItems from './Routes/userspecificitems.route.js'
const app = express()
const port = 5000


app.use(express.json())
app.use(cookieParser())

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use(cors({
  origin:'http://localhost:5173',
  credentials: true

}))

app.use('/uploads', express.static('uploads'))
try {
  await mongoose.connect('mongodb://127.0.0.1:27017/MegaProject');
} catch (error) {
  console.log(error)
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// routes

app.use('/auth',authRouter)
app.use('/items',itemRouter)
app.use('/cart',cartRouter)
app.use('/seller',sellerRouter)
app.use('/payment',stripeRouter)
app.use('/api',specificItems)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})