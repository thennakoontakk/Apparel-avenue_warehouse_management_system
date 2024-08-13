import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Sidebar from "./SideBarTransport";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faPlus,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";

function DriverList() {
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get("http://localhost:8500/driver/");
        setDrivers(response.data);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchDrivers();
  }, []);

  const handleEdit = (id) => {
    navigate(`/driver/update/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8500/driver/delete/${id}`);
      setDrivers(drivers.filter((driver) => driver.Id !== id));
      console.log("Driver deleted successfully!");
      toast.success("Driver deleted successfully!");
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to delete driver");
    }
  };

  const handleClickNewDriver = () => {
    navigate("/driver/add");
  };

  const handleClickBackHome = () => {
    navigate("/TransportHome");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("driver-table");

    // Hide action buttons during PDF generation
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

      const filename = `Driver_List_Report_${formattedDate}_${formattedTime}.pdf`;

      pdf.save(filename);
      toast.success("PDF report downloaded successfully!");

      // Show action buttons again
      actionButtons.forEach((button) => {
        button.style.display = "inline-block";
      });
    });
  };

  const filteredDrivers = drivers.filter((driver) =>
    Object.values(driver).some(
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
          <h2 className="text-center mb-4">Drivers List</h2>
          <div className="search-container mb-4 d-flex align-items-center">
            <input
              type="text"
              className="form-control search-input me-2"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="d-flex align-items-center">
              <button
                className="btn btn-primary btn-sm me-2"
                type="button"
                onClick={handleClickNewDriver}
              >
                <FontAwesomeIcon icon={faPlus} /> Add new Driver
              </button>
              <button
                className="btn btn-primary btn-sm"
                type="button"
                onClick={handleDownloadPDF}
              >
                <FontAwesomeIcon icon={faFilePdf} /> Download PDF
              </button>
            </div>
          </div>
          <table id="driver-table" className="table table-striped">
            <thead>
              <tr>
                <th>Driver ID</th>
                <th>Full Name</th>
                <th>NIC Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>License Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.map((driver) => (
                <tr key={driver.Id}>
                  <td>{driver.Id}</td>
                  <td>{driver.fullName}</td>
                  <td>{driver.nicNo}</td>
                  <td>{driver.email}</td>
                  <td>{driver.address}</td>
                  <td>{driver.phoneNo}</td>
                  <td>{driver.licenseType}</td>
                  <td>
                    <div className="d-flex">
                      <button
                        className="btn btn-success btn-sm me-1 action-button"
                        onClick={() => handleEdit(driver.Id)}
                      >
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </button>{" "}
                      <button
                        className="btn btn-danger btn-sm action-button"
                        onClick={() => handleDelete(driver.Id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="btn btn-primary btn-sm float-end"
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

export default DriverList;
