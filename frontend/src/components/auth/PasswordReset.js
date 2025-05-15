import { useState } from "react";
import axios from "axios";

const PasswordReset = () => {
  const [email, setEmail] = useState("");

  const handlePasswordReset = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", { email });
      alert("Password reset link sent to your email.");
    } catch (error) {
      alert("Error sending password reset link.");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handlePasswordReset}>Send Reset Link</button>
    </div>
  );
};

export default PasswordReset;
