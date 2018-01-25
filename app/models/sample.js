var mongoose = require("mongoose");

var sampleSchema = mongoose.Schema({
  category: String,
  useDate: String,
  usage: String,
  description: String,
  price: Number,
  writer: String
});

module.exports = mongoose.model("Sample", sampleSchema);
