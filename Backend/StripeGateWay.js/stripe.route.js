import express from 'express'
import { Router } from 'express'
import { handlePostStripe, handleStripe } from './stripe.js'
import { verifyToken } from '../Middleware/verifyToken.js'

export const stripeRouter = Router()

stripeRouter.post('/create-checkout-session',verifyToken,  handleStripe)
stripeRouter.post('/webhook', express.json({type: 'application/json'}), handlePostStripe )