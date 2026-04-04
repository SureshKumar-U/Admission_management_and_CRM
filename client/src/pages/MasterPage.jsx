import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const TABS = [
    { id: "institutions", label: "Institutions" },
    { id: "departments", label: "Departments" },
    { id: "programs", label: "Programs" },
];

const MasterPage = () => {
    const [activeTab, setActiveTab] = useState("institutions");
    const [institutions, setInstitutions] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [showInstitutionModal, setShowInstitutionModal] = useState(false);
    const [showDepartmentModal, setShowDepartmentModal] = useState(false);
    const [showProgramModal, setShowProgramModal] = useState(false);

    const [institutionForm, setInstitutionForm] = useState({
        name: "",
        code: "",
        address: "",
        city: "",
        state: "",
        phone: "",
        email: "",
    });
    const [departmentForm, setDepartmentForm] = useState({
        institution: "",
        name: "",
        code: "",
    });
    const [programForm, setProgramForm] = useState({
        institution: "",
        department: "",
        name: "",
        code: "",
        courseType: "UG",
        entryType: "Regular",
        academicYear: "",
        totalIntake: "",
    });



    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
    const userRole = userInfo?.data?.user?.role || userInfo?.role;
    const isAdmin = userRole === "Admin";
    const token = userInfo?.data?.token;

    const authHeaders = token
        ? {
            Authorization: `Bearer ${token}`,
        }
        : {};

    const departmentOptions = useMemo(() => {
        console.log("Filtering departments for institution:", programForm.institution);
        if (!programForm.institution) return departments;
        console.log("All departments:", departments);
        return departments?.filter((d) => d.institution._id == programForm.institution);
    }, [departments, programForm.institution]);

    const apiUrl = "http://localhost:8000/api/v1";

    const fetchData = async () => {
        try {
            setLoading(true);
            setError("");
            const [instRes, deptRes, progRes] = await Promise.all([
                axios.get(`${apiUrl}/institutions`),
                axios.get(`${apiUrl}/departments`, { headers: authHeaders }),
                axios.get(`${apiUrl}/programs`, { headers: authHeaders }),
            ]);
            console.log("Institutions:", instRes.data);
            console.log("Departments:", deptRes.data);
            console.log("Programs:", progRes.data);
            setInstitutions(instRes.data?.data || []);
            setDepartments(deptRes.data?.data || []);
            setPrograms(progRes.data?.data || []);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Unable to load master data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]);

    const clearMessages = () => {
        setError("");
        setSuccess("");
    };

    const openInstitutionModal = () => {
        setInstitutionForm({ name: "", code: "", address: "", city: "", state: "", phone: "", email: "" });
        setShowInstitutionModal(true);
        setError("");
        setSuccess("");
    };

    const closeInstitutionModal = () => {
        setShowInstitutionModal(false);
    };

    const openDepartmentModal = () => {
        setDepartmentForm({ institution: "", name: "", code: "" });
        setShowDepartmentModal(true);
    };

    const closeDepartmentModal = () => {
        setShowDepartmentModal(false);
    };

    const openProgramModal = () => {
        setProgramForm({
            institution: "",
            department: "",
            name: "",
            code: "",
            courseType: "UG",
            entryType: "Regular",
            academicYear: "",
            totalIntake: "",
        });
        setShowProgramModal(true);
    };

    const closeProgramModal = () => {
        setShowProgramModal(false);
    };

    const handleInstitutionSubmit = async () => {
        clearMessages();
        if (
            !institutionForm.name ||
            !institutionForm.code ||
            !institutionForm.address ||
            !institutionForm.city ||
            !institutionForm.state ||
            !institutionForm.phone ||
            !institutionForm.email
        ) {
            setError("All institution fields are required: name, code, address, city, state, phone, and email.");
            return;
        }
        try {
            await axios.post(`${apiUrl}/institutions`, institutionForm, {
                headers: {
                    "Content-Type": "application/json",
                    ...authHeaders,
                },
            });
            setSuccess("Institution created successfully.");
            setInstitutionForm({ name: "", code: "", address: "", city: "", state: "", phone: "", email: "" });
            closeInstitutionModal();
            fetchData();
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Unable to create institution.");
        }
    };

    const handleDepartmentSubmit = async () => {
        clearMessages();
        if (!departmentForm.institution || !departmentForm.name || !departmentForm.code) {
            setError("Institution, name, and code are required for a department.");
            return;
        }
        try {
            await axios.post(`${apiUrl}/departments`, departmentForm, {
                headers: {
                    "Content-Type": "application/json",
                    ...authHeaders,
                },
            });
            setSuccess("Department created successfully.");
            setDepartmentForm({ institution: "", name: "", code: "" });
            fetchData();
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Unable to create department.");
        }
    };

    const handleProgramSubmit = async () => {
        clearMessages();
        if (!programForm.institution || !programForm.department || !programForm.name || !programForm.totalIntake) {
            setError("Institution, department, program name, and total intake are required.");
            return;
        }
        try {
            await axios.post(`${apiUrl}/programs`, programForm, {
                headers: {
                    "Content-Type": "application/json",
                    ...authHeaders,
                },
            });
            setSuccess("Program created successfully.");
            setProgramForm({
                institution: "",
                department: "",
                name: "",
                code: "",
                courseType: "UG",
                entryType: "Regular",
                academicYear: "",
                totalIntake: "",
            });
            fetchData();
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Unable to create program.");
        }
    };

    const renderInstitutionSection = () => (
        <div className={isAdmin ? "grid gap-6 lg:grid-cols-[1fr_1.4fr]" : "grid gap-6"}>
            {isAdmin && (
                <div className="space-y-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div>
                        <h2 className="text-xl font-semibold">Create Institution</h2>
                        <p className="text-sm text-gray-500">Add a new institution to your master data.</p>
                    </div>
                    <button
                        onClick={openInstitutionModal}
                        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        Create Institution
                    </button>
                </div>
            )}

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 overflow-auto">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-semibold">Institutions</h2>
                        <p className="text-sm text-gray-500">Manage your existing institution records.</p>
                    </div>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{institutions.length}</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Code</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">City</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">State</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {institutions.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No institutions yet.</td>
                                </tr>
                            ) : (
                                institutions.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.code}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.city}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.state || '-'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderDepartmentSection = () => (
        <div className={isAdmin ? "grid gap-6 lg:grid-cols-[1fr_1.4fr]" : "grid gap-6"}>
            {isAdmin && (
                <div className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div>
                        <h2 className="text-xl font-semibold">Create Department</h2>
                        <p className="text-sm text-gray-500">Add a new department linked to an institution.</p>
                    </div>
                    <button
                        onClick={openDepartmentModal}
                        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        Create Department
                    </button>
                </div>
            )}

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-semibold">Departments</h2>
                        <p className="text-sm text-gray-500">Review departments by institution.</p>
                    </div>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{departments.length}</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Code</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Institution</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {departments?.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">No departments yet.</td>
                                </tr>
                            ) : (
                                departments.map((dept) => {
                                    return (
                                        <tr key={dept._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.code}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept?.institution?.name || "Unknown institution"}</td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderProgramSection = () => (
        <div className={isAdmin ? "grid gap-6 lg:grid-cols-[1fr_1.4fr]" : "grid gap-6"}>
            {isAdmin && (
                <div className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div>
                        <h2 className="text-xl font-semibold">Create Program</h2>
                        <p className="text-sm text-gray-500">Add a new program inside a department and institution.</p>
                    </div>
                    <button
                        onClick={openProgramModal}
                        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        Create Program
                    </button>
                </div>
            )}

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 overflow-auto">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-semibold">Programs</h2>
                        <p className="text-sm text-gray-500">Programs organized by institution and department.</p>
                    </div>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{programs?.length}</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Program</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Code</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Course Type</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Academic Year</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Institution</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {programs?.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No programs yet.</td>
                                </tr>
                            ) : (
                                programs?.map((prog) => {

                                    return (
                                        <tr key={prog._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{prog.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prog.code || "-"}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prog.courseType}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prog.academicYear || "Year not set"}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prog.department?.name || "Unknown dept"}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prog.institution?.name || "Unknown inst"}</td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );



    return (
        <div className="space-y-6 p-6">
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Master Setup</h1>
                        <p className="mt-2 max-w-2xl text-gray-600">
                            Create and manage institutions, departments, and programs from one page.
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                            <div className="text-sm text-gray-500">Institutions</div>
                            <div className="mt-2 text-2xl font-semibold text-blue-700">{institutions?.length}</div>
                        </div>
                        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                            <div className="text-sm text-gray-500">Departments</div>
                            <div className="mt-2 text-2xl font-semibold text-blue-700">{departments.length}</div>
                        </div>
                        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                            <div className="text-sm text-gray-500">Programs</div>
                            <div className="mt-2 text-2xl font-semibold text-blue-700">{programs?.length}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm ">
                <div className="flex flex-wrap items-center gap-3 border-b border-gray-200 pb-4">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab === tab.id
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="mt-6">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <>
                            <div className="mt-4 ">
                                {activeTab === "institutions" && renderInstitutionSection()}
                                {activeTab === "departments" && renderDepartmentSection()}
                                {activeTab === "programs" && renderProgramSection()}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Institution Modal */}
            {showInstitutionModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
                        {error && (
                            <div className="rounded-2xl bg-red-50 p-4 text-red-700">{error}</div>
                        )}
                        {success && <div className="rounded-2xl bg-green-50 p-4 text-green-700">{success}</div>}

                        <div className="mb-2 flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Create Institution</h3>
                            <button
                                onClick={closeInstitutionModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="space-y-3">
                            <input
                                value={institutionForm.name}
                                onChange={(e) => setInstitutionForm({ ...institutionForm, name: e.target.value })}
                                className="w-full border rounded-lg px-4 py-3"
                                placeholder="Institution name"
                            />
                            <input
                                value={institutionForm.code}
                                onChange={(e) => setInstitutionForm({ ...institutionForm, code: e.target.value })}
                                className="w-full border rounded-lg px-4 py-3"
                                placeholder="Institution code"
                            />
                            <input
                                value={institutionForm.address}
                                onChange={(e) => setInstitutionForm({ ...institutionForm, address: e.target.value })}
                                className="w-full border rounded-lg px-4 py-3"
                                placeholder="Address"
                            />
                            <input
                                value={institutionForm.city}
                                onChange={(e) => setInstitutionForm({ ...institutionForm, city: e.target.value })}
                                className="w-full border rounded-lg px-4 py-3"
                                placeholder="City"
                            />
                            <input
                                value={institutionForm.state}
                                onChange={(e) => setInstitutionForm({ ...institutionForm, state: e.target.value })}
                                className="w-full border rounded-lg px-4 py-3"
                                placeholder="State"
                            />
                            <input
                                value={institutionForm.phone}
                                onChange={(e) => setInstitutionForm({ ...institutionForm, phone: e.target.value })}
                                className="w-full border rounded-lg px-4 py-3"
                                placeholder="Phone"
                            />
                            <input
                                value={institutionForm.email}
                                onChange={(e) => setInstitutionForm({ ...institutionForm, email: e.target.value })}
                                className="w-full border rounded-lg px-4 py-3"
                                placeholder="Email"
                            />
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={closeInstitutionModal}
                                    className="rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleInstitutionSubmit}
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Department Modal */}
            {showDepartmentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Create Department</h3>
                            <button
                                onClick={closeDepartmentModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="space-y-4">
                            <select
                                value={departmentForm.institution}
                                onChange={(e) => setDepartmentForm({ ...departmentForm, institution: e.target.value })}
                                className="w-full border rounded-lg px-4 py-3"
                            >
                                <option value="">Select institution</option>
                                {institutions.map((inst) => (
                                    <option key={inst._id} value={inst._id}>{inst.name}</option>
                                ))}
                            </select>
                            <input
                                value={departmentForm.name}
                                onChange={(e) => setDepartmentForm({ ...departmentForm, name: e.target.value })}
                                className="w-full border rounded-lg px-4 py-3"
                                placeholder="Department name"
                            />
                            <input
                                value={departmentForm.code}
                                onChange={(e) => setDepartmentForm({ ...departmentForm, code: e.target.value })}
                                className="w-full border rounded-lg px-4 py-3"
                                placeholder="Department code"
                            />
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={closeDepartmentModal}
                                    className="rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDepartmentSubmit}
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Program Modal */}
            {showProgramModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Create Program</h3>
                            <button
                                onClick={closeProgramModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="space-y-4">
                            <select
                                value={programForm.institution}
                                onChange={(e) => setProgramForm({ ...programForm, institution: e.target.value, department: "" })}
                                className="w-full border rounded-lg px-4 py-3"
                            >
                                <option value="">Select institution</option>
                                {institutions.map((inst) => (
                                    <option key={inst._id} value={inst._id}>{inst.name}</option>
                                ))}
                            </select>
                            <select
                                value={programForm.department}
                                onChange={(e) => setProgramForm({ ...programForm, department: e.target.value })}
                                className="w-full border rounded-lg px-4 py-3"
                            >
                                <option value="">Select department</option>
                                {departmentOptions.map((dept) => (
                                    <option key={dept._id} value={dept._id}>{dept.name}</option>
                                ))}
                            </select>
                            <input
                                value={programForm.name}
                                onChange={(e) => setProgramForm({ ...programForm, name: e.target.value })}
                                className="w-full border rounded-lg px-4 py-3"
                                placeholder="Program name"
                            />
                            <input
                                value={programForm.code}
                                onChange={(e) => setProgramForm({ ...programForm, code: e.target.value })}
                                className="w-full border rounded-lg px-4 py-3"
                                placeholder="Program code"
                            />
                            <div className="grid gap-3 sm:grid-cols-2">
                                <select
                                    value={programForm.courseType}
                                    onChange={(e) => setProgramForm({ ...programForm, courseType: e.target.value })}
                                    className="w-full border rounded-lg px-4 py-3"
                                >
                                    <option value="UG">UG</option>
                                    <option value="PG">PG</option>
                                </select>
                                <select
                                    value={programForm.entryType}
                                    onChange={(e) => setProgramForm({ ...programForm, entryType: e.target.value })}
                                    className="w-full border rounded-lg px-4 py-3"
                                >
                                    <option value="Regular">Regular</option>
                                    <option value="Lateral">Lateral</option>
                                </select>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <input
                                    value={programForm.academicYear}
                                    onChange={(e) => setProgramForm({ ...programForm, academicYear: e.target.value })}
                                    className="w-full border rounded-lg px-4 py-3"
                                    placeholder="Academic year"
                                />
                                <input
                                    value={programForm.totalIntake}
                                    type="number"
                                    onChange={(e) => setProgramForm({ ...programForm, totalIntake: e.target.value })}
                                    className="w-full border rounded-lg px-4 py-3"
                                    placeholder="Total intake"
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={closeProgramModal}
                                    className="rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleProgramSubmit}
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MasterPage;
