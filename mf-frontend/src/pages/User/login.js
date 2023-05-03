import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaFacebook, FaTwitter, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import './login.scss';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className='login-page'>
      <div className='login-form'>
        <div className='close-login'>
          <Link to='/' className='close-icons'><FaTimes /></Link>
        </div>
        <h2>Sign In</h2>
        <div className='form-group-login'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder='Enter your email'
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

        <div className='form-group-login'>
          <p className='social-connections-text'>Or Sign in with: </p>
          <div className='social-connections'>
            <div className='social' id='google'>
              <FaGoogle />
              <span>&nbsp;Google</span>
            </div>
            <div className='social' id='facebook'>
              <FaFacebook />
              <span>&nbsp;Facebook</span>
            </div>
            <div className='social' id='twitter'>
              <FaTwitter />
              <span>&nbsp;Twitter</span>
            </div>
          </div>
        </div>
        <p className='line-bottom'></p>
        <div className='link-to-sign-up'>
          Don't have an account? <Link to='/sign-up'>Sign Up here!</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
