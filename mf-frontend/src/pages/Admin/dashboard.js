import React from 'react';
import './dashboard.scss';

const Dashboard = () => {
  return (
    <div className='dashboard-container'>
      <h1>Admin Dashboard</h1>
      <div className='dashboard-grid'>
        <div className='dashboard-card'>
          <h2>Accounts</h2>
          <p>Total: 100</p>
          <p>Download: 200</p>
        </div>
        <div className='dashboard-card'>
          <h2>Items</h2>
          <p>Total: 100</p>
          <p>Type: 80</p>
        </div>
        <div className='dashboard-card'>
          <h2>Blogs</h2>
          <p>Total: 100</p>
          <p>Type: 80</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
