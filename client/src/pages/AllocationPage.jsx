import { useEffect, useState } from "react";
import axios from "axios"
import { confirmAdmission, getApplicants, getPrograms, updateApplicant } from "../api/allocations";
function AllocationPage() {
  const [applicants, setApplicants] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const token = JSON.parse(localStorage.getItem("userInfo"))?.data?.token;



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [appRes, progRes] = await Promise.all([
        getApplicants(token),
        getPrograms(token)
      ]);
      setApplicants(appRes?.data?.applicants || []);
      setPrograms(progRes?.data || []);
      if (!selectedId) {
        setSelectedId(appRes?.data?.applicants?.[0]?._id);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedId) return
    const appl = applicants?.find(a => a._id === selectedId);
    const prog = programs?.find(p => p._id === appl?.program._id);
    if (appl) setSelectedApplicant(appl);
    if (prog) setSelectedProgram(prog);
  }, [selectedId, applicants, programs])

  const handleDocUpdate = async (status) => {
    await updateApplicant(token, { docStatus: status }, selectedApplicant._id);
    await fetchData();
  };

  const handleFeeUpdate = async (status) => {
    await updateApplicant(token, { feeStatus: status }, selectedApplicant._id);
    await fetchData();
  };

  const handleConfirm = async () => {
    try {

      await confirmAdmission(token, selectedApplicant._id);
      await fetchData();
    } catch (err) {
      console.error(err.message);
    }
  };


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#0c1e3c] text-white p-6 rounded-lg shadow-lg mb-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">📋</div>
            <div>
              <h1 className="text-2xl font-bold">Admission Allocations</h1>
              <p className="text-gray-300 mt-1">
                Manage and confirm applicant admissions
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 h-[calc(100vh-200px)]">
          <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
            <div className="text-sm text-gray-600 mb-4 uppercase font-semibold flex-shrink-0">
              Applicants ({applicants?.length})
            </div>

            <div className="space-y-2 overflow-y-auto flex-1">
              {applicants?.map(a => (
                <div
                  key={a._id}
                  onClick={() => setSelectedId(a._id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md
                    ${selectedId === a._id
                      ? "bg-blue-50 border-blue-400 shadow-md"
                      : "bg-white border-gray-200 hover:border-gray-300"}`}
                >
                  <div className="font-medium text-sm text-gray-900">{a.name}</div>
                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs">
                      {a.quota}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span>{a.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>


         { loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
          )}

          {selectedApplicant && selectedProgram && !loading && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="text-2xl">👤</span>
                {selectedApplicant?.name}
              </h2>

              {/* INFO */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Program</p>
                  <p className="font-semibold text-gray-900">{selectedProgram?.name}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Quota</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {selectedApplicant.quota}
                  </span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Category</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {selectedApplicant.category}
                  </span>
                </div>
              </div>

              {/* SEAT AVAILABILITY */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-6">
                <p className="text-sm text-gray-600 mb-4 uppercase font-semibold">
                  Seat Availability
                </p>

                {(() => {
                  const q = selectedProgram.quotas?.find(q => q.name === selectedApplicant.quota);
                  if (!q) return <p className="text-gray-500">No quota found</p>;

                  const remaining = q.total - q.filled;
                  const percent = (q.filled / q.total) * 100;

                  return (
                    <>
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-3xl font-bold ${remaining === 0 ? "text-red-600" : "text-green-600"}`}>
                          {remaining}
                        </span>
                        <div>
                          <span className="text-sm text-gray-600">remaining</span>
                          <div className="text-xs text-gray-500">out of {q.total} seats</div>
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${remaining === 0 ? "bg-red-500" : "bg-green-500"}`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{Math.round(percent)}% filled</div>
                    </>
                  );
                })()}
              </div>

              {/* DOC + FEE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* DOC */}
                <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                  <p className="text-sm text-gray-600 mb-3 font-semibold">Documents</p>
                  <p className="mb-4 text-gray-900">{selectedApplicant.docStatus}</p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDocUpdate("Submitted")}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                    >
                      Submit
                    </button>

                    <button
                      onClick={() => handleDocUpdate("Verified")}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                    >
                      Verify
                    </button>
                  </div>
                </div>

                {/* FEE */}
                <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                  <p className="text-sm text-gray-600 mb-3 font-semibold">Fee Status</p>
                  <p className="mb-4 text-gray-900">{selectedApplicant.feeStatus}</p>

                  <button
                    onClick={() => handleFeeUpdate("Paid")}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                  >
                    Mark Paid
                  </button>
                </div>
              </div>

              {/* CONFIRM */}
              {selectedApplicant.status === "Confirmed" ? (
                <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">✅</span>
                    <p className="text-green-800 font-semibold text-lg">Admission Confirmed</p>
                  </div>
                  <p className="text-sm text-green-700">Admission Number: <span className="font-mono font-semibold">{selectedApplicant.admissionNo}</span></p>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                  <p className="text-sm text-yellow-800 mb-4">
                    Confirm after document verification & fee payment
                  </p>

                  <button
                    onClick={handleConfirm}
                    disabled={
                      selectedApplicant.docStatus !== "Verified" ||
                      selectedApplicant.feeStatus !== "Paid"
                    }
                    className="px-6 py-3 bg-[#0c1e3c] text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90 transition-colors"
                  >
                    Confirm Admission
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllocationPage;