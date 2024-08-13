import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const initialState = {
  orderID: "",
  customerName: "",
  address: "",
  driverID: "",
  driverName: "",
  vehicleRegNo: "",
  orderStatus: "",
  dispatchDate: "",
  deliveredDate: "",
};

function AssignRegister() {
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
        "http://localhost:8500/assign/add",
        formData
      );
      console.log(response.data);
      toast.success("Assignment added successfully!");
      setFormData(initialState);
      navigate("/assign/");
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to add assignment");
    }
  };

  const validateForm = () => {
    // Check if all required fields are present
    const { orderID, customerName, address, driverID, driverName, vehicleRegNo, orderStatus, dispatchDate } = formData;
    if (!orderID || !customerName || !address || !driverID || !driverName || !vehicleRegNo || !orderStatus || !dispatchDate ) {
      toast.error("All fields are required.");
      return false;
    }
  
    // Validate driver ID format
    if (!/^DR\d{4}$/.test(driverID)) {
      toast.error("Driver ID must start with 'DR' followed by four digits.");
      return false;
    }
  
    // Validate registration number format
    if (!/^[A-Z]{2,3}\s\d{4}$/.test(vehicleRegNo)) {
      toast.error(
        "Invalid registration number. Format should be: AB 1234 or ABC 1234."
      );
      return false;
    }
    // Check if dispatch date is in a valid format
    const dispatchDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
    if (!dispatchDate.match(dispatchDateRegex)) {
      toast.error("Invalid dispatch date format.");
      return false;
    }

    // Check if dispatch date is in the future
    const dispatchDateTime = new Date(dispatchDate);
    const currentDateTime = new Date();
    if (dispatchDateTime > currentDateTime) {
      toast.error("Dispatch date cannot be in the future.");
      return false;
    }
  

  
    return true; // Return true if validation passes, false otherwise
  };
  
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row justify-content-center">
        <div className="col-md-14">
          <div className="card shadow-lg p-3 mb-5 bg-body rounded">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Delivery Assignment</h2>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="orderID" className="form-label">
                      Order ID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="orderID"
                      name="orderID"
                      value={formData.orderID}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="customerName" className="form-label">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="customerName"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
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
                  <div className="col">
                    <label htmlFor="driverID" className="form-label">
                      Driver ID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="driverID"
                      name="driverID"
                      value={formData.driverID}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="driverName" className="form-label">
                      Driver Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="driverName"
                      name="driverName"
                      value={formData.driverName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="vehicleRegNo" className="form-label">
                      Vehicle Registration Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="vehicleRegNo"
                      name="vehicleRegNo"
                      value={formData.vehicleRegNo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="orderStatus" className="form-label">
                      Order Status
                    </label>
                    <select
                      className="form-select"
                      id="orderStatus"
                      name="orderStatus"
                      value={formData.orderStatus}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Order Status</option>
                      <option value="processing">processing</option>
                      <option value="delivered">delivered</option>
                    </select>
                  </div>
                  <div className="col">
                    <label htmlFor="dispatchDate" className="form-label">
                      Dispatch Date
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="dispatchDate"
                      name="dispatchDate"
                      value={formData.dispatchDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="deliveredDate" className="form-label">
                      Delivered Date
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="deliveredDate"
                      name="deliveredDate"
                      value={formData.deliveredDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Assign
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

export default AssignRegister;
