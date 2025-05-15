import { useState } from "react";
import axios from "axios";

const MFAInput = ({ userId, onVerify }) => {
  const [mfaCode, setMfaCode] = useState("");

  const handleVerify = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/verify-mfa", { userId, mfaCode });
      alert("MFA verification successful!");
      onVerify();
    } catch (error) {
      alert("Invalid MFA code!");
    }
  };

  return (
    <div>
      <h2>Verify MFA Code</h2>
      <input type="text" placeholder="Enter MFA Code" onChange={(e) => setMfaCode(e.target.value)} />
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
};

export default MFAInput;
