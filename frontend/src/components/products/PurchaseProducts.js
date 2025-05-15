import React, { useState, useEffect } from "react";
import axios from "axios";

const PurchaseProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data);
      } catch (error) {
        console.error("❌ Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  const handlePurchase = async (productId) => {
    try {
      await axios.post("/api/orders", { productId });
      alert("✅ Purchase successful!");
    } catch (error) {
      alert("❌ Purchase failed!");
    }
  };

  return (
    <div>
      <h2>Purchase Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - M{product.price}
            <button onClick={() => handlePurchase(product._id)}>Buy</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseProducts;
