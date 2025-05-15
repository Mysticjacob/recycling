import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCartDropdown, setShowCartDropdown] = useState(false); // Controls dropdown visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");
        setProducts(data);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        setError("❌ Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const proceedToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="product-list-container">
      {/* ✅ Cart Icon in Top Corner (Clickable) */}
      <div className="cart-container" onClick={() => setShowCartDropdown(!showCartDropdown)}>
        <span className="cart-icon">🛒</span>
        <span className="cart-count">{cart.length}</span>
      </div>

      {/* ✅ Cart Dropdown (Appears When Clicking the Trolley Icon) */}
      {showCartDropdown && cart.length > 0 && (
        <div className="cart-dropdown">
          <ul>
            {cart.map((item, index) => (
              <li key={index}>{item.name} - ${item.price}</li>
            ))}
          </ul>
          <button className="checkout-btn" onClick={proceedToCheckout}>💳 Proceed to Checkout</button>
        </div>
      )}

      <h2>Available Recycling Products</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  src={product.image || product.imageUrl || "/images/placeholder.png"}
                  alt={product.name}
                  className="product-image"
                />
              </td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <button className="add-cart-btn" onClick={() => addToCart(product)}>🛒 Add to Cart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
