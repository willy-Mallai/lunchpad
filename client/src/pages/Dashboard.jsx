import ErrorBoundary from "../components/ErrorBoundoundary";
import DashboardManager from "../features/dashboard/dashboardManager";

function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <ErrorBoundary>
        <DashboardManager />
      </ErrorBoundary>
    </div>
  );
}

export default Dashboard;
