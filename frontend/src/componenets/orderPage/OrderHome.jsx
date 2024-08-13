import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./SideBar";

function OrderHome() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-6">
              <h3 className="mb-6">Welcome to the Admin Home Page</h3>
            </div>
            <div className="text-bottom mb-8">
              <Link to="/order/allorders">
                <button className="btn btn-primary  btn-lg me-3 shadow-lg hover-scale">
                  Orders
                </button>
              </Link>
              <Link to="/discount/alldiscounts">
                <button className="btn btn-primary  btn-lg me-3 shadow-lg hover-scale">
                  Discounts
                </button>
              </Link>
              <Link to="/cart/cart">
                <button className="btn btn-primary btn-lg shadow-lg hover-scale">
                  Cart
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderHome;
