import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaIconName } from "react-icons/fa";

const initialState = {
  c_name: "",
  source: "",
  preference: [],
  last_purchase: [],
  reg_customer: "",
  rate: "",
  satisfaction: "",
  comments: "",
  suggestions: "",
};

const SubmitFeedback = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, options } = e.target;
    if (type === "checkbox") {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData({
        ...formData,
        [name]: selectedOptions,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form fields
    if (!validateForm()) {
      // If validation fails, return early
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8500/feedback/add-feedback",
        formData
      );
      if (response && response.data) {
        console.log(response.data);
        toast.success("Feedback Submitted successfully!"); // Display success toast message
        alert("Feedback Submitted successfully!");
        setFormData(initialState); // Reset form fields using initialState
        navigate("/Thankyou");
      } else {
        console.error("Error: Response data is undefined");
        toast.error("Failed to submit the feedback"); // Display error toast message
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data.error : error.message
      );
      toast.error("Failed to submit the feedback"); // Display error toast message
    }
  };

  const validateForm = () => {
    const {
      c_name,
      source,
      preference,
      last_purchase,
      reg_customer,
      rate,
      satisfaction,
      comments,
    } = formData;

    // Check if all fields are filled out
    if (
      !c_name ||
      !source ||
      !preference ||
      !last_purchase ||
      !reg_customer ||
      !rate ||
      !satisfaction ||
      !comments
    ) {
      toast.error("All fields are required.");
      return false;
    }

    return true;
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2 style={{ fontStyle: "italic" }}>Hi! Welcome...</h2>
      <p style={{ margin: "20px", textAlign: "justify", fontSize: "17px" }}>
        Your feedback plays a vital role in shaping our future decisions and
        improving your experience. We appreciate your honest input, which
        enables us to address any concerns and enhance the quality of our
        services.
      </p>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "30px",
          border: "2px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f0f8ff",
          fontSize: "15px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontStyle: "italic",
            marginBottom: "20px",
            color: "#007bff",
          }}
        >
          Customer Feedback Form
        </h2>
        <br />
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginLeft: "50px",
          }}
        >
          <label
            style={{
              fontWeight: "bold",
              marginBottom: "23px",
            }}
          >
            Your Name:
            <input
              type="text"
              name="c_name"
              value={formData.c_name}
              onChange={handleChange}
              required
              style={{
                width: "90%",
                padding: "7px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </label>

          <label style={{ fontWeight: "bold" }}>
            Where did you hear about us?
          </label>
          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            required
            style={{
              width: "90%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginBottom: "23px",
            }}
          >
            <option value=""></option>
            <option value="Social Media">Social Media</option>
            <option value="Google">Google</option>
            <option value="Friends">Friends</option>
            <option value="Colleagues">Colleagues</option>
          </select>

          <label style={{ fontWeight: "bold" }}>
            Would you prefer to purchase online?
          </label>
          <div>
            {["Yes.I Do", "No,I'm Not"].map((option) => (
              <label
                key={option}
                style={{ marginRight: "170px", marginBottom: "23px" }}
              >
                <input
                  type="radio"
                  name="preference"
                  value={option}
                  checked={formData.preference === option.toString()}
                  onChange={handleChange}
                  required
                />
                {option}
              </label>
            ))}
          </div>

          <label style={{ fontWeight: "bold" }}>
            What did you last purchase?
          </label>

          <div>
            {["Jeans", "Dresses", "Blouses", "Denims", "Other"].map(
              (option) => (
                <label
                  key={option}
                  style={{ marginRight: "80px", marginBottom: "23px" }}
                >
                  <input
                    type="radio"
                    name="last_purchase"
                    value={option}
                    checked={formData.last_purchase === option.toString()}
                    onChange={handleChange}
                    required
                  />
                  {option}
                </label>
              )
            )}
          </div>

          <label style={{ fontWeight: "bold" }}>
            Are you a regular customer of Apparel Avenue?
          </label>
          <select
            name="reg_customer"
            value={formData.reg_customer}
            onChange={handleChange}
            required
            style={{
              width: "90%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginBottom: "23px",
            }}
          >
            <option value="">Select....</option>
            <option value="I am a Regular Customer">
              I am a regular customer
            </option>
            <option value="I purchase particular item only">
              I purchase a particular item only
            </option>
            <option value="Very rarely purchase online">
              I rarely purchase online
            </option>
          </select>

          <label style={{ fontWeight: "bold" }}>
            How would you rate your experience?
          </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            {[1, 2, 3, 4, 5].map((option) => (
              <label
                key={option}
                style={{ marginRight: "75px", marginBottom: "25px" }}
              >
                <input
                  type="radio"
                  name="rate"
                  value={option}
                  checked={formData.rate === option.toString()}
                  onChange={handleChange}
                  required
                  style={{ display: "none" }} // Hide the default radio button
                />
                <FaStar
                  size={24}
                  color={option <= formData.rate ? "#ffc107" : "#cfcfd1"}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    handleChange({
                      target: { name: "rate", value: option.toString() },
                    })
                  }
                />
              </label>
            ))}
          </div>

          <label style={{ fontWeight: "bold" }}>
            How easy is it to find information?
          </label>
          <select
            name="satisfaction"
            value={formData.satisfaction}
            onChange={handleChange}
            required
            style={{
              width: "90%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginBottom: "23px",
            }}
          >
            <option value="">Select the satisfaction type</option>
            <option value="Very Easy">Very Easy</option>
            <option value="Easy">Easy</option>
            <option value="Average">Average</option>
            <option value="Difficult">Difficult</option>
            <option value="Very Difficult">Very Difficult</option>
          </select>

          <label style={{ fontWeight: "bold" }}>
            Comments:
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              style={{
                width: "90%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                minHeight: "100px",
                marginBottom: "23px",
              }}
            />
          </label>

          <label style={{ fontWeight: "bold" }}>
            Suggestions:
            <textarea
              name="suggestions"
              value={formData.suggestions}
              onChange={handleChange}
              style={{
                width: "90%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                minHeight: "100px",
                marginBottom: "18px",
              }}
            />
          </label>

          <button
            type="submit"
            style={{
              padding: "9px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              alignSelf: "flex-end",
              width: "fit-content",
            }}
          >
            Submit Feedback
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SubmitFeedback;
