import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TestLogin = () => {
  const [accountData, setAccountData] = useState('null');
  const [avatar, setAvatar] = useState('');
  const history = useNavigate();

  useEffect(() => {
    // Retrieve the account data from local storage
    const storedAccountData = localStorage.getItem('ACCOUNT_DATA');
    
    if (storedAccountData) {
      const data = JSON.parse(storedAccountData);
      setAccountData(JSON.parse(storedAccountData));
      setAvatar(data.avatarUrl);
      console.log(1)
    } else {
      // If account data is not found, redirect to login page
      history('/');
      console.log(0)
    }
  }, [history]); // Remove the dependency array as it should only run once
  
  console.log(accountData);

  const handleLogout = () => {
    // Clear the account data from local storage and redirect to login page
    localStorage.removeItem('ACCOUNT_DATA');
    history('/');
  };

  return (
    <div>
      {accountData ? (
        <div>
          <h2>{accountData.role === 1 ? "admin": "player"}</h2>
          <p>Username: {accountData.username}</p>
          <p>Email: {accountData.email}</p>
          <img width={100} height={100} src={`https://localhost:7052/Images/${avatar}`} alt={accountData.fullname} />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading account data...</p>
      )}
    </div>
  );
};

export default TestLogin;
