import React from "react";

const ProductDetail = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="product-detail">
      <button className="close-btn" onClick={onClose}>X</button>
      <img src={product.imageUrl} alt={product.name} />
      <h2>{product.name}</h2>
      <p>Description: {product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
    </div>
  );
};

export default ProductDetail;
