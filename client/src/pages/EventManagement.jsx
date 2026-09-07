import ErrorBoundary from "../components/ErrorBoundoundary";
import EventManager from "../features/events/EventManager";

function EventManagement() {
  return (
    <div className="max-w-6xl mx-auto py-4">
      <ErrorBoundary>
        <EventManager />
      </ErrorBoundary>
    </div>
  );
}

export default EventManagement;
