import { SquarePen, Trash2, Check, X } from "lucide-react";
import { useContext, useState } from "react";
import { TaskContext } from "./TaskProvider";

function TaskList({ task, isEditingId, setIsEditingId }) {
  const { dispatch } = useContext(TaskContext);
  const [editTask, setEditTask] = useState(task.title);
  const isEdit = task.id === isEditingId;

  function handleSave() {
    if (!editTask.trim()) return;

    dispatch({ type: "editTask", payload: { editTask, isEditingId } });
    setIsEditingId(null);
  }

  const priorityStyles = {
    High: "bg-[#BD6C73]/15 text-[#BD6C73] border-[#BD6C73]/30",
    Medium: "bg-[#6B597F]/15 text-[#6B597F] border-[#6B597F]/30",
    Low: "bg-[#3F5B8D]/15 text-[#3F5B8D] border-[#3F5B8D]/30",
  };

  return (
    <li
      className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border transition-all duration-200 ${
        task.completed
          ? "bg-[#F8FAFD] border-[#2E365A]/10 opacity-60"
          : "bg-[#F0F4FA] border-[#2E365A]/15 hover:border-[#3F5B8D]/40 shadow-2xs"
      }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => dispatch({ type: "toggleComplete", payload: task.id })}
          className="w-5 h-5 rounded-md accent-[#3F5B8D] border-[#2E365A]/30 bg-white text-[#3F5B8D] focus:ring-[#3F5B8D] focus:ring-offset-0 cursor-pointer shrink-0"
        />
        {isEdit ? (
          <input
            type="text"
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
            className="flex-1 px-3 py-1.5 bg-white border border-[#3F5B8D] rounded-lg text-[#2E365A] font-semibold text-sm focus:outline-none focus:ring-1 focus:ring-[#3F5B8D]"
            autoFocus
          />
        ) : (
          <h3
            className={`text-sm font-semibold transition-all truncate ${
              task.completed ? "line-through text-slate-400" : "text-[#2E365A]"
            }`}
          >
            {task.title}
          </h3>
        )}
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
        <span
          className={`px-2.5 py-1 text-xs font-bold rounded-full border ${
            priorityStyles[task.priority] || priorityStyles.Low
          }`}
        >
          {task.priority}
        </span>

        <div className="flex items-center gap-1">
          {isEdit ? (
            <>
              <button
                onClick={handleSave}
                title="Save"
                className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-500/10 transition-colors cursor-pointer"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setIsEditingId(null);
                  setEditTask(task.title);
                }}
                title="Cancel"
                className="p-1.5 rounded-lg text-[#6B597F] hover:text-[#2E365A] hover:bg-[#E2E8F4] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setIsEditingId(task.id);
                setEditTask(task.title);
              }}
              title="Edit Task"
              className="p-1.5 rounded-lg text-[#6B597F] hover:text-[#3F5B8D] hover:bg-[#3F5B8D]/10 transition-colors cursor-pointer"
            >
              <SquarePen className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => dispatch({ type: "deleteTask", payload: task.id })}
            title="Delete Task"
            className="p-1.5 rounded-lg text-[#6B597F] hover:text-[#BD6C73] hover:bg-[#BD6C73]/10 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </li>
  );
}

export default TaskList;


