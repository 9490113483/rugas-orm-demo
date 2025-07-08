// src/pages/NotFound.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <button onClick={() => navigate("/")}>Go to Dashboard</button>
    </div>
  );
};

export default NotFound;
