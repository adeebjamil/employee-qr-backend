const express = require('express');
const { getEmployees, createEmployee, getEmployeeById, updateEmployee } = require('../controllers/employeeController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.route('/')
  .get(getEmployees)
  .post(upload.single('image'), createEmployee);

router.route('/:id')
  .get(getEmployeeById)
  .put(upload.single('image'), updateEmployee);

module.exports = router;