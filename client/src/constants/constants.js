
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
