import mongoose from "mongoose";
const {Schema} = mongoose



const cartSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    items: [
    {
  productId: { type: String, required: true },
        title: String,
        description: String,
        image: String,
        price:Number
        
    }
]

})

export const AddCart = mongoose.model('addcart',cartSchema)
