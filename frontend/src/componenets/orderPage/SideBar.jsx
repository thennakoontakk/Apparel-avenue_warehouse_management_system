import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faGift,
  faUser,
  faBox,
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
            to="/order/allorders"
            className="text-light text-decoration-none"
          >
            <FontAwesomeIcon icon={faTruck} className="me-3" />
            Orders
          </Link>
        </li>
        <li className="my-4">
          <Link
            to="/discount/alldiscounts"
            className="text-light text-decoration-none"
          >
            <FontAwesomeIcon icon={faGift} className="me-3" />
            Discounts
          </Link>
        </li>
        <li className="my-4">
          <Link to="/customer" className="text-light text-decoration-none">
            <FontAwesomeIcon icon={faUser} className="me-3" />
            Customer
          </Link>
        </li>
        <li className="my-4">
          <Link to="/product" className="text-light text-decoration-none">
            <FontAwesomeIcon icon={faBox} className="me-3" />
            Product
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
