import api from "./api";

export const submitQuery = async (queryData) => {
  try {
    const response = await api.post("/support/submit", queryData);
    return response.data;
  } catch (error) {
    throw new Error("Query submission failed");
  }
};

export const checkQueryStatus = async (email) => {
  try {
    const response = await api.get(`/support/status?email=${email}`);
    return response.data.status;
  } catch (error) {
    throw new Error("Error fetching query status");
  }
};
