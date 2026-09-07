import { Check, SquarePen, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useRoadmap } from "./useRoadmap";

function List2({ node, isEditedId, setIsEditedId }) {
  const { dispatch } = useRoadmap();
  const [editTask, setEditTask] = useState(node.title);
  const isEdit = node.id === isEditedId;

  function handleSave(e) {
    e?.preventDefault();
    if (!editTask.trim()) return;
    dispatch({ type: "EDITED_TASK", payload: { editTask, isEditedId } });
    setIsEditedId(null);
  }

  function toggleComplete(id) {
    dispatch({ type: "TOGGLE_COMPLETE", payload: id });
  }

  const getPriorityClass = (p) => {
    const val = p?.toLowerCase();
    if (val === "high" || val === "hard") {
      return "bg-[#BD6C73]/15 text-[#BD6C73] border-[#BD6C73]/30";
    }
    if (val === "medium") {
      return "bg-[#6B597F]/15 text-[#6B597F] border-[#6B597F]/30";
    }
    return "bg-[#3F5B8D]/15 text-[#3F5B8D] border-[#3F5B8D]/30";
  };

  return (
    <div
      className={`flex items-center justify-between gap-3 p-2.5 px-3.5 rounded-lg border transition-all ${
        node.completed
          ? "bg-[#F8FAFD] border-[#2E365A]/10 opacity-60"
          : "bg-[#F0F4FA] border-[#2E365A]/15 hover:border-[#3F5B8D]/40"
      }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={node.completed}
          onChange={() => toggleComplete(node.id)}
          className="w-4 h-4 rounded border-[#2E365A]/30 bg-white text-[#3F5B8D] focus:ring-[#3F5B8D] cursor-pointer accent-[#3F5B8D]"
        />

        {isEdit ? (
          <form onSubmit={handleSave} className="flex-1">
            <input
              type="text"
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
              className="w-full px-2.5 py-1 text-xs rounded bg-white border border-[#3F5B8D] text-[#2E365A] font-semibold outline-none focus:ring-1 focus:ring-[#3F5B8D]"
              autoFocus
            />
          </form>
        ) : (
          <span
            className={`text-xs font-semibold truncate ${
              node.completed
                ? "line-through text-slate-400"
                : "text-[#2E365A]"
            }`}
          >
            {node.title}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {node.priority && (
          <span
            className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md border ${getPriorityClass(
              node.priority
            )}`}
          >
            {node.priority}
          </span>
        )}

        <div className="flex items-center gap-1">
          {isEdit ? (
            <>
              <button
                type="button"
                onClick={handleSave}
                className="p-1 rounded hover:bg-emerald-500/10 text-emerald-600 transition-colors cursor-pointer"
                title="Save task title"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsEditedId(null)}
                className="p-1 rounded hover:bg-[#BD6C73]/10 text-[#6B597F] hover:text-[#BD6C73] transition-colors cursor-pointer"
                title="Cancel edit"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsEditedId(node.id);
                setEditTask(node.title);
              }}
              className="p-1 rounded hover:bg-[#E2E8F4] text-[#6B597F] hover:text-[#3F5B8D] transition-colors cursor-pointer"
              title="Edit task"
            >
              <SquarePen className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => dispatch({ type: "DELETE_TASK", payload: node.id })}
            className="p-1 rounded hover:bg-[#BD6C73]/10 text-[#6B597F] hover:text-[#BD6C73] transition-colors cursor-pointer"
            title="Delete task"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default List2;
