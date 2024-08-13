import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import defaultProfileImage from "../Assets/default-profile-image.jpg";

const ViewOtherFb = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [replyText, setReplyText] = useState("");
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

  const filteredFeedbacks = feedbacks.filter((feedback) =>
    Object.values(feedback).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleClickBackHome = () => {
    navigate("/CusComplaintHome");
  };

  const handleReply = (feedbackID) => {
    // Find the feedback by ID
    const updatedFeedbacks = feedbacks.map((feedback) => {
      if (feedback.feedbackID === feedbackID) {
        // Append the new reply to the conversation
        return {
          ...feedback,
          conversation: [
            ...(feedback.conversation || []),
            { sender: "You", text: replyText, id: Date.now() }, // Add unique ID for each reply
          ],
        };
      }
      return feedback;
    });

    // Update the feedbacks state with the updated feedbacks
    setFeedbacks(updatedFeedbacks);

    // Clear the reply text field after replying
    setReplyText("");
  };

  const handleEditReply = (feedbackID, replyID, newText) => {
    // Find the feedback by ID
    const updatedFeedbacks = feedbacks.map((feedback) => {
      if (feedback.feedbackID === feedbackID && feedback.conversation) {
        // Find the reply by ID and update the text
        const updatedConversation = feedback.conversation.map((reply) => {
          if (reply.id === replyID) {
            return { ...reply, text: newText };
          }
          return reply;
        });

        return { ...feedback, conversation: updatedConversation };
      }
      return feedback;
    });

    // Update the feedbacks state with the updated feedbacks
    setFeedbacks(updatedFeedbacks);
  };

  const handleRemoveReply = (feedbackID, replyID) => {
    // Find the feedback by ID
    const updatedFeedbacks = feedbacks.map((feedback) => {
      if (feedback.feedbackID === feedbackID && feedback.conversation) {
        // Filter out the reply with the specified ID
        const updatedConversation = feedback.conversation.filter(
          (reply) => reply.id !== replyID
        );

        return { ...feedback, conversation: updatedConversation };
      }
      return feedback;
    });

    // Update the feedbacks state with the updated feedbacks
    setFeedbacks(updatedFeedbacks);
  };

  // Function to render stars based on the rate
  const renderStars = (rate) => {
    const starArray = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        starArray.push(<span key={i}>&#9733;</span>);
      } else {
        starArray.push(<span key={i}>&#9734;</span>);
      }
    }
    return starArray;
  };

  return (
    <div>
      <h2
        style={{
          textAlign: "left",
          fontStyle: "italic",
          padding: "20px",
          color: "#007bff",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Hi! You can now Explore others Feedbacks!
      </h2>
      <div style={containerStyle}>
        <div className="search-container mb-4 d-flex align-items-center">
          <input
            type="text"
            className="form-control search-input me-2"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        {filteredFeedbacks.map((feedback) => (
          <div key={feedback.feedbackID} style={feedbackStyle}>
            <div style={profileContainerStyle}>
              <img
                src={feedback.profilePhoto || defaultProfileImage}
                alt="Profile"
                style={profileImageStyle}
              />
              <p style={customerNameStyle}>{feedback.c_name}</p>
            </div>
            <p style={infoStyle}>
              <strong>Platform that knew about us:</strong> {feedback.source}
            </p>
            <p style={infoStyle}>
              <strong>Likability on online platform:</strong>{" "}
              {feedback.preference}
            </p>
            <p style={infoStyle}>
              <strong>Last Purchase item type:</strong> {feedback.last_purchase}
            </p>
            <p style={infoStyle}>
              <strong>Customer Type:</strong> {feedback.reg_customer}
            </p>
            <p style={infoStyle}>
              <strong>Rate:</strong> {renderStars(feedback.rate)}
            </p>
            <p style={infoStyle}>
              <strong>Satisfaction on our website:</strong>{" "}
              {feedback.satisfaction}
            </p>
            <p style={infoStyle}>
              <strong>Comments:</strong> {feedback.comments}
            </p>
            <p style={infoStyle}>
              <strong>Suggestions:</strong> {feedback.suggestions}
            </p>

            <hr style={dividerStyle} />
            <div>
              {feedback.conversation &&
                feedback.conversation.map((message) => (
                  <div key={message.id} style={conversationStyle}>
                    <p style={messageStyle}>
                      <strong>{message.sender}: </strong>
                      {message.text}
                    </p>
                    <div style={replyActionsStyle}>
                      <button
                        style={{
                          ...buttonStyle,
                          backgroundColor: "#eefaff",
                          fontStyle: "italic",
                          marginRight: "5px",
                        }}
                        onClick={() => {
                          const newText = prompt("Enter new text:");
                          if (newText !== null && newText !== "") {
                            handleEditReply(
                              feedback.feedbackID,
                              message.id,
                              newText
                            );
                          }
                        }}
                      >
                        Edit
                      </button>
                      <button
                        style={{
                          ...buttonStyle,
                          backgroundColor: "#eefaff",
                          fontStyle: "italic",
                        }}
                        onClick={() =>
                          handleRemoveReply(feedback.feedbackID, message.id)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            {/* Reply form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleReply(feedback.feedbackID);
              }}
              style={formStyle}
            >
              <input
                type="text"
                placeholder="Enter your reply"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                style={inputStyle}
              />
              <button
                type="submit"
                style={{ ...buttonStyle, backgroundColor: "#2196f3" }}
              >
                Reply
              </button>
            </form>
            <hr style={dividerStyle} />
          </div>
        ))}

        <button
          onClick={handleClickBackHome}
          style={{ ...buttonStyle, backgroundColor: "#2d46d3", color: "white" }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "30px",
  backgroundColor: "#eefaff",
};

const feedbackStyle = {
  marginBottom: "7px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "20px",
};

const profileContainerStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "10px",
};

const profileImageStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  marginRight: "15px",
};

const customerNameStyle = {
  fontSize: "1.1rem",
  margin: "0",
};

const dividerStyle = {
  borderTop: "1px solid #ccc",
  margin: "20px 0",
};

const conversationStyle = {
  marginBottom: "20px",
};

const messageStyle = {
  margin: "0",
  marginBottom: "10px",
};

const replyActionsStyle = {
  marginTop: "5px",
};

const formStyle = {
  display: "flex",
  alignItems: "center",
};

const inputStyle = {
  flex: "1",
  marginRight: "30px",
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const buttonStyle = {
  padding: "6px 13px",
  borderRadius: "9px",
  border: "none",
  color: "black",
  cursor: "pointer",
};

const infoStyle = {
  marginBottom: "7px",
};

export default ViewOtherFb;
