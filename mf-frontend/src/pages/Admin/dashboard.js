import React from 'react';
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Users</h2>
          <p>Total Users: 100</p>
          <p>Active Users: 80</p>
          <p>Pending Users: 20</p>
        </div>
        <div className="dashboard-card">
          <h2>Products</h2>
          <p>Total Products: 500</p>
          <p>In Stock: 400</p>
          <p>Out of Stock: 100</p>
        </div>
        <div className="dashboard-card">
          <h2>Sales</h2>
          <p>Total Sales: $10,000</p>
          <p>Today's Sales: $500</p>
          <p>Monthly Sales: $5,000</p>
        </div>
        <div className="dashboard-card">
          <h2>Download</h2>
          <p>Total Sales: $10,000</p>
          <p>Today's Sales: $500</p>
          <p>Monthly Sales: $5,000</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
