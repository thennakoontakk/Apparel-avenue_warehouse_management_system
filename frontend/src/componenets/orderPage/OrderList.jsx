import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./styles.css";
import Sidebar from "./SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faFilePdf } from "@fortawesome/free-solid-svg-icons";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

//import toast
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8500/order/");
        setOrders(response.data);
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data.error : error.message
        );
      }
    };
    fetchOrders();
  }, []);

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:8500/order/delete/${_id}`);
      setOrders(orders.filter((order) => order._id !== _id));
      console.log("order deleted successfully!");
      toast.success("order deleted successfully!");
      alert("order deleted successfully!");
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data.error : error.message
      );
      toast.error("Failed to delete order");
    }
  };

  const handleClickBackHome = () => {
    // Navigate to the desired page when the button is clicked
    navigate("/OrderHome");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("order-table");

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
      const formattedTime = currentDate.toLocaleTimeString().replace(/:/g, "-");

      const filename = `Admin List Report_${formattedDate}_${formattedTime}.pdf`;

      pdf.save(filename);
      toast.success("Report is downloading!");

      // Show action buttons again
      actionButtons.forEach((button) => {
        button.style.display = "inline-block";
      });
    });
  };

  const filteredOrders = orders.filter((order) =>
    Object.values(order).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-auto">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <h2 className="text-center">Order List</h2>
          <div className="search-container">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button
              className="btn btn-primary me-2"
              type="button"
              onClick={handleDownloadPDF}
            >
              <FontAwesomeIcon icon={faFilePdf} /> Download PDF
            </button>
          </div>
          <table id="order-table" className="table table-striped">
            <thead>
              <tr>
                <th>Shipping address</th>
                <th>City</th>
                <th>Phone Number</th>
                <th>Payment method</th>
                <th>Slip URL</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order.address}</td>
                  <td>{order.city}</td>
                  <td>{order.phoneNumber}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    {order.slip &&
                      order.slip.map((slip, index) => (
                        <div key={index}>
                          <a href={slip.url} target="_blank" rel="noreferrer">
                            Slip {index + 1}
                          </a>
                        </div>
                      ))}
                  </td>

                  <td>
                    <button
                      className="btn btn-danger action-button"
                      onClick={() => handleDelete(order._id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} /> Delete
                    </button>
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
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default OrderList;
