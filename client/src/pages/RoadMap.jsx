import ErrorBoundary from "../components/ErrorBoundoundary";
import RoadMapManager from "../features/roadMap/RoadMapManager";

function RoadMap() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <ErrorBoundary>
        <RoadMapManager />
      </ErrorBoundary>
    </div>
  );
}

export default RoadMap;

