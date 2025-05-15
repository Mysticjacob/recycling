import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SalesDashboard.css"; 

const SalesDashboard = () => {
  const [products, setProducts] = useState([]);
  const [salesSummary, setSalesSummary] = useState({ totalSales: 0, totalRevenue: 0 });
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchSalesData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/sales/overview", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSalesSummary(response.data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  const handleAddProduct = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/products", newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Product added!");
      setNewProduct({ name: "", description: "", price: "", category: "", imageUrl: "" });
      fetchProducts();
    } catch (error) {
      alert("Failed to add product: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Product deleted!");
      fetchProducts();
    } catch (error) {
      alert("Failed to delete product.");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchSalesData();
  }, []);

  return (
    <div className="sales-dashboard-container">

      <section className="product-form">
        <h3>Add Product</h3>
        <input type="text" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
        <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
        <input type="text" placeholder="Image URL" value={newProduct.imageUrl} onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })} />
        <button className="add-btn" onClick={handleAddProduct} disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </section>
      <h3>All Products</h3>
      <section className="product-list">
        
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <div className="table-container">
            <table className="products-table">
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
                    <td><img src={product.imageUrl || "/images/placeholder.png"} alt={product.name} className="product-image" /></td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default SalesDashboard;
