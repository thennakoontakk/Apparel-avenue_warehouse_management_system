import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faComments,
  faPlus,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  return (
    <nav
      id="sidebar"
      className="bg-dark text-light vh-100 shadow"
      style={{ width: "250px", display: "flex", flexDirection: "column" }}
    >
      <div
        className="sidebar-header text-center py-4"
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        <h3 style={{ color: "#87CEEB" }}>APPAREL AVENUE</h3>
      </div>

      <ul className="list-unstyled components d-flex flex-column align-items-center flex-grow-1 justify-content-center">
        <li className="my-4">
          <Link
            to="/complaint/allComplaints"
            className="text-light text-decoration-none d-flex align-items-center"
            style={{ fontSize: "1.5rem" }}
          >
            <FontAwesomeIcon icon={faExclamationCircle} className="me-3" />
            Complaint
          </Link>
        </li>
        <li className="my-4">
          <Link
            to="/feedback/allFeedbacks"
            className="text-light text-decoration-none d-flex align-items-center"
            style={{ fontSize: "1.5rem" }}
          >
            <FontAwesomeIcon icon={faComments} className="me-3" />
            Feedback
          </Link>
        </li>
        <li className="my-4">
          <Link
            to="/complaint/add-complaint"
            className="text-light text-decoration-none d-flex align-items-center"
            style={{ fontSize: "1.5rem" }}
          >
            <FontAwesomeIcon icon={faPlus} className="me-3" />
            Add New
          </Link>
        </li>

        <li className="my-4">
          <Link
            to="/EmailForm"
            className="text-light text-decoration-none d-flex align-items-center"
            style={{ fontSize: "1.5rem" }}
          >
            <FontAwesomeIcon icon={faEnvelope} className="me-3" />
            Email
          </Link>
        </li>
      </ul>

      <div
        className="sidebar-footer text-center py-3"
        style={{ fontFamily: "Roboto, sans-serif", color: "#87CEEB" }}
      >
        <small>2024 APPAREL AVENUE</small>
      </div>
    </nav>
  );
}

export default Sidebar;
