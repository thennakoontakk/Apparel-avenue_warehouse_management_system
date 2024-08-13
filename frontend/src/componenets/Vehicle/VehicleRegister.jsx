import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const initialState = {
  ownerName: "",
  ownerNIC: "",
  ownerAddress: "",
  ownerContactNo: "",
  registrationNumber: "",
  model: "",
  capacity: "",
};

function VehicleRegister() {
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
    if (!validateForm()) {
      return; // Don't proceed with submission if there are validation errors
    }

    try {
      const response = await axios.post(
        "http://localhost:8500/vehicle/add",
        formData
      );
      console.log(response.data);
      toast.success("Vehicle registered successfully!");
      setFormData(initialState);
      navigate("/vehicle/");
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to register vehicle");
    }
  };

  const validateForm = () => {
    const {
      ownerName,
      ownerNIC,
      ownerAddress,
      ownerContactNo,
      registrationNumber,
      model,
      capacity,
    } = formData;

    // Check if all fields are filled out
    if (
      !ownerName ||
      !ownerNIC ||
      !ownerAddress ||
      !ownerContactNo ||
      !registrationNumber ||
      !model ||
      !capacity
    ) {
      toast.error("All fields are required.");
      return false;
    }

    // Validate owner NIC format
    if (!/^[0-9]{9}(vV)?|[0-9]{12}$/.test(ownerNIC)) {
      toast.error(
        "Invalid NIC number. NIC number must be either 9 digits ending with 'v' or 'V', or 12 digits."
      );
      return false;
    }

    // Validate registration number format
    if (!/^[A-Z]{2,3}\s\d{4}$/.test(registrationNumber)) {
      toast.error(
        "Invalid registration number. Format should be: AB 1234 or ABC 1234."
      );
      return false;
    }

    // Check if contact number is 10 digits
    if (!/^\d{10}$/.test(ownerContactNo)) {
      toast.error("Contact number must be 10 digits.");
      return false;
    }
    // Check if capacity is a positive number
  if (capacity <= 0) {
    toast.error("Capacity must be a positive number.");
    return false;
  }

    return true;
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="col-md-8">
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">
              Vehicle Registration
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="ownerName" className="form-label">
                      Owner Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ownerName"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="ownerNIC" className="form-label">
                      Owner NIC Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ownerNIC"
                      name="ownerNIC"
                      value={formData.ownerNIC}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="ownerAddress" className="form-label">
                      Owner Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ownerAddress"
                      name="ownerAddress"
                      value={formData.ownerAddress}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="ownerContactNo"
                      className="form-label"
                    >
                      Owner Contact Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ownerContactNo"
                      name="ownerContactNo"
                      value={formData.ownerContactNo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label
                      htmlFor="registrationNumber"
                      className="form-label"
                    >
                      Registration Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="registrationNumber"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="model" className="form-label">
                      Vehicle Model
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="model"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="capacity" className="form-label">
                      Capacity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="capacity"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-sm btn-primary">
                  Register
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

export default VehicleRegister;
