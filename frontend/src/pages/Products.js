import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/products/ProductCard";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  const handleBuyClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("🔐 You need to log in to purchase products.");
      navigate("/login"); // Redirect to login
    } else {
      navigate("/checkout"); // Proceed to checkout if logged in
    }
  };

  return (
    <div className="products-page">
      <h2>🛍 Available Products</h2>
      <p>Find the best recycled electronics and sustainable products below!</p>

      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="cta">
        <h2>Looking for a great deal?</h2>
        <p>Explore our selection of high-quality recycled electronics.</p>
        <button className="buy-btn" onClick={handleBuyClick}>🛒 Click here to buy</button>
      </div>
      <div className="nav-buttons">
        <button onClick={() => navigate("/")}>🏠 </button>
      </div>

    </div>
  );
};

export default Products;
