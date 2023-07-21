import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TestUpdateProfile = () => {
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

    // Show the selected image preview here
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreviewUrl(reader.result);
    };
    reader.readAsDataURL(imageFile);
  };

  const [isDialogOpen, setDialogOpen] = useState(false);

  // Function to open the dialog with a given message
  const openDialog = () => {
    setDialogOpen(true);
  };

  // Function to close the dialog and navigate to the Profile page
  const closeDialogAndNavigate = () => {
    setDialogOpen(false);
    setStatusMessage("");

    if (statusMessage === "Profile updated successfully!") {
      // Redirect to home page and perform logout
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

    // Append the image file with the correct key name (AvatarUrl) to match the server-side
    if (selectedImage) {
      formDataObj.append("AvatarUrl", selectedImage); // Match the property names in UpdateProfileModel
    }

    if (formData.email !== account?.email) {
      formDataObj.append("Email", formData.email); // Match the property names in UpdateProfileModel
    }

    if (formData.fullname !== account?.fullname) {
      formDataObj.append("Fullname", formData.fullname); // Match the property names in UpdateProfileModel
    }

    if (formData.gender !== account?.gender) {
      formDataObj.append("Gender", formData.gender); // Match the property names in UpdateProfileModel
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
    <div className="update-profile-form">
      <h2>Update Profile</h2>
      {statusMessage && typeof statusMessage === "string" ? (
        <div>{statusMessage}</div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <div className="avatar">
          <label>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
            {/* Show selected image preview */}
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
        <div>
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
        <div>
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
        <div>
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

        <button type="submit">Update Profile</button>
      </form>

      {/* Dialog */}
      {isDialogOpen && (
        <div className="dialog">
          <h2>Update Status</h2>
          <div>{statusMessage}</div>
          <button onClick={closeDialogAndNavigate}>OK</button>
        </div>
      )}
    </div>
  );
};

export default TestUpdateProfile;
