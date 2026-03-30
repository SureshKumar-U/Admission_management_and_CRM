const mongoose = require('mongoose');

const ApplicantSchema = new mongoose.Schema({

  name:         { type: String, required: true, trim: true },
  email:        { type: String, required: true, lowercase: true },
  phone:        { type: String, required: true },
  dob:          Date,
  gender:       { type: String, enum: ['Male', 'Female', 'Other'] },
  category:     { type: String, enum: ['GM', 'SC', 'ST', 'OBC', 'EWS'], required: true },
  address:      String,

  // Admission Details
  program:      { type: mongoose.Schema.Types.ObjectId, ref: 'Program',  required: true },
  institution:  { type: mongoose.Schema.Types.ObjectId, ref: 'Institution' },
  academicYear: { type: String, required: true },
  entryType:    { type: String, enum: ['Regular', 'Lateral'], default: 'Regular' },
  admissionMode:{ type: String, enum: ['Government', 'Management'], required: true },
  quota:        { type: String, enum: ['KCET', 'COMEDK', 'Management', 'NRI', 'SNQ'], required: true },
  allotmentNo:  String,
  marks:        Number,

  // Tracking
  docStatus:    { type: String, enum: ['Pending', 'Submitted', 'Verified'], default: 'Pending' },
  feeStatus:    { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
  status:       { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },

  createdBy:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.models.Applicant || mongoose.model('Applicant', ApplicantSchema);