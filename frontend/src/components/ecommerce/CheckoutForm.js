import { useState } from "react";

const CheckoutForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, address });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
      <input type="text" placeholder="Shipping Address" onChange={(e) => setAddress(e.target.value)} required />
      <button type="submit">Proceed to Payment</button>
    </form>
  );
};

export default CheckoutForm;
