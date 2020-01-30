const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    default: "New Group"
  },
  polls: { type: Array, default: null },
  students: { type: Array, default: null }
});

module.exports = mongoose.model("group", GroupSchema);
