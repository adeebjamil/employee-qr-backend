const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true }, // Custom employee ID field
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true }, // New address field
  permanentAddress: { type: String }, // Permanent address field
  bloodGroup: { type: String }, // Blood group field
  dob: { type: Date }, // Date of birth field
  officeId: { type: String }, // Office ID field
  image: { type: String }, // New image field (URL or base64 image)
  qrCode: { type: String }, // Will store the generated QR Code URL
}, { timestamps: true });

module.exports = mongoose.model("Employee", EmployeeSchema);