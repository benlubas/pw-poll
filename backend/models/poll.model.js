const mongoose = require("mongoose");

const PollSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 100
  },
  desc: { type: String, required: true, trim: true, maxlength: 1500 },
  startDate: { type: Date, default: Date.now() },
  endDate: {
    type: Date,
    default: Date.now() + 7 * 24 * 60 * 60 * 1000 //* one week from current time.
  },
  viewInProgress: { type: Boolean, default: false },
  //results are viewable by
  viewableBy: {
    type: String,
    enum: ["Students", "Teachers", "Admins", "Sponsors", "All"], //* students - must login | all - no login required
    required: false
  },
  timeStamp: {
    type: Date,
    required: true
  },
  gradYears: {
    //who can vote in the poll
    //(multiple grad years are allowed, this is the only way we are grouping students);
    type: Array,
    default: []
  }
});

PollSchema.pre("save", next => {
  if (this.viewableBy === undefined) {
    this.viewableBy = "sponsors";
  }
  if (this.viewInProgress === undefined) {
    this.viewInProgress = true;
  }
  next();
});

module.exports = mongoose.model("polls", PollSchema);
