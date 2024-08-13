import React from "react";
import { useNavigate } from "react-router-dom";
import TransactionList from "../componenets/F_component/transactionList";
import Sidebar from "../componenets/F_component/sidebar";

function Home() {
  const navigate = useNavigate();

  const handleButtonAddtransaction = () => {
    navigate("/tansaction-form");
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div
        className="flex-grow-1"
        style={{ overflowY: "scroll", height: "100vh" }}
      >
        <div class="dashboard-header">
          <h1>Manage Transaction</h1>
          <br />
          <div class="dashboard-buttons">
            <button onClick={handleButtonAddtransaction}>
              Add transaction
            </button>
          </div>
        </div>

        <br />
        <TransactionList />
      </div>
    </div>
  );
}

export default Home;
