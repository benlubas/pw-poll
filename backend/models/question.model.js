const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
  number: { type: Number, require: true },
  text: { type: String, require: true, trim: true, maxlength: 100 },
  pollID: { type: String, trim: true, require: true },
  options: { type: Array }, //* if this exists, it's a multiple choice
  votes: { type: Array, default: [] } //* Each index will be an object with an email, and a response.
});

module.exports = mongoose.model("question", QuestionSchema);
