import ErrorBoundary from "../components/ErrorBoundoundary";
import TaskManager from "../features/task/TaskManager";

function TaskManagement() {
  return (
    <div className="max-w-6xl mx-auto py-4">
      <ErrorBoundary>
        <TaskManager />
      </ErrorBoundary>
    </div>
  );
}

export default TaskManagement;
