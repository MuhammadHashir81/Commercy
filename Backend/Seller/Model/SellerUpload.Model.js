import mongoose from "mongoose";
const { Schema } = mongoose

const sellerUploadSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Seller',
    },
    category: {
        type: String,
        required: true,
    },
    inventory: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    description:{
        required:true,
        type:String,
        minLength:[10,"description should be 10 characters long"]
 
    },
    image:{
        type:String,
        required:true
    },

})

export const SellerUpload = mongoose.model('upload', sellerUploadSchema)