import { useContext } from "react";
import { Link } from "react-router";
import { TaskContext } from "../task/TaskProvider";
import { ListTodo, ArrowRight, Check, PlusCircle } from "lucide-react";

function CurrentTasksWidget() {
  const { state: tasksState, dispatch: taskDispatch } = useContext(TaskContext);
  const tasks = tasksState || [];
  const pendingTasks = tasks.filter((t) => !t.completed);

  const getPriorityClass = (priority) => {
    const p = priority?.toLowerCase();
    if (p === "high" || p === "hard") {
      return "bg-[#BD6C73]/15 text-[#BD6C73] border-[#BD6C73]/30";
    }
    if (p === "medium") {
      return "bg-[#6B597F]/15 text-[#6B597F] border-[#6B597F]/30";
    }
    return "bg-[#3F5B8D]/15 text-[#3F5B8D] border-[#3F5B8D]/30";
  };

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#2E365A]/15 backdrop-blur-xl shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-[#2E365A]/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#3F5B8D]/10 text-[#3F5B8D] border border-[#3F5B8D]/20">
            <ListTodo className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#2E365A] tracking-tight">
              Current Tasks
            </h3>
            <p className="text-xs text-[#6B597F]">
              {pendingTasks.length} pending task{pendingTasks.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>
        <Link
          to="/task"
          className="px-3 py-1.5 rounded-xl bg-[#F0F4FA] hover:bg-[#3F5B8D] text-xs font-semibold text-[#2E365A] hover:text-white flex items-center gap-1.5 border border-[#2E365A]/15 transition-all"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-[#2E365A]/20 rounded-xl">
          <ListTodo className="w-10 h-10 text-[#6B597F] mx-auto mb-2" />
          <p className="text-sm font-medium text-[#6B597F]">No tasks added yet</p>
          <Link
            to="/task"
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#3F5B8D] bg-[#3F5B8D]/10 rounded-lg hover:bg-[#3F5B8D]/20 transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5" /> Add your first task
          </Link>
        </div>
      ) : (
        <div className="space-y-2.5">
          {tasks.slice(0, 5).map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                task.completed
                  ? "bg-[#F8FAFD] border-[#2E365A]/10 opacity-60"
                  : "bg-[#F0F4FA] border-[#2E365A]/15 hover:border-[#3F5B8D]/40"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  onClick={() =>
                    taskDispatch({ type: "toggleComplete", payload: task.id })
                  }
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                    task.completed
                      ? "bg-[#3F5B8D] border-[#3F5B8D] text-white"
                      : "border-[#2E365A]/30 bg-white hover:border-[#3F5B8D]"
                  }`}
                >
                  {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
                <span
                  className={`text-sm font-semibold truncate ${
                    task.completed
                      ? "line-through text-slate-400"
                      : "text-[#2E365A]"
                  }`}
                >
                  {task.title}
                </span>
              </div>

              {task.priority && (
                <span
                  className={`px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md border ${getPriorityClass(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CurrentTasksWidget;


