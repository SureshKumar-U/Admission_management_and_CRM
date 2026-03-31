import PendingActions from "../components/PendingActions"
import QuotaWiseSeatStatus from "../components/QuotawiseSeatStatus"
import RecentApplications from "../components/RecentApplications"
import StatsGrid from "../components/StatsGrid"
import axios from "axios"
import { useEffect, useState } from "react"
const Dashboard = () => {
  const [stats, setStats] = useState({})
  const [recentApplications, setRecentApplications] = useState([])
  const fetchStats = async () => {
    const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo'))?.data?.token : null;
    try {
      const response = await axios.get('http://localhost:8000/api/v1/dashboard/stats?academicYear=2025-26', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }
  const getRecentApplications = async () => {
    const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo'))?.data?.token : null;
    try {
      const response = await axios.get('http://localhost:8000/api/v1/applicants/recent', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setRecentApplications(response.data.data);
    } catch (error) {
      console.error('Error fetching recent applications:', error);
    }
  }

  useEffect(() => {
    fetchStats()
    getRecentApplications();

  }, [])

  return (
    <>
      <StatsGrid stats={stats} />
      <div className="  gap-4 mb-5"  >
        <QuotaWiseSeatStatus stats={stats} />
      </div>
      <div className="grid grid-cols-1   gap-4 mb-5"  >
        <RecentApplications recentapplications={recentApplications} />
        <PendingActions pendingActions={{ pendingDocs: stats?.pendingDocs, feePending: stats?.feePending }} />

      </div>


    </>

  )
}

export default Dashboard