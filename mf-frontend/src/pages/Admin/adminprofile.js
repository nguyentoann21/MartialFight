import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './adminprofile.scss'; // Import the CSS file

const AdminProfile = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [dialogType, setDialogType] = useState(null);

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
    setDialogType(null);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    setDialogType(null);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setDialogType(null);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newPassword === currentPassword) {
      setDialogType('error');
      return;
    }

    if (newPassword !== confirmPassword) {
      setDialogType('error');
      return;
    }

    if (newPassword.length < 6 || newPassword.length > 32) {
      setDialogType('error');
      return;
    }

    console.log('Current password:', currentPassword);
    console.log('New password:', newPassword);
    console.log('Confirm password:', confirmPassword);

    setDialogType('success');

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleReset = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setDialogType(null);
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
            Password changed successfully!
          </div>
        )}
        {dialogType === 'error' && (
          <div className='error-dialog' onClick={closeDialog}>
            Error occurred while changing the password.
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Current Password:</label>
          <div className='password-input'>
            <input
              type={showPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              onClick={closeDialog}
            />
            <div className='password-icon' onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <div className='form-group'>
          <label>New Password:</label>
          <div className='password-input'>
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={handleNewPasswordChange}
              onClick={closeDialog}
            />
            <div className='password-icon' onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <div className='form-group'>
          <label>Confirm Password:</label>
          <div className='password-input'>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onClick={closeDialog}
            />
            <div className='password-icon' onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
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
