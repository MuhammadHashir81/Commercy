import express from 'express'
import { authRouter } from './Routes/authRoutes.js'
import mongoose from 'mongoose'
import cors from 'cors'
import { itemRouter } from './Routes/items.js'
import { cartRouter } from './Routes/cart.route.js'
import cookieParser from 'cookie-parser'
const app = express()
const port = 5000


app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin:'http://localhost:5173',
  credentials: true

}))

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})