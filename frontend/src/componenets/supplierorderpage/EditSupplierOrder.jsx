import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditSupplierOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    supplierOrderStatus: "",
    ItemID: "",
    supplierID: "",
    Quantity: "",
    itemPerPrice: "",
    description: "",
  });

  useEffect(() => {
    const fetchSupplierOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8500/supplierorder/get-supplierOrder/${id}`
        );
        const supplierOrderData = response.data;
        setFormData(supplierOrderData);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchSupplierOrder();
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
    try {
      await axios.put(
        `http://localhost:8500/supplierorder/update-supplierOrder/${id}`,
        formData
      );
      console.log("SupplierOrder details updated successfully!");
      alert("SupplierOrder details updated successfully!");
      navigate("/supplierOrder/allsupplierOrders");
    } catch (error) {
      console.error("Error:", error.response.data.error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Edit Supplier Order</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="supplierOrderStatus" className="form-label">
                Supplier Order Status
              </label>
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
                <option value="Not Yet">Not Yet</option>
                <option value="Received">Received</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="ItemID" className="form-label">
                Item ID
              </label>
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
              <label htmlFor="Quantity" className="form-label">
                Quantity
              </label>
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
              <label htmlFor="itemPerPrice" className="form-label">
                Item Per Price
              </label>
              <input
                type="text"
                className="form-control"
                id="itemPerPrice"
                name="itemPerPrice"
                value={formData.itemPerPrice}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
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
            <button type="submit" className="btn btn-primary mt-3">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditSupplierOrder;
