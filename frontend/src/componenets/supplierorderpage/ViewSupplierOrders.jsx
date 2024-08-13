import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faPlus,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../SideBarS";
import { Link } from "react-router-dom";

import "./styles.css"; // Importing the CSS file

function ViewSupplierOrders() {
  const [supplierorders, setSupplierOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchSupplierOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8500/supplierOrder/getAllSupplierOrder"
        );
        setSupplierOrders(response.data);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchSupplierOrders();
  }, []);

  const handleEdit = (supplierOrderID) => {
    navigate(`/supplierOrder/update-supplierOrder/${supplierOrderID}`); // Navigate to edit page
  };

  const handleDelete = async (supplierOrderID) => {
    try {
      await axios.delete(
        `http://localhost:8500/supplierOrder/delete-supplierOrder/${supplierOrderID}`
      );
      setSupplierOrders(
        supplierorders.filter(
          (supplierorder) => supplierorder.supplierOrderID !== supplierOrderID
        )
      );
      console.log("Supplier order deleted successfully!");
      toast.success("Supplier order deleted successfully!");
    } catch (error) {
      console.error("Error:", error.response.data.error);
    }
  };                                                                                          

  const handleClickNewSupplierOrder = () => {
    // Navigate to the desired page when the button is clicked
    navigate("/supplierOrder/Create-supplierOrder");
  };

  const handleClickBackHome = () => {
    // Navigate to the desired page when the button is clicked
    navigate("/supplier/supplierManager/Home");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredSupplierOrders = supplierorders.filter((supplierorder) =>
    Object.values(supplierorder).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDownloadPDF = () => {
    const input = document.getElementById("supplier-orders-table");

    // Hide action buttons
    const actionButtons = document.querySelectorAll(".action-button");
    actionButtons.forEach((button) => {
      button.style.display = "none";
    });

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split("T")[0];
      const formattedTime = currentDate
        .toLocaleTimeString()
        .replace(/:/g, "-");

      const filename = `Supplier_Order_List_Report_${formattedDate}_${formattedTime}.pdf`;

      pdf.save(filename);
      toast.success("Report is downloading!");

      // Show action buttons again
      actionButtons.forEach((button) => {
        button.style.display = "inline-block";
      });
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-auto">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="content">
            <h2>Supplier Order List</h2>
            <div className="search-container">
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <button
                className="btn btn-secondary me-2"
                type="button"
                onClick={handleClickNewSupplierOrder}
              >
                <FontAwesomeIcon icon={faPlus} /> Add New Supplier Order
              </button>
              <button
                className="btn btn-primary me-2"
                type="button"
                onClick={handleDownloadPDF}
              >
                <FontAwesomeIcon icon={faFilePdf} /> Download PDF
              </button>
            </div>
            <table id="supplier-orders-table" className="table table-striped">
              <thead>
                <tr>
                  <th>Supplier Order ID</th>
                  <th>Supplier Order Status</th>
                  <th>Item ID</th>
                  <th>Supplier ID</th>
                  <th>Quantity</th>
                  <th>Item Per Price</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSupplierOrders.map((supplierorder) => (
                  <tr key={supplierorder.supplierOrderID}>
                    <td>{supplierorder.supplierOrderID}</td>
                    <td>{supplierorder.supplierOrderStatus}</td>
                    <td>{supplierorder.ItemID}</td>
                    <td>{supplierorder.supplierID}</td>
                    <td>{supplierorder.Quantity}</td>
                    <td>{supplierorder.itemPerPrice}</td>
                    <td>{supplierorder.description}</td>
                    <td>
                      <button
                        className="btn btn-success me-1 action-button"
                        onClick={() =>
                          handleEdit(supplierorder.supplierOrderID)
                        }
                      >
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </button>
                      <button
                        className="btn btn-danger me-1 action-button"
                        onClick={() =>
                          handleDelete(supplierorder.supplierOrderID)
                        }
                      >
                        <FontAwesomeIcon icon={faTrashAlt} /> Delete
                      </button>
                      <Link
                        className="btn btn-primary action-button"
                        to={`/supplier/SupplierBillCalculator?itemPrice=${supplierorder.itemPerPrice}&quantity=${supplierorder.Quantity}`}
                      >
                        Calculate Bill
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="btn btn-primary float-end"
              onClick={handleClickBackHome}
            >
              Back to Home
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSupplierOrders;

