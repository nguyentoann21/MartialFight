import React, { useState } from 'react';
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './registration.scss';

const Registration = () => {
  const [avatar, setAvatar] = useState(
    'https://icon-library.com/images/insert-image-icon/insert-image-icon-14.jpg'
  );
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowRePassword = () => {
    setShowRePassword((re) => !re);
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRePasswordChange = (event) => {
    setRePassword(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  return (
    <div className='register-page'>
      <div className='register-form'>
        <div className='close-register'>
          <Link to='/' className='close-icons'>
            <FaTimes />
          </Link>
        </div>
        <h2>Sign Up</h2>
        <div className='avatar'>
          <label>
            <input
              type='file'
              accept='image/*'
              onChange={handleAvatarChange}
              hidden
            />
            <img src={avatar} alt='avatar' />
          </label>
        </div>
        <div className='register-form-input'>
          <div className='form-group-register'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={handleEmailChange}
              placeholder='Enter your email'
              required
            />
            <span id='email'></span>
          </div>
          <div className='form-group-register'>
            <label htmlFor='name'>Name</label>
            <input
              type='name'
              id='name'
              name='name'
              value={name}
              onChange={handleNameChange}
              placeholder='Enter your name'
              required
            />
            <span id='name'></span>
          </div>
          <div className='form-group-register'>
            <label htmlFor='password'>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              value={password}
              onChange={handlePasswordChange}
              placeholder='Enter your password'
              required
            />
            <div
              className='password-icons'
              type='button'
              onClick={handleShowPassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            <span id='password'></span>
          </div>
          <div className='form-group-register'>
            <label htmlFor='rePassword'>Re-Password</label>
            <input
              type={showRePassword ? 'text' : 'password'}
              id='rePassword'
              name='rePassword'
              value={rePassword}
              onChange={handleRePasswordChange}
              placeholder='Enter your re-password'
              required
            />
            <div
              className='password-icons'
              type='button'
              onClick={handleShowRePassword}
            >
              {showRePassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            <span id='re-password'></span>
          </div>
          <div className='form-group-register' id='gender'>
            <label>Gender</label>
            <div className='male-female'>
              <label>
                <input
                  type='radio'
                  name='gender'
                  value='male'
                  checked={gender === 'male'}
                  onChange={handleGenderChange}
                />
                Male
              </label>
              <label>
                <input
                  type='radio'
                  name='gender'
                  value='female'
                  checked={gender === 'female'}
                  onChange={handleGenderChange}
                />
                Female
              </label>
              <label>
                <input
                  type='radio'
                  name='gender'
                  value='other'
                  checked={gender === 'other'}
                  onChange={handleGenderChange}
                />
                Other
              </label>
            </div>
          </div>
          <div className='form-group-register'>
            <label htmlFor='phone' id='phone-number'>Phone</label>
            <input
              type='tel'
              id='phone'
              name='phone'
              value={phone}
              onChange={handlePhoneChange}
              placeholder='Enter your phone'
              required
            />
            <span id='phone'></span>
          </div>
        </div>
        <div className='form-group-button'>
          <button type='submit'>Sign Up</button>
        </div>
        <div className='link-to-sign-in'>
          Already have an account?&nbsp;<Link to='/sign-in'>Sign in here!</Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
