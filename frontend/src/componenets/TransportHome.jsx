import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Driver/SideBarTransport";

function TransportHome() {
  const navigate = useNavigate();

  const handleViewDrivers = () => {
    navigate("/driver/");
  };

  const handleViewVehicles = () => {
    navigate("/vehicle/");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="container">
            <div className="d-flex justify-content-center align-items-center my-5">
              <h3>Welcome to the Transport Home Page</h3>
            </div>
            <div className="d-flex justify-content-center align-items-center my-3">
              <button
                className="btn btn-primary btn-lg me-3 shadow-lg hover-scale"
                onClick={handleViewDrivers}
              >
                View Drivers
              </button>
              <button
                className="btn btn-primary btn-lg shadow-lg hover-scale"
                onClick={handleViewVehicles}
              >
                View Vehicles
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default TransportHome;
