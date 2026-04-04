import { useState, useEffect } from "react";
import DocBadge from "../components/DocBadge";
import FeeBadge from "../components/FeedBadge";
import StatusBadge from "../components/StatusBadge";
import { getAdmisionList, getApplicants } from "../api/allocations";

const ConfirmedAdmissions = () => {
    const [admissions, setAdmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const userinfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userinfo?.data?.token;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAdmisionList(token);
                setAdmissions(res.data?.admissions || []);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch confirmed admissions");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);
    console.log("Admissions fetched:", admissions);

    const filteredAdmissions = admissions.filter((a) =>
        a?.applicant.name.toLowerCase().includes(search.toLowerCase()) ||
        a?.applicant.email.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
    );
    if (error) return (
        <div className="text-center mt-10 text-red-500 bg-red-50 p-4 rounded-lg">
            {error}
        </div>
    );

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="bg-[#0c1e3c] text-white p-6 rounded-lg shadow-lg mb-6">
                    <div className="flex items-center">
                        <div className="text-3xl mr-4">🎓</div>
                        <div>
                            <h1 className="text-2xl font-bold">Confirmed Admissions</h1>
                            <p className="text-green-100 mt-1">
                                {filteredAdmissions.length} confirmed admissions
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Admission Number</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Program</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Quota</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Academic Year</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Institution</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Confirmed By</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredAdmissions?.map(({ applicant, admissionNo, academicYear, institution, quota, confirmedBy,program }) => (
                                    <tr key={applicant._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{admissionNo}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{applicant.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{applicant.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{program?.name || 'N/A'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quota}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{academicYear}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{institution?.name || 'N/A'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{confirmedBy?.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredAdmissions?.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No confirmed admissions found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConfirmedAdmissions;