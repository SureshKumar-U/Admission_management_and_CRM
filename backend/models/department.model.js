const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  institution: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true },
  name:        { type: String, required: true, trim: true },
  code:        { type: String, required: true, uppercase: true },
}, { timestamps: true });

DepartmentSchema.index({ institution: 1, code: 1 }, { unique: true });

module.exports = mongoose.models.Department ||  mongoose.model('Department', DepartmentSchema);