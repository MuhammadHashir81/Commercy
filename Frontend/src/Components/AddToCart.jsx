import React, { useContext } from "react";
import { AddToCartContext } from "./ContextApi/AddToCart/AddToCartProvider";
import { NavLink } from "react-router-dom";
import { AuthenticationContext } from "./ContextApi/AuthenticationProvider";
import { ShowItemsContext } from "./ContextApi/ShowItems.jsx/ShowItems";
import { FaShoppingCart } from "react-icons/fa";

const AddToCart = () => {
  const { cartItems, deletingSingleCartItem } = useContext(AddToCartContext);
  const { decrementInventory, singleItem } = useContext(ShowItemsContext);
  const { isLoginUser } = useContext(AuthenticationContext);

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Stripe Payment Function
  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:5000/payment/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
        credentials: "include",
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
        decrementInventory(singleItem._id);
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  // Delete single cart item
  const handleDelete = (id) => {
    deletingSingleCartItem(id);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-32 py-10 min-h-screen">
      {isLoginUser ? (
        <div>
          <h1 className="text-5xl font-bold mb-6 flex items-center gap-2">
            <FaShoppingCart /> Cart Items
          </h1>

          {cartItems.length > 0 ? (
            <div className="flex flex-wrap gap-6">
              {cartItems.map((single) => (
                <div key={single.productId} className="w-[300px] p-5  rounded-lg shadow-sm">
                  <img
                    src={`http://localhost:5000/uploads/${single.image}`}
                    alt="cart item"
                    className="rounded-md h-[300px] w-full object-cover"
                  />
                  <div className="mt-3 text-center">
                    <h3 className="text-lg font-bold">{single.title}</h3>
                    <h3 className="text-lg font-semibold text-gray-600">${single.price}</h3>
                    <button
                      onClick={() => handleDelete(single.productId)}
                      className="bg-black px-4 py-2 mt-3 rounded-md text-white hover:bg-gray-800 transition cursor-pointer"
                    >
                      Delete Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h2 className="text-2xl font-semibold mt-10 text-gray-600">No items in cart</h2>
          )}

          <div className="m-6 flex justify-between items-center border-t pt-4">
            <div>
              <h4 className="font-medium">Subtotal</h4>
              <p className="text-lg font-semibold">${totalPrice}</p>
            </div>
            <button
              disabled={!isLoginUser}
              onClick={handlePayment}
              className={`${
                !isLoginUser ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              } flex items-center px-6 py-2 text-md font-semibold rounded-md text-white transition`}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-black p-10 rounded-md text-center text-white">
          <h1 className="text-3xl font-bold my-6">Login to see your cart</h1>
          <NavLink
            to="/signup"
            className="font-semibold bg-amber-500 text-black px-7 py-3 rounded-md hover:bg-amber-400 transition"
          >
            Signup
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
