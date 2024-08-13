import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8500/feedback/allFeedbacks"
        );
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClickBackHome = () => {
    navigate("/ComplaintHome");
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("feedback-table");

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

      const filename = `feedback List Report_${formattedDate}_${formattedTime}.pdf`;

      pdf.save(filename);
      toast.success("Report is downloading!");

      // Show action buttons again
      actionButtons.forEach((button) => {
        button.style.display = "inline-block";
      });
    });
  };

  const filteredFeedbacks = feedbacks.filter((feedback) =>
    Object.values(feedback).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <div className="row">
        <div className="col-md-auto">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <h2 className="text-center">Feedback List</h2>
          <div className="search-container mb-4 d-flex align-items-center">
            <input
              type="text"
              className="form-control search-input me-2"
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
          <table id="feedback-table" className="table table-striped">
            <thead>
              <tr>
                <th>Feedback ID</th>
                <th>Customer Name</th>
                <th>Source</th>
                <th>Online Preference</th>
                <th>Last Purchase</th>
                <th>Customer Type</th>
                <th>Rate</th>
                <th>Satisfaction</th>
                <th>Comments</th>
                <th>Suggestions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedbacks.map((feedback) => (
                <tr key={feedback.feedbackID}>
                  <td>{feedback.feedbackID}</td>
                  <td>{feedback.c_name}</td>
                  <td>{feedback.source}</td>
                  <td>{feedback.preference}</td>
                  <td>{feedback.last_purchase}</td>
                  <td>{feedback.reg_customer}</td>
                  <td>{feedback.rate}</td>
                  <td>{feedback.satisfaction}</td>
                  <td>{feedback.comments}</td>
                  <td>{feedback.suggestions}</td>
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
    </div>
  );
};

export default FeedbackList;
