
export  const navItems = [
        { id: "/", label: "Dashboard", icon: "◈", path:"/", roles: ["Admin", "Admission Officer", "Management"] },
        { section: "Admissions" },
        { id: "applicants", label: "Applicants", icon: "◎", path:"/applicants",roles: ["Admin", "Admission Officer"], },
        { id: "allocation", label: "Seat Allocation", icon: "⊞",path:"/allocation", roles: ["Admin", "Admission Officer"] },
        { id: "confirmed", label: "Confirmed", icon: "✓",path:"/confirmed", roles: ["Admin", "Admission Officer", "Management"] },
        { section: "Setup", adminOnly: true },
        { id: "programs", label: "Programs & Quotas", path:"/programs", icon: "⊟", roles: ["Admin"] },
        { id: "masters", label: "Master Setup", icon: "⊕", path:"/masters", roles: ["Admin"] },
    ];

export const PAGE_TITLES = {
  "/": ["Dashboard", "Overview"],
  "/applicants": ["Applicants", "Manage applications"],
  "/allocation": ["Seat Allocation", "Allocate and confirm admissions"],
  "/confirmed": ["Confirmed Admissions", "All confirmed students"],
  "/programs": ["Programs & Quotas", "Seat matrix configuration"],
  "/masters": ["Master Setup", "Institution, departments, programs"],
};
