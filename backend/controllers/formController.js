const multer = require("multer");
const FormData = require("../models/FormData");
const path = require("path")

// Configure storage options for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Set file upload options with Multer
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // limit file size to 5 MB
  fileFilter: (req, file, cb) => {
    // Accept only certain file types
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG and PNG are allowed."));
    }
  }
});

// Controller function to handle form data and file uploads
exports.submitForm = async (req, res) => {

    console.log("Request Body:", req.body);
    console.log("Files:", req.files);
  try {
    // Collect other form data
    const formData = {
        fullName: req.body.fullName,
        dob: req.body.dob,
        gender: req.body.gender,
        nationality: req.body.nationality,
        stateOfOrigin: req.body.stateOfOrigin,
        localGovtOrigin: req.body.localGovtOrigin,
        address: req.body.address,
        localGovtResidence: req.body.localGovtResidence,
        stateOfResidence: req.body.stateOfResidence,
        nin: req.body.nin,
        nationalIdName: req.body.nationalIdName,
        nationalIdNumber: req.body.nationalIdNumber,
        phoneNumber: req.body.phoneNumber,
        secondPhoneNumber: req.body.secondPhoneNumber,
        whatsappNumber: req.body.whatsappNumber,
        email: req.body.email,
        nextOfKin: req.body.nextOfKin,
        nextOfKinAddress: req.body.nextOfKinAddress,
        nextOfKinPhone: req.body.nextOfKinPhone,
        bankName: req.body.bankName,
        bankAccountName: req.body.bankAccountName,
        bankAccountNumber: req.body.bankAccountNumber,
      documents: {
        passportPhoto: req.files["passportPhoto"] ? req.files["passportPhoto"][0].path : null,
        studentPhoto: req.files["studentPhoto"] ? req.files["studentPhoto"][0].path : null,
        ninCard: req.files["ninCard"] ? req.files["ninCard"][0].path : null,
        signature: req.files["signature"] ? req.files["signature"][0].path : null
      },
      studentInfo: {
        studentName: req.body.studentName,
        studentDOB: req.body.studentDOB,
        studentGender: req.body.studentGender,
        studentNationality: req.body.studentNationality,
        studentStateOfOrigin: req.body.studentStateOfOrigin,
        studentLocalGovtOrigin: req.body.studentLocalGovtOrigin,
        studentClass: req.body.studentClass,
      }
    };

    // Save form data to MongoDB
    const formRecord = new FormData(formData);
    await formRecord.save();
    res.status(201).json({ message: "Form data submitted successfully with files." });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ message: "Failed to submit form data." });
  }
};

// Export upload middleware for route usage
exports.upload = upload.fields([
  { name: "passportPhoto", maxCount: 1 },
  { name: "studentPhoto", maxCount: 1 },
  { name: "ninCard", maxCount: 1 },
  { name: "signature", maxCount: 1 }
]);
