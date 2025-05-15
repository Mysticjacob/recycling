import React, { useState } from "react";
import axios from "axios";

const Cart = ({ cartItems }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async () => {
    try {
      await Promise.all(
        cartItems.map(async (item) => {
          await axios.post("http://localhost:5000/api/sales/record", {
            productName: item.name,
            price: item.price,
            quantity: 1 
          });
        })
      );

      setPaymentSuccess(true);
    } catch (error) {
      console.error("❌ Error recording purchase:", error);
    }
  };

  return (
    <div>
      <h2>🛍 Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : paymentSuccess ? (
        <p>✅ Payment Successful! Sales recorded.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>{item.name} - ${item.price}</li>
            ))}
          </ul>
          <button onClick={handlePayment}>💳 Pay Now</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
