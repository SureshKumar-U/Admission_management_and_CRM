const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
  institution:  { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true },
  department:   { type: mongoose.Schema.Types.ObjectId, ref: 'Department',  required: true },
  name:         { type: String, required: true, trim: true },
  code:         { type: String, required: true, uppercase: true },
  courseType:   { type: String, enum: ['UG', 'PG'], required: true },
  entryType:    { type: String, enum: ['Regular', 'Lateral'], default: 'Regular' },
  academicYear: { type: String, required: true },   // e.g. "2025-26"
  totalIntake:  { type: Number, required: true, min: 1 },
}, { timestamps: true });

module.exports = mongoose.models.Program || mongoose.model('Program', ProgramSchema);