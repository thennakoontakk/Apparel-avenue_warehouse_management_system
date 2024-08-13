import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  supplierOrderStatus: "",
  ItemID: "",
  supplierID:"",
  Quantity: "",
  itemPerPrice: "",
  description: "",
};

function SupplierOrderForm() {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const { supplierId } = useParams(); // Get the supplierId from URL parameters

  useEffect(() => {
    // Set supplierID from URL parameter
    setFormData({
      ...formData,
      supplierID: supplierId,
    });
  }, [supplierId]); // Trigger effect when supplierId changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8500/supplierOrder/add-supplierOrder",
        formData
      );
      console.log(response.data);
      toast.success("Supplier Order placed successfully!");
      alert("Supplier Order placed successfully!");
      setFormData(initialState);
      navigate("/supplierOrder/allsupplierOrders");
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to place supplier order");
    }
  };

  const validateForm = () => {
    const { supplierOrderStatus, ItemID, supplierID, Quantity, itemPerPrice, description } =
      formData;
    if (
      !supplierOrderStatus ||
      !ItemID ||
      !supplierID ||
      !Quantity ||
      !itemPerPrice ||
      !description
    ) {
      toast.error("All fields are required.");
      return false;
    }
    if (Quantity < 0) {
      toast.error("Quantity should not be less than 0");
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
              <h2 className="card-title text-center mb-4">Supplier Order </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="supplierOrderStatus" className="form-label">Supplier Order Status</label>
                  <select
                    className="form-select"
                    id="supplierOrderStatus"
                    name="supplierOrderStatus"
                    value={formData.supplierOrderStatus}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Supplier Order Status</option>
                    <option value="Pending">Pending</option>
                    <option value="NotYET">NotYET</option>
                    <option value="Received">Received</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="ItemID" className="form-label">Item ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ItemID"
                    name="ItemID"
                    value={formData.ItemID}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="supplierID" className="form-label">Supplier ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="supplierID"
                    name="supplierID"
                    value={formData.supplierID}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Quantity" className="form-label">Quantity</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Quantity"
                    name="Quantity"
                    value={formData.Quantity}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="itemPerPrice" className="form-label">Item Per Price</label>
                  <input
                    type="Number"
                    className="form-control"
                    id="itemPerPrice"
                    name="itemPerPrice"
                    value={formData.itemPerPrice}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit"    
onClick={validateForm} className="btn btn-primary">Register</button>
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

export default SupplierOrderForm;
