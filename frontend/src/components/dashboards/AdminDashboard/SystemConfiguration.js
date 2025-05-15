import React, { useState, useEffect } from "react";
import axios from "axios";

const SystemConfiguration = () => {
  const [config, setConfig] = useState({ siteName: "", maintenanceMode: false });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("token");

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/admin/config", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConfig(response.data);
    } catch (error) {
      alert("Error fetching configuration.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateConfig = async () => {
    setSaving(true);
    try {
      await axios.put("http://localhost:5000/api/admin/config", config, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Configuration updated successfully!");
    } catch (error) {
      alert("Error updating configuration.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <div>
      <h2>System Configuration</h2>
      {loading ? (
        <p>Loading config...</p>
      ) : (
        <>
          <label>Site Name:</label>
          <input
            type="text"
            value={config.siteName}
            onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
          />

          <label>
            <input
              type="checkbox"
              checked={config.maintenanceMode}
              onChange={(e) =>
                setConfig({ ...config, maintenanceMode: e.target.checked })
              }
            />
            Maintenance Mode
          </label>

          <button onClick={handleUpdateConfig} disabled={saving}>
            {saving ? "Saving..." : "Update Configuration"}
          </button>
        </>
      )}
    </div>
  );
};

export default SystemConfiguration;
