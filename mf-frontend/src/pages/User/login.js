import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.scss';

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  useEffect(() => {
    const storedUsernameOrEmail = localStorage.getItem('loginUsernameOrEmail');
    const storedPassword = localStorage.getItem('loginPassword');
    const storedRememberMe = localStorage.getItem('loginRememberMe');

    if (storedUsernameOrEmail) {
      setUsernameOrEmail(storedUsernameOrEmail);
    }

    if (storedPassword) {
      setPassword(storedPassword);
    }

    if (storedRememberMe) {
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem('loginUsernameOrEmail', usernameOrEmail);
      localStorage.setItem('loginPassword', password);
      localStorage.setItem('loginRememberMe', 'true');
    } 
    else 
    {
      localStorage.removeItem('loginUsernameOrEmail');
      localStorage.removeItem('loginPassword');
      localStorage.removeItem('loginRememberMe');
    }
  }, [rememberMe, usernameOrEmail, password]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7052/api/mf/login', {
        usernameOrEmail,
        password,
        rememberMe
      });

      if (response.data && response.data.role === 1) {
        localStorage.setItem('ADMIN_DATA', JSON.stringify(response.data));
        navigate('/dashboard');
        console.log('Admin login successful');
      } else if (response.data && response.data.role === 0) {
        localStorage.setItem('ACCOUNT_DATA', JSON.stringify(response.data));
        navigate('/');
        console.log('Player login successful');
      } else { 
        console.error('Unrecognized role');
      }
    } 
    catch (error) 
    {
      if (error.response && error.response.status === 401) {
        setError('Incorrect username/email or password');
      } else if (error.response && error.response.status === 403){
        setError('Your account is banned');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className='login-page'>
      <form className='login-form' onSubmit={handleLogin} >
        <div className='close-login'>
          <Link to='/' className='close-icons'><FaTimes /></Link>
        </div>
        <h2>Sign In</h2>
        <span className='login-error-display'>{error && <p>{error}</p>}</span>
        <div className='form-group-login'>
          <label htmlFor='usernameOrEmail'>Username Or Email</label>
          <input
            type='usernameOrEmail'
            id='usernameOrEmail'
            name='usernameOrEmail'
            value={usernameOrEmail}
            onChange={(event) => setUsernameOrEmail(event.target.value)}
            placeholder='Enter your username or email'
            required
          />
          <span id='email'></span>
        </div>
        <div className='form-group-login'>
          <label htmlFor='password'>Password</label>
          <input
            type={showPassword? 'text': 'password'}
            id='password'
            name='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder='Enter your password'
            required
          />
          <div className='password-icons' type='button' onClick={handleShowPassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
          <span id='password'></span>
        </div>
        <div className='form-group-login'>
          <div className='remember-me'>
            <input
              type='checkbox'
              id='remember-me'
              name='remember-me'
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
            />
            <label htmlFor='remember-me'>Remember me</label>
          </div>
          <Link to='/forgot-password' id='forgot-password-link'>
            Forgot password?
          </Link>
        </div>
        <div className='form-group-login'>
          <button type='submit'>Sign In</button>
        </div>
        <p className='line-bottom'></p>
        <div className='link-to-sign-up'>
          Don't have an account? <Link to='/sign-up'>Sign Up here!</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
