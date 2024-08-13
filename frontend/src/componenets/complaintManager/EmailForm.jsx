import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const EmailForm = () => {
  const navigate = useNavigate();
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    body: "",
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setEmailData({
      ...emailData,
      [name]: name === "attachment" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("to", emailData.to);
      formData.append("subject", emailData.subject);
      formData.append("body", emailData.body);
      formData.append("attachment", emailData.attachment);

      const response = await axios.post("/api/send-email", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      alert("Email sent successfully!");
      navigate("/ComplaintHome");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-auto">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="container">
            <div className="border p-4">
              <h2 className="text-center mb-4"> Email Form</h2>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                  <label htmlFor="to" className="form-label">
                    To:
                  </label>
                  <input
                    type="email"
                    name="to"
                    id="to"
                    value={emailData.to}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    Subject:
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={emailData.subject}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="body" className="form-label">
                    Body:
                  </label>
                  <textarea
                    name="body"
                    id="body"
                    value={emailData.body}
                    onChange={handleChange}
                    className="form-control"
                    required
                    rows="5"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="attachment" className="form-label">
                    Attachment:
                  </label>
                  <input
                    type="file"
                    name="attachment"
                    id="attachment"
                    onChange={handleChange}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Send Email
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailForm;
