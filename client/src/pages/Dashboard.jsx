import PendingActions from "../components/PendingActions"
import QuotaWiseSeatStatus from "../components/QuotawiseSeatStatus"
import RecentApplications from "../components/RecentApplications"
import StatsGrid from "../components/StatsGrid"

const Dashboard = () => {

  return (
    <>
      <StatsGrid />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5"  >
        <QuotaWiseSeatStatus />
        <RecentApplications />
      </div>
      <PendingActions/>
    </>

  )
}

export default Dashboard