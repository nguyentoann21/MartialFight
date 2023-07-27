import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./updateProfile.scss";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    gender: "",
    avatarUrl: null,
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [accountDataLoaded, setAccountDataLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(null);

  const account = JSON.parse(localStorage.getItem("ACCOUNT_DATA"));

  const history = useNavigate();
  useEffect(() => {
    if(!account) {
      history('/');
    }
  }, [account, history]);

  useEffect(() => {
    if (!accountDataLoaded && account) {
      setFormData({
        email: account.email,
        fullname: account.fullname,
        gender: account.gender,
        avatarUrl: account.avatarUrl,
      });
      setAccountDataLoaded(true);
    }
  }, [account, accountDataLoaded]);

  useEffect(() => {
    if (formData.avatarUrl) {
      setAvatarPreviewUrl(
        `https://localhost:7052/Images/${formData.avatarUrl}`
      );
    }
  }, [formData.avatarUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setSelectedImage(imageFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreviewUrl(reader.result);
    };
    reader.readAsDataURL(imageFile);
  };

  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialogAndNavigate = () => {
    setDialogOpen(false);
    setStatusMessage("");

    if (statusMessage === "Profile updated successfully!") {
      history("/");
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ACCOUNT_DATA");
    history("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();

    if (selectedImage) {
      formDataObj.append("AvatarUrl", selectedImage);
    }

    if (formData.email !== account?.email) {
      formDataObj.append("Email", formData.email);
    }

    if (formData.fullname !== account?.fullname) {
      formDataObj.append("Fullname", formData.fullname);
    }

    if (formData.gender !== account?.gender) {
      formDataObj.append("Gender", formData.gender);
    }

    try {
      if (account) {
        await axios.put(
          `https://localhost:7052/api/mf/update-profile?id=${account.accountID}`,
          formDataObj,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      setStatusMessage("Profile updated successfully!");
      openDialog();
    } catch (error) {
      if (error.response) {
        setStatusMessage(error.response.data);
      } else {
        setStatusMessage("Error occurred during update");
      }
      openDialog();
    }
  };

  return (
    <div className="update-profile-page">
      <div className="update-profile-form">
        <h2>Update Profile</h2>
        {statusMessage && typeof statusMessage === "string" ? (
          <div>{statusMessage}</div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className="update-avatar">
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
          <div className="update-email">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="update-fullname">
            <label htmlFor="fullname">Full Name:</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="update-gender">
            <label>Gender:</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender.toLocaleLowerCase() === "male"}
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
                  checked={formData.gender.toLocaleLowerCase() === "female"}
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
                  checked={formData.gender.toLocaleLowerCase() === "other"}
                  onChange={handleChange}
                  required
                />
                Other
              </label>
            </div>
          </div>
          <div className="update-buttons">
            <button className="update-button-action" type="submit">
              Update
            </button>
            <button
              className="update-button-cancel"
              type="submit"
              onClick={() => history("/profile")}
            >
              Cancel
            </button>
          </div>
        </form>
        {isDialogOpen && (
          <div className="dialog-update-profile">
            <div className="dialog-update-profile-container">
            <h3>Update Status</h3>
            <div className="dialog-update-profile-content">{statusMessage}</div>
            <button onClick={closeDialogAndNavigate}>OK</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
