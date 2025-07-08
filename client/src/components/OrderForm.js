import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderForm.css";

const OrderForm = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    customerId: "",
    productId: "",
    quantity: 1,
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch customers and products
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/customers")
      .then((res) => setCustomers(res.data))
      .catch((err) => {
        console.error("Failed to fetch customers:", err);
        setError("Failed to load customers.");
      });

    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products.");
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.customerId || !formData.productId || formData.quantity < 1) {
      setError("Please enter all required fields correctly.");
      return;
    }

    const payload = {
      customerId: formData.customerId,
      products: [
        {
          productId: formData.productId,
          quantity: parseInt(formData.quantity),
        },
      ],
    };

    axios
      .post("http://localhost:5000/api/orders", payload)
      .then(() => {
        setMessage("✅ Order placed successfully!");
        setFormData({ customerId: "", productId: "", quantity: 1 });
        setError("");
      })
      .catch((err) => {
        console.error("Order submission error:", err.response?.data || err.message);
        setError("❌ Failed to place order. Please check details and try again.");
        setMessage("");
      });
  };

  return (
    <div className="order-form-container">
      <h2>Create Order</h2>
      <form className="order-form" onSubmit={handleSubmit}>
        <label htmlFor="customer">Customer</label>
        <select
          name="customerId"
          id="customer"
          value={formData.customerId}
          onChange={handleChange}
          required
        >
          <option value="">Select Customer</option>
          {customers.map((cust) => (
            <option key={cust.id} value={cust.id}>
              {cust.name}
            </option>
          ))}
        </select>

        <label htmlFor="product">Product</label>
        <select
          name="productId"
          id="product"
          value={formData.productId}
          onChange={handleChange}
          required
        >
          <option value="">Select Product</option>
          {products.map((prod) => (
            <option key={prod.id} value={prod.id}>
              {prod.name}
            </option>
          ))}
        </select>

        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <button type="submit">Place Order</button>

        {/* Message display */}
        {message && <p className="message success">{message}</p>}
        {error && <p className="message error">{error}</p>}
      </form>
    </div>
  );
};

export default OrderForm;
