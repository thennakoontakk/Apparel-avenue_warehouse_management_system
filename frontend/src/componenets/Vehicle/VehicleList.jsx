import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Sidebar from "../Driver/SideBarTransport";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faPlus,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";


function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:8500/vehicle/");
        setVehicles(response.data);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchVehicles();
  }, []);

  const handleEdit = (id) => {
    navigate(`/vehicle/update/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8500/vehicle/delete/${id}`);
      setVehicles(vehicles.filter((vehicle) => vehicle.Id !== id));
      console.log("Vehicle deleted successfully!");
      toast.success("Vehicle deleted successfully!");
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error("Failed to delete vehicle");
    }
  };

  const handleClickNewVehicle = () => {
    navigate("/vehicle/add");
  };

  const handleClickBackHome = () => {
    navigate("/TransportHome");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("vehicle-table");
    setIsDownloadingPDF(true);

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

      const filename = `Vehicle_List_Report_${formattedDate}_${formattedTime}.pdf`;

      pdf.save(filename);
      toast.success("PDF report downloaded successfully!");

      actionButtons.forEach((button) => {
        button.style.display = "inline-block";
      });

      setIsDownloadingPDF(false);
    });
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    Object.values(vehicle).some(
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
          <h2 className="text-center mb-4">Vehicles List</h2>
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
                onClick={handleClickNewVehicle}
              >
                <FontAwesomeIcon icon={faPlus} /> Add new Vehicle
              </button>
              <button
                className="btn btn-primary btn-sm"
                type="button"
                onClick={handleDownloadPDF}
                disabled={isDownloadingPDF}
              >
                <FontAwesomeIcon icon={faFilePdf} /> Download PDF
              </button>
            </div>
          </div>
          <table id="vehicle-table" className="table table-striped">
            <thead>
              <tr>
                <th>Vehicle ID</th>
                <th>Owner Name</th>
                <th>Owner NIC</th>
                <th>Owner Address</th>
                <th>Owner Contact No</th>
                <th>Registration Number</th>
                <th>Model</th>
                <th>Capacity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.Id}>
                  <td>{vehicle.Id}</td>
                  <td>{vehicle.ownerName}</td>
                  <td>{vehicle.ownerNIC}</td>
                  <td>{vehicle.ownerAddress}</td>
                  <td>{vehicle.ownerContactNo}</td>
                  <td>{vehicle.registrationNumber}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.capacity}</td>
                  <td>
                    <div className="d-flex">
                      <button
                        className="btn btn-success btn-sm me-1 action-button"
                        onClick={() => handleEdit(vehicle.Id)}
                        disabled={isDownloadingPDF}
                      >
                        <FontAwesomeIcon icon={faEdit} size="sm" /> Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm action-button"
                        onClick={() => handleDelete(vehicle.Id)}
                        disabled={isDownloadingPDF}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} size="sm" /> Delete
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

export default VehicleList;
