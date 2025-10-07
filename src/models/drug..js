const mongoose = require("mongoose");

const drugSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  manufacturer: {
    type: String,
    required: true,
    trim: true,
  },
  batchNumber: {
    type: String,
    required: true,
    unique: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  nafdacNumber: {
    type: String,
    required: true,
    unique: true,
  },
  qrCode: {
    type: String,
    unique: true,
    sparse: true, // some drugs might not have QR yet
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  pharmacy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pharmacy",
  },
}, { timestamps: true });

module.exports = mongoose.model("Drug", drugSchema);
