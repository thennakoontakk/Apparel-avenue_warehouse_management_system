// ProfileSidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faListAlt,
  faClipboardList,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./profileSideBar.css"; // Import the CSS file

function ProfileSidebar() {
  return (
    <div className="profile-sidebar">
      <style>
        {`
          .list-group-item:hover {
            background-color: #f8f9fa;
            color: #007bff;
          }
        `}
      </style>
      <div className="card shadow-sm" style={{ width: "200px" }}>
        <div className="card-body">
          <h5 className="card-title text-center">Profile</h5>
          <ul className="list-group list-group-flush">
            <Link
              to="/my-orders"
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ textDecoration: "none" }}
            >
              <FontAwesomeIcon icon={faListAlt} className="me-2" />
              <span>My Orders</span>
            </Link>
            <Link
              to="/my-requests"
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ textDecoration: "none" }}
            >
              <FontAwesomeIcon icon={faClipboardList} className="me-2" />
              <span>My Requests</span>
            </Link>
            <Link
              to="/my-cart"
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ textDecoration: "none" }}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
              <span>My Cart</span>
            </Link>
            <Link
              to="/sign-out"
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ textDecoration: "none" }}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
              <span>Sign Out</span>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfileSidebar;
