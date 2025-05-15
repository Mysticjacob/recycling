import api from "./api";

export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", response.data.token);
    return response.data.user;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const response = await api.get("/auth/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
