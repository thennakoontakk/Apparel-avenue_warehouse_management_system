import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function ChangePassword() {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [currentPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "oldPassword") {
      setOldPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.put(
        `http://localhost:8500/user/change-password/${Id}`,
        { currentPassword, newPassword }
      );
      console.log(response.data.message);
      toast.success(response.data.message);
      toast.success("Password changed successfully!");
      alert("Password changed successfully!");

      // Navigate based on user role
      navigate(getRedirectUrl(Id));
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to change password.");
    }
  };

  const validateForm = () => {
    if (!currentPassword || !newPassword) {
      toast.error("All password fields are required.");
      return false;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const getRedirectUrl = (userId) => {
    if (userId.startsWith("MAN")) {
      return "/user/allmanagers";
    } else if (userId.startsWith("AD")) {
      return "/user/allAdmins";
    } else if (userId.startsWith("CU")) {
      return `/user/customer-profile/${userId}`;
    } else {
      return "/";
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="col-md-4">
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Change Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="oldPassword" className="form-label">
                  Old Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="oldPassword"
                  name="oldPassword"
                  value={currentPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ChangePassword;
