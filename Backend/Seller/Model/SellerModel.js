import mongoose from "mongoose";
const {Schema} = mongoose

const sellerSchema = new Schema({
    name:{
        type:String,
        required:[true,"please enter your name"],
        minLength:[3,"your name should consist atleast 3 letters"],
        maxLength:[50,'your name cannot consist more than 50 letters']
        
    },
    email:{
        type:String,
        require:[true,'please enter your email'],
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        minLength:[3,'password must be atleast 3 characters long']
    },
     picture: {
    type: String, 
    default: "",  
  },
})

export const Seller = mongoose.model('seller',sellerSchema)
