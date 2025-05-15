import React, { useState, useEffect } from "react";
import axios from "axios";

const AppFileManager = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/developer/files");
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching files", error);
      }
    };
    fetchFiles();
  }, []);

  return (
    <div>
      <h2>Application File Manager</h2>
      <ul>
        {files.map((file) => (
          <li key={file.name}>
            {file.name} - {file.size} KB
            <button onClick={() => alert("File Opened: " + file.name)}>Open</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppFileManager;
