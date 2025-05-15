import { useState } from "react";
import axios from "axios";

const useQuery = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);

  const submitQuery = async (queryData) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/support/submit", queryData);
      setQueries([...queries, response.data]);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting query:", error);
      setLoading(false);
    }
  };

  const checkQueryStatus = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/support/status?email=${email}`);
      return response.data.status;
    } catch (error) {
      console.error("Error fetching query status:", error);
      return null;
    }
  };

  return { queries, submitQuery, checkQueryStatus, loading };
};

export default useQuery;
