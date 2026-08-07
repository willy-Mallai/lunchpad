import { useContext } from "react";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import { TaskContext } from "./TaskProvider";
import { ListTodo, CheckCircle2 } from "lucide-react";

function TaskManager() {
  const { state } = useContext(TaskContext);
  const completedCount = state.filter((task) => task.completed).length;
  const totalCount = state.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#2E365A]/15 backdrop-blur-xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#3F5B8D]/10 border border-[#3F5B8D]/20 text-[#3F5B8D]">
            <ListTodo className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#2E365A]">
              Task Manager
            </h2>
            <p className="text-sm text-[#6B597F] font-medium">
              Organize, track, and accomplish your daily tasks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="px-4 py-2 rounded-xl bg-[#F0F4FA] border border-[#2E365A]/15 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#BD6C73]" />
            <span className="text-xs text-[#6B597F] font-semibold">Done:</span>
            <span className="text-sm font-bold text-[#2E365A]">
              {completedCount} / {totalCount}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-[#2E365A]/15 backdrop-blur-md shadow-sm">
        <TaskForm />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-[#2E365A]/15 backdrop-blur-md shadow-sm">
        <TaskItem />
      </div>
    </div>
  );
}

export default TaskManager;


