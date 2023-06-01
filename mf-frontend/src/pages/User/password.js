import React, { useState, useEffect } from "react";
import { FaEyeSlash, FaEye, FaArrowLeft, FaClock } from "react-icons/fa";
import "./password.scss";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showReNew, setShowReNew] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("");
  const [remainingSeconds, setRemainingSeconds] = useState(3);

  useEffect(() => {
    let countdownTimer;
    if (dialogVisible && remainingSeconds > 0) {
      countdownTimer = setInterval(() => {
        setRemainingSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => {
      clearInterval(countdownTimer);
    };
  }, [dialogVisible, remainingSeconds]);

  const handleShowCurrent = () => {
    setShowCurrent((cur) => !cur);
  };

  const handleShowNew = () => {
    setShowNew((pwd) => !pwd);
  };

  const handleShowReNew = () => {
    setShowReNew((re) => !re);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password validation checks
    if (oldPassword !== "123456") {
      showDialog("error", "Current password is incorrect");
    } else if (newPassword.length < 6 || newPassword.length > 32) {
      showDialog("error", "New password must be between 6 and 32 characters");
    } else if (newPassword !== rePassword) {
      showDialog("error", "New password and re-entered password do not match");
    } else if (newPassword === oldPassword) {
      showDialog(
        "error",
        "New password must be different from the current password"
      );
    } else {
      showDialog("success", "Password successfully changed");
    }
  };

  const handleChangePasswordBack = () => {
    window.location.href = "profile";
  };

  const showDialog = (type, message) => {
    setDialogType(type);
    setDialogMessage(message);
    setDialogVisible(true);
    setRemainingSeconds(3);

    if (type === "error") {
      setTimeout(() => {
        setDialogVisible(false);
      }, 3000);
    } else if (type === "success") {
      setTimeout(() => {
        window.location.href = "sign-in";
      }, 3000);
    }
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  return (
    <div className="change-password-container">
      <div className="change-password-form">
        <h2>Change Password</h2>
        <div className="input-container">
          <label htmlFor="old-password">Current Password</label>
          <input
            type={showCurrent ? "text" : "password"}
            id="old-password"
            name="old-password"
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
            placeholder="Enter your current password"
            required
          />
          <div
            className="password-icons"
            type="button"
            onClick={handleShowCurrent}
          >
            {showCurrent ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="new-password">New Password</label>
          <input
            type={showNew ? "text" : "password"}
            id="new-password"
            name="new-password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            placeholder="Enter your new password"
            required
          />
          <div className="password-icons" type="button" onClick={handleShowNew}>
            {showNew ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="re-password">Re-Password</label>
          <input
            type={showReNew ? "text" : "password"}
            id="re-password"
            name="re-password"
            value={rePassword}
            onChange={(event) => setRePassword(event.target.value)}
            placeholder="Enter your re-password"
            required
          />
          <div
            className="password-icons"
            type="button"
            onClick={handleShowReNew}
          >
            {showReNew ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <div className="change-password-action">
          <button onClick={handleSubmit}>Change Password</button>
        </div>
        <div className="change-password-back">
          <button onClick={handleChangePasswordBack}>
            <FaArrowLeft />
          </button>
        </div>
      </div>
      {dialogVisible && (
        <div className={`dialog ${dialogType}`}>
          <div className="dialog-content">
            <p>{dialogMessage}</p>
            <FaClock />
            {dialogType === "success" ? (
              <h5>{`Redirect to Sign In page after ${remainingSeconds} seconds`}</h5>
            ) : (
              <h6>{`Closing in ${remainingSeconds} seconds`}</h6>
            )}
            <button className="dialog-close" onClick={closeDialog}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
