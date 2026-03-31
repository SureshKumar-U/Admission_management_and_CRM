import { useLocation, useNavigate } from "react-router-dom";
import { PAGE_TITLES } from "../constants/constants";
import { useEffect } from "react";


function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get current user from localStorage
  let currentUser = localStorage.getItem("userInfo");
  useEffect(() => {
    if (!currentUser) {
      navigate("/signin")
    }
  }, [])


  if (currentUser) {
    currentUser = JSON.parse(currentUser)
  }

  // Hide Topbar on login or signup pages or if user is not logged in
  if (location.pathname === "/signin" || location.pathname === "/signup") return null;

  const [title, subtitle] = PAGE_TITLES[location.pathname] || ["Page", ""];

  return (
    <div className="topbar flex justify-between items-center px-5 py-3 bg-white shadow-sm">
      <div>
        <div className="text-lg font-semibold">{title}</div>
        {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{currentUser?.role}</span>
        <div
          className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer"
          title="Logout"
          onClick={() => {
            localStorage.removeItem("userInfo"); // clear user
            navigate("/signin", { replace: true });
          }}
        >
          {currentUser?.data?.user?.name[0]}
        </div>
      </div>
    </div>
  );
}

export default Topbar;