import React from 'react';
import {useCheckout} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const checkout = useCheckout();
  
  // Add a check to handle the case when checkout data is still loading
  if (!checkout || !checkout.lineItems || !checkout.total) {
    return <div>Loading checkout details...</div>;
  }
  
  return (
    <pre>
      {JSON.stringify(checkout.lineItems, null, 2)}
      {/* A formatted total amount */}
      Total: {checkout.total.total.amount}
    </pre>
  );
};

export default CheckoutForm;