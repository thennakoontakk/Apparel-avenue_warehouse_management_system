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
  faPlus,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";

import "./styles.css"; // Importing the CSS file
import Sidebar from "./SideBar"; // Import the Sidebar component

function ManagerList() {
  const [managers, setManagers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8500/user/allmanagers"
        );
        setManagers(response.data);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchManagers();
  }, []);

  const handleEdit = (id) => {
    navigate(`/user/update-manager/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8500/user/delete/${id}`);
      setManagers(managers.filter((manager) => manager.Id !== id));
      console.log("Manager deleted successfully!");
      toast.success("Manager deleted successfully!");
    } catch (error) {
      console.error("Error:", error.response.data.error);
    }
  };

  const handleClickNewManager = () => {
    navigate("/user/register-manager");
  };

  const handleClickBackHome = () => {
    navigate("/AdminHome");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("manager-table");

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

      const filename = `Manager List Report_${formattedDate}_${formattedTime}.pdf`;

      pdf.save(filename);
      toast.success("Report is downloading!");

      // Show action buttons again
      actionButtons.forEach((button) => {
        button.style.display = "inline-block";
      });
    });
  };

  const filteredManagers = managers.filter((manager) =>
    Object.values(manager).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-auto">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <h2 className="text-center">Managers List</h2>
          <div className="search-container">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button
              className="btn btn-secondary me-2"
              type="button"
              onClick={handleClickNewManager}
            >
              <FontAwesomeIcon icon={faPlus} /> Add new Manager
            </button>
            <button
              className="btn btn-primary me-2"
              type="button"
              onClick={handleDownloadPDF}
            >
              <FontAwesomeIcon icon={faFilePdf} /> Download PDF
            </button>
          </div>
          <table id="manager-table" className="table table-striped">
            <thead>
              <tr>
                <th>Manager ID</th>
                <th>Full Name</th>
                <th>Contact Number</th>
                <th>Username</th>
                <th>Email</th>
                <th>Manager Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredManagers.map((manager) => (
                <tr key={manager.Id}>
                  <td>{manager.Id}</td>
                  <td>{manager.fullName}</td>
                  <td>{manager.contactNumber}</td>
                  <td>{manager.username}</td>
                  <td>{manager.email}</td>
                  <td>{manager.managerType}</td>
                  <td>
                    <button
                      className="btn btn-success me-1 action-button"
                      onClick={() => handleEdit(manager.Id)}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button
                      className="btn btn-danger action-button"
                      onClick={() => handleDelete(manager.Id)}
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

export default ManagerList;
