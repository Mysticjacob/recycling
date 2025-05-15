import { useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const removeItem = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price}
              <button onClick={() => removeItem(index)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => alert("Proceeding to checkout")}>Checkout</button>
    </div>
  );
};

export default Cart;
