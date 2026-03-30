const mongoose = require('mongoose');

// One document per Program+AcademicYear
// Each quota gets its own atomic counter 
const QuotaSchema = new mongoose.Schema({
  name:      { type: String, enum: ['KCET', 'COMEDK', 'Management', 'NRI', 'SNQ'], required: true },
  total:     { type: Number, required: true, min: 0 },
  filled:    { type: Number, default: 0, min: 0 },
  // filled is ONLY modified via findOneAndUpdate with $inc — never .save()
}, { _id: false });

const SeatMatrixSchema = new mongoose.Schema({
  program:      { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
  academicYear: { type: String, required: true },
  quotas:       [QuotaSchema],
  // Counter for admission number sequence per program+quota
  counters: {
    type: Map,
    of: Number,
    default: {},
  },
}, { timestamps: true });

SeatMatrixSchema.index({ program: 1, academicYear: 1 }, { unique: true });

// Validate that sum of quota totals = program totalIntake
SeatMatrixSchema.methods.isTotalValid = async function() {
  const Program = mongoose.model('Program');
  const prog = await Program.findById(this.program);
  const sum = this.quotas.reduce((s, q) => s + q.total, 0);
  return sum === prog.totalIntake;
}; 

const seatMatrixModel = mongoose.models.SeatMatrix  || mongoose.model('SeatMatrix', SeatMatrixSchema);
module.exports =  seatMatrixModel