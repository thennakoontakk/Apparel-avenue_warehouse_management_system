import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const EditComplaint = () => {
  const { complaintID } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    contact_no: "", // Edit this field as needed
    description: "", // Edit this field as needed
    status: "", // Edit this field as needed
  });

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8500/complaint/get/${complaintID}`
        );
        const complaintData = response.data;
        setFormData(complaintData);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchComplaints();
  }, [complaintID]);

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
        `http://localhost:8500/complaint/update-complaint/${complaintID}`,
        formData
      );
      console.log("Complaint details updated successfully!");
      toast.success("Complaint details updated successfully!");
      navigate("/complaint/allComplaints");
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to update complaint details.");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="col-md-4">
        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Edit Complaint</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="complaintID" className="form-label">
                  Complaint ID :
                </label>

                {formData.complaintID}
              </div>
              <div className="mb-3">
                <label htmlFor="orderID" className="form-label">
                  Order ID :
                </label>

                {formData.orderID}
              </div>
              <div className="mb-3">
                <label htmlFor="contact_no" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="contact_no"
                  name="contact_no"
                  value={formData.contact_no}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description & status Update
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
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
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
};

export default EditComplaint;
