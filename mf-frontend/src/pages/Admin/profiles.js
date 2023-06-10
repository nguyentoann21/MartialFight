import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './adminprofile.css'; // Import the CSS file

const AdminProfile = () => {
  // State for current and new passwords
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [dialogType, setDialogType] = useState(null);

  // Handle current password input change
  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
    setDialogType(null); // Remove error dialog
  };

  // Handle new password input change
  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    setDialogType(null); // Remove error dialog
  };

  // Handle confirm password input change
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setDialogType(null); // Remove error dialog
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Password validation rules
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

    // Perform necessary actions with the current and new passwords
    console.log('Current password:', currentPassword);
    console.log('New password:', newPassword);
    console.log('Confirm password:', confirmPassword);

    // Show success dialog
    setDialogType('success');

    // Reset form fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  // Reset form fields
  const handleReset = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setDialogType(null); // Remove error dialog
  };

  // Close dialog
  const closeDialog = () => {
    setDialogType(null);
  };

  return (
    <div className="change-password">
      <h1>Change Password</h1>
      {dialogType === 'success' && (
        <div className="success-dialog" onClick={closeDialog}>
          Password changed successfully!
        </div>
      )}
      {dialogType === 'error' && (
        <div className="error-dialog" onClick={closeDialog}>
          Error occurred while changing the password.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Current Password:</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              onClick={closeDialog} // Remove error dialog on click
            />
            <div className="toggle-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={handleNewPasswordChange}
              onClick={closeDialog} // Remove error dialog on click
            />
            <div className="toggle-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onClick={closeDialog} // Remove error dialog on click
            />
            <div className="toggle-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <div className="button-group">
          <button type="submit">Change Password</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;
