const Employee = require("../models/Employee");
const QRCode = require("qrcode");
const { v4: uuidv4 } = require("uuid");

const createEmployee = async (req, res) => {
  try {
    console.log(req.body); // Log the request body to verify incoming data

    const { name, email, position, department, phone, address, permanentAddress, bloodGroup, dob, officeId } = req.body;

    // Check if all required fields are present
    if (!name || !email || !position || !department || !phone || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    // Create new employee
    const newEmployee = new Employee({
      employeeId: uuidv4(), // Generate a unique employee ID
      name,
      email,
      position,
      department,
      phone,
      address,
      permanentAddress,
      bloodGroup,
      dob,
      officeId,
      image: req.file ? req.file.path : null, // Save the file path
    });

    // Generate QR Code
    const qrCodeData = `${process.env.FRONTEND_URL}/employee/${newEmployee._id}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);
    newEmployee.qrCode = qrCodeImage; // Store QR code

    // Save to database
    await newEmployee.save();

    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Define getEmployeeById function
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update employee
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const updates = req.body;
    if (req.file) {
      updates.image = req.file.filename; // Ensure the image filename is saved
    }

    Object.assign(employee, updates);
    await employee.save();

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getEmployees, createEmployee, getEmployeeById, updateEmployee };