import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminManagerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "",
    managerType: "",
    emailOrUsername: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8500/user/login-adminAndManger",
        formData
      );
      const { role } = response.data;

      if (role === "Admin") {
        navigate("/AdminHome");
      } else if (role === "Manager") {
        if (formData.managerType === "") {
          toast.error("Please select a manager type");
          return;
        }
        // Redirect based on manager type
        switch (formData.managerType) {
          case "Inventory":
            navigate("/user/inventory");
            break;
          case "Supplier":
            navigate("/supplier/supplierManager/Home");
            break;
          case "Transport":
            navigate("/TransportHome");
            break;
          case "Feedback":
            navigate("/ComplaintHome");
            break;
          case "Finance":
            navigate("/financeHome");
            break;
          case "Employee":
            navigate("/user/employee");
            break;
          case "Order":
            navigate("/user/order");
            break;
          default:
            toast.error("Invalid manager type");
            return;
        }
      }
      toast.success("Logged in successfully!");
      console.log("Login successful");
      alert("You have logged in successfully!");
    } catch (error) {
      console.error("Login error:", error.response.data.error);
      toast.error("Login error!");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="col-md-4">
        <div className="card shadow p-3 mb-5 bg-body rounded">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">
              WELCOME TO APPAREL AVENUE
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Role:
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
              {formData.role === "Manager" && (
                <div className="mb-3">
                  <label htmlFor="managerType" className="form-label">
                    Manager Type:
                  </label>
                  <select
                    id="managerType"
                    name="managerType"
                    value={formData.managerType}
                    onChange={handleChange}
                    className="form-select"
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
              )}
              <div className="mb-3">
                <label htmlFor="emailOrUsername" className="form-label">
                  Email/Username:
                </label>
                <input
                  type="text"
                  id="emailOrUsername"
                  name="emailOrUsername"
                  value={formData.emailOrUsername}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", top: 10, right: 10 }}>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AdminManagerLogin;
