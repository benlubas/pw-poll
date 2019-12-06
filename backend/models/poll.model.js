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
  openDate: { type: Date, default: Date.now() },
  closeDate: {
    type: Date,
    default: Date.now() + 7 * 24 * 60 * 60 * 1000 //* one week from current time.
  },
  viewInProgress: { type: Boolean, default: false },
  //results are viewable by
  viewableBy: {
    type: String,
    enum: ["students", "teachers", "admins", "sponsors", "all"] //* students - must login | all - no login required
  }
});

PollSchema.pre("save", () => {
  if (this.viewableBy === undefined) {
    this.viewableBy = "sponsors";
  }
  if (this.viewInProgress === undefined) {
    this.viewInProgress = true;
  }
});

module.exports = mongoose.model("polls", PollSchema);
