const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  registeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // the admin or pharmacy user who registered this pharmacy
  },
  status: {
    type: String,
    enum: ["pending", "approved", "suspended"],
    default: "pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("Pharmacy", pharmacySchema);
