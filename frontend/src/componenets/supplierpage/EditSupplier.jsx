import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


function EditSupplier() {
  const { id} = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    supplierType: "",
    fullName: "",
    garmentName: "",
    address: "",
    email: "",
    phone: "",
    description: "",
  });

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8500/supplier/get-supplier/${id}`
        );
        const supplierData = response.data;
        setFormData(supplierData);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchSupplier();
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
        `http://localhost:8500/supplier/update-supplier/${id}`,
        formData
      );
      console.log("Supplier details updated successfully!");
      alert("Supplier details updated successfully!");
      navigate("/supplier/allSuppliers");
    } catch (error) {
      console.error("Error:", error.response.data.error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
     
        <div className="col-md-6">
          <h2 className="text-center mb-4">Edit Supplier</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="supplierType" className="form-label">
                Supplier Type
              </label>
              <select
                className="form-select"
                id="supplierType"
                name="supplierType"
                value={formData.supplierType}
                onChange={handleChange}
                required
              >
                <option value="">Supplier Type </option>
                <option value="men 's wear">men 's wear</option>
                <option value="Pants">women 's wear</option>
                <option value="Troucers">kis' swear</option>
                <option value="Blouses">Blouses</option>
                <option value="CropTops">Crop Tops</option>
                <option value="Skirts">Skirts</option>
                <option value="Vests">Vests</option>
                <option value="SportsWear">SportsWear</option>
                <option value="Shirts">Shirts</option>
                <option value="Jeans">Jeans</option>
                <option value="Shorts">Shorts</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
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
              <label htmlFor="garmentName" className="form-label">
                Garment Name
              </label>
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
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
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
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
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

export default EditSupplier;
