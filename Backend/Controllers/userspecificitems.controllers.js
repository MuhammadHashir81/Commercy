import { StripeModel } from "../Model/Stripe.Schema.js"
export const userSpecificItems = async(req,res)=>{
    const id = req.userId
    const data = await StripeModel.find({id:id})
    res.status(200).json({data})

}