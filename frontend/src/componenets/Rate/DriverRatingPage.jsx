import React, { useState } from "react";
import Sidebar from "../Driver/SideBarTransport";

function DriverRatingPage() {
  const [selectedDriver, setSelectedDriver] = useState(localStorage.getItem("selectedDriver") || "");
  const [completedDeliveries, setCompletedDeliveries] = useState(localStorage.getItem("completedDeliveries") || "");
  const [driverCommissions, setDriverCommissions] = useState(JSON.parse(localStorage.getItem("driverCommissions")) || {});

  const handleDriverChange = (e) => {
    setSelectedDriver(e.target.value);
  };

  const handleDeliveriesChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setCompletedDeliveries(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Commission calculation for ${selectedDriver}`);

    if (!completedDeliveries) {
      alert("Please enter the number of completed deliveries.");
      return;
    }

    // Calculate commission based on completed deliveries
    const commissionRate = 10; // Example: $10 commission per delivery
    const calculatedCommission = completedDeliveries * commissionRate;

    // Convert commission from dollars to rupees (assuming 1 USD = 75 INR)
    const commissionInRupees = calculatedCommission * 75;

    // Update commissions for all drivers
    setDriverCommissions((prevCommissions) => ({
      ...prevCommissions,
      [selectedDriver]: commissionInRupees,
    }));

    // Store data in localStorage
    localStorage.setItem("selectedDriver", selectedDriver);
    localStorage.setItem("completedDeliveries", completedDeliveries);
    localStorage.setItem("driverCommissions", JSON.stringify(driverCommissions));

    setSelectedDriver("");
    setCompletedDeliveries("");
  };


  // Styles
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    label: {
      marginBottom: "20px",
      fontWeight: "bold",
      textAlign: "center",
    },
    form: {
      marginBottom: "20px",
    },
    inputLabel: {
      display: "block",
      marginBottom: "5px",
    },
    select: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },
    submitButton: {
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      padding: "10px 20px",
      fontSize: "16px",
      cursor: "pointer",
      width: "100%",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    th: {
      backgroundColor: "#f2f2f2",
      padding: "10px",
      textAlign: "left",
    },
    td: {
      borderBottom: "1px solid #ddd",
      padding: "10px",
      textAlign: "left",
    },
  };

  return (
    <div>
      <div className="container-fluid h-100">
        <div className="row align-items-center h-100">
          <div className="col-md-4">
            <Sidebar />
          </div>
          <div className="col-md-8">
            <div style={styles.container}>
              <h1 style={styles.label}>Commission Form</h1>
              <form style={styles.form} onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="driverSelect" style={styles.inputLabel}>
                    Select Driver:
                  </label>
                  <select
                    id="driverSelect"
                    value={selectedDriver}
                    onChange={handleDriverChange}
                    required
                    style={styles.select}
                  >
                    <option value="">Select a driver</option>
                    <option value="Roshan Perera">Roshan Perera</option>
                    <option value="Kumara Zoysa">Kumara Zoysa</option>
                    <option value="Ravindu Kaveen">Ravindu Kaveen</option>
                    <option value="Ramindu Dulmin">Ramindu Dulmin</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="completedDeliveries" style={styles.inputLabel}>
                    Completed Deliveries:
                  </label>
                  <input
                    type="number"
                    id="completedDeliveries"
                    value={completedDeliveries}
                    onChange={handleDeliveriesChange}
                    className="form-control"
                    required
                    style={styles.input}
                  />
                </div>
                <div>
                  <button type="submit" style={styles.submitButton}>
                    Calculate Commission
                  </button>
                </div>
              </form>
              <div>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Driver</th>
                      <th style={styles.th}>Commission</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(driverCommissions).map(([driver, commission]) => (
                      <tr key={driver}>
                        <td style={styles.td}>{driver}</td>
                        <td style={styles.td}>Rs{commission}</td> {/* Display commission in rupees */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverRatingPage;