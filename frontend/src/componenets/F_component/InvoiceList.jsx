import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get("http://localhost:8500/invoice/getInvoice");
        setInvoices(response.data);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchInvoices();
  }, []);

  const handleEdit = (id) => {
    navigate(`/invoices/update/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8500/invoice/deleteInvoice/${id}`);
      setInvoices(invoices.filter((invoice) => invoice._id !== id));
      toast.success("Invoice deleted successfully!");
    } catch (error) {
      console.error("Error:", error.response.data.error);
    }
  };

  const handleView = (id) => {
    navigate(`/invoiceView/${id}`);
  };

  

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredInvoices = invoices.filter((invoice) =>
    Object.values(invoice).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="body">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Invoice List</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="form-control search-input"
        />
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Bill To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map((invoice) => (
            <tr key={invoice._id}>
              <td>{invoice.description}</td>
              <td>{invoice.quantity}</td>
              <td>{invoice.unitPrice}</td>
              <td>{invoice.amount}</td>
              <td>{invoice.date}</td>
              <td>{invoice.billTo}</td>
              <td>
                <button className="btn btn-primary mr-2" onClick={() => handleView(invoice._id)}>View</button>
                <button className="btn btn-primary mr-2" onClick={() => handleEdit(invoice._id)}>Edit</button>
                <button className="btn btn-danger me-2" onClick={() => handleDelete(invoice._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default InvoiceList;
