import { UploadItem } from "../Model/UploadItem.Schema.js"
import {body,validationResult} from 'express-validator'
import { SellerUpload } from "../Seller/Model/SellerUpload.Model.js"


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


// get all the items to display on main page


export const getAllItems = async(req,res)=>{
    try {
        const allItems = await SellerUpload.find()
        res.status(200).json({success:allItems})

    } catch (error) {
        res.status(500).json({error:"Internal server error"})
        
    }

}

// get the selected items by the user after checkout

export const getSelectedItems = async(req,res)=>{
    try {
        const selectedItems = await SellerUpload.find({selected:true})
        res.status(200).json({selectedItems})

    } catch (error) {
        res.status(500).json({error:"Internal server error"})
        
    }
}


// get single item 

export const getSingleItem = async(req,res)=>{
    const {id} = req.params
    try {
        
        const getSingleItem = await SellerUpload.findById(id)
        if (!getSingleItem) {
            res.status(400).json({error:"Item not found"})
        }
        else{
            res.status(200).json({getSingleItem})
        }

    } catch (error) {
        res.status(500).json({error:"Internal server error"})
        
    }

}





// decrement seller inventory 


    export const decrementInventory = async (req,res)=>{
        const {id,quantity} = req.body

        try {
            const item = await SellerUpload.findById(id)
            
            if(!item){
                res.status(400).json({error:"item not found"})
            }
            else{
                if(item.inventory < quantity){
                    res.status(400).json({error:"this is out of stock"})
                }
                item.inventory -= quantity
                await item.save()
                res.status(200).json({ success:item.inventory})
            }
            
        } catch (error) {
            res.status(500).json({error:error.message})
            
        }

    }






