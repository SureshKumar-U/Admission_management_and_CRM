const mongoose = require('mongoose');

// This document is IMMUTABLE once created — no updates allowed
const AdmissionSchema = new mongoose.Schema({
  admissionNo:  { type: String, required: true, unique: true },   // INST/2025/UG/CSE/KCET/0001
  applicant:    { type: mongoose.Schema.Types.ObjectId, ref: 'Applicant', required: true },
  program:      { type: mongoose.Schema.Types.ObjectId, ref: 'Program',   required: true },
  institution:  { type: mongoose.Schema.Types.ObjectId, ref: 'Institution' },
  quota:        { type: String, required: true },
  academicYear: { type: String, required: true },
  confirmedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  confirmedAt:  { type: Date, default: Date.now },
}, {
  timestamps: true,
});

// Block all updates — admission number is immutable
AdmissionSchema.pre(['updateOne', 'findOneAndUpdate', 'updateMany'], function() {
  throw new Error('Admission records are immutable');
});

module.exports = mongoose.model('Admission', AdmissionSchema);