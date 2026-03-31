
import { useState, useEffect, createContext, useContext } from "react";

// ─── THEME & GLOBAL STYLES ────────────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #0d0f14;
      --surface: #141720;
      --surface2: #1c2030;
      --border: #252a3a;
      --border2: #2e3448;
      --text: #e8eaf2;
      --text2: #8b91aa;
      --text3: #555d7a;
      --accent: #4f8ef7;
      --accent2: #3b6fd4;
      --accent-dim: rgba(79,142,247,0.12);
      --green: #36c97a;
      --green-dim: rgba(54,201,122,0.12);
      --amber: #f59e0b;
      --amber-dim: rgba(245,158,11,0.12);
      --red: #ef4444;
      --red-dim: rgba(239,68,68,0.12);
      --purple: #a78bfa;
      --purple-dim: rgba(167,139,250,0.12);
      --radius: 10px;
      --radius-lg: 16px;
      --font: 'DM Sans', sans-serif;
      --mono: 'DM Mono', monospace;
    }

    html, body, #root { height: 100%; background: var(--bg); color: var(--text); font-family: var(--font); font-size: 14px; }

    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 4px; }

    .layout { display: flex; height: 100vh; overflow: hidden; }

    /* SIDEBAR */
    .sidebar { width: 220px; min-width: 220px; background: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; padding: 0; overflow-y: auto; }
    .sidebar-logo { padding: 20px 18px 16px; border-bottom: 1px solid var(--border); }
    .sidebar-logo-title { font-size: 15px; font-weight: 600; color: var(--text); letter-spacing: -.3px; }
    .sidebar-logo-sub { font-size: 11px; color: var(--text3); margin-top: 2px; font-family: var(--mono); }
    .sidebar-section { padding: 16px 10px 6px; font-size: 10px; font-weight: 600; color: var(--text3); letter-spacing: .08em; text-transform: uppercase; }
    .sidebar-item { display: flex; align-items: center; gap: 9px; padding: 8px 12px; margin: 1px 6px; border-radius: 8px; cursor: pointer; color: var(--text2); font-size: 13.5px; font-weight: 400; transition: all .15s; border: 1px solid transparent; }
    .sidebar-item:hover { background: var(--surface2); color: var(--text); }
    .sidebar-item.active { background: var(--accent-dim); color: var(--accent); border-color: rgba(79,142,247,.2); font-weight: 500; }
    .sidebar-item .icon { font-size: 15px; width: 18px; text-align: center; }
    .sidebar-badge { margin-left: auto; font-size: 10px; background: var(--accent-dim); color: var(--accent); padding: 1px 6px; border-radius: 20px; font-family: var(--mono); }

    /* MAIN */
    .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
    .topbar { height: 52px; min-height: 52px; background: var(--surface); border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 0 24px; gap: 12px; }
    .topbar-title { font-size: 15px; font-weight: 600; color: var(--text); }
    .topbar-badge { font-size: 11px; background: var(--surface2); color: var(--text2); padding: 2px 8px; border-radius: 6px; border: 1px solid var(--border2); font-family: var(--mono); }
    .topbar-right { margin-left: auto; display: flex; align-items: center; gap: 10px; }
    .topbar-avatar { width: 30px; height: 30px; background: var(--accent-dim); border: 1px solid rgba(79,142,247,.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--accent); font-weight: 600; cursor: pointer; }
    .topbar-role { font-size: 11px; color: var(--text3); font-family: var(--mono); }

    .content { flex: 1; overflow-y: auto; padding: 24px; }

    /* CARDS & GRIDS */
    .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px; }
    .stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 18px 20px; position: relative; overflow: hidden; }
    .stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; border-radius: 4px 4px 0 0; }
    .stat-card.blue::before { background: var(--accent); }
    .stat-card.green::before { background: var(--green); }
    .stat-card.amber::before { background: var(--amber); }
    .stat-card.purple::before { background: var(--purple); }
    .stat-label { font-size: 11px; color: var(--text3); font-weight: 500; text-transform: uppercase; letter-spacing: .06em; font-family: var(--mono); }
    .stat-value { font-size: 28px; font-weight: 600; margin: 6px 0 2px; color: var(--text); line-height: 1; }
    .stat-sub { font-size: 11px; color: var(--text3); }
    .stat-icon { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); font-size: 28px; opacity: .08; }

    /* TABLES */
    .table-wrap { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
    .table-header { display: flex; align-items: center; padding: 16px 20px; border-bottom: 1px solid var(--border); gap: 12px; }
    .table-title { font-size: 13.5px; font-weight: 600; color: var(--text); }
    table { width: 100%; border-collapse: collapse; }
    thead tr { background: var(--surface2); }
    th { font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: .07em; color: var(--text3); padding: 10px 16px; text-align: left; border-bottom: 1px solid var(--border); font-family: var(--mono); }
    td { padding: 12px 16px; border-bottom: 1px solid var(--border); color: var(--text2); font-size: 13px; vertical-align: middle; }
    tbody tr:last-child td { border-bottom: none; }
    tbody tr:hover td { background: var(--surface2); }
    tr.clickable { cursor: pointer; }

    /* BADGES */
    .badge { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 500; padding: 2px 8px; border-radius: 20px; font-family: var(--mono); }
    .badge.green { background: var(--green-dim); color: var(--green); }
    .badge.amber { background: var(--amber-dim); color: var(--amber); }
    .badge.red { background: var(--red-dim); color: var(--red); }
    .badge.blue { background: var(--accent-dim); color: var(--accent); }
    .badge.purple { background: var(--purple-dim); color: var(--purple); }
    .badge.gray { background: var(--surface2); color: var(--text3); border: 1px solid var(--border2); }
    .dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; display: inline-block; }

    /* BUTTONS */
    .btn { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 500; padding: 8px 14px; border-radius: 8px; border: none; cursor: pointer; font-family: var(--font); transition: all .15s; }
    .btn-primary { background: var(--accent); color: #fff; }
    .btn-primary:hover { background: var(--accent2); }
    .btn-ghost { background: transparent; color: var(--text2); border: 1px solid var(--border2); }
    .btn-ghost:hover { background: var(--surface2); color: var(--text); }
    .btn-danger { background: var(--red-dim); color: var(--red); border: 1px solid rgba(239,68,68,.2); }
    .btn-sm { padding: 5px 10px; font-size: 12px; }
    .btn:disabled { opacity: .45; cursor: not-allowed; }

    /* FORMS */
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .form-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
    .form-group { display: flex; flex-direction: column; gap: 6px; }
    .form-group.full { grid-column: 1 / -1; }
    label { font-size: 11.5px; font-weight: 500; color: var(--text2); text-transform: uppercase; letter-spacing: .05em; font-family: var(--mono); }
    input, select, textarea { background: var(--surface2); border: 1px solid var(--border2); border-radius: 8px; color: var(--text); font-family: var(--font); font-size: 13px; padding: 9px 12px; outline: none; transition: border .15s; width: 100%; }
    input:focus, select:focus, textarea:focus { border-color: var(--accent); }
    input::placeholder, textarea::placeholder { color: var(--text3); }
    select option { background: var(--surface); }

    /* PANELS & MODALS */
    .panel { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 22px; margin-bottom: 20px; }
    .panel-title { font-size: 13.5px; font-weight: 600; margin-bottom: 18px; color: var(--text); display: flex; align-items: center; gap: 8px; }
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.7); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 24px; }
    .modal { background: var(--surface); border: 1px solid var(--border2); border-radius: var(--radius-lg); width: 100%; max-width: 560px; max-height: 85vh; overflow-y: auto; }
    .modal-head { padding: 20px 22px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
    .modal-title { font-size: 15px; font-weight: 600; }
    .modal-body { padding: 22px; }
    .modal-footer { padding: 16px 22px; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; gap: 10px; }

    /* PROGRESS BAR */
    .progress-bar { height: 6px; background: var(--border); border-radius: 4px; overflow: hidden; }
    .progress-fill { height: 100%; border-radius: 4px; transition: width .4s ease; }

    /* QUOTA CARDS */
    .quota-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .quota-card { background: var(--surface2); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px 16px; }
    .quota-name { font-size: 11px; font-family: var(--mono); font-weight: 600; color: var(--text3); text-transform: uppercase; margin-bottom: 8px; }
    .quota-nums { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
    .quota-filled { font-size: 20px; font-weight: 600; color: var(--text); }
    .quota-total { font-size: 12px; color: var(--text3); }

    /* ADMISSION NUMBER */
    .adm-number { font-family: var(--mono); font-size: 13px; color: var(--accent); background: var(--accent-dim); padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(79,142,247,.2); }

    /* PAGE HEADER */
    .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; }
    .page-title { font-size: 20px; font-weight: 600; color: var(--text); }
    .page-subtitle { font-size: 13px; color: var(--text3); margin-top: 2px; }

    /* SEARCH */
    .search-wrap { position: relative; }
    .search-wrap input { padding-left: 32px; width: 220px; }
    .search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--text3); font-size: 13px; pointer-events: none; }

    /* TABS */
    .tabs { display: flex; gap: 2px; background: var(--surface2); border-radius: 10px; padding: 3px; margin-bottom: 22px; width: fit-content; }
    .tab { padding: 7px 14px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; color: var(--text3); transition: all .15s; }
    .tab.active { background: var(--surface); color: var(--text); box-shadow: 0 1px 3px rgba(0,0,0,.3); }

    /* EMPTY STATE */
    .empty { text-align: center; padding: 48px 24px; color: var(--text3); }
    .empty-icon { font-size: 36px; margin-bottom: 12px; opacity: .4; }

    /* NOTIFICATION */
    .toast { position: fixed; bottom: 24px; right: 24px; background: var(--surface); border: 1px solid var(--border2); border-radius: var(--radius); padding: 12px 16px; font-size: 13px; z-index: 200; box-shadow: 0 8px 24px rgba(0,0,0,.4); display: flex; align-items: center; gap: 10px; min-width: 260px; animation: slideUp .25s ease; }
    @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    .toast.success { border-left: 3px solid var(--green); }
    .toast.error { border-left: 3px solid var(--red); }

    /* LOGIN */
    .login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg); }
    .login-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 36px 32px; width: 380px; }
    .login-title { font-size: 22px; font-weight: 600; margin-bottom: 4px; }
    .login-sub { color: var(--text3); font-size: 13px; margin-bottom: 28px; }

    .info-row { display: flex; align-items: center; gap: 8px; padding: 10px 14px; background: var(--surface2); border-radius: 8px; margin-bottom: 10px; font-size: 13px; }
    .info-row span { color: var(--text3); min-width: 110px; font-size: 12px; font-family: var(--mono); }

    /* CHART BARS */
    .chart-wrap { display: flex; align-items: flex-end; gap: 14px; height: 100px; padding: 0 4px; }
    .chart-bar-group { display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1; }
    .chart-bars { display: flex; align-items: flex-end; gap: 3px; height: 80px; }
    .chart-bar { border-radius: 3px 3px 0 0; width: 16px; transition: height .4s ease; cursor: default; }
    .chart-label { font-size: 10px; color: var(--text3); font-family: var(--mono); }

    .divider { height: 1px; background: var(--border); margin: 20px 0; }
    .text-mono { font-family: var(--mono); }
    .text-sm { font-size: 12px; }
    .text-muted { color: var(--text3); }
    .flex { display: flex; }
    .items-center { align-items: center; }
    .gap-2 { gap: 8px; }
    .gap-3 { gap: 12px; }
    .ml-auto { margin-left: auto; }
    .mb-4 { margin-bottom: 16px; }
    .mb-6 { margin-bottom: 24px; }
    .w-full { width: 100%; }
  `}</style>
);

// ─── DATA & STATE ─────────────────────────────────────────────────────────────
const AppContext = createContext(null);

const INITIAL_DATA = {
  institutions: [{ id: 1, name: "Visvesvaraya Institute of Technology", code: "VIT", city: "Bangalore" }],
  departments: [
    { id: 1, instId: 1, name: "Computer Science & Engineering", code: "CSE" },
    { id: 2, instId: 1, name: "Electronics & Communication", code: "ECE" },
    { id: 3, instId: 1, name: "Mechanical Engineering", code: "ME" },
  ],
  programs: [
    { id: 1, deptId: 1, name: "B.E. Computer Science", code: "CSE", type: "UG", intake: 120, academicYear: "2025-26",
      quotas: { KCET: { total: 60, filled: 42 }, COMEDK: { total: 30, filled: 18 }, Management: { total: 30, filled: 20 } } },
    { id: 2, deptId: 2, name: "B.E. Electronics & Comm.", code: "ECE", type: "UG", intake: 60, academicYear: "2025-26",
      quotas: { KCET: { total: 30, filled: 30 }, COMEDK: { total: 15, filled: 9 }, Management: { total: 15, filled: 5 } } },
    { id: 3, deptId: 3, name: "B.E. Mechanical", code: "ME", type: "UG", intake: 60, academicYear: "2025-26",
      quotas: { KCET: { total: 30, filled: 12 }, COMEDK: { total: 15, filled: 4 }, Management: { total: 15, filled: 3 } } },
  ],
  applicants: [
    { id: 1, name: "Aarav Sharma", email: "aarav@email.com", phone: "9876543210", category: "GM", entryType: "Regular", quota: "KCET", programId: 1, allotmentNo: "KCT2025001", marks: 185, docStatus: "Verified", feeStatus: "Paid", status: "Confirmed", admissionNo: "VIT/2025/UG/CSE/KCET/0001" },
    { id: 2, name: "Priya Nair", email: "priya@email.com", phone: "9876543211", category: "SC", entryType: "Regular", quota: "COMEDK", programId: 1, allotmentNo: "CMD2025045", marks: 171, docStatus: "Submitted", feeStatus: "Pending", status: "Pending", admissionNo: null },
    { id: 3, name: "Rohan Patel", email: "rohan@email.com", phone: "9876543212", category: "OBC", entryType: "Regular", quota: "Management", programId: 2, allotmentNo: null, marks: 162, docStatus: "Pending", feeStatus: "Pending", status: "Pending", admissionNo: null },
    { id: 4, name: "Sneha Reddy", email: "sneha@email.com", phone: "9876543213", category: "GM", entryType: "Lateral", quota: "KCET", programId: 3, allotmentNo: "KCT2025099", marks: 178, docStatus: "Verified", feeStatus: "Paid", status: "Confirmed", admissionNo: "VIT/2025/UG/ME/KCET/0001" },
    { id: 5, name: "Kiran Kumar", email: "kiran@email.com", phone: "9876543214", category: "ST", entryType: "Regular", quota: "KCET", programId: 2, allotmentNo: "KCT2025060", marks: 159, docStatus: "Pending", feeStatus: "Pending", status: "Pending", admissionNo: null },
  ],
  users: [
    { id: 1, name: "Dr. Admin", email: "admin@vit.edu", role: "Admin", initials: "DA" },
    { id: 2, name: "Rahul Officer", email: "rahul@vit.edu", role: "Admission Officer", initials: "RO" },
    { id: 3, name: "VP Management", email: "vp@vit.edu", role: "Management", initials: "VM" },
  ],
};

let admNoCounters = { 1: 1, 2: 1, 3: 1 };

function generateAdmNo(program, quota, counters) {
  const year = "2025";
  const instCode = "VIT";
  const n = String(counters[program.id] || 1).padStart(4, "0");
  return `${instCode}/${year}/${program.type}/${program.code}/${quota}/${n}`;
}

// ─── CONTEXT PROVIDER ─────────────────────────────────────────────────────────
function AppProvider({ children }) {
  const [data, setData] = useState(INITIAL_DATA);
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const updateApplicant = (id, updates) => {
    setData(d => ({ ...d, applicants: d.applicants.map(a => a.id === id ? { ...a, ...updates } : a) }));
  };

  const addApplicant = (appl) => {
    const newId = Math.max(...data.applicants.map(a => a.id)) + 1;
    setData(d => ({ ...d, applicants: [...d.applicants, { ...appl, id: newId, status: "Pending", admissionNo: null }] }));
  };

  const confirmAdmission = (applicantId) => {
    const appl = data.applicants.find(a => a.id === applicantId);
    if (!appl) return { ok: false, msg: "Applicant not found" };
    if (appl.feeStatus !== "Paid") return { ok: false, msg: "Fee must be Paid before confirming admission" };
    if (appl.docStatus !== "Verified") return { ok: false, msg: "Documents must be Verified before confirming admission" };
    if (appl.admissionNo) return { ok: false, msg: "Admission already confirmed" };

    const program = data.programs.find(p => p.id === appl.programId);
    const quota = appl.quota;
    if (program.quotas[quota].filled >= program.quotas[quota].total) return { ok: false, msg: `${quota} quota is full` };

    const admNo = generateAdmNo(program, quota, admNoCounters);
    admNoCounters[program.id] = (admNoCounters[program.id] || 1) + 1;

    setData(d => ({
      ...d,
      applicants: d.applicants.map(a => a.id === applicantId ? { ...a, status: "Confirmed", admissionNo: admNo } : a),
      programs: d.programs.map(p => p.id === appl.programId ? {
        ...p, quotas: { ...p.quotas, [quota]: { ...p.quotas[quota], filled: p.quotas[quota].filled + 1 } }
      } : p)
    }));
    return { ok: true, admNo };
  };

  const allocateSeat = (applicantId) => {
    const appl = data.applicants.find(a => a.id === applicantId);
    const program = data.programs.find(p => p.id === appl.programId);
    const q = appl.quota;
    if (program.quotas[q].filled >= program.quotas[q].total) return { ok: false, msg: `${q} quota is full (${program.quotas[q].total}/${program.quotas[q].total} seats taken)` };
    return { ok: true };
  };

  const addProgram = (prog) => {
    const newId = Math.max(...data.programs.map(p => p.id)) + 1;
    setData(d => ({ ...d, programs: [...d.programs, { ...prog, id: newId }] }));
  };

  return (
    <AppContext.Provider value={{ data, currentUser, setCurrentUser, page, setPage, showToast, updateApplicant, addApplicant, confirmAdmission, allocateSeat, addProgram }}>
      {children}
      {toast && <div className={`toast ${toast.type}`}>{toast.type === "success" ? "✓" : "✕"} {toast.msg}</div>}
    </AppContext.Provider>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage() {
  const { data, setCurrentUser, setPage } = useContext(AppContext);
  const [sel, setSel] = useState(0);

  const login = () => {
    setCurrentUser(data.users[sel]);
    setPage("dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div style={{ fontSize: 28, marginBottom: 16 }}>🎓</div>
        <div className="login-title">EduMerge CRM</div>
        <div className="login-sub">Admission Management System</div>
        <div className="form-group" style={{ marginBottom: 20 }}>
          <label>Login As</label>
          <select value={sel} onChange={e => setSel(Number(e.target.value))}>
            {data.users.map((u, i) => <option key={u.id} value={i}>{u.name} — {u.role}</option>)}
          </select>
        </div>
        <button className="btn btn-primary w-full" onClick={login} style={{ justifyContent: "center", padding: "11px" }}>
          Sign In →
        </button>
        <div style={{ marginTop: 20, padding: "12px", background: "var(--surface2)", borderRadius: 8, fontSize: 12, color: "var(--text3)" }}>
          <strong style={{ color: "var(--text2)" }}>Demo accounts</strong><br />
          Admin • Admission Officer • Management (View Only)
        </div>
      </div>
    </div>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar() {
  const { currentUser, page, setPage, data } = useContext(AppContext);
  const role = currentUser?.role;

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "◈", roles: ["Admin", "Admission Officer", "Management"] },
    { section: "Admissions" },
    { id: "applicants", label: "Applicants", icon: "◎", roles: ["Admin", "Admission Officer"], badge: data.applicants.filter(a => a.status === "Pending").length },
    { id: "allocation", label: "Seat Allocation", icon: "⊞", roles: ["Admin", "Admission Officer"] },
    { id: "confirmed", label: "Confirmed", icon: "✓", roles: ["Admin", "Admission Officer", "Management"] },
    { section: "Setup", adminOnly: true },
    { id: "programs", label: "Programs & Quotas", icon: "⊟", roles: ["Admin"] },
    { id: "masters", label: "Master Setup", icon: "⊕", roles: ["Admin"] },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-title">EduMerge</div>
        <div className="sidebar-logo-sub">Admission CRM v1.0</div>
      </div>
      {navItems.map((item, i) => {
        if (item.section) {
          if (item.adminOnly && role !== "Admin") return null;
          return <div key={i} className="sidebar-section">{item.section}</div>;
        }
        if (!item.roles.includes(role)) return null;
        return (
          <div key={item.id} className={`sidebar-item ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)}>
            <span className="icon">{item.icon}</span>
            {item.label}
            {item.badge > 0 && <span className="sidebar-badge">{item.badge}</span>}
          </div>
        );
      })}
    </div>
  );
}

// ─── TOPBAR ───────────────────────────────────────────────────────────────────
const PAGE_TITLES = {
  dashboard: ["Dashboard", "Overview"],
  applicants: ["Applicants", "Manage applications"],
  allocation: ["Seat Allocation", "Allocate and confirm admissions"],
  confirmed: ["Confirmed Admissions", "All confirmed students"],
  programs: ["Programs & Quotas", "Seat matrix configuration"],
  masters: ["Master Setup", "Institution, departments, programs"],
};

function Topbar() {
  const { currentUser, setCurrentUser, setPage, page } = useContext(AppContext);
  const [t, sub] = PAGE_TITLES[page] || ["Page", ""];

  return (
    <div className="topbar">
      <div>
        <div className="topbar-title">{t}</div>
      </div>
      <span className="topbar-badge">{sub}</span>
      <div className="topbar-right">
        <span className="topbar-role">{currentUser?.role}</span>
        <div className="topbar-avatar" title="Logout" onClick={() => { setCurrentUser(null); setPage("login"); }}>
          {currentUser?.initials}
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard() {
  const { data } = useContext(AppContext);
  const totalIntake = data.programs.reduce((s, p) => s + p.intake, 0);
  const totalFilled = data.programs.reduce((s, p) => s + Object.values(p.quotas).reduce((q, v) => q + v.filled, 0), 0);
  const confirmed = data.applicants.filter(a => a.status === "Confirmed").length;
  const pendingDocs = data.applicants.filter(a => a.docStatus === "Pending" || a.docStatus === "Submitted").length;
  const feePending = data.applicants.filter(a => a.feeStatus === "Pending").length;

  return (
    <div>
      <div className="stat-grid">
        <StatCard color="blue" icon="⊞" label="Total Intake" value={totalIntake} sub="Across all programs" />
        <StatCard color="green" icon="✓" label="Seats Filled" value={totalFilled} sub={`${Math.round((totalFilled / totalIntake) * 100)}% of total intake`} />
        <StatCard color="amber" icon="◎" label="Confirmed" value={confirmed} sub="Admission confirmed" />
        <StatCard color="purple" icon="⚠" label="Pending Actions" value={pendingDocs + feePending} sub={`${pendingDocs} docs · ${feePending} fees`} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <div className="panel">
          <div className="panel-title">📊 Quota-wise Seat Status</div>
          {data.programs.map(p => (
            <div key={p.id} style={{ marginBottom: 16 }}>
              <div className="flex items-center mb-4" style={{ gap: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 13 }}>{p.code}</span>
                <span style={{ color: "var(--text3)", fontSize: 12 }}>{p.name}</span>
              </div>
              <div className="quota-grid">
                {Object.entries(p.quotas).map(([q, v]) => {
                  const pct = Math.round((v.filled / v.total) * 100);
                  const color = pct >= 100 ? "var(--red)" : pct >= 70 ? "var(--amber)" : "var(--accent)";
                  return (
                    <div className="quota-card" key={q}>
                      <div className="quota-name">{q}</div>
                      <div className="quota-nums">
                        <span className="quota-filled" style={{ color }}>{v.filled}</span>
                        <span className="quota-total">/ {v.total}</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="panel">
          <div className="panel-title">📋 Recent Applicants</div>
          <table>
            <thead><tr><th>Name</th><th>Program</th><th>Status</th></tr></thead>
            <tbody>
              {data.applicants.slice(0, 5).map(a => {
                const prog = data.programs.find(p => p.id === a.programId);
                return (
                  <tr key={a.id}>
                    <td>{a.name}</td>
                    <td><span className="text-mono" style={{ fontSize: 12 }}>{prog?.code}</span></td>
                    <td><StatusBadge status={a.status} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel">
        <div className="panel-title">⚠ Pending Actions</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 10, fontFamily: "var(--mono)", textTransform: "uppercase" }}>Documents Pending</div>
            {data.applicants.filter(a => a.docStatus !== "Verified").map(a => (
              <div className="info-row" key={a.id}>
                <span>{a.name}</span>
                <DocBadge status={a.docStatus} />
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 10, fontFamily: "var(--mono)", textTransform: "uppercase" }}>Fee Pending</div>
            {data.applicants.filter(a => a.feeStatus === "Pending").map(a => (
              <div className="info-row" key={a.id}>
                <span>{a.name}</span>
                <span className="badge amber"><span className="dot" />Fee Due</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ color, icon, label, value, sub }) {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-sub">{sub}</div>
      <div className="stat-icon">{icon}</div>
    </div>
  );
}

// ─── APPLICANTS PAGE ──────────────────────────────────────────────────────────
function ApplicantsPage() {
  const { data, showToast, addApplicant, currentUser } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [filterQuota, setFilterQuota] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const isReadOnly = currentUser?.role === "Management";

  const filtered = data.applicants.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase());
    const matchQuota = filterQuota === "All" || a.quota === filterQuota;
    return matchSearch && matchQuota;
  });

  const handleAdd = (form) => {
    addApplicant(form);
    setShowModal(false);
    showToast("Applicant added successfully");
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Applicants</div>
          <div className="page-subtitle">{data.applicants.length} total applicants registered</div>
        </div>
        {!isReadOnly && <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ New Applicant</button>}
      </div>

      <div className="table-wrap">
        <div className="table-header">
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input placeholder="Search applicants..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select value={filterQuota} onChange={e => setFilterQuota(e.target.value)} style={{ width: 140 }}>
            <option value="All">All Quotas</option>
            <option>KCET</option><option>COMEDK</option><option>Management</option>
          </select>
          <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--text3)" }}>{filtered.length} results</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Program</th><th>Quota</th><th>Category</th>
              <th>Documents</th><th>Fee</th><th>Status</th><th>Admission No.</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => {
              const prog = data.programs.find(p => p.id === a.programId);
              return (
                <tr key={a.id} className="clickable" onClick={() => setSelected(a)}>
                  <td><div style={{ fontWeight: 500, color: "var(--text)" }}>{a.name}</div><div style={{ fontSize: 11, color: "var(--text3)" }}>{a.email}</div></td>
                  <td><span className="text-mono" style={{ fontSize: 12 }}>{prog?.code}</span></td>
                  <td><span className="badge blue">{a.quota}</span></td>
                  <td><span className="badge gray">{a.category}</span></td>
                  <td><DocBadge status={a.docStatus} /></td>
                  <td><FeeBadge status={a.feeStatus} /></td>
                  <td><StatusBadge status={a.status} /></td>
                  <td>{a.admissionNo ? <span className="adm-number">{a.admissionNo}</span> : <span style={{ color: "var(--text3)", fontSize: 12 }}>—</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && <AddApplicantModal programs={data.programs} onClose={() => setShowModal(false)} onSubmit={handleAdd} />}
      {selected && <ApplicantDetailModal applicant={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function AddApplicantModal({ programs, onClose, onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", dob: "", gender: "Male", category: "GM", entryType: "Regular", quota: "KCET", programId: programs[0]?.id, allotmentNo: "", marks: "", address: "", docStatus: "Pending", feeStatus: "Pending" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-head"><div className="modal-title">New Applicant</div><button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button></div>
        <div className="modal-body">
          <div className="form-grid">
            <div className="form-group"><label>Full Name *</label><input value={form.name} onChange={e => set("name", e.target.value)} placeholder="Student full name" /></div>
            <div className="form-group"><label>Email</label><input value={form.email} onChange={e => set("email", e.target.value)} placeholder="student@email.com" /></div>
            <div className="form-group"><label>Phone</label><input value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="10-digit mobile" /></div>
            <div className="form-group"><label>Date of Birth</label><input type="date" value={form.dob} onChange={e => set("dob", e.target.value)} /></div>
            <div className="form-group"><label>Category</label><select value={form.category} onChange={e => set("category", e.target.value)}>{["GM","SC","ST","OBC","EWS"].map(c => <option key={c}>{c}</option>)}</select></div>
            <div className="form-group"><label>Gender</label><select value={form.gender} onChange={e => set("gender", e.target.value)}><option>Male</option><option>Female</option><option>Other</option></select></div>
            <div className="form-group"><label>Program *</label><select value={form.programId} onChange={e => set("programId", Number(e.target.value))}>{programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
            <div className="form-group"><label>Quota *</label><select value={form.quota} onChange={e => set("quota", e.target.value)}><option>KCET</option><option>COMEDK</option><option>Management</option></select></div>
            <div className="form-group"><label>Entry Type</label><select value={form.entryType} onChange={e => set("entryType", e.target.value)}><option>Regular</option><option>Lateral</option></select></div>
            <div className="form-group"><label>Marks / Score</label><input type="number" value={form.marks} onChange={e => set("marks", e.target.value)} placeholder="e.g. 185" /></div>
            <div className="form-group"><label>Allotment No.</label><input value={form.allotmentNo} onChange={e => set("allotmentNo", e.target.value)} placeholder="KCET/COMEDK allotment no." /></div>
            <div className="form-group"><label>Doc Status</label><select value={form.docStatus} onChange={e => set("docStatus", e.target.value)}><option>Pending</option><option>Submitted</option><option>Verified</option></select></div>
            <div className="form-group full"><label>Address</label><input value={form.address} onChange={e => set("address", e.target.value)} placeholder="Residential address" /></div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={() => form.name && onSubmit(form)} disabled={!form.name}>Add Applicant</button>
        </div>
      </div>
    </div>
  );
}

function ApplicantDetailModal({ applicant, onClose }) {
  const { data } = useContext(AppContext);
  const prog = data.programs.find(p => p.id === applicant.programId);
  const rows = [
    ["Email", applicant.email], ["Phone", applicant.phone], ["Category", applicant.category],
    ["Entry Type", applicant.entryType], ["Quota", applicant.quota], ["Program", prog?.name],
    ["Allotment No.", applicant.allotmentNo || "—"], ["Marks", applicant.marks],
    ["Documents", applicant.docStatus], ["Fee Status", applicant.feeStatus],
  ];
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-head">
          <div>
            <div className="modal-title">{applicant.name}</div>
            <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 2 }}>Applicant details</div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {applicant.admissionNo && (
            <div style={{ marginBottom: 16, padding: "12px", background: "var(--green-dim)", border: "1px solid rgba(54,201,122,.2)", borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: "var(--green)", marginBottom: 4, fontFamily: "var(--mono)" }}>ADMISSION CONFIRMED</div>
              <span className="adm-number">{applicant.admissionNo}</span>
            </div>
          )}
          {rows.map(([k, v]) => (
            <div className="info-row" key={k}><span>{k}</span><strong style={{ color: "var(--text)" }}>{v}</strong></div>
          ))}
        </div>
        <div className="modal-footer"><button className="btn btn-ghost" onClick={onClose}>Close</button></div>
      </div>
    </div>
  );
}

// ─── SEAT ALLOCATION PAGE ─────────────────────────────────────────────────────
function AllocationPage() {
  const { data, updateApplicant, confirmAdmission, allocateSeat, showToast } = useContext(AppContext);
  const [selId, setSelId] = useState(data.applicants.find(a => a.status === "Pending")?.id || data.applicants[0]?.id);
  const pending = data.applicants.filter(a => a.status !== "Confirmed");

  const appl = data.applicants.find(a => a.id === selId);
  const prog = appl ? data.programs.find(p => p.id === appl.programId) : null;

  const handleConfirm = () => {
    const result = confirmAdmission(appl.id);
    if (result.ok) showToast(`Admission confirmed! ${result.admNo}`);
    else showToast(result.msg, "error");
  };

  const handleDocUpdate = (status) => {
    updateApplicant(appl.id, { docStatus: status });
    showToast(`Documents marked as ${status}`);
  };

  const handleFeeUpdate = (status) => {
    updateApplicant(appl.id, { feeStatus: status });
    showToast(`Fee marked as ${status}`);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 20 }}>
      <div>
        <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 10, fontFamily: "var(--mono)", textTransform: "uppercase" }}>Applicants ({pending.length} pending)</div>
        {data.applicants.map(a => {
          const p = data.programs.find(pp => pp.id === a.programId);
          return (
            <div key={a.id} onClick={() => setSelId(a.id)}
              style={{ padding: "12px 14px", background: selId === a.id ? "var(--accent-dim)" : "var(--surface)", border: `1px solid ${selId === a.id ? "rgba(79,142,247,.3)" : "var(--border)"}`, borderRadius: 10, marginBottom: 8, cursor: "pointer", transition: "all .15s" }}>
              <div style={{ fontWeight: 500, fontSize: 13, color: selId === a.id ? "var(--accent)" : "var(--text)" }}>{a.name}</div>
              <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{p?.code} · {a.quota}</div>
              <div style={{ marginTop: 6 }}><StatusBadge status={a.status} /></div>
            </div>
          );
        })}
      </div>

      {appl && prog && (
        <div>
          <div className="panel">
            <div className="panel-title">👤 {appl.name}</div>
            <div className="form-grid-3" style={{ marginBottom: 16 }}>
              <div className="info-row" style={{ flexDirection: "column", alignItems: "flex-start" }}><span>Program</span><strong>{prog.name}</strong></div>
              <div className="info-row" style={{ flexDirection: "column", alignItems: "flex-start" }}><span>Quota</span><span className="badge blue">{appl.quota}</span></div>
              <div className="info-row" style={{ flexDirection: "column", alignItems: "flex-start" }}><span>Category</span><span className="badge gray">{appl.category}</span></div>
            </div>

            {/* Quota availability */}
            <div style={{ background: "var(--surface2)", borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 10, fontFamily: "var(--mono)", textTransform: "uppercase" }}>Seat Availability — {appl.quota}</div>
              {(() => {
                const q = prog.quotas[appl.quota];
                const remaining = q.total - q.filled;
                const pct = (q.filled / q.total) * 100;
                const full = remaining === 0;
                return (
                  <div>
                    <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
                      <span style={{ fontSize: 24, fontWeight: 700, color: full ? "var(--red)" : "var(--green)" }}>{remaining}</span>
                      <span style={{ color: "var(--text3)", fontSize: 13 }}>seats remaining of {q.total}</span>
                      {full && <span className="badge red">QUOTA FULL</span>}
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${pct}%`, background: full ? "var(--red)" : pct > 80 ? "var(--amber)" : "var(--green)" }} />
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Document & Fee actions */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
              <div style={{ background: "var(--surface2)", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 10, fontFamily: "var(--mono)", textTransform: "uppercase" }}>Documents</div>
                <div style={{ marginBottom: 10 }}><DocBadge status={appl.docStatus} /></div>
                <div className="flex gap-2">
                  <button className="btn btn-ghost btn-sm" onClick={() => handleDocUpdate("Submitted")} disabled={appl.docStatus === "Verified"}>Mark Submitted</button>
                  <button className="btn btn-primary btn-sm" onClick={() => handleDocUpdate("Verified")} disabled={appl.docStatus === "Verified"}>Verify ✓</button>
                </div>
              </div>
              <div style={{ background: "var(--surface2)", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 10, fontFamily: "var(--mono)", textTransform: "uppercase" }}>Fee Status</div>
                <div style={{ marginBottom: 10 }}><FeeBadge status={appl.feeStatus} /></div>
                <button className="btn btn-primary btn-sm" onClick={() => handleFeeUpdate("Paid")} disabled={appl.feeStatus === "Paid"}>Mark as Paid</button>
              </div>
            </div>

            {/* Confirm Admission */}
            {appl.status === "Confirmed" ? (
              <div style={{ background: "var(--green-dim)", border: "1px solid rgba(54,201,122,.2)", borderRadius: 10, padding: "16px 18px" }}>
                <div style={{ fontSize: 12, color: "var(--green)", marginBottom: 6, fontFamily: "var(--mono)", fontWeight: 600 }}>✓ ADMISSION CONFIRMED</div>
                <span className="adm-number">{appl.admissionNo}</span>
              </div>
            ) : (
              <div style={{ background: "var(--surface2)", borderRadius: 10, padding: "16px 18px" }}>
                <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 10 }}>
                  Confirm admission after verifying documents and receiving fee payment.
                </div>
                <div className="flex items-center gap-2" style={{ marginBottom: 12, fontSize: 12 }}>
                  <span style={{ color: appl.docStatus === "Verified" ? "var(--green)" : "var(--text3)" }}>{appl.docStatus === "Verified" ? "✓" : "○"} Documents verified</span>
                  <span style={{ color: "var(--text3)" }}>·</span>
                  <span style={{ color: appl.feeStatus === "Paid" ? "var(--green)" : "var(--text3)" }}>{appl.feeStatus === "Paid" ? "✓" : "○"} Fee paid</span>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={handleConfirm}
                  disabled={appl.feeStatus !== "Paid" || appl.docStatus !== "Verified"}
                >
                  Generate Admission Number & Confirm
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CONFIRMED PAGE ───────────────────────────────────────────────────────────
function ConfirmedPage() {
  const { data } = useContext(AppContext);
  const confirmed = data.applicants.filter(a => a.status === "Confirmed");
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Confirmed Admissions</div>
          <div className="page-subtitle">{confirmed.length} students officially admitted</div>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Student</th><th>Admission No.</th><th>Program</th><th>Quota</th><th>Category</th></tr></thead>
          <tbody>
            {confirmed.length === 0 && (
              <tr><td colSpan={5}><div className="empty"><div className="empty-icon">🎓</div>No confirmed admissions yet</div></td></tr>
            )}
            {confirmed.map(a => {
              const prog = data.programs.find(p => p.id === a.programId);
              return (
                <tr key={a.id}>
                  <td><div style={{ fontWeight: 500, color: "var(--text)" }}>{a.name}</div><div style={{ fontSize: 11, color: "var(--text3)" }}>{a.email}</div></td>
                  <td><span className="adm-number">{a.admissionNo}</span></td>
                  <td>{prog?.name}</td>
                  <td><span className="badge blue">{a.quota}</span></td>
                  <td><span className="badge gray">{a.category}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── PROGRAMS PAGE ────────────────────────────────────────────────────────────
function ProgramsPage() {
  const { data, showToast, addProgram } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);

  const handleAdd = (form) => {
    addProgram(form);
    setShowModal(false);
    showToast("Program added successfully");
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Programs & Seat Matrix</div>
          <div className="page-subtitle">Configure intake and quota allocations</div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Program</button>
      </div>

      {data.programs.map(p => (
        <div className="panel" key={p.id}>
          <div className="flex items-center gap-3 mb-4">
            <span style={{ fontSize: 20 }}>📘</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: "var(--text3)" }}>{p.type} · {p.academicYear} · Intake: {p.intake}</div>
            </div>
            <div className="ml-auto flex gap-2">
              <span className="badge blue">{p.code}</span>
              <span className="badge gray">AY {p.academicYear}</span>
            </div>
          </div>
          <div className="quota-grid">
            {Object.entries(p.quotas).map(([q, v]) => {
              const pct = Math.round((v.filled / v.total) * 100);
              const color = pct >= 100 ? "var(--red)" : pct >= 80 ? "var(--amber)" : "var(--green)";
              return (
                <div className="quota-card" key={q}>
                  <div className="quota-name">{q}</div>
                  <div className="quota-nums">
                    <span className="quota-filled" style={{ color }}>{v.filled}</span>
                    <span className="quota-total">/ {v.total} seats</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 6, fontFamily: "var(--mono)" }}>
                    {v.total - v.filled} remaining
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {showModal && (
        <AddProgramModal depts={data.departments} onClose={() => setShowModal(false)} onSubmit={handleAdd} />
      )}
    </div>
  );
}

function AddProgramModal({ depts, onClose, onSubmit }) {
  const [form, setForm] = useState({ name: "", code: "", type: "UG", deptId: depts[0]?.id, intake: 60, academicYear: "2025-26", quotas: { KCET: { total: 30, filled: 0 }, COMEDK: { total: 15, filled: 0 }, Management: { total: 15, filled: 0 } } });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const totalQuota = Object.values(form.quotas).reduce((s, q) => s + Number(q.total), 0);
  const quotaValid = totalQuota === Number(form.intake);

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-head"><div className="modal-title">Add Program</div><button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button></div>
        <div className="modal-body">
          <div className="form-grid">
            <div className="form-group full"><label>Program Name *</label><input value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. B.E. Civil Engineering" /></div>
            <div className="form-group"><label>Code</label><input value={form.code} onChange={e => set("code", e.target.value)} placeholder="CE" /></div>
            <div className="form-group"><label>Type</label><select value={form.type} onChange={e => set("type", e.target.value)}><option>UG</option><option>PG</option></select></div>
            <div className="form-group"><label>Department</label><select value={form.deptId} onChange={e => set("deptId", Number(e.target.value))}>{depts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}</select></div>
            <div className="form-group"><label>Academic Year</label><input value={form.academicYear} onChange={e => set("academicYear", e.target.value)} /></div>
            <div className="form-group full">
              <label>Total Intake</label>
              <input type="number" value={form.intake} onChange={e => set("intake", Number(e.target.value))} />
            </div>
          </div>
          <div className="divider" />
          <div style={{ marginBottom: 12, fontSize: 13, fontWeight: 600 }}>Quota Allocation</div>
          {!quotaValid && <div style={{ fontSize: 12, color: "var(--red)", marginBottom: 10, padding: "8px 12px", background: "var(--red-dim)", borderRadius: 8 }}>⚠ Total quota ({totalQuota}) must equal intake ({form.intake})</div>}
          <div className="form-grid-3">
            {Object.entries(form.quotas).map(([q, v]) => (
              <div className="form-group" key={q}>
                <label>{q} Seats</label>
                <input type="number" value={v.total} onChange={e => setForm(f => ({ ...f, quotas: { ...f.quotas, [q]: { ...f.quotas[q], total: Number(e.target.value) } } }))} />
              </div>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" disabled={!form.name || !quotaValid} onClick={() => onSubmit(form)}>Add Program</button>
        </div>
      </div>
    </div>
  );
}

// ─── MASTERS PAGE ─────────────────────────────────────────────────────────────
function MastersPage() {
  const { data } = useContext(AppContext);
  const [tab, setTab] = useState("institution");

  return (
    <div>
      <div className="page-header"><div className="page-title">Master Setup</div></div>
      <div className="tabs">
        {[["institution", "Institution"], ["campus", "Campus / Dept"], ["config", "Config"]].map(([id, label]) => (
          <div key={id} className={`tab ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>{label}</div>
        ))}
      </div>

      {tab === "institution" && (
        <div className="panel">
          <div className="panel-title">🏫 Institutions</div>
          <table>
            <thead><tr><th>Name</th><th>Code</th><th>City</th><th>Departments</th></tr></thead>
            <tbody>
              {data.institutions.map(inst => (
                <tr key={inst.id}>
                  <td style={{ fontWeight: 500, color: "var(--text)" }}>{inst.name}</td>
                  <td><span className="badge blue">{inst.code}</span></td>
                  <td>{inst.city}</td>
                  <td>{data.departments.filter(d => d.instId === inst.id).length} departments</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "campus" && (
        <div className="panel">
          <div className="panel-title">🏢 Departments</div>
          <table>
            <thead><tr><th>Department</th><th>Code</th><th>Programs</th></tr></thead>
            <tbody>
              {data.departments.map(d => (
                <tr key={d.id}>
                  <td style={{ fontWeight: 500, color: "var(--text)" }}>{d.name}</td>
                  <td><span className="badge gray">{d.code}</span></td>
                  <td>{data.programs.filter(p => p.deptId === d.id).length} programs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "config" && (
        <div className="panel">
          <div className="panel-title">⚙ System Configuration</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[["Academic Year", "2025-26"], ["Admission Modes", "Government, Management"], ["Course Types", "UG, PG"], ["Entry Types", "Regular, Lateral"], ["Quota Types", "KCET, COMEDK, Management"], ["Categories", "GM, SC, ST, OBC, EWS"]].map(([k, v]) => (
              <div className="info-row" key={k}><span>{k}</span><strong style={{ color: "var(--text)" }}>{v}</strong></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── BADGE HELPERS ────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = { Confirmed: "green", Pending: "amber", Rejected: "red" };
  return <span className={`badge ${map[status] || "gray"}`}><span className="dot" />{status}</span>;
}

function DocBadge({ status }) {
  const map = { Verified: "green", Submitted: "blue", Pending: "amber" };
  return <span className={`badge ${map[status] || "gray"}`}>{status}</span>;
}

function FeeBadge({ status }) {
  return <span className={`badge ${status === "Paid" ? "green" : "amber"}`}>{status === "Paid" ? "✓ Paid" : "Pending"}</span>;
}

// ─── ROUTER / ROOT ────────────────────────────────────────────────────────────
function AppInner() {
  const { currentUser, page, setCurrentUser, setPage } = useContext(AppContext);

  useEffect(() => {
    if (!currentUser && page !== "login") setPage("login");
  }, [currentUser]);

  if (!currentUser || page === "login") return <LoginPage />;

  const pages = { dashboard: Dashboard, applicants: ApplicantsPage, allocation: AllocationPage, confirmed: ConfirmedPage, programs: ProgramsPage, masters: MastersPage };
  const Page = pages[page] || Dashboard;

  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="content">
          <Page />
        </div>
      </div>
    </div>
  );
}

export default function DupApp() {
  return (
    <AppProvider>
      <GlobalStyle />
      <AppInner />
    </AppProvider>
  );
}
