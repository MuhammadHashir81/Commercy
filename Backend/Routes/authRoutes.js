import express from 'express'
import { Router } from 'express'
import { googleLogin, login, logOut, signup, validationRules } from '../Controllers/auth.controller.js'
import { verifyToken } from '../Middleware/middleware.js'
export const authRouter = Router()

authRouter.post('/signup',validationRules, signup)
authRouter.post('/google-login',googleLogin)
authRouter.post('/login', login)
authRouter.get('/logout', verifyToken, logOut)