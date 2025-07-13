import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import pkg from 'bcryptjs'
import { User } from '../Model/User.Schema.js'
import { body, validationResult } from 'express-validator'
const { gensalt } = pkg

const maxAge = 24 * 60 * 60

const createToken = (id) => {

    return jwt.sign({ id }, 'secretkey', {
        expiresIn: maxAge
    })

}

export const validationRules = [
    body('name').notEmpty().withMessage('name is required ').bail().isLength({ min: 3 }).withMessage('name should be atleast three characters long'),

    body('email').notEmpty().withMessage('email is required ').bail().isEmail().withMessage('Please enter a valid email address').bail().normalizeEmail(),
    
    body('password').notEmpty().withMessage('password is required').bail().isLength({ min: 3 }).withMessage('password must be 3 characters long')
]

// signup

export const signup = async (req, res) => {
    const { name, email, password } = req.body
    console.log(name, email, password)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = errors.array().map(error => `${error.msg}`)
        console.log(error)
        res.status(400).json({ error })

        return
    }
    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
        return res.status(400).json({ error: "this email already in use" });
    }

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    try {
        const save = await User.create({ name, email, password: hashedPassword })
        console.log(save)
        res.status(200).json({ success: "You are signed up successfully!" })
        console.log(res)
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
        console.log(error)

    }
}



// login



export const login = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    try {
        const findEmail = await User.findOne({ email })
        if (findEmail) {
            const findPassword = await bcrypt.compare(password, findEmail.password)
            if (findPassword) {
                const token = createToken(findEmail._id)
                const sendCookie = res.cookie('userJWT', token, { httpOnly: true, maxAge: maxAge * 1000 })
                res.status(200).json({ success: 'You are logged in successfully!' })
                return

            }
            else {
                res.status(400).json({ error: 'Incorrect email or password' })
            }
        }
        else {
            res.status(400).json({ error: 'Incorrect email or password' })
        }

    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
        console.log(error)

    }
}