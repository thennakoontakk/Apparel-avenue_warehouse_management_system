import React from "react";
import { useNavigate } from "react-router-dom";
import InvoiceList from "../componenets/F_component/InvoiceList";
import Sidebar from "../componenets/F_component/sidebar";

function ManageInvoicepage() {
  const navigate = useNavigate();

  const handleButtonManageInvoice = () => {
    navigate("/invoice-form");
  };

  const handleButtonManageSalary = () => {
    navigate("/ManageSalaryPage");
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div>
        <div class="dashboard-header">
          <h1>Manage invoice page</h1>
          <div class="dashboard-buttons">
            <button onClick={handleButtonManageSalary}>Manage Salary</button>
            <button onClick={handleButtonManageInvoice}>add new invoice</button>
            <button>Requested invoices</button>
          </div>
        </div>

        <InvoiceList />
      </div>
    </div>
  );
}

export default ManageInvoicepage;
