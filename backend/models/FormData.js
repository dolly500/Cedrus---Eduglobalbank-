const mongoose = require("mongoose");

const formDataSchema = new mongoose.Schema({
  fullName: String,
  dob: Date,
  gender: String,
  nationality: String,
  stateOfOrigin: String,
  localGovtOrigin: String,
  address: String,
  localGovtResidence: String,
  stateOfResidence: String,
  nin: String,
  nationalIdName: String,
  nationalIdNumber: String,
  phoneNumber: String,
  secondPhoneNumber: String,
  whatsappNumber: String,
  email: String,
  nextOfKin: String,
  nextOfKinAddress: String,
  nextOfKinPhone: String,
  bankName: String,
  bankAccountName: String,
  bankAccountNumber: String,
  documents: {
    passportPhoto: String,
    studentPhoto: String,
    ninCard: String,
    signature: String,
  },
  studentInfo: {
    studentName: String,
    studentDOB: Date,
    studentGender: String,
    studentNationality: String,
    studentStateOfOrigin: String,
    studentLocalGovtOrigin: String,
    studentClass: String,
  },
});

module.exports = mongoose.model("FormData", formDataSchema);
