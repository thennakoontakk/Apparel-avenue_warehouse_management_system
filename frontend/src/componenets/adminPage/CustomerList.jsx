import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./SideBar"; // Import the Sidebar component

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8500/user/allcustomers"
        );
        setCustomers(response.data);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchCustomers();
  }, []);

  const handleEdit = (id) => {
    navigate(`/user/update-customer/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8500/user/delete/${id}`);
      setCustomers(customers.filter((customer) => customer.Id !== id));
      console.log("Customer deleted successfully!");
      toast.success("Customer deleted successfully!");
    } catch (error) {
      console.error("Error:", error.response.data.error);
    }
  };

  const handleClickBackHome = () => {
    navigate("/AdminHome");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("customer-table");

    // Hide action buttons
    const actionButtons = document.querySelectorAll(".action-button");
    actionButtons.forEach((button) => {
      button.style.display = "none";
    });

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split("T")[0];
      const formattedTime = currentDate.toLocaleTimeString().replace(/:/g, "-");

      const filename = `Customer List report_${formattedDate}_${formattedTime}.pdf`;

      pdf.save(filename);
      toast.success("Report is downloading!");
    });
  };

  const filteredCustomers = customers.filter((customer) =>
    Object.values(customer).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          {/* Sidebar Column */}
          <Sidebar />
        </div>
        <div className="col-md-10">
          {/* Main Content Column */}
          <h2 className="text-center">Customers List</h2>
          <div className="d-flex justify-content-between align-items-center mb-3">
            {/* Search bar and PDF download button */}
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              style={{ width: "600px" }} // Adjusted width for medium size
            />
            <button className="btn btn-primary" onClick={handleDownloadPDF}>
              <FontAwesomeIcon icon={faFilePdf} /> Download PDF
            </button>
          </div>
          <table id="customer-table" className="table table-striped">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Full Name</th>
                <th>Contact Number</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.Id}>
                  <td>{customer.Id}</td>
                  <td>{customer.fullName}</td>
                  <td>{customer.contactNumber}</td>
                  <td>{customer.username}</td>
                  <td>{customer.email}</td>
                  <td>
                    <button
                      className="btn btn-success me-1 action-button"
                      onClick={() => handleEdit(customer.Id)}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button
                      className="btn btn-danger action-button"
                      onClick={() => handleDelete(customer.Id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="btn btn-primary float-end"
            onClick={handleClickBackHome}
          >
            Back to Home
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CustomerList;
