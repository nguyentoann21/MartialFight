import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TestChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    reNewPassword: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const history = useNavigate();

  const account = JSON.parse(localStorage.getItem("ACCOUNT_DATA"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.reNewPassword) {
      setStatusMessage("New password and re-entered password must match.");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7052/api/mf/change-password",
        { ...formData, accountID: account.accountID },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setStatusMessage(response.data);
      history("/profile");
    } catch (error) {
      setStatusMessage(error.response.data);
    }
  };

  return (
    <div className="change-password-form">
      <h2>Change Password</h2>
      {statusMessage && typeof statusMessage === "string" ? (
        <div>{statusMessage}</div>
      ) : null}
      <form onSubmit={handleSubmit}>
        {/* Input fields for current password, new password, and re-entered new password */}
        <div>
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="reNewPassword">Re-enter New Password:</label>
          <input
            type="password"
            id="reNewPassword"
            name="reNewPassword"
            value={formData.reNewPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Change</button>
      </form>
    </div>
  );
};

export default TestChangePassword;
