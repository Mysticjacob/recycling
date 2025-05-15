import { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("sales"); // Default role is sales
  const validRoles = ["sales", "finance", "developer", "investor"]; // Allowed roles

  const handleRegister = async () => {
    if (!validRoles.includes(role)) {
      alert("❌ Invalid role selection. Only users can register.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password, role });
      alert("✅ Registration successful! Please log in.");
    } catch (error) {
      alert("❌ Registration failed: " + (error.response?.data?.message || "Server error"));
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      
      {/* ✅ Only Users Can Select Roles */}
      <select onChange={(e) => setRole(e.target.value)}>
        {validRoles.map((roleOption) => (
          <option key={roleOption} value={roleOption}>{roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}</option>
        ))}
      </select>
      
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterForm;
