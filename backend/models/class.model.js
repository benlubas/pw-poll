const mongoose = require("mongoose");

const ClassSchema = mongoose.Schema({
  gradYear: {
    type: Number,
    default: new Date().getFullYear() + 4,
    require: true
  },
  polls: { type: Array, default: null }
});

module.exports = mongoose.model("class", ClassSchema);
