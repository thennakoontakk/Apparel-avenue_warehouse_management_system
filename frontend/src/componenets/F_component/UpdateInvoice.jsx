import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    description: "",
    quantity: "",
    unitPrice: "",
    amount: "",
    date: "",
    billTo: "",
    total: ""
  });

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`http://localhost:8500/invoice/getInvoiceByID/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchInvoice();
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
      await axios.put(`http://localhost:8500/invoice/updateInvoice/${id}`, formData);
      toast.success("Invoice updated successfully!");
      navigate("/ManageInvoicepage");
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to update invoice");
    }
  };

  return (
    <div className="container">
      <h2>Edit Invoice</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            className="form-control"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Unit Price:</label>
          <input
            type="number"
            className="form-control"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            className="form-control"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Bill To:</label>
          <input
            type="text"
            className="form-control"
            name="billTo"
            value={formData.billTo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Total:</label>
          <input
            type="number"
            className="form-control"
            name="total"
            value={formData.total}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Update Invoice
        </button>
      </form>
    </div>
  );
}

export default UpdateInvoice;
