import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faTruck,
  faBox,
  faMapMarkedAlt,
  faChartBar,
  faStar,
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
          <Link to="/vehicle/" className="text-light text-decoration-none">
            <FontAwesomeIcon icon={faCar} className="me-3" />
            Vehicles
          </Link>
        </li>
        <li className="my-4">
          <Link to="/driver/" className="text-light text-decoration-none">
            <FontAwesomeIcon icon={faTruck} className="me-3" />
            Drivers
          </Link>
        </li>
        <li className="my-4">
          <Link to="/assign/" className="text-light text-decoration-none">
            <FontAwesomeIcon icon={faBox} className="me-3" />
            Deliveries
          </Link>
        </li>
        <li className="my-4">
          <Link to="/Trackingorder" className="text-light text-decoration-none">
            <FontAwesomeIcon icon={faMapMarkedAlt} className="me-3" />
            Location
          </Link>
        </li>
        <li className="my-4">
          <Link to="/DriverRatingPage" className="text-light text-decoration-none">
            <FontAwesomeIcon icon={faStar} className="me-3" />
            Commission
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
