// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const { 
  addMessageToConversation,
  updateMessageInConversation,
  deleteMessageFromConversation 
} = require('../controllers/messageController');

router.post('/feedback/:feedbackID/addMessage', addMessageToConversation);
router.put('/feedback/:feedbackID/updateMessage/:messageID', updateMessageInConversation);
router.delete('/feedback/:feedbackID/deleteMessage/:messageID', deleteMessageFromConversation);

module.exports = router;
