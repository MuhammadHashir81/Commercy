    import mongoose from 'mongoose';
    import { Schema } from 'mongoose';

    const stripeSchema = new Schema({
        id: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true

        },
        productIds:
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UploadItem',
            required: true
        },
    
        items:[
            {
                amountSubtotal:String,
                itemQuantity:Number,
                itemAmount:String
            },

        ],

        customerEmail:{
            type:String,
        },
        customerName:{
            type:String,
        },
        totalAmount:{
            type:String,
        }   


    })


    export const StripeModel = mongoose.model('Stripe', stripeSchema);