import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./adminProfile.scss";

const AdminProfile = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    reNewPassword: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReNewPassword, setShowReNewPassword] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [remainingSeconds, setRemainingSeconds] = useState(5);
  const account = JSON.parse(localStorage.getItem("ADMIN_DATA"));
  const [isUpdateProfile, setIsUpdateProfile] = useState(false);

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

  const handleUpdate = () => {
    setIsUpdateProfile(true);
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
      formData.currentPassword.trim() === "" ||
      formData.newPassword.trim() === "" ||
      formData.reNewPassword.trim() === ""
    ) {
      showDialog("error", "All fields are required");
      return;
    }

    if (formData.newPassword !== formData.reNewPassword) {
      showDialog("error", "New password and re-entered password must match");
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
      showDialog("success", "Password successfully changed");
    } catch (error) {
      setStatusMessage(error.response.data);
      showDialog("error", error.response.data);
    }
  };

  const handleReset = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      reNewPassword: "",
    });
    setDialogType(null);
  };

  const showDialog = (type, message) => {
    setDialogType(type);
    setStatusMessage(message);
    setRemainingSeconds(5);

    if (type === "error") {
      setTimeout(() => {
        setDialogType(null);
      }, 3000);
    } else if (type === "success") {
      setTimeout(() => {
        setFormData({
          currentPassword: "",
          newPassword: "",
          reNewPassword: "",
        });
        setDialogType(null);
      }, 3000);
    }
  };

  const closeDialog = () => {
    setDialogType(null);
  };

  const [formUpdate, setFormUpdate] = useState({
    email: "",
    fullname: "",
    gender: "",
    avatarUrl: null,
  });

  const [updateMessage, setUpdateMessage] = useState("");
  const [accountUpdateLoaded, setAccountUpdateLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    if (!accountUpdateLoaded && account) {
      setFormUpdate({
        email: account.email,
        fullname: account.fullname,
        gender: account.gender,
        avatarUrl: account.avatarUrl,
      });
      setAccountUpdateLoaded(true);
    }
  }, [account, accountUpdateLoaded]);

  useEffect(() => {
    if (formUpdate.avatarUrl) {
      setAvatarPreviewUrl(
        `https://localhost:7052/Images/${formUpdate.avatarUrl}`
      );
    }
  }, [formUpdate.avatarUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormUpdate({ ...formUpdate, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setSelectedImage(imageFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreviewUrl(reader.result);
    };
    reader.readAsUpdateURL(imageFile);
  };

  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialogAndNavigate = () => {
    setDialogOpen(false);
    setUpdateMessage("");

    if (updateMessage === "Profile updated successfully!") {
      history("/");
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ADMIN_DATA");
    localStorage.setItem('activeItem', "Dashboard");
    history("/");
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const updateObj = new FormData();

    if (selectedImage) {
      updateObj.append("AvatarUrl", selectedImage);
    }

    if (formUpdate.email !== account?.email) {
      updateObj.append("Email", formUpdate.email);
    }

    if (formUpdate.fullname !== account?.fullname) {
      updateObj.append("Fullname", formUpdate.fullname);
    }

    if (formUpdate.gender !== account?.gender) {
      updateObj.append("Gender", formUpdate.gender);
    }

    try {
      if (account) {
        await axios.put(
          `https://localhost:7052/api/mf/update-profile?id=${account.accountID}`,
          updateObj,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      setUpdateMessage("Profile updated successfully!");
      openDialog();
    } catch (error) {
      if (error.response) {
        setUpdateMessage(error.response.data);
      } else {
        setUpdateMessage("Error occurred during update");
      }
      openDialog();
    }
  };

  return (
    <div className="admin-profile-page">
      <div className="admin-profile-update">
        <button onClick={handleUpdate}>Update Profile</button>
        {isUpdateProfile && (
          <>
            <div className="admin-update-profile-page">
              <div className="admin-update-profile-form">
                <h2>Update Profile</h2>
                {updateMessage &&
                typeof updateMessage === "string" ? (
                  <div>{updateMessage}</div>
                ) : null}
                <form onSubmit={handleUpdateSubmit}>
                  <div className="admin-update-avatar">
                    <label>
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                      />
                      {avatarPreviewUrl ? (
                        <img
                          alt="avatar"
                          src={avatarPreviewUrl}
                          width={100}
                          height={100}
                        />
                      ) : null}
                    </label>
                  </div>
                  <div className="admin-update-email">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formUpdate.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="admin-update-fullname">
                    <label htmlFor="fullname">Full Name:</label>
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      value={formUpdate.fullname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="admin-update-gender">
                    <label>Gender:</label>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={
                            formUpdate.gender.toLocaleLowerCase() === "male"
                          }
                          onChange={handleChange}
                          required
                        />
                        Male
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          checked={
                            formUpdate.gender.toLocaleLowerCase() === "female"
                          }
                          onChange={handleChange}
                          required
                        />
                        Female
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="other"
                          checked={
                            formUpdate.gender.toLocaleLowerCase() === "other"
                          }
                          onChange={handleChange}
                          required
                        />
                        Other
                      </label>
                    </div>
                  </div>
                  <div className="admin-update-buttons">
                    <button className="admin-update-button-action" type="submit">
                      Update
                    </button>
                    <button
                      className="admin-update-button-cancel"
                      type="submit"
                      onClick={() => setIsUpdateProfile(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
                {isDialogOpen && (
                  <div className="dialog-admin-update-profile">
                    <div className="dialog-admin-update-profile-container">
                      <h3>Update Status</h3>
                      <div className="dialog-admin-update-profile-content">
                        {updateMessage}
                      </div>
                      <button onClick={closeDialogAndNavigate}>OK</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="admin-change-password">
        <h1>Change Password</h1>
        <div className="admin-change-password-status">
          {dialogType === "success" && (
            <div className="success-dialog" onClick={closeDialog}>
              {statusMessage}
            </div>
          )}
          {dialogType === "error" && (
            <div className="error-dialog" onClick={closeDialog}>
              {statusMessage}
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Current Password:</label>
            <div className="password-input">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={formData.currentPassword}
                onChange={handleCurrentPasswordChange}
                onClick={closeDialog}
                placeholder="Please enter your current password"
              />
              <div className="password-icon" onClick={handleCurrent}>
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>New Password:</label>
            <div className="password-input">
              <input
                type={showNewPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={handleNewPasswordChange}
                onClick={closeDialog}
                placeholder="Please enter your new password"
              />
              <div className="password-icon" onClick={handleNewPassword}>
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Re-typing Password:</label>
            <div className="password-input">
              <input
                type={showReNewPassword ? "text" : "password"}
                value={formData.reNewPassword}
                onChange={handleConfirmPasswordChange}
                onClick={closeDialog}
                placeholder="Please enter your re-typing new password"
              />
              <div className="password-icon" onClick={handleReNewPassword}>
                {showReNewPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <div className="admin-button-group">
            <button
              className="button-reset"
              type="button"
              onClick={handleReset}
            >
              Reset
            </button>
            <button className="button-submit-change" type="submit">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
