import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faTruck,
  faComments,
  faMoneyBillAlt,
  faUsers,
  faClipboardList,
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
          <Link to="/inventory" className="text-light text-decoration-none">
            <FontAwesomeIcon icon={faBox} className="me-3" />
            Inventory
          </Link>
        </li>
        <li className="my-4">
          <Link
            to="/supplier/supplierManager/Home"
            className="text-light text-decoration-none"
          >
            <FontAwesomeIcon icon={faTruck} className="me-3" />
            Supplier
          </Link>
        </li>
        <li className="my-4">
          <Link to="/TransportHome" className="text-light text-decoration-none">
            <FontAwesomeIcon icon={faTruck} className="me-3" />
            Transport
          </Link>
        </li>
        <li className="my-4">
          <Link to="/ComplaintHome" className="text-light text-decoration-none">
            <FontAwesomeIcon icon={faComments} className="me-3" />
            Feedback
          </Link>
        </li>
        <li className="my-4">
          <Link to="/financeHome" className="text-light text-decoration-none">
            <FontAwesomeIcon icon={faMoneyBillAlt} className="me-3" />
            Finance
          </Link>
        </li>
        <li className="my-4">
          <Link to="/employee" className="text-light text-decoration-none">
            <FontAwesomeIcon icon={faUsers} className="me-3" />
            Employee
          </Link>
        </li>
        <li className="my-4">
          <Link to="/OrderHome" className="text-light text-decoration-none">
            <FontAwesomeIcon icon={faClipboardList} className="me-3" />
            Order
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
