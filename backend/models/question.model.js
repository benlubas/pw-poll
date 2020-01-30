const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
  number: { type: Number, require: true },
  text: { type: String, require: true, trim: true, maxlength: 100 },
  desc: { type: String, maxlength: 200, trim: true },
  pollID: { type: String, trim: true, require: true },
  options: { type: Array }, //* if this exists, it's a multiple choice
  required: { type: Boolean, require: true },
  votes: { type: Array } //* Each index will be an object with an email, and a response.
});

// TODO: This might not be necessary.
//* I don't think it is.
// QuestionSchema.pre("save", function() {
//   if (this.options === undefined) {
//     this.options === null;
//   }
// });

module.exports = mongoose.model("question", QuestionSchema);
