import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

function EditDriver() {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    nicNo: "",
    email: "",
    address: "",
    phoneNo: "",
    licenseType: "",
  });

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const response = await axios.get(`http://localhost:8500/driver/get/${Id}`);
        const driverData = response.data;
        setFormData(driverData);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchDriver();
  }, [Id]);

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
      await axios.put(`http://localhost:8500/driver/update/${Id}`, formData);
      console.log("Driver details updated successfully!");
      toast.success("Driver details updated successfully!");
      navigate("/driver/");
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to update driver details");
    }
  };
  const validateForm = () => {
    const { fullName, nicNo, email, address, phoneNo, licenseType } = formData;
    if (!fullName || !nicNo || !email || !address || !phoneNo || !licenseType) {
      toast.error("All fields are required.");
      return false;
    }
    if (!/^(?:[0-9]{9}[vV]?|[0-9]{12})$/.test(nicNo)) {
      toast.error("Invalid NIC number. NIC number must be either 9 digits ending with 'v' or 'V', or 12 digits.");
      return false;
    }
    if (!/^\d{10}$/.test(phoneNo)) {
      toast.error("Contact number must be 10 digits.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email address.");
      return false;
    }
    
    return true;
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="col-md-4">
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Edit Driver</h2>
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
                <label htmlFor="nicNo" className="form-label">
                  NIC Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nicNo"
                  name="nicNo"
                  value={formData.nicNo}
                  onChange={handleChange}
                  required
                />
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
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNo" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNo"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="licenseType" className="form-label">
                  License Type
                </label>
                <select
                  className="form-select"
                  id="licenseType"
                  name="licenseType"
                  value={formData.licenseType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select License Type</option>
                  <option value="Type A">Type A</option>
                  <option value="Type B">Type B</option>
                  <option value="Type C">Type C</option>
                  <option value="Type M">Type M</option>
                </select>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Update
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

export default EditDriver;
