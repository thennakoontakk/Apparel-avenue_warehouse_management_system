import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialState = {
  supplierType: "",
  fullname: "",
  garmentName:"",
  address: "",
  email: "",
  phone: "",
  description: "",
};

function RegisterSupplierForm() {
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
    try {
      const response = await axios.post(
        "http://localhost:8500/supplier/add-supplier",
        formData
      );
      console.log(response.data);
      toast.success("Supplier registered successfully!");
      alert("Supplier  registered successfully!");
      setFormData(initialState);
      navigate("/supplier/allsuppliers");
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to register supplier");
    }
  };

  const validateForm = () => {
    const { supplierType, fullName, garmentName, address, email, phone, description } =
      formData;
    if (
      !supplierType ||
      !fullName ||
      !garmentName ||
      !address ||
      !email ||
      !phone ||
      !description
    ) {
      toast.error("All fields are required.");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone must be 10 digits.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email address.");
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
              <h2 className="card-title text-center mb-4">Supplier Registration</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="supplierType" className="form-label">Supplier Type</label>
                  <select
                    className="form-select"
                    id="supplierType"
                    name="supplierType"
                    value={formData.supplierType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Supplier Type </option>
                    <option value="Men 's Wear">Men 's Wear</option>
                    <option value="Women 's wear ">Women 's wear </option>
                    <option value="Kid's wear ">Kid's wear</option>
                    <option value="sports's wear">sports's wear </option>
                    <option value="Ladies Wear">Ladies Wear</option>
                    <option value="Skirts">Skirts</option>
                    <option value="Vests">Vests</option>
                    <option value="SportsWear">SportsWear</option>
                    <option value="Shirts">Shirts</option>
                    <option value="jeans">Jeans</option>
                    <option value="shorts">Shorts</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="garmentName" className="form-label">Garment Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="garmentName"
                    name="garmentName"
                    value={formData.garmentName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
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
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
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
                  <button type="submit"onClick={validateForm} className="btn btn-primary">Register</button>
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

export default RegisterSupplierForm;


