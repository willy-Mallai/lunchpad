const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const eventModel = mongoose.model("event", eventSchema);
module.exports = eventModel;
