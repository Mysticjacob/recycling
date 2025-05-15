import api from "./api";

export const getUsers = async () => {
  try {
    const response = await api.get("/admin/users");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

export const addUser = async (userData) => {
  try {
    const response = await api.post("/admin/users", userData);
    return response.data;
  } catch (error) {
    throw new Error("Error adding user");
  }
};

export const deleteUser = async (userId) => {
  try {
    await api.delete(`/admin/users/${userId}`);
  } catch (error) {
    throw new Error("Error deleting user");
  }
};
