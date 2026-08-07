import DashboardHeader from "./DashboardHeader";
import DashboardMetrics from "./DashboardMetrics";
import CurrentTasksWidget from "./CurrentTasksWidget";
import RoadmapOverviewWidget from "./RoadmapOverviewWidget";
import CurrentEventsWidget from "./CurrentEventsWidget";
import UserProfileCard from "./UserProfileCard";

function DashboardManager() {
  return (
    <div className="space-y-8 pb-8">
      <DashboardHeader />

      <DashboardMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <CurrentTasksWidget />
          <RoadmapOverviewWidget />
        </div>

        <div className="space-y-8">
          <CurrentEventsWidget />
          <UserProfileCard />
        </div>
      </div>
    </div>
  );
}

export default DashboardManager;
