// models/Message.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  sender_id: {
   type:String
  },
  recipient_id: {
    type:String
  },
  content: {
    type: String,
    required: true
  },
  roomId:{
    type:String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Message', MessageSchema);
