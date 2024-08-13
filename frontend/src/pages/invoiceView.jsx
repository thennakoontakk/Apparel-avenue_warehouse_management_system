import React from "react";
import { useNavigate } from "react-router-dom";
import InvoiceDetails from "../componenets/F_component/InvoiceDetails";
import Sidebar from "../componenets/F_component/sidebar";

function ManageInvoicepage() {
  const navigate = useNavigate();

  return (
    <div className="d-flex">
      <Sidebar />
      <div>
        <InvoiceDetails />
      </div>
    </div>
  );
}

export default ManageInvoicepage;
