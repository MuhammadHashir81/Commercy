import { UploadItem } from "../Model/UploadItem.Schema.js"
import {body,validationResult} from 'express-validator'


export const itemUploadValidationRules = [
    body('image').notEmpty().withMessage('image is required'),
    body('title').notEmpty().withMessage('title is required').bail().isLength({min:3}).withMessage('title must be 3 characters long'),
    body('description').notEmpty().withMessage('please enter description').bail().isLength({min:5}).withMessage('password must be 3 characters long').bail().isLength({max:50}).withMessage('descripton must not be greater than 50 characters '),
    body('oldPrice').notEmpty().withMessage('oldPrice is required'),
    body('newPrice').notEmpty().withMessage('newPrice is required')
]



export const uploadItem = async (req,res)=>{
    const {image,title,description,oldPrice,newPrice} = req.body
    const errors = validationResult(req)
            if(!errors.isEmpty()){
                const error = errors.array().map(error => `${error.msg}`)
                console.log(error)
                res.status(400).json({error})
               return
            }
    try {
        const storeItem = await UploadItem.create({image,title,description,oldPrice,newPrice})
        res.status(200).json({success:"Your item has been uploaded! "})

    } catch (error) {
        res.status(500).json({error})
    }
}