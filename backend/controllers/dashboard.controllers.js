const SeatMatrix = require('../models/seatmatrix.model');
const Applicant = require('../models/applicant.model');
const Admission = require('../models/admission.model');
const ApiResponse = require('../utils/apiResponse');
const dashboarController = {

    getStats: async (req, res, next) => {
        try {
            const { academicYear } = req.query;

            const [matrices, applicants, confirmed] = await Promise.all([
                SeatMatrix.find({ academicYear }).populate('program', 'name code totalIntake'),
                Applicant.countDocuments({ academicYear }),
                Admission.countDocuments({ academicYear }),
            ]);

            const totalIntake = matrices.reduce((s, m) => s + m.program.totalIntake, 0);
            const totalFilled = matrices.reduce((s, m) => s + m.quotas.reduce((q, v) => q + v.filled, 0), 0);

            const pendingDocs = await Applicant.find({ academicYear, docStatus: { $ne: 'Verified' } });
            const feePending = await Applicant.find({ academicYear, feeStatus: 'Pending' });
       
            const quotaBreakdown = matrices.map(m => ({
                program: m.program.name,
                code: m.program.code,
                quotas: m.quotas.map(q => ({
                    name: q.name,
                    total: q.total,
                    filled: q.filled,
                    remaining: q.total - q.filled,
                    pct: Math.round((q.filled / q.total) * 100),
                })),
            }));


            res.json(new ApiResponse(200, {
                totalIntake, totalFilled, applicants, confirmed, pendingDocs, feePending, quotaBreakdown,
            }));
        } catch (err) { next(err); }
    }

}

module.exports = dashboarController

