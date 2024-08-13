import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditVehicle() {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ownerName: "",
    ownerNIC: "",
    ownerAddress: "",
    ownerContactNo: "",
    registrationNumber: "",
    model: "",
    capacity: "",
  });

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`http://localhost:8500/vehicle/get/${Id}`);
        const vehicleData = response.data;
        setFormData(vehicleData);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchVehicle();
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
      await axios.put(`http://localhost:8500/vehicle/update/${Id}`, formData);
      console.log("Vehicle details updated successfully!");
      toast.success("Vehicle details updated successfully!");
      navigate("/vehicle/");
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to update vehicle details");
    }
  };

  const validateForm = () => {
    const { ownerName, ownerNIC, ownerAddress, ownerContactNo, registrationNumber, model, capacity } = formData;
    if (!ownerName || !ownerNIC || !ownerAddress || !ownerContactNo || !registrationNumber || !model || !capacity) {
      toast.error("All fields are required.");
      return false;
    }
    // Validate owner NIC format
    if (!/^(?:[0-9]{9}[vV]?|[0-9]{12})$/.test(ownerNIC)) {
      toast.error("Invalid NIC number. NIC number must be either 9 digits ending with 'v' or 'V', or 12 digits.");
      return false;
    }
  
      // Validate registration number format
      if (!/^[A-Z]{2,3}\s\d{4}$/.test(registrationNumber)) {
        toast.error("Invalid registration number. Format should be: AB 1234 or ABC 1234.");
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
            <h2 className="card-title text-center mb-4">Edit Vehicle</h2>
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
                <button type="submit" className="btn btn-primary btn-sm">
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

export default EditVehicle;
