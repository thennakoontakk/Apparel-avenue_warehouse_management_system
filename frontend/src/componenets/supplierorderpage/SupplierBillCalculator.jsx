import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useLocation } from 'react-router-dom';

const SupplierBillCalculator = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialItemPrice = parseFloat(queryParams.get('itemPrice')) || 0;
  const initialQuantity = parseInt(queryParams.get('quantity')) || 0;

  const [itemPrice, setItemPrice] = useState(initialItemPrice);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setItemPrice(initialItemPrice);
    setQuantity(initialQuantity);
  }, [initialItemPrice, initialQuantity]);

  const calculateTotalPrice = () => {
    const totalPrice = itemPrice * quantity;
    setTotalPrice(totalPrice);
  };

  const handlePrintBill = () => {
    const input = document.getElementById('bill-section');

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('supplier_bill.pdf');
    });
  };

  return (
    <div className="container mt-5">
      <h2>Supplier Bill Calculator</h2>
      <div className="row mt-3">
        <div className="col-md-6">
          <label htmlFor="itemPrice" className="form-label">Item Price:</label>
          <input
            id="itemPrice"
            type="number"
            className="form-control"
            value={itemPrice}
            onChange={(e) => setItemPrice(parseFloat(e.target.value))}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="quantity" className="form-label">Quantity:</label>
          <input
            id="quantity"
            type="number"
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="mt-3">
        <button className="btn btn-primary me-3" onClick={calculateTotalPrice}>Calculate Total Price</button>
        <button className="btn btn-success" onClick={handlePrintBill}>Print Bill</button>
      </div>
      <div className="mt-3" id="bill-section" style={{ fontSize: '24px' }}>
        <h3>Supplier Bill</h3>
        <p>Quantity: {quantity}</p>
        <p>Item Price: Rs.{itemPrice}</p>
        <p>Total Price: Rs.{totalPrice}</p>
      </div>
    </div>
  );
};

export default SupplierBillCalculator;
