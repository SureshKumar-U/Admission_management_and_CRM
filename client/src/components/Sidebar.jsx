import { useLocation, useNavigate, useParams } from "react-router-dom";
import { navItems } from "../constants/constants.js";
import useWindowSize from "../hooks/useWindowSize.jsx";

export default function Sidebar() {
    const navigate = useNavigate()
    const data = null
    const role = "Admin"
    const page = "dashboard"
    const location = useLocation()
    const { width } = useWindowSize()
    const isMobileScreen = width < 640
    const isMediumScreen = width > 640 && width < 1024
    const isLargeScreen = width >= 1024
    return (
        <aside className={`{"flex  bg-[#0c1e3c] flex-col h-full w-15 md:w-58 " }`} style={{ background: "#0c1e3c", }}>
            {/* Brand */}
            <div className=" px-2 md:px-5 py-5 border-b bg-[rgba(255,255,255,0.08)]">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#14b8a6" }}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M9 2L2 6l7 4 7-4-7-4z" fill="#0c1e3c" />
                            <path d="M2 10l7 4 7-4" stroke="#0c1e3c" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                    {isLargeScreen && <>
                        <div>
                            <div className="text-sm font-medium text-white">EduMerge</div>
                            <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Admissions Portal</div>
                        </div>
                    </>}

                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 py-2 overflow-y-auto">

                {navItems?.map((item, i) => {
                    if (item.section) {
                        if (item.adminOnly && role !== "Admin") return null;
                        return <div key={i} className="pt-3 pb-1.5 px-2 text-1.5 mx-auto font-semibold text-[#555d7a] tracking-[0.08em] uppercase">{isLargeScreen && item.section}</div>;
                    }
                    if (!item.roles.includes(role)) return null;
                    return (
                        <div key={item?.id} className={`flex items-center gap-2 py-2 px-3 my-px mx-1.5 rounded-md cursor-pointer text-[#8b91aa] text-[13.5px] font-normal transition-all duration-150 border border-transparent ${location.pathname == item?.path ? "bg-[rgba(79,142,247,0.12)]" : ""}`} onClick={() => navigate(item.id)}>
                            <span >{item.icon}</span>
                            {isLargeScreen && item.label}
                            {item.badge > 0 && <span >{item.badge}</span>}
                        </div>
                    );
                })}
            </nav>


        </aside>
    );
}