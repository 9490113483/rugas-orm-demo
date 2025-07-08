// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerForm from './components/CustomerForm';
import ProductList from './components/ProductList';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<CustomerForm />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/orders/new" element={<OrderForm />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* Toast container to show toast notifications */}
        <ToastContainer position="top-right" autoClose={3000} />
      </>
    </Router>
  );
}

export default App;
