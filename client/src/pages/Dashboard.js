// src/pages/Dashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Welcome to Order Management Dashboard</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={() => navigate("/customers")}>
          <h3>Onboard Customer</h3>
          <p>Add a new customer to the system.</p>
        </div>
        <div className="dashboard-card" onClick={() => navigate("/orders/new")}>
          <h3>Create Order</h3>
          <p>Create a new order for an existing customer.</p>
        </div>
        <div className="dashboard-card" onClick={() => navigate("/products")}>
          <h3>View Products</h3>
          <p>Browse available products.</p>
        </div>
        <div className="dashboard-card" onClick={() => navigate("/orders")}>
          <h3>Manage Orders</h3>
          <p>View and filter all orders.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
