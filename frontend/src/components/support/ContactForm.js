import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/support/submit", { name, email, message });
      alert("Your query has been submitted!");
    } catch (error) {
      alert("Error submitting query.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Contact Support</h2>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
      <textarea placeholder="Message" onChange={(e) => setMessage(e.target.value)} required></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
