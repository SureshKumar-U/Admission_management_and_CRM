




import { useState, useEffect } from "react";
import axios from "axios";
import DocBadge from "../components/DocBadge";
import FeeBadge from "../components/FeedBadge";
import StatusBadge from "../components/StatusBadge";
import AddApplicantModal from "../components/AddApplicant";
import { getApplicants, getPrograms } from "../api/allocations";

const Applicants = () => {
    const [search, setSearch] = useState("");
    const [filterQuota, setFilterQuota] = useState("All");
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const isReadOnly = false; // adjust based on user role
    const userinfo = JSON.parse(localStorage.getItem("userInfo"))
    const token = userinfo?.data?.token

    // Fetch Programs & Applicants
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [progRes, appRes] = await Promise.all([
                    getPrograms(token),
                    getApplicants(token)
   
                ]);
         
                setPrograms(progRes.data || []);
                setApplicants(appRes.data?.applicants || []);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filtered = applicants?.filter((a) => {
        const matchSearch =
            a.name.toLowerCase().includes(search.toLowerCase()) ||
            a.email.toLowerCase().includes(search.toLowerCase());
        const matchQuota = filterQuota === "All" || a.quota === filterQuota;
        return matchSearch && matchQuota;
    });

    const handleAdd = async (newApplicant) => {
        try {
            const { data } = await axios.post(
                "http://localhost:8000/api/v1/applicants",
                newApplicant,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setApplicants((prev) => [...prev, data]);
            setShowModal(false);
        } catch (err) {
            console.error("Error adding applicant:", err);
        }
    };

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
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">👥</div>
                            <div>
                                <h1 className="text-2xl font-bold">Applicants</h1>
                                <p className="text-gray-300 mt-1">
                                    {applicants?.length} total applicants registered
                                </p>
                            </div>
                        </div>
                        {!isReadOnly && (
                            <button
                                className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg cursor-pointer transition-all duration-150 bg-white text-[#0c1e3c] hover:bg-gray-100"
                                onClick={() => setShowModal(true)}
                            >
                                + New Applicant
                            </button>
                        )}
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="flex items-center py-4 px-5 border-b border-gray-200 gap-3">
                        <div className="relative">
                            <span className="absolute left-2.5 top-[50%] translate-y-[-50%] text-gray-400 text-sm pointer-events-none">
                                ⌕
                            </span>
                            <input
                                className="border border-gray-300 pl-8 pr-4 py-2 w-55 rounded-lg placeholder:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Search applicants..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <select
                            className="w-35 rounded-lg outline-none text-sm border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={filterQuota}
                            onChange={(e) => setFilterQuota(e.target.value)}
                        >
                            <option value="All">All Quotas</option>
                            <option>KCET</option>
                            <option>COMEDK</option>
                            <option>Management</option>
                        </select>
                        <span className="ml-auto text-sm text-gray-600">{filtered.length} results</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#0c1e3c] text-white">
                                    <th className="text-xs font-semibold uppercase py-3 px-4 text-left">
                                        Name
                                    </th>
                                    <th className="text-xs font-semibold uppercase py-3 px-4 text-left">
                                        Program
                                    </th>
                                    <th className="text-xs font-semibold uppercase py-3 px-4 text-left">
                                        Quota
                                    </th>
                                    <th className="text-xs font-semibold uppercase py-3 px-4 text-left">
                                        Category
                                    </th>
                                    <th className="text-xs font-semibold uppercase py-3 px-4 text-left">
                                        Documents
                                    </th>
                                    <th className="text-xs font-semibold uppercase py-3 px-4 text-left">
                                        Fee
                                    </th>
                                    <th className="text-xs font-semibold uppercase py-3 px-4 text-left">
                                        Status
                                    </th>
                                    <th className="text-xs font-semibold uppercase py-3 px-4 text-left">
                                        Admission No.
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered?.map((a) => {
                                    const prog = programs.find((p) => p?._id === a?.program?._id);

                                    return (
                                        <tr
                                            key={a.id}
                                            className="border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                                            onClick={() => setSelected(a)}
                                        >
                                            <td className="p-4 align-middle">
                                                <div className="text-sm font-medium text-gray-900">{a.name}</div>
                                                <div className="text-xs text-gray-500">{a.email}</div>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <span className="text-sm font-mono">{prog?.code}</span>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <span className="inline-flex items-center gap-1 text-xs font-medium py-1 px-2 rounded-full bg-blue-100 text-blue-800">
                                                    {a.quota}
                                                </span>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <span className="inline-flex items-center gap-1 text-xs font-medium py-1 px-2 rounded-full bg-gray-100 text-gray-800">
                                                    {a.category}
                                                </span>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <DocBadge status={a.docStatus} />
                                            </td>
                                            <td className="p-4 align-middle">
                                                <FeeBadge status={a.feeStatus} />
                                            </td>
                                            <td className="p-4 align-middle">
                                                <StatusBadge status={a.status} />
                                            </td>
                                            <td className="p-4 align-middle">
                                                {a.admissionNo ? (
                                                    <span className="text-xs py-1 px-2 rounded-lg border border-blue-200 text-blue-800">
                                                        {a.admissionNo}
                                                    </span>
                                                ) : (
                                                    <span className="text-sm text-gray-400">—</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {filtered.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No applicants found.
                        </div>
                    )}
                </div>

                {showModal && (
                    <AddApplicantModal
                        programs={programs}
                        onClose={() => setShowModal(false)}
                        onSubmit={handleAdd}
                    />
                )}
            </div>
        </div>
    );
};

export default Applicants;