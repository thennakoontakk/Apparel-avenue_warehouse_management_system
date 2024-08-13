import React, { useState } from "react";
import axios from "axios";
import SideBarCart from "./SideBarCart";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const CheckoutPage = () => {
  const [promoCode, setPromoCode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");
  const [discount, setDiscount] = useState(0);
  const [slip, setSlip] = useState(null); // New state for slip file

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleApplyPromoCode = async () => {
    try {
      const discountTableResponse = await axios.get(
        "http://localhost:8500/discount"
      );
      const discountTable = discountTableResponse.data;

      const promoCodeExists = discountTable.find(
        (item) => item.code === promoCode
      );

      if (promoCodeExists) {
        const discountPercentage = promoCodeExists.percentage;
        setDiscount(discountPercentage);

        console.log(
          `Promo code '${promoCode}' applied successfully. Discount: ${discountPercentage}%`
        );
      } else {
        console.log("Invalid promo code. Please try again.");
      }
    } catch (error) {
      console.error("Error applying promo code:", error);
    }
  };

  const handleGetInvoice = () => {
    const input = document.getElementById("checkout-content");

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

      const filename = `Invoice Report_${formattedDate}_${formattedTime}.pdf`;

      pdf.save(filename);
      toast.success("Report is downloading!");
    });
  };

  const handlePlaceOrder = async () => {
    if (validateForm()) {
      try {
        let orderData = {
          address,
          city,
          phoneNumber,
          paymentMethod,
        };

        if (paymentMethod === "slipPayment") {
          // Ensure slip is not empty
          if (!slip) {
            console.error("Slip is required for slip payment.");
            return;
          }

          // Construct slip object
          const slipData = {
            public_id: "your_public_id",
            url: slip,
          };

          // Add slip to order data
          orderData = { ...orderData, slip: [slipData] };
        }

        // Make a POST request to your API endpoint to create the order
        await axios.post("http://localhost:8500/order/", orderData);

        console.log("order added :", orderData);
        toast.success("order added successfully!");
      } catch (error) {
        console.error("Error placing order:", error);
      }
    }
  };

  const handleSendFile = async (e) => {
    e.preventDefault();

    if (!slip) return;
    try {
      const res = await axios.post("http://localhost:8500/upload", {
        image_url: slip,
      });

      console.log(res);
      toast.success("Slip uploaded successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSlipChange = (e) => {
    const file = e.target.files[0];

    var reader = new FileReader();
    reader.onloadend = function () {
      setSlip(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    if (!address || !city || !phoneNumber) {
      toast.error("Please fill out all required fields.");
      return false;
    }
    if (paymentMethod === "slipPayment" && !slip) {
      toast.error("Please upload a slip for slip payment.");
      return false;
    }
    if (phoneNumber.length !== 10) {
      toast.error("Phone number must be 10 digits long.");
      return false;
    }
    return true;
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0">
          <div id="checkout-content">
            <SideBarCart discount={discount} />
          </div>
        </div>

        <div className="col-md-9">
          <h2 className="text-center">Checkout Process</h2>
          <h4>Promo Code</h4>
          <p>Apply Promo Code</p>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Promo Code"
              aria-label="PromoCode"
              aria-describedby="button-addon2"
              id="promoCode"
              value={promoCode}
              onChange={handlePromoCodeChange}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleApplyPromoCode}
            >
              Apply
            </button>
          </div>

          <div className="row g-2">
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="Address"
                  value={address}
                  onChange={handleAddressChange}
                />
                <label htmlFor="floatingInputGrid">Address</label>
              </div>
            </div>

            <div className="col-md">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder="City"
                  value={city}
                  onChange={handleCityChange}
                />
                <label htmlFor="floatingInputGrid">City</label>
              </div>
            </div>
          </div>
          <br></br>
          <div className="row g-2">
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="Phone Number"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
                <label htmlFor="floatingInputGrid">Phone Number</label>
              </div>
            </div>
          </div>
          <br></br>

          <div>
            Payment Method:
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  value="cashOnDelivery"
                  checked={paymentMethod === "cashOnDelivery"}
                  onChange={handlePaymentMethodChange}
                />
                <label>Cash on Delivery</label>
              </li>
            </ul>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  value="slipPayment"
                  checked={paymentMethod === "slipPayment"}
                  onChange={handlePaymentMethodChange}
                />
                <label>Slip Payment</label>
              </li>
            </ul>
          </div>
          {paymentMethod === "slipPayment" && (
            <ul>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  type="file"
                  id="slip"
                  aria-describedby="button-addon2"
                  onChange={handleSlipChange}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSendFile}
                >
                  Upload
                </button>
              </div>
            </ul>
          )}
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              className="btn btn-primary me-md-2"
              type="button"
              onClick={handleGetInvoice}
            >
              Get Invoice
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CheckoutPage;
