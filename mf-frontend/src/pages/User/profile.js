import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import './profile.scss';

const Profile = () => {
  const [name, setName] = useState('S-Chat Key');
  const [email, setEmail] = useState('mplkingofworld@gmail.com');
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('nguyentoann21');
  const [avatarUrl, setAvatarUrl] = useState(
    'https://i.pinimg.com/736x/94/3f/cf/943fcf1ad73de4334e083475d1ab9541.jpg'
  );

  const handlePasswordChangeClick = () => {
    window.location.href = '/change-password';
  };

  const handleLogout = () => {
    console.log('logout');
  };

  const handleSaveProfile = () => {
    console.log('Save');
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleAvatarChange = (event) => {
    setAvatarUrl(event.target.value);
  };

  return (
    <div className='profile-container'>
      <div className='profile-form'>
        <div className='close-profile'>
          <Link to='/' className='close-icons'>
            <FaTimes />
          </Link>
        </div>
        <div className='avatar-container'>
          <label>
            <input
              type='file'
              accept='image/*'
              onChange={handleAvatarChange}
              className='avatar-input'
              hidden
            />
            <img src={avatarUrl} alt='Avatar' className='avatar-image' />
          </label>
        </div>
        <div className='profile-main'>
          <div className='static-container'>
            <div className='static-content'>
              <div className='static-label'>Level</div>
              <p>100</p>
            </div>
            <div className='static-content'>
              <div className='static-label'>Challenge</div>
              <p>120</p>
            </div>
            <div className='static-content'>
              <div className='static-label'>Rank</div>
              <p>Gold</p>
            </div>
          </div>
          <div className='details-container'>
            <div className='details-row'>
              <div className='details-label'>Name</div>
              <div className='details-value'>
                <input type='text' value={name} onChange={handleNameChange} />
              </div>
            </div>
            <div className='details-row'>
              <div className='details-label'>Email:</div>
              <div className='details-value'>
                <input
                  type='email'
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>
            <div className='details-row'>
              <div className='details-label'>Gender</div>
              <div className='details-value'>
                <select value={gender} onChange={handleGenderChange}>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Other'>Other</option>
                </select>
              </div>
            </div>
            <div className='details-row'>
              <div className='details-label'>Username</div>
              <div className='details-value'>
                <input type='tel' value={phone} onChange={handlePhoneChange} />
              </div>
            </div>
          </div>
        </div>
        <div className='actions-container'>
          <div className='actions-content'>
            <button onClick={handleSaveProfile} className='save'>
              Save
            </button>
            <button onClick={handlePasswordChangeClick} className='change-password'>
              Change Password
            </button>
            <button onClick={handleLogout} className='logout'>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
