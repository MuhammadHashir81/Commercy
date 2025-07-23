import express from "express";
import Stripe from "stripe";

const router = express.Router();

const stripe = new Stripe("sk_test_51NvjZoAjmegtlXAVOCeHMz04cQtIO8BFQrasBfB1eruQ6euQXlOdhkDKe9cQADIrLx64fGFWUDOmDaz4ZMx9lFQN006IEgBUS3"); 

export const handleStripe = async  (req, res) => {
  const { amount, name } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: name, // product name
            },
            unit_amount: amount * 100, // $ -> cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default handleStripe;
