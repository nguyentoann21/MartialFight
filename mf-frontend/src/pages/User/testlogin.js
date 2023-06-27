import React, { useState } from 'react';
import axios from 'axios';

const TestLogin = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7052/api/mf/login', {
        usernameOrEmail,
        password
      });

      console.log('API response:', response.data);

      if (response.data && response.data.role === 1) {
        // Redirect or perform actions for admin user
        console.log('Admin login successful');
      } else if (response.data && response.data.role === 0) {
        // Redirect or perform actions for player user
        console.log('Player login successful');
      } else {
        // Handle unrecognized role
        console.error('Unrecognized role');
      }
    } catch (error) {
      // Handle login error (e.g., display error message, clear input fields, etc.)
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username or Email:</label>
          <input
            type="text"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default TestLogin;
