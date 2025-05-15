import React, { useState } from "react";
import axios from "axios";

const QueryStatusCheck = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const checkStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/support/status?email=${email}`);
      setStatus(response.data.status);
    } catch (error) {
      alert("Error checking query status.");
    }
  };

  return (
    <div>
      <h2>Check Query Status</h2>
      <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required />
      <button onClick={checkStatus}>Check Status</button>
      {status && <p>Query Status: {status}</p>}
    </div>
  );
};

export default QueryStatusCheck;
