import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import "./profile.scss";

const Profile = () => {
  const [accountData, setAccountData] = useState(null);
  const [avatar, setAvatar] = useState("");
  const history = useNavigate();

  useEffect(() => {
    const storedAccountData = localStorage.getItem("ACCOUNT_DATA");

    if (storedAccountData) {
      const data = JSON.parse(storedAccountData);
      setAccountData(data);
      setAvatar(data.avatarUrl);
    } else {
      history("/");
    }
  }, [history]);

  const handlePasswordChange = () => {
    history("/change-password");
  };

  const handleLogout = () => {
    localStorage.removeItem("ACCOUNT_DATA");
    history("/");
  };

  const handleSaveProfile = () => {
    history("/update-profile");
  };

  return (
    <>
      {accountData ? (
        <div className="profile-container">
          <div className="profile-form">
            <div className="close-profile">
              <Link to="/" className="close-icons">
                <FaTimes />
              </Link>
            </div>
            <div className="avatar-container">
              <label>
                <img
                  src={`https://localhost:7052/Images/${avatar}`}
                  alt="Avatar"
                  className="avatar-image"
                />
              </label>
            </div>
            <div className="profile-main">
              <div className="static-container">
                <div className="static-content">
                  <div className="static-label">Level</div>
                  <p>{accountData.level}</p>
                </div>
                <div className="static-content">
                  <div className="static-label">Challenge</div>
                  <p>{accountData.numberOfMaps}</p>
                </div>
                <div className="static-content">
                  <div className="static-label">Rank Score</div>
                  <p>{accountData.score_PvP}</p>
                </div>
              </div>
              <div className="details-container">
                <div className="details-row">
                  <div className="details-label">Name</div>
                  <div className="details-value">
                    <input
                      type="text"
                      readOnly
                      value={accountData.fullname}
                    />
                  </div>
                </div>
                <div className="details-row">
                  <div className="details-label">Email:</div>
                  <div className="details-value">
                    <input
                      type="email"
                      readOnly
                      value={accountData.email}
                    />
                  </div>
                </div>
                <div className="details-row">
                  <div className="details-label">Gender</div>
                  <div className="details-value">
                    <input
                      id="select"
                      readOnly
                      value={accountData.gender}
                    />
                  </div>
                </div>
                <div className="details-row">
                  <div className="details-label">Username</div>
                  <div className="details-value">
                    <input
                      type="tel"
                      readOnly
                      value={accountData.username}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="actions-container">
              <div className="actions-content">
                <button onClick={handleSaveProfile} className="update-profile">
                  Update Profile
                </button>
                <button
                  onClick={handlePasswordChange}
                  className="change-password"
                >
                  Change Password
                </button>
                <button onClick={handleLogout} className="logout">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading account data...</p>
      )}
    </>
  );
};

export default Profile;
