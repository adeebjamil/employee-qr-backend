const express = require("express");
const { createEmployee, getEmployeeById } = require("../controllers/employeeController");
const multer = require("multer");

const router = express.Router();

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Route to create an employee and generate QR code
router.post("/", upload.single('image'), createEmployee);

// Route to fetch employee details by scanning QR
router.get("/:id", getEmployeeById);

module.exports = router;