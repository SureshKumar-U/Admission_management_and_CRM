const SeatMatrix = require('../models/seatmatrix.model');

// Format: INST/2025/UG/CSE/KCET/0001
// Counter is stored atomically in SeatMatrix.counters map
const generateAdmissionNumber = async (program, institutionCode, quota, academicYear, session = null) => {
  const year  = academicYear.split('-')[0];
  const key   = `${quota}`;                   // map key in counters

  // Atomically increment the counter for this quota
  const matrix = await SeatMatrix.findOneAndUpdate(
    { program: program._id, academicYear },
    { $inc: { [`counters.${key}`]: 1 } },
    { returnDocument: 'after', session }
  );

  const seq = String(matrix.counters.get(key)).padStart(4, '0');
  return `${institutionCode}/${year}/${program.courseType}/${program.code}/${quota}/${seq}`;
};

module.exports = { generateAdmissionNumber };
