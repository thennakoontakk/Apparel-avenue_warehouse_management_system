import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import DriverRating from "../Rate/DriverRating";

const initialState = {
  fullName: "",
  nicNo: "",
  email: "",
  address: "",
  phoneNo: "",
  licenseType: "",
};

function DriverRegister() {
  const [formData, setFormData] = useState(initialState);
  const [registeredDriverName, setRegisteredDriverName] = useState(""); // State to store the registered driver name
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
    if (!validateForm()) {
      return; // Don't proceed with submission if there are validation errors
    }

    try {
      const response = await axios.post(
        "http://localhost:8500/driver/add",
        formData
      );
      console.log(response.data);
      toast.success("Driver registered successfully!");
      alert("Driver registered successfully!");
      setFormData(initialState);
      navigate("/driver/");
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to register driver");
    }
  };

  const validateForm = () => {
    const { fullName, nicNo, email, address, phoneNo, licenseType } = formData;

    // Check if all fields are filled out
    if (!fullName || !nicNo || !email || !address || !phoneNo || !licenseType) {
      toast.error("All fields are required.");
      return false;
    }

    // Validate NIC format
    
    if (!/^(?:[0-9]{9}[vV]?|[0-9]{12})$/.test(nicNo)) {
      toast.error("Invalid NIC number. NIC number must be either 9 digits ending with 'v' or 'V', or 12 digits.");
      return false;
    }
    // Check if email is in a valid format
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email address.");
      return false;
    }
    // Check if contact number is 10 digits
    if (!/^\d{10}$/.test(phoneNo)) {
      toast.error("Contact number must be 10 digits.");
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
              <h2 className="card-title text-center mb-4">Driver Registration</h2>
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
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      {registeredDriverName && (
        <div>
          <h2 className="text-center mt-5">Rate {registeredDriverName}</h2>
          <DriverRating driverName={registeredDriverName} />
        </div>
      )}
    </div>
  );
}

export default DriverRegister;
