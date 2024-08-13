import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css"; 
import jsPDF from "jspdf";

function ManageSalary() {
  const [salaryCalculations, setSalaryCalculations] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredSalaryCalculations, setFilteredSalaryCalculations] = useState([]);
  const [empIdForPdf, setEmpIdForPdf] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8500/salary/getAllSalaryCalculations");
        setSalaryCalculations(response.data);
      } catch (error) {
        console.error("Error fetching salary calculations:", error.response.data.error);
        toast.error("Failed to fetch salary calculations. Please try again.");
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    setFilteredSalaryCalculations(
      salaryCalculations.filter((calculation) =>
        calculation.empType.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, salaryCalculations]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCalculations = [...filteredSalaryCalculations];
    updatedCalculations[index] = {
      ...updatedCalculations[index],
      [name]: value
    };
    setFilteredSalaryCalculations(updatedCalculations);
  };

  const handleSave = async (_id) => {
    try {
      const updatedCalculation = filteredSalaryCalculations.find(
        (calculation) => calculation._id === _id
      );
      await axios.put(
        `http://localhost:8500/salary/updateSalaryCalculation/${_id}`,
        updatedCalculation
      );
      toast.success("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error.response.data.error);
      toast.error("Failed to save changes. Please try again.");
    }
  };

  const handleDownloadPdf = () => {
    const employee = salaryCalculations.find((calculation) => calculation.empID === empIdForPdf);
    if (employee) {
      const { basic, bonus, otRate, otHours } = employee;
      const salary = basic + bonus + (otRate * otHours);
      const doc = new jsPDF();
      doc.text(`Employee ID: ${empIdForPdf}`, 10, 10);
      doc.text(`Basic Salary: ${basic}`, 10, 20);
      doc.text(`Bonus: ${bonus}`, 10, 30);
      doc.text(`OT Rate: ${otRate}`, 10, 40);
      doc.text(`OT Hours: ${otHours}`, 10, 50);
      doc.text(`Total Salary: ${salary}`, 10, 60);
      doc.save(`${empIdForPdf}_salary.pdf`);
    } else {
      toast.error("Employee not found!");
    }
  };

  return (
    <div>
      <h1>Manage Salary</h1>
      <div>
        <label htmlFor="empTypeFilter">Filter by Employee Type:</label>
        <input
          type="text"
          id="empTypeFilter"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <div className="cards-container">
        {filteredSalaryCalculations.map((calculation, index) => (
          <div className="card" key={calculation._id}>
            <h3>Employee Details</h3>
            <div className="card-content">
              <label htmlFor={`empID_${index}`}>Employee ID:</label>
              <input
                type="text"
                id={`empID_${index}`}
                name="empID"
                value={calculation.empID}
                onChange={(e) => handleInputChange(e, index)}
              />
              <label htmlFor={`empType_${index}`}>Employee Type:</label>
              <input
                type="text"
                id={`empType_${index}`}
                name="empType"
                value={calculation.empType}
                onChange={(e) => handleInputChange(e, index)}
              />
              <label htmlFor={`basic_${index}`}>Basic:</label>
              <input
                type="number"
                id={`basic_${index}`}
                name="basic"
                value={calculation.basic}
                onChange={(e) => handleInputChange(e, index)}
              />
              <label htmlFor={`otRate_${index}`}>OT Rate:</label>
              <input
                type="number"
                id={`otRate_${index}`}
                name="otRate"
                value={calculation.otRate}
                onChange={(e) => handleInputChange(e, index)}
              />
              <label htmlFor={`bonus_${index}`}>Bonus:</label>
              <input
                type="number"
                id={`bonus_${index}`}
                name="bonus"
                value={calculation.bonus}
                onChange={(e) => handleInputChange(e, index)}
              />
              <label htmlFor={`otHours_${index}`}>OT Hours:</label>
              <input
                type="number"
                id={`otHours_${index}`}
                name="otHours"
                value={calculation.otHours}
                onChange={(e) => handleInputChange(e, index)}
              />
            </div>
            <button onClick={() => handleSave(calculation._id)}>Save Changes</button>
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="empIdForPdf">Enter Employee ID to download PDF:</label>
        <input
          type="text"
          id="empIdForPdf"
          value={empIdForPdf}
          onChange={(e) => setEmpIdForPdf(e.target.value)}
        />
        <button onClick={handleDownloadPdf}>Download PDF</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ManageSalary;
