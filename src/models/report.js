const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  drug: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Drug",
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["pending", "reviewed", "resolved"],
    default: "pending",
  },
  adminNote: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);
