import React, { useState } from 'react';
import { FaEyeSlash, FaEye, FaArrowLeft } from 'react-icons/fa';
import "./password.scss";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showReNew, setShowReNew] = useState(false);

  const handleShowCurrent = () => {
    setShowCurrent(cur => !cur);
  };

  const handleShowNew = () => {
    setShowNew(pwd => !pwd);
  };

  const handleShowReNew = () => {
    setShowReNew(re => !re);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('1');
  };

  const handleChangePasswordBack = () => {
    window.location.href = 'profile';
  }

  return (
    <div className="change-password-container">
      <div className="change-password-form">
        <h2>Change Password</h2>
        <div className='input-container'>
          <label htmlFor='old-password'>Current Password</label>
          <input
            type={showCurrent? 'text': 'password'}
            id='old-password'
            name='old-password'
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
            placeholder='Enter your current password'
            required
          />
          <div className='password-icons' type='button' onClick={handleShowCurrent}>
            {showCurrent ? <FaEyeSlash /> : <FaEye />}
          </div>
          <span id='old-password'></span>
        </div>
        <div className='input-container'>
          <label htmlFor='new-password'>New Password</label>
          <input
            type={showNew? 'text': 'password'}
            id='new-password'
            name='new-password'
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            placeholder='Enter your new password'
            required
          />
          <div className='password-icons' type='button' onClick={handleShowNew}>
            {showNew ? <FaEyeSlash /> : <FaEye />}
          </div>
          <span id='new-password'></span>
        </div>
        <div className='input-container'>
          <label htmlFor='re-password'>Re-Password</label>
          <input
            type={showReNew? 'text': 'password'}
            id='re-password'
            name='re-password'
            value={rePassword}
            onChange={(event) => setRePassword(event.target.value)}
            placeholder='Enter your re-password'
            required
          />
          <div className='password-icons' type='button' onClick={handleShowReNew}>
            {showReNew ? <FaEyeSlash /> : <FaEye />}
          </div>
          <span id='re-password'></span>
        </div>
        <div className='change-password-action'>
            <button onClick={handleSubmit}>Change Password</button>
        </div>
        <div className='change-password-back'>
            <button onClick={handleChangePasswordBack}>
                <FaArrowLeft />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
