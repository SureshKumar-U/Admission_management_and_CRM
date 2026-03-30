import './index.css'
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import TopNav from './components/TopNav';
import Sidebar from './components/Sidebar';
import SiginPage from './pages/Auth/Signin';
import SigUpPage from './pages/Auth/Signup';
import Applicants from './pages/Applicants';
import DupApp from './duplicateApp';
import AllocationPage from './pages/AllocationPage';


function App() {
  const location = useLocation();
  const hideLayout = location.pathname.toLowerCase() === '/signin' || location.pathname.toLowerCase() === '/signup';
  return (
    <>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {!hideLayout && <Sidebar />}
        <div className="flex flex-col flex-1 overflow-hidden">
          {!hideLayout && <TopNav />}
          <main className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 ">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/signin" element={<SiginPage />} />
              <Route path="signup" element={<SigUpPage />} />
              <Route path='/applicants' element={<Applicants />} />
                   <Route path='/allocation' element={<AllocationPage />} />
            </Routes>
          </main>
        </div>
      </div>
   {/* <DupApp/> */}

    </>

  )
}

export default App





