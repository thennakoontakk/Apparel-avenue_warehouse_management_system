import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//toast messages
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const initialState = {
  code: "",
  expiry: "",
  percentage: "",
};

function DiscountRegister() {
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

    // Validation
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:8500/discount/add",
        formData
      );
      console.log(response.data);
      toast.success("Discount Added successfully!"); // Display success toast message
      alert("Discount Added successfully!");
      setFormData(initialState); // Reset form fields using initialState
      navigate("/discount/alldiscounts");
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data.error : error.message
      );
      toast.error("Failed to add discount"); // Display error toast message
    }
  };

  const validateForm = () => {
    const { code, expiry, percentage } = formData;

    // Check if all fields are filled out
    if (!code || !expiry || !percentage) {
      toast.error("All fields are required.");
      return false;
    }

    // Check if expiry date is in the future
    const currentDate = new Date();
    const expiryDate = new Date(expiry);
    if (expiryDate <= currentDate) {
      toast.error("Expiry date must be in the future.");
      return false;
    }

    // Check if percentage is a valid number between 0 and 100
    const percentageNum = parseFloat(percentage);
    if (isNaN(percentageNum) || percentageNum < 0 || percentageNum > 100) {
      toast.error("Percentage must be a number between 0 and 100.");
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
                Discount Registration
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="code" className="form-label">
                    Discount code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="expiry" className="form-label">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="expiry"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="percentage" className="form-label">
                    Percentage
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="percentage"
                    name="percentage"
                    value={formData.percentage}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Add Discount
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

export default DiscountRegister;
