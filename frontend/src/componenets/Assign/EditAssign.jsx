import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

function EditAssign() {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orderID: "",
    customerName: "",
    address: "",
    driverID: "",
    driverName: "",
    vehicleRegNo: "",
    orderStatus: "",
    dispatchDate: "",
    deliveredDate: "",
  });

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axios.get(`http://localhost:8500/assign/get/${Id}`);
        const assignmentData = response.data;
        // Convert dispatch date format if needed
      if (assignmentData.dispatchDate) {
        assignmentData.dispatchDate = assignmentData.dispatchDate.replace(' ', 'T');
      }
        setFormData(assignmentData);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchAssignment();
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
      await axios.put(`http://localhost:8500/assign/update/${Id}`, formData);
      console.log("Assignment details updated successfully!");
      toast.success("Assignment details updated successfully!");
      navigate("/assign/");
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to update assignment details");
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


return true; // Return true if validation passes, false otherwise
};

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row justify-content-center">
        <div className="col-md-14">
          <div className="card shadow-lg p-3 mb-5 bg-body rounded">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Edit Assignment </h2>
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
                    Update
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

export default EditAssign;
