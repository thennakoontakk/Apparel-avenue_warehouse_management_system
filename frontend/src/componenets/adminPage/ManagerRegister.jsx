import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  fullName: "",
  contactNumber: "",
  username: "",
  managerType: "",
  email: "",
  password: "",
};

function ManagerRegister() {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Validate form before submission
    try {
      const response = await axios.post(
        "http://localhost:8500/user/register-manager",
        formData
      );
      console.log(response.data);
      toast.success("Manager registered successfully!");
      alert("Manager registered successfully!");
      setFormData(initialState);
      navigate("/user/allmanagers");
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to register manager");
    }
  };

  const validateForm = () => {
    const { fullName, contactNumber, username, managerType, email, password } =
      formData;
    if (
      !fullName ||
      !contactNumber ||
      !username ||
      !managerType ||
      !email ||
      !password
    ) {
      toast.error("All fields are required.");
      return false;
    }
    if (!/^\d{10}$/.test(contactNumber)) {
      toast.error("Contact number must be 10 digits.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email address.");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row justify-content-center">
        <div className="col-md-14">
          <div className="card shadow-lg p-3 mb-5 bg-body rounded">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                Manager Registration
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contactNumber" className="form-label">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="managerType" className="form-label">
                    Manager Type
                  </label>
                  <select
                    className="form-select"
                    id="managerType"
                    name="managerType"
                    value={formData.managerType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Manager Type</option>
                    <option value="Inventory">Inventory</option>
                    <option value="Supplier">Supplier</option>
                    <option value="Transport">Transport</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Finance">Finance</option>
                    <option value="Employee">Employee</option>
                    <option value="Order">Order</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ManagerRegister;
