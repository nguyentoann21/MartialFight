import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.scss';

const Dashboard = () => {
  const account = JSON.parse(localStorage.getItem('ADMIN_DATA'));
  const history = useNavigate();
  useEffect(() => {
    if(!account) {
      history('/');
    }
  }, [account, history]);

  return (
    <div className='dashboard-container'>
      <h1>Admin Dashboard</h1>
      <div className='dashboard-grid'>
        <div className='dashboard-card'>
          <h2>Accounts</h2>
          <p>100</p>
        </div>
        <div className='dashboard-card'>
          <h2>Characters</h2>
          <p>100</p>
        </div>
        <div className='dashboard-card'>
          <h2>News</h2>
          <p>100</p>
        </div>
        <div className='dashboard-card'>
          <h2>Maps</h2>
          <p>100</p>
        </div>
        <div className='dashboard-card'>
          <h2>Sects</h2>
          <p>100</p>
        </div>
        <div className='dashboard-card'>
          <h2>Skills</h2>
          <p>100</p>
        </div>
        <div className='dashboard-card'>
          <h2>Categories</h2>
          <p>100</p>
        </div>
        <div className='dashboard-card'>
          <h2>Items</h2>
          <p>100</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
