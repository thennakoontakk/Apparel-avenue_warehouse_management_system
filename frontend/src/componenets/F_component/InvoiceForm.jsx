import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const initialState = {
  description: "",
  quantity: "",
  unitPrice: "",
  amount: "",
  date: "",
  billTo: "",
  total: ""
};

function InvoiceForm() {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8500/invoice/addInvoice",
        formData
      );
      console.log(response.data);
      toast.success("Invoice added successfully!");
      setFormData(initialState);
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to add invoice");
    }
  };

  return (
    <div className="body">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add Invoice</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <label style={{ display: "block" }}>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-control"
          />
        </label>
        <br />
        <label style={{ display: "block" }}>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="form-control"
          />
        </label>
        <br />
        <label style={{ display: "block" }}>
          UnitPrice:
          <input
            type="number"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleChange}
            required
            className="form-control"
          />
        </label>
        <br />
        <label style={{ display: "block" }}>
          Amount:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="form-control"
          />
        </label>
        <br />
        <label style={{ display: "block" }}>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="form-control"
          />
        </label>
        <br />
        <label style={{ display: "block" }}>
          BillTo:
          <input
            type="text"
            name="billTo"
            value={formData.billTo}
            onChange={handleChange}
            required
            className="form-control"
          />
        </label>
        <br />
        <label style={{ display: "block" }}>
          Total:
          <input
            type="number"
            name="total"
            value={formData.total}
            onChange={handleChange}
            required
            className="form-control"
          />
        </label>
        <br />
        <button type="submit" className="btn btn-primary">Add Invoice</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default InvoiceForm;
