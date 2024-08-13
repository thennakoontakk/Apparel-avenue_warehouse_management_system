import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import "./styles.css"; 

function InvoiceDetails() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`http://localhost:8500/invoice/getInvoiceById/${id}`);
        setInvoice(response.data);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchInvoice();
  }, [id]);

  const handleDownloadPDF = () => {
    if (invoice) {
      // Create new PDF document
      const doc = new jsPDF();

      // Add content to the PDF
      doc.text("Invoice Details", 10, 10);
      doc.text(`Description: ${invoice.description}`, 10, 20);
      doc.text(`Quantity: ${invoice.quantity}`, 10, 30);
    

      // Save the PDF
      doc.save("invoice.pdf");
    }
  };

  return (
    <div className="body">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Invoice Details</h2>
      {invoice && (
        <div className="invoice-details">
          <p><strong>Description:</strong> {invoice.description}</p>
          <p><strong>Quantity:</strong> {invoice.quantity}</p>
          <p><strong>Unit Price:</strong> {invoice.unitPrice}</p>
          <p><strong>Amount:</strong> {invoice.amount}</p>
          <p><strong>Date:</strong> {invoice.date}</p>
          <button onClick={handleDownloadPDF}>Download PDF</button>
        </div>
      )}
    </div>
  );
}

export default InvoiceDetails;
