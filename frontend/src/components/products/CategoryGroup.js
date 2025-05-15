import React from "react";
import ProductCard from "./ProductCard";

const CategoryGroup = ({ category, products }) => {
  return (
    <div className="category-group">
      <h2>{category}</h2>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryGroup;
