import express from 'express'
import { Router } from 'express'
import { login, signup, validationRules } from '../Controllers/auth.controller.js'
export const authRouter = Router()

authRouter.post('/signup',validationRules, signup)
authRouter.post('/login', login)