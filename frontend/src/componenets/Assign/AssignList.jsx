import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Sidebar from "../Driver/SideBarTransport";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlus, faFilePdf } from "@fortawesome/free-solid-svg-icons";

function AssignList() {
  const [assignments, setAssignments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("processing"); // Default tab
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get("http://localhost:8500/assign/");
        setAssignments(response.data);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchAssignments();
  }, []);

  const handleEdit = (id) => {
    navigate(`/assign/update/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8500/assign/delete/${id}`);
      setAssignments(assignments.filter((assignment) => assignment.Id !== id));
      console.log("Assignment deleted successfully!");
      toast.success("Assignment deleted successfully!");
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to delete assignment");
    }
  };

  const handleClickNewAssignment = () => {
    navigate("/assign/add");
  };

  const handleClickBackHome = () => {
    navigate("/TransportHome");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("assignment-table");

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

      const filename = `Assignment_List_Report_${formattedDate}_${formattedTime}.pdf`;

      pdf.save(filename);
      toast.success("PDF report downloaded successfully!");

      // Show action buttons again
      actionButtons.forEach((button) => {
        button.style.display = "inline-block";
      });
    });
  };

  // Function to count completed deliveries for each driver
  const countCompletedDeliveries = (driverName) => {
    return assignments.filter(
      (assignment) => assignment.driverName === driverName && assignment.orderStatus === "delivered"
    ).length;
  };

  const filteredAssignments = assignments.filter((assignment) =>
    Object.values(assignment).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredByTab = activeTab === "processing"
    ? filteredAssignments.filter((assignment) => assignment.orderStatus === "processing")
    : filteredAssignments.filter((assignment) => assignment.orderStatus === "delivered");

  // Get unique driver names
  const uniqueDriverNames = Array.from(new Set(filteredByTab.map((assignment) => assignment.driverName)));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-auto">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <h2 className="text-center mb-4">Delivery Summary</h2>
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
                onClick={handleClickNewAssignment}
              >
                <FontAwesomeIcon icon={faPlus} /> Add new Assignment
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
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "processing" ? "active" : ""}`}
                onClick={() => setActiveTab("processing")}
              >
                Processing
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "delivered" ? "active" : ""}`}
                onClick={() => setActiveTab("delivered")}
              >
                Completed
              </button>
            </li>
          </ul>
          <table id="assignment-table" className="table table-striped">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Address</th>
                <th>Driver ID</th>
                <th>Driver Name</th>
                <th>Vehicle Reg No</th>
                <th>Order Status</th>
                <th>Dispatch Date</th>
                {activeTab === "delivered" && <th>Delivered Date</th>}
                <th>Actions</th>
                {activeTab === "delivered" && <th>Completed Deliveries</th>}
              </tr>
            </thead>
            <tbody>
              {filteredByTab.map((assignment) => (
                <tr key={assignment.Id}>
                  <td>{assignment.orderID}</td>
                  <td>{assignment.customerName}</td>
                  <td>{assignment.address}</td>
                  <td>{assignment.driverID}</td>
                  <td>{assignment.driverName}</td>
                  <td>{assignment.vehicleRegNo}</td>
                  <td>{assignment.orderStatus}</td>
                  <td>{assignment.dispatchDate}</td>
                  {activeTab === "delivered" && <td>{assignment.deliveredDate}</td>}
                  <td>
                    <div className="d-flex">
                      <button
                        className="btn btn-success btn-sm me-1 action-button"
                        onClick={() => handleEdit(assignment.Id)}
                      >
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </button>{" "}
                      <button
                        className="btn btn-danger btn-sm action-button"
                        onClick={() => handleDelete(assignment.Id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} /> Delete
                      </button>
                    </div>
                  </td>
                  {activeTab === "delivered" && <td>{countCompletedDeliveries(assignment.driverName)}</td>}
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

export default AssignList;
