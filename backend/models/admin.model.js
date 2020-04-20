const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 100,
    unique: true,
  },
  class: { type: Number, required: true },
});

module.exports = mongoose.model("admin", AdminSchema);
