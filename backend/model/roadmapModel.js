const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema({
  folders: { type: Array, default: [] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const roadmapModel = mongoose.model("roadmap", roadmapSchema);
module.exports = roadmapModel;
