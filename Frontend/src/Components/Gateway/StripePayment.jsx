import React from "react";
import { useContext } from "react";
import { AddToCartContext } from "../ContextApi/AddToCart/AddToCartProvider";

const Checkout = () => {
  const {cartItems} = useContext(AddToCartContext)
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Buy My Product</h1>
      <button
        onClick={handlePayment}
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
      >
        Pay $20
      </button>
    </div>
  );
};

export default Checkout;
