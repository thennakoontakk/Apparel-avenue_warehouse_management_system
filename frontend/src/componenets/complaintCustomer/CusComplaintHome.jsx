import React from "react";
import { Link } from "react-router-dom";
import customerServiceImage from "../Assets/customerservice.jpeg";

const CusComplaintHome = () => {
  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "1200px",
        margin: "0 auto",
        marginTop: "20px",
      }}
    >
      <div
        className="image-container"
        style={{ flex: 1, marginRight: "20px", marginTop: "80px" }}
      >
        <img
          src={customerServiceImage}
          alt="customerservice"
          style={{
            maxWidth: "100%",
            height: "auto",
            display: "block",
            margin: "0 auto",
          }}
        />
      </div>
      <div
        className="content-container"
        style={{ flex: 2, fontSize: "1.1rem" }}
      >
        <h1
          style={{ color: "#2d46d3", fontSize: "2.5rem", marginBottom: "30px" }}
        >
          Welcome to our Feedback page!
        </h1>
        <p
          style={{
            lineHeight: "1.6",
            marginBottom: "40px",
            fontStyle: "italic",
          }}
        >
          We value your feedback and are committed to providing excellent
          service to our customers. Your opinion matters to us, and we encourage
          you to share your thoughts, suggestions, or any concerns you may have.
          Feel free to provide feedback or submit a complaint through the
          appropriate channels provided below. Your satisfaction is our
          priority, and we strive to continuously improve our services to better
          serve you.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link to="/feedback/add-feedback">
            <button
              className="btn-primary"
              style={{
                width: "200px",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "bold",
                color: "white",
                padding: "11px 18px",
                textAlign: "center",
                backgroundColor: "#2d46d3",
                marginTop: "20px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
            >
              Provide Feedback
            </button>
          </Link>
          <Link to="/complaint/add-Complaint">
            <button
              className="btn-primary"
              style={{
                width: "200px",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "bold",
                color: "white",
                padding: "11px 18px",
                textAlign: "center",
                backgroundColor: "#2d46d3",
                marginTop: "20px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
            >
              Submit a Complaint
            </button>
          </Link>
        </div>
        {/* Add "View others feedbacks" button */}
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: "999",
          }}
        >
          <Link to="/ViewOtherFB">
            <button
              className="view-feedback-btn"
              style={{
                borderRadius: "50%",
                width: "120px",
                height: "100px",
                fontSize: "1rem",
                fontStyle: "italic",
                backgroundColor: "#2ee8d9",
                border: "none",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
            >
              View others feedbacks
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CusComplaintHome;
