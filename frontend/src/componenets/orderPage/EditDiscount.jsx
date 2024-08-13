import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

//import toast
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditDiscount() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: "", // Edit this field as needed
    expiry: "", // Edit this field as needed
    percentage: "", // Edit this field as needed
  });

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8500/discount/get/${id}`
        );
        const discountData = response.data;
        setFormData(discountData);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchDiscount();
  }, [id]);

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
      await axios.put(`http://localhost:8500/discount/update/${id}`, formData);

      console.log("Discount details updated successfully!");
      toast.success("Discount details updated successfully!");
      navigate("/discount/alldiscounts");
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to update discount details.");
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
      <div className="col-md-4">
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Edit Admin</h2>
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
                  Update Discount
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

export default EditDiscount;
