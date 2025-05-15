import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      // Store authentication data
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role); 

      alert("Login successful!");

      // Redirect users based on their role
      switch (data.user.role) {
        case "admin":
          navigate("/Admin");
          break;
        case "finance":
          navigate("/Finance");
          break;
        case "developer":
          navigate("/Developer");
          break;
        case "investor":
          navigate("/Investor");
          break;
        case "sales":
          navigate("/Sales");
          break;
        case "user":
          navigate("/User");
          break;
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div>
  
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button onClick={handleLogin}>Login</button>
      <div className="nav-buttons">
        <button onClick={() => navigate("/")}>🏠 </button>
      </div>

    </div>
  );
};

export default Login;
