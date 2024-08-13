import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./SideBar";
import "./adminhome.css"; // Import CSS file

function AdminHome() {
  const navigate = useNavigate();
  const [customerCount, setCustomerCount] = useState(0);
  const [managerCount, setManagerCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [newCustomerCount, setNewCustomerCount] = useState(0);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const customerResponse = await axios.get(
          "http://localhost:8500/user/customers/count"
        );
        setCustomerCount(customerResponse.data.count);

        const managerResponse = await axios.get(
          "http://localhost:8500/user/managers/count"
        );
        setManagerCount(managerResponse.data.count);

        const adminResponse = await axios.get(
          "http://localhost:8500/user/admins/count"
        );
        setAdminCount(adminResponse.data.count);
      } catch (error) {
        console.error("Fetch counts error:", error);
        toast.error("Failed to fetch counts");
      }
    }
    fetchCounts();
  }, []);

  useEffect(() => {
    async function fetchNewCustomerCount() {
      try {
        const response = await axios.get(
          "http://localhost:8500/user/customers/count/today"
        );
        setNewCustomerCount(response.data.count);
      } catch (error) {
        console.error("Fetch new customer count error:", error);
        toast.error("Failed to fetch new customer count");
      }
    }
    fetchNewCustomerCount();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8500/user/logout");
      toast.success("Successfully logged out");
      navigate("/user/login-adminAndManger");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logged out unsuccessfully");
    }
  };

  const handleViewProfile = () => {
    navigate(`/user/update-admin`);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="container-lg">
            <div className="d-flex justify-content-between align-items-center mb-6">
              <h3 className="mb-7 font-size-h3">
                Welcome to the Admin Home Page
              </h3>
              <div>
                <button
                  className="btn btn-primary me-4"
                  onClick={handleViewProfile}
                >
                  View Profile
                </button>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-3">
                <div className="card mb-4 h-120 hover-card">
                  <div className="card-body">
                    <h5 className="card-title font-size-large">Customers</h5>
                    <p className="card-text fs-20 total-count">
                      Total: {customerCount}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card mb-4 h-120 hover-card">
                  <div className="card-body">
                    <h5 className="card-title font-size-large">Managers</h5>
                    <p className="card-text fs-20 total-count">
                      Total: {managerCount}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card mb-4 h-120 hover-card">
                  <div className="card-body">
                    <h5 className="card-title font-size-large">Admins </h5>
                    <p className="card-text fs-20 total-count">
                      Total: {adminCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <br></br>
            <div className="row mt-5">
              <div className="col-md-3">
                <div className="card mb-4 h-120 hover-card">
                  <div className="card-body">
                    <h5 className="card-title font-size-large">
                      New Customers Registered Today
                    </h5>
                    <p className="card-text fs-20 total-count">
                      Total: {newCustomerCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-3">
              {/* View Recently Added Items button */}
              <div className="card mb-4 h-100 hover-card">
                <div className="card-body">
                  <Link
                    to={`/apparelavenue/RecentlyAddedItems`} // Change this to the appropriate route
                    className="btn btn-sm btn-success btn-block"
                  >
                    View Recently Added Items
                  </Link>
                </div>
              </div>
            </div>
            <br></br>
            <div className="row">
              <div className="row">
                <div className="col-md-4">
                  <div className="card mb-4 h-100 hover-card">
                    <div className="card-body">
                      <h5 className="card-title font-size-large"></h5>
                      <Link to="/user/allcustomers">
                        <button className="btn btn-primary btn-lg btn-block">
                          View All Customers
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card mb-4 h-100 hover-card">
                    <div className="card-body">
                      <h5 className="card-title font-size-large"></h5>
                      <Link to="/user/allmanagers">
                        <button className="btn btn-primary btn-lg btn-block">
                          View All Managers
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4 h-100 hover-card">
                  <div className="card-body">
                    <h5 className="card-title font-size-large"></h5>
                    <Link to="/user/allAdmins">
                      <button className="btn btn-primary btn-lg btn-block">
                        View All Admins
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <br></br>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminHome;
