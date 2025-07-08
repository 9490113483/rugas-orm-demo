import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderList.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [customerFilter, setCustomerFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((res) => {
        setOrders(res.data);
        setFilteredOrders(res.data);
      })
      .catch((err) => console.error("Failed to fetch orders:", err));
  };

  const handleFilter = () => {
    const filtered = orders.filter((order) => {
      const matchesStatus = statusFilter ? order.status === statusFilter : true;
      const matchesCustomer = customerFilter
        ? order.Customer?.name.toLowerCase().includes(customerFilter.toLowerCase())
        : true;
      const matchesCategory = categoryFilter
        ? order.Products.some((p) => p.category?.toLowerCase() === categoryFilter.toLowerCase())
        : true;

      return matchesStatus && matchesCustomer && matchesCategory;
    });
    setFilteredOrders(filtered);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status: newStatus });
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="order-list-container">
      <h2>Order List</h2>

      {/* Filters */}
      <div className="filters">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="placed">Placed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option> 
        </select>

        <input
          type="text"
          placeholder="Search by customer"
          value={customerFilter}
          onChange={(e) => setCustomerFilter(e.target.value)}
        />

        <input
          type="text"
          placeholder="Filter by category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />

        <button onClick={handleFilter}>Apply Filters</button>
      </div>

      {/* Orders Table */}
      <div className="order-table">
        <div className="order-header">
          <div>Customer</div>
          <div>Product</div>
          <div>Category</div>
          <div>Quantity</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {filteredOrders.map((order) =>
          order.Products.map((product, idx) => (
            <div key={`${order.id}-${idx}`} className="order-row">
              <div>{order.Customer?.name || "N/A"}</div>
              <div>{product.name}</div>
              <div>{product.category}</div>
              <div>{product.OrderItem?.quantity}</div>
              <div>{order.status}</div>
              <div>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  <option value="placed">Placed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option> 
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderList;
