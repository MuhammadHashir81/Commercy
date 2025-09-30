// import { StripeModel } from "../Model/Stripe.Schema.js"
// export const getAllSellerItems = async (req, res) => {
//   const id = req.userId;
//   try {
//     const getItems = await StripeModel.find({id})
//     res.status(200).json(getItems);
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };




import { StripeModel } from "../Model/Stripe.Schema.js";

export const getAllSellerItems = async (req, res) => {
  try {
    const sellerId = req.userId; // seller's user id

    const getItems = await StripeModel.find({ id: sellerId })
      .populate("productIds"); // this brings full UploadItem docs instead of just ids

    res.status(200).json(getItems);
  } catch (error) {
    console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
};
