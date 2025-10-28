import { StripeModel } from "../Model/Stripe.Schema.js";

export const getAllSellerItems = async (req, res) => {
  try {
    const sellerId = req.userId; // seller's user id

    const getItems = await StripeModel.find({
      productIds:sellerId         
    }) 
    res.status(200).json({getItems});

  } catch (error) {
    console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
};


