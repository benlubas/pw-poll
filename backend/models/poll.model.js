const mongoose = require("mongoose");

const PollSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  openDate: {
    type: Date,
    default: Date.now()
  },
  closeDate: {
    type: Date,
    default: Date.now()
  },
  viewInProgress: {
    type: Boolean,
    default: false
  },
  pollType: {
    type: String,
    required: true
  },
  typeData: {
    type: JSON,
    required: true
  }
});

module.exports = mongoose.model("polls", PollSchema);
