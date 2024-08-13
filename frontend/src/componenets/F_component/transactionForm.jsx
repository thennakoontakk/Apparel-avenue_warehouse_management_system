import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialState = {
  date: "",
  amount: "",
  type: "", 
  description: "",
};

function AddTransaction() {
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
    if (!validateForm()) return; // Validate form before submitting
    try {
      const response = await axios.post(
        "http://localhost:8500/transaction/addTransaction",
        formData
      );
      console.log(response.data);
      toast.success("Transaction added successfully!"); // Display success toast message
      setFormData(initialState); // Reset form fields using initialState
      navigate("/");
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to add transaction"); // Display error toast message
    }
  };

  const validateForm = () => {
    const { date, amount, type, description } = formData;
    // Check if all fields are filled out
    if (!date || !amount || !type || !description) {
      toast.error("All fields are required.");
      return false;
    }
    return true;
  };

  return (
    <div className="container mt-4">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Type:</label>
          <select
            className="form-control"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
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
        <button type="submit" className="btn btn-primary">
          Add Transaction
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddTransaction;
