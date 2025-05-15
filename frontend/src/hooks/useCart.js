import { useState } from "react";

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeItem = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return { cartItems, addItem, removeItem, clearCart };
};

export default useCart;
