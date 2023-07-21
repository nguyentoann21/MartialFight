import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import './adminprofile.scss';

const AdminProfile = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    reNewPassword: '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReNewPassword, setShowReNewPassword] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [remainingSeconds, setRemainingSeconds] = useState(5);

  const account = JSON.parse(localStorage.getItem('ADMIN_DATA'));

  useEffect(() => {
    let countdownTimer;
    if (dialogType && remainingSeconds > 0) {
      countdownTimer = setInterval(() => {
        setRemainingSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => {
      clearInterval(countdownTimer);
    };
  }, [dialogType, remainingSeconds]);

  const handleCurrentPasswordChange = (event) => {
    setFormData({ ...formData, currentPassword: event.target.value });
    setDialogType(null);
  };

  const handleNewPasswordChange = (event) => {
    setFormData({ ...formData, newPassword: event.target.value });
    setDialogType(null);
  };

  const handleConfirmPasswordChange = (event) => {
    setFormData({ ...formData, reNewPassword: event.target.value });
    setDialogType(null);
  };

  const handleCurrent = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleReNewPassword = () => {
    setShowReNewPassword(!showReNewPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      formData.currentPassword.trim() === '' ||
      formData.newPassword.trim() === '' ||
      formData.reNewPassword.trim() === ''
    ) {
      showDialog('error', 'All fields are required');
      return;
    }

    if (formData.newPassword !== formData.reNewPassword) {
      showDialog('error', 'New password and re-entered password must match');
      return;
    }

    try {
      const response = await axios.post(
        'https://localhost:7052/api/mf/change-password',
        { ...formData, accountID: account.accountID },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setStatusMessage(response.data);
      showDialog('success', 'Password successfully changed');
    } catch (error) {
      setStatusMessage(error.response.data);
      showDialog('error', error.response.data);
    }
  };

  const handleReset = () => {
    setFormData({
      currentPassword: '',
      newPassword: '',
      reNewPassword: '',
    });
    setDialogType(null);
  };

  const showDialog = (type, message) => {
    setDialogType(type);
    setStatusMessage(message);
    setRemainingSeconds(5);

    if (type === 'error') {
      setTimeout(() => {
        setDialogType(null);
      }, 3000);
    } else if (type === 'success') {
      setTimeout(() => {
        setFormData({
          currentPassword: '',
          newPassword: '',
          reNewPassword: '',
        });
        setDialogType(null);
      }, 3000);
    }
  };

  const closeDialog = () => {
    setDialogType(null);
  };

  return (
    <div className='admin-change-password'>
      <h1>Change Password</h1>
      <div className='admin-change-password-status'>
        {dialogType === 'success' && (
          <div className='success-dialog' onClick={closeDialog}>
            {statusMessage}
          </div>
        )}
        {dialogType === 'error' && (
          <div className='error-dialog' onClick={closeDialog}>
            {statusMessage}
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Current Password:</label>
          <div className='password-input'>
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              value={formData.currentPassword}
              onChange={handleCurrentPasswordChange}
              onClick={closeDialog}
              placeholder='Please enter your current password'
            />
            <div className='password-icon' onClick={handleCurrent}>
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <div className='form-group'>
          <label>New Password:</label>
          <div className='password-input'>
            <input
              type={showNewPassword ? 'text' : 'password'}
              value={formData.newPassword}
              onChange={handleNewPasswordChange}
              onClick={closeDialog}
              placeholder='Please enter your new password'
            />
            <div className='password-icon' onClick={handleNewPassword}>
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <div className='form-group'>
          <label>Re-typing Password:</label>
          <div className='password-input'>
            <input
              type={showReNewPassword ? 'text' : 'password'}
              value={formData.reNewPassword}
              onChange={handleConfirmPasswordChange}
              onClick={closeDialog}
              placeholder='Please enter your re-typing new password'
            />
            <div className='password-icon' onClick={handleReNewPassword}>
              {showReNewPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <div className='admin-button-group'>
          <button className='button-reset' type='button' onClick={handleReset}>
            Reset
          </button>
          <button className='button-submit-change' type='submit'>
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;
