// src/pages/ProductList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  return (
    <div className="product-list-container">
      <h2>Available Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img
              src={product.picture_url || "https://via.placeholder.com/150"}
              alt={product.name}
              className="product-image"
            />
            <h3>{product.name}</h3>
            <p className="product-category">{product.category}</p>
            <p className="product-description">{product.description}</p>
            <p className="product-price">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
