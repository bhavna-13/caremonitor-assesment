const express = require('express');
const multer = require('multer');
const path = require('path');
const clinicalDataController = require('../controllers/clinicalDataController');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Route to handle the file upload and processing
router.post('/process-clinical-data', upload.single('clinicalMetrics'), clinicalDataController.processClinicalData);

module.exports = router;
