
import { AddCart } from "../Model/AddCart.Schema.js" 
import mongoose from "mongoose"


// add to cart
export const addCart = async (req,res)=>{
    const userId = req.userId
    const {items} = req.body
    console.log(items)
    try {
        const cart = await AddCart.findOne({userId})
        if (cart) {
            const exists =  cart.items.find(i => i.productId.toString()  === items.productId )
            console.log(req.user)
            if (exists) {
                res.status(400).json({error:"product already exists"})
                return
                
            }
                 cart.items.push(items)
                 await cart.save()
                 return res.status(200).json({success:"Product added successfully",})


        }
        else{
            const newCart = await AddCart.create({userId,items:[items]})
            res.status(200).json({success:"product added successfully",cart})
        }
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
}



// get all the cartitems of a specific user


export  const fetchAllCartItems = async (req,res)=>{
    const userId = req.userId
    try {
        const gettingAllCartItems = await AddCart.findOne({userId})
        res.status(200).json({success:gettingAllCartItems})
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }

}

// deleting items from cart


export const deleteSingleCartItem = async (req, res) => {
    const userId = req.userId; // Get userId from token (not params)
    const itemId = req.params.id; // ID of the item to delete from the array

    try {
        const updatedCart = await AddCart.findOneAndUpdate(
            { userId: new mongoose.Types.ObjectId(userId) }, // Match the cart for the current user
            { $pull: { items: { productId: itemId } } }, // Remove the item
            { new: true } // Return updated document
        );

        if (!updatedCart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        res.status(200).json({
            success: "Removed from cart",
            cart: updatedCart
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error:error.message });
    }
};





