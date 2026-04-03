import { getRecentApplications, getStats } from "../api/dashboard"
import PendingActions from "../components/PendingActions"
import QuotaWiseSeatStatus from "../components/QuotawiseSeatStatus"
import RecentApplications from "../components/RecentApplications"
import StatsGrid from "../components/StatsGrid"
import { useEffect, useState } from "react"
const Dashboard = () => {
  const [stats, setStats] = useState({})
  const [recentApplications, setRecentApplications] = useState([])
  const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo'))?.data?.token : null;
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {

    try {
      const statsData = await getStats(token);
      setStats(statsData);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  }

  const fetchRecentApplications = async () => {
    try {
      const data = await getRecentApplications(token);
      setRecentApplications(data);
    } catch (err) {
      console.error("Error fetching recent applications:", err);
    } finally {
    }
  }

  useEffect(() => {
    
    fetchStats()
    fetchRecentApplications();

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