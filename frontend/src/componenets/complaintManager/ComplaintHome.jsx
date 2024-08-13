import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const ComplaintHome = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="container">
            <div className="d-flex justify-content-center align-items-center my-5">
              <h3 className="mb-6">
                Welcome to Admin the Feedbacks & Complaints Home Page!
              </h3>
            </div>
            <br />
            <div className="d-flex justify-content-center align-items-center my-3">
              <Link to="/feedback/allFeedbacks">
                <button className="btn btn-primary btn-lg mx-3 shadow-lg hover-scale custom-btn-width">
                  <FontAwesomeIcon icon={faComments} className="me-2" />
                  View Feedbacks
                </button>
              </Link>
              <Link to="/complaint/allComplaints">
                <button className="btn btn-primary btn-lg mx-3 shadow-lg hover-scale custom-btn-width">
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="me-2"
                  />
                  View Complaints
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ComplaintHome;
