// controllers/messageController.js
const Message = require("../models/messageModel");
const Feedback = require("../models/feedbackModel");

const addMessageToConversation = async (req, res) => {
  const { feedbackID } = req.params;
  const { sender, text } = req.body;
  
  try {
    const feedback = await Feedback.findOne({ feedbackID });

    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    const newMessage = new Message({ sender, text });
    feedback.conversation.push(newMessage);
    await feedback.save();

    res.status(201).json({ message: "Message added to conversation successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add message to conversation" });
  }
};

const updateMessageInConversation = async (req, res) => {
  const { feedbackID, messageID } = req.params;
  const { text } = req.body;

  try {
    const feedback = await Feedback.findOne({ feedbackID });

    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    const message = feedback.conversation.id(messageID);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    message.text = text;
    await feedback.save();

    res.status(200).json({ message: "Message updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update message" });
  }
};

const deleteMessageFromConversation = async (req, res) => {
  const { feedbackID, messageID } = req.params;

  try {
    const feedback = await Feedback.findOne({ feedbackID });

    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    feedback.conversation.pull({ _id: messageID });
    await feedback.save();

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete message" });
  }
};

module.exports = {
  addMessageToConversation,
  updateMessageInConversation,
  deleteMessageFromConversation,
};
