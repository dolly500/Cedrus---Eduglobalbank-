const express = require("express");
const router = express.Router();
const { submitForm, upload } = require("../controllers/formController");

// Route with upload middleware to handle file uploads and form submission
router.post("/submit-form", upload, submitForm);

module.exports = router;
