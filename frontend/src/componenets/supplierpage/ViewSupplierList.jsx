import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../SideBarS";
import "./styles.css"; // Importing the CSS file

function ViewSupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:8500/supplier/getAll");
        setSuppliers(response.data);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchSuppliers();
  }, []);

  const handleClickNewSupplier = () => {
    navigate("/supplier/register-supplier"); // Navigate to add supplier page
  };

  const handleClickBackHome = () => {
    navigate("/supplier/supplierManager/Home"); // Navigate back to home
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (id) => {
    navigate(`/supplier/update-supplier/${id}`); // Navigate to edit page
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8500/supplier/delete-supplier/${id}`);
      setSuppliers(suppliers.filter((supplier) => supplier.Id !== id));
      console.log("Supplier deleted successfully!");
      toast.success("Supplier deleted successfully!");
    } catch (error) {
      console.error("Error:", error.response.data.error);
    }
  };

  const handleClickCreateOrder = () => {
    navigate("/supplierOrder/Create-supplierOrder");
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    Object.values(supplier).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <div className="row">
        <div className="col-md-auto">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="content">
            <h2>Supplier List</h2>
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="btn btn-secondary me-2" onClick={handleClickNewSupplier}>
              <FontAwesomeIcon icon={faPlus} /> Add New Supplier
            </button>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Supplier ID</th>
                  <th>SupplierType</th>
                  <th>FullName</th>
                  <th>GarmentName</th>
                  <th>address</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier.supplierID}>
                    <td>{supplier.supplierID}</td>
                    <td>{supplier.supplierType}</td>
                    <td>{supplier.fullName}</td>
                    <td>{supplier.garmentName}</td>
                    <td>{supplier.address}</td>
                    <td>{supplier.email}</td>
                    <td>{supplier.phone}</td>
                    <td>{supplier.description}</td>
                    <td>
                      <button className="btn btn-success me-1" onClick={() => handleEdit(supplier.supplierID)}>
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </button>
                      <button className="btn btn-primary me-1" onClick={handleClickCreateOrder}>
                        <FontAwesomeIcon icon={faPlus} /> Create Order
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(supplier.supplierID)}>
                        <FontAwesomeIcon icon={faTrashAlt} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-primary float-end" onClick={handleClickBackHome}>
              Back to Home
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSupplierList;
