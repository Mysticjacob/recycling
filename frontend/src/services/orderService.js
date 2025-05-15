import api from "./api";

export const placeOrder = async (orderData) => {
  try {
    const response = await api.post("/orders", orderData);
    return response.data;
  } catch (error) {
    throw new Error("Order placement failed");
  }
};

export const getOrders = async (userId) => {
  try {
    const response = await api.get(`/orders?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching orders");
  }
};
