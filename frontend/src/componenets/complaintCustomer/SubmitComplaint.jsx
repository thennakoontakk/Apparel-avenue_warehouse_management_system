import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialState = {
  date: new Date().toISOString().split("T")[0],
  orderID: "",
  customerID: "",
  contact_no: "",
  complaintType: "",
  requestType: "",
  description: "",
};

function SubmitComplaint() {
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
    // Validate form fields
    if (!validateForm()) {
      // If validation fails, return early
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8500/complaint/add-Complaint",
        formData
      );
      console.log(response.data);
      toast.success("Complaint Submitted successfully!");
      alert("Complaint Submitted successfully!");
      setFormData(initialState);
      navigate("/Thankyou");
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data.error : error.message
      );
      toast.error("Failed to submit the complaint");
    }
  };

  const validateForm = () => {
    const {
      date,
      orderID,
      customerID,
      contact_no,
      complaintType,
      requestType,
    } = formData;

    // Check if all fields are filled out
    if (
      !date ||
      !orderID ||
      !customerID ||
      !contact_no ||
      !complaintType ||
      !requestType
    ) {
      toast.error("All mandatory fields are required.");
      return false;
    }

    // Check if mobile no inserted correctly
    if (!/^[0-9]{10}$/.test(contact_no)) {
      toast.error("Mobile number must include correctly");
      return false;
    }

    if (!/^CU\d{4}$/.test(customerID)) {
      toast.error("Customer ID must start with 'CU' followed by 4 digits.");
      return false;
    }

    return true;
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2 style={{ fontStyle: "italic" }}>Hi! Welcome...</h2>
      <p style={{ margin: "20px", textAlign: "justify", fontSize: "17px" }}>
        This form is designed to gather details about any issues or problems you
        have encountered with our products or services. Your input helps us
        identify areas for improvement and ensures that we can better serve you
        in the future.
      </p>

      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "20px",
          border: "2px solid #ccc",
          borderRadius: "7px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f0f8ff",
          fontSize: "16px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontStyle: "italic",
            marginBottom: "25px",
            color: "#007bff",
          }}
        >
          The Complaint Form
        </h2>
        <br />

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "40px",
            paddingRight: "20px",
          }}
        >
          <div style={{ display: "flex", marginBottom: "30px" }}>
            <label
              style={{
                flex: 1,
                marginRight: "8px",
                fontWeight: "bold",
                marginBottom: "25px",
              }}
            >
              Date:
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              style={{
                flex: 2,
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
              required
            />
          </div>
          <div style={{ display: "flex", marginBottom: "25px" }}>
            <label
              style={{
                flex: 1,
                marginRight: "8px",
                fontWeight: "bold",
                marginBottom: "25px",
              }}
            >
              Order ID:
            </label>
            <input
              type="text"
              name="orderID"
              placeholder="Enter Your order number"
              value={formData.orderID}
              onChange={handleChange}
              style={{
                flex: 2,
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              required
            />
          </div>
          <div style={{ display: "flex", marginBottom: "25px" }}>
            <label
              style={{
                flex: 1,
                marginRight: "8px",
                fontWeight: "bold",
                marginBottom: "25px",
              }}
            >
              Customer ID:
            </label>
            <input
              type="text"
              name="customerID"
              placeholder="Enter Your customer ID"
              value={formData.customerID}
              onChange={handleChange}
              style={{
                flex: 2,
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              required
            />
          </div>
          <div style={{ display: "flex", marginBottom: "23px" }}>
            <label
              style={{
                flex: 1,
                marginRight: "8px",
                fontWeight: "bold",
                marginBottom: "25px",
              }}
            >
              Mobile Number:
            </label>
            <input
              type="text"
              name="contact_no"
              placeholder="Enter Your Contact Number"
              value={formData.contact_no}
              onChange={handleChange}
              style={{
                flex: 2,
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              required
            />
          </div>
          <div style={{ display: "flex", marginBottom: "25px" }}>
            <label
              style={{
                flex: 1,
                marginRight: "8px",
                fontWeight: "bold",
                marginBottom: "25px",
              }}
            >
              Complaint Type:
            </label>
            <select
              name="complaintType"
              value={formData.complaintType}
              onChange={handleChange}
              style={{
                flex: 2,
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              required
            >
              <option value="">Select Complaint Type</option>
              <option value="Delivery Delays">Delivery Delays</option>
              <option value="Defect Products">Defect Products</option>
              <option value="Incorrect/Incomplete Order">
                Incorrect/Incomplete Order
              </option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div style={{ display: "flex", marginBottom: "25px" }}>
            <label
              style={{
                flex: 1,
                marginRight: "8px",
                fontWeight: "bold",
                marginBottom: "25px",
              }}
            >
              Request Type:
            </label>
            <select
              name="requestType"
              value={formData.requestType}
              onChange={handleChange}
              style={{
                flex: 2,
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              required
            >
              <option value="">Select Request Type</option>
              <option value="Return">Return</option>
              <option value="Refund">Refund</option>
              <option value="None">None</option>
            </select>
          </div>
          <div style={{ display: "flex", marginBottom: "25px" }}>
            <label
              style={{
                flex: 1,
                marginRight: "8px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Description:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{
                flex: 2,
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                minHeight: "100px",
              }}
            />
          </div>
          <br />
          <button
            type="submit"
            style={{
              width: "40%",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "black",
              borderRadius: "7px",
              cursor: "pointer",
              marginBottom: "15px",
              alignSelf: "flex-end",
            }}
          >
            Submit Complaint
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default SubmitComplaint;
