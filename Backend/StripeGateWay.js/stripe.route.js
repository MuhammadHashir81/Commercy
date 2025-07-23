import express from 'express'
import { Router } from 'express'
import { handleStripe } from './stripe.js'

export const stripeRouter = Router()

stripeRouter.post('/create-checkout-session',handleStripe)