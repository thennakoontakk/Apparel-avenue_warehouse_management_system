import React from "react";
import { useNavigate } from "react-router-dom";
import TransactionChart from "../componenets/F_component/transactionChart";
import Sidebar from "../componenets/F_component/sidebar";
import TransactionSummary from "../componenets/F_component/TransactionSummary";

function Home() {
  const navigate = useNavigate();

  const handleButtonManageInvoice = () => {
    navigate("/ManageInvoicepage"); // Navigate to the Manage Invoice page
  };

  const handleButtonManageSalary = () => {
    navigate("/ManageSalaryPage"); // Navigate to the Manage Salary page
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div
        className="flex-grow-1"
        style={{ overflowY: "scroll", height: "100vh" }}
      >
        <div class="dashboard-header">
          <h1>Finance Dashboard</h1>
          <div class="dashboard-buttons">
            <button onClick={handleButtonManageInvoice}>Manage Invoice</button>
            <button onClick={handleButtonManageSalary}>Manage Salary</button>
          </div>
        </div>
        <br />
        <TransactionSummary />
        <br />
        <TransactionChart />
        <br />
      </div>
    </div>
  );
}

export default Home;
