import mongoose from "mongoose";
const {Schema} = mongoose


const itemSchema = new Schema({
    image:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
        minLength:[2,"title should be atleast 2 characters long"],
        maxLength:[25,"title cannot be greater than 25 characters"],
        
    },
    description:{
        type:String,
        required:true,
        minLength:[5,"description should be atleast 2 characters long"],
        maxLength:[50,"description cannot be greater than 50 characters"],
    },
    oldPrice:{
        type:String,
        required:true
    }
,
    newPrice:{
        type:String,
        required:true
    }

})

export const UploadItem = mongoose.model('uploaditem',itemSchema)