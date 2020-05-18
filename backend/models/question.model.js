const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
  number: { type: Number, require: true },
  text: { type: String, require: true, trim: true, maxlength: 100 },
  pollID: { type: String, trim: true, require: true },
  //! Considering changeing to accomidate student selections by gender
  type: { type: { str: String, options: {} }, require: true }, //MCn where n=allowed selections, OE, CS (chooseStudent)
  // type: { type: String, require: true }, //MCn where n=allowed selections, OE, CS (chooseStudent)
  options: { type: Array }, //arr of responses for mc options, arr of gradyears for CS
  votes: { type: Array, default: [] }, //* Each index will be an object with an email, and a response.
});

module.exports = mongoose.model("question", QuestionSchema);
