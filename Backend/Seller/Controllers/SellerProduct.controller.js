import { SellerUpload } from "../Model/SellerUpload.Model.js";
import { body, validationResult } from 'express-validator'

export const sellerProductValidationRules = [

    body('category').notEmpty().withMessage('enter the category of product '),

    body('inventory').notEmpty().withMessage('enter the inventory of your product  ' ),

    body('price').notEmpty().withMessage('enter the price of your product '),
    body('description').notEmpty().withMessage('enter the description of your product ').bail().isLength({ min: 10 }).withMessage('description should be atleast 10 characters long '),
]

export const sellerUpload = async (req, res) => {

    const { category, inventory, price, description } = req.body
    const user = req.sellerUserId
    console.log(req.body)
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const error = errors.array().map(error => `${error.msg}\n`)
        console.log(error)
        res.status(400).json({ error  })

        return
    }

if (!req.file) {
    return res.status(400).json({ error: "Upload your image" });
}

const image = req.file.filename;

    try {
        const store = await SellerUpload.create({ user, category, inventory, price, image, description })
        res.json({ success: "your product added successfully",store })

    } catch (error) {
        res.json({ error: error.message })
    }
};


// fetch user specific products 


export const fetchUserSpecificItems = async(req,res)=>{
    const user = req.sellerUserId
    try {
        const fetchItems = await SellerUpload.find({user})
        if (!fetchItems) {
            res.status(400).json({error:"You never added products on commercy"})
            return
        }
        else{
            res.status(200).json({success:fetchItems})
        }
        
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
    

}

// delete item 


export const deleteSellerItem = async(req,res) => {
    const {id} = req.params
    const user = req.sellerUserId

    
    try {
        const fetchUser = await SellerUpload.findOne({user:user})
        if(fetchUser){
            const findItem = await SellerUpload.findOneAndDelete({_id:id})
            if(!findItem){
                res.status(400).json({error:"Item not exists"})
            }
            else{
                res.status(200).json({success:"item deleted successfully",findItem})
            }
        }
        else{
            res.status(404).json({error:"item don't exists"})
        }
        
    } catch (error) {
        res.status(500).json({error:error.message})
        console.log(error)
    }

}



// update item in seller product 


export const updateSellerItem = async(req,res)=>{
    const {id} = req.params
    const {category,inventory,price,description}  = req.body 
    const image = req.file.filename

    console.log(category,inventory,price,description)
    console.log(image)

    const updatedItem = {
        category: category,
        inventory:inventory,
        price:price,
        description:description,
        image:image
    }

    
        const user = req.sellerUserId
        
        try {
            const findItem = await SellerUpload.findOne({user:user})
    if (findItem) {
        const user = await SellerUpload.findByIdAndUpdate(id,{$set: updatedItem },{new:true})
        res.status(200).json({success:"item updated successfully",user})
    }
    else{
        res.status(404).json({error:"Item not exists"})
    }

    } catch (error) {
        res.status(500).json({error : error.message})

        
    }
}




