import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";

const Checkout = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({});
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("❌ Please select a payment method before proceeding.");
      return;
    }

    // ✅ Validate payment input
    if ((paymentMethod === "Credit Card" && !paymentDetails.cardNumber) ||
        (paymentMethod === "PayPal" && !paymentDetails.email) ||
        (paymentMethod === "Mobile Money" && (!paymentDetails.phone || !paymentDetails.provider)) ||
        (paymentMethod === "Bank Transfer" && !paymentDetails.accountNumber)) {
      alert("❌ Please enter the required payment details.");
      return;
    }

    try {
      // ✅ Record purchase in the database
      await Promise.all(
        cart.map(async (item) => {
          await axios.post("http://localhost:5000/api/sales/record", {
            productName: item.name,
            price: item.price,
            quantity: 1, 
          });
        })
      );

      alert("✅ Payment Successful & Sales Recorded!");
      localStorage.removeItem("cart");
      setPaymentSuccess(true);
      setTimeout(() => navigate("/User"), 1000);
    } catch (error) {
      alert("❌ Failed to record sales data. Please try again.");
    }
  };

  const handleChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="checkout-page">
      <h2>🛍 Checkout</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>{item.name} - ${item.price}</li>
            ))}
          </ul>

          {/* ✅ Payment Method Selection */}
          <div className="payment-methods">
            <h3>💳 Choose Payment Method</h3>
            <select onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="" disabled selected>Select Payment Method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Mobile Money">Mobile Money</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          {/* ✅ Payment Details Input */}
          {paymentMethod && (
            <div className="payment-details">
              <h3>🔐 Enter Payment Details</h3>
              <input type="text" name="email" placeholder="Your Email" onChange={handleChange} required />
              {paymentMethod === "Credit Card" && (
                <>
                  <input type="text" name="cardNumber" placeholder="Card Number" onChange={handleChange} required />
                  <input type="text" name="expiry" placeholder="Expiry Date (MM/YY)" onChange={handleChange} required />
                </>
              )}
            </div>
          )}

          <button className="pay-btn" onClick={handlePayment}>💳 Pay Now</button>
          {paymentSuccess && <p className="success-message">✅ Payment Successful!</p>}
        </div>
      )}
    </div>
  );
};

export default Checkout;
