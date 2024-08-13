import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8500/complaint/allComplaints"
        );
        setComplaints(response.data);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchComplaints();
  }, []);

  const handleEdit = (complaintID) => {
    navigate(`/complaint/update-complaint/${complaintID}`);
  };

  const handleDelete = async (complaintID) => {
    try {
      await axios.delete(
        `http://localhost:8500/complaint/delete-complaint/${complaintID}`
      );
      setComplaints(
        complaints.filter((complaint) => complaint.complaintID !== complaintID)
      );
      console.log("Complaint deleted successfully!");
      alert("Complaint deleted successfully!");
    } catch (error) {
      console.error("Error:", error.response.data.error);
    }
  };

  const handleClickBackHome = () => {
    navigate("/ComplaintHome");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("complaint-table");

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

      const filename = `Complaint_List_Report_${formattedDate}_${formattedTime}.pdf`;

      pdf.save(filename);
      toast.success("Report is downloading!");

      actionButtons.forEach((button) => {
        button.style.display = "inline-block";
      });
    });
  };

  const filteredComplaints = complaints.filter((complaint) =>
    Object.values(complaint).some(
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
          <h2 className="text-center mb-4">Complaint List</h2>
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
                className="btn btn-primary me-2"
                type="button"
                onClick={handleDownloadPDF}
              >
                <FontAwesomeIcon icon={faFilePdf} /> Download PDF
              </button>
            </div>
          </div>
          <table id="complaint-table" className="table table-striped">
            <thead>
              <tr>
                <th>Complaint ID</th>
                <th>Date</th>
                <th>Order ID</th>
                <th>Customer ID</th>
                <th>Mobile Number</th>
                <th>Complaint Type</th>
                <th>Request Type</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint) => (
                <tr key={complaint.complaintID}>
                  <td>{complaint.complaintID}</td>
                  <td>{complaint.date}</td>
                  <td>{complaint.orderID}</td>
                  <td>{complaint.customerID}</td>
                  <td>{complaint.contact_no}</td>
                  <td>{complaint.complaintType}</td>
                  <td>{complaint.requestType}</td>
                  <td>{complaint.description}</td>

                  <td>
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-success me-1 action-button"
                        onClick={() => handleEdit(complaint.complaintID)}
                      >
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </button>

                      <button
                        className="btn btn-danger action-button"
                        onClick={() => handleDelete(complaint.complaintID)}
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
};

export default ComplaintList;
