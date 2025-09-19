import express from "express";
import Stripe from "stripe";
import { User } from "../Model/User.Schema.js";
import { StripeModel } from "../Model/Stripe.Schema.js";
const router = express.Router();

const stripe = new Stripe("sk_test_51NvjZoAjmegtlXAVOCeHMz04cQtIO8BFQrasBfB1eruQ6euQXlOdhkDKe9cQADIrLx64fGFWUDOmDaz4ZMx9lFQN006IEgBUS3");

export const handleStripe = async (req, res) => {
  const id = req.userId
  console.log(id);

  const findEmail = await User.findById(id)
  const { items } = req.body;

  try {
    const lineItems = items.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.description,   // name of item
        },
        unit_amount: item.price * 100, // Stripe accepts cents
      },
      quantity: item.quantity, // quantity of item
    }));

    const session = await stripe.checkout.sessions.create({




      line_items: lineItems,
      mode: "payment",
      customer_email: findEmail.email,
      success_url: "http://localhost:5173/",
      cancel_url: "http://localhost:3000/cancel",

      metadata: {
        userId: id
      }
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);

  }
};

export default handleStripe;



const endpointSecret = process.env.STRIPE_WEBHOOK


// post stripe payment 

export const handlePostStripe = async (req, res) => {
  let event = req.body;

  
  if (endpointSecret) {
    const signature = req.headers['stripe-signature'];
    
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }
  }
  
  
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const id = session.metadata.userId

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    const items = lineItems.data.map((item) => {
      return {
        amountSubtotal:item.amount_subtotal,
        itemQuantity:item.quantity,
        itemAmount:item.price.unit_amount
      }

    });

    const customerEmail = session.customer_details.email
    const customerName = session.customer_details.name
    const totalAmount = session.amount_total


    const saveData = await StripeModel.create({
      id,
      items,
      customerEmail,
      customerName,
      totalAmount
    })
    console.log(saveData);
    
    res.status(200).json({saveData});


}


  


  // handle event...
};
