import React from "react";
import axios from "axios";

const DeploymentControls = () => {
  const handleDeploy = async () => {
    try {
      await axios.post("http://localhost:5000/api/developer/deploy");
      alert("Application deployed successfully!");
    } catch (error) {
      alert("Deployment failed.");
    }
  };

  const handleRestart = async () => {
    try {
      await axios.post("http://localhost:5000/api/developer/restart");
      alert("Server restarted successfully!");
    } catch (error) {
      alert("Restart failed.");
    }
  };

  const handleRollback = async () => {
    try {
      await axios.post("http://localhost:5000/api/developer/rollback");
      alert("Application rolled back successfully!");
    } catch (error) {
      alert("Rollback failed.");
    }
  };

  return (
    <div>
      <h2>Deployment Controls</h2>
      <button onClick={handleDeploy}>Deploy</button>
      <button onClick={handleRestart}>Restart Server</button>
      <button onClick={handleRollback}>Rollback</button>
    </div>
  );
};

export default DeploymentControls;
