import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductManager.css";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    imageUrl: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      alert("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
      await axios.post("http://localhost:5000/api/products", {
        ...newProduct,
        price: parseFloat(newProduct.price),
      });
      setNewProduct({ name: "", price: "", imageUrl: "" });
      fetchProducts();
    } catch (err) {
      alert("Error adding product");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert("Error deleting product");
    }
  };

  return (
    <div>
      <h2>Admin Product Manager</h2>

      <h3>Add New Product</h3>
      <div className="form-container">
        <input
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          placeholder="Image URL"
          value={newProduct.imageUrl}
          onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <h3>Product List</h3>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id}>
              <td><img src={prod.imageUrl} alt={prod.name} className="product-image" /></td>
              <td>{prod.name}</td>
              <td>${prod.price}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(prod._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManager;
