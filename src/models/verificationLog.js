const mongoose = require("mongoose");

const verificationLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  drug: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Drug",
  },
  scannedCode: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    enum: ["authentic", "fake", "unknown"],
    required: true,
  },
  location: {
    type: String,
  },
  deviceInfo: {
    type: String, // e.g. Android/iOS info or web browser
  },
}, { timestamps: true });

module.exports = mongoose.model("VerificationLog", verificationLogSchema);
