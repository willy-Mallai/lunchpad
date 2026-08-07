import { PlusCircle } from "lucide-react";
import { useState } from "react";

function RoadMapTaskForm({ dispatch, parentChildId }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");

  function handleAddTask(e) {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch({ type: "ADD_TASK", payload: { title, priority, parentChildId } });
    setTitle("");
  }

  return (
    <form onSubmit={handleAddTask} className="flex flex-wrap items-center gap-2.5 mt-3 mb-2">
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 min-w-[180px] px-3.5 py-2 text-xs rounded-lg bg-[#F0F4FA] border border-[#2E365A]/20 focus:border-[#3F5B8D] focus:ring-1 focus:ring-[#3F5B8D]/20 text-[#2E365A] font-medium placeholder-[#6B597F]/60 outline-none transition-all"
      />

      <div className="relative">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-3 py-2 text-xs font-semibold rounded-lg bg-[#F0F4FA] border border-[#2E365A]/20 text-[#2E365A] outline-none focus:border-[#3F5B8D] cursor-pointer appearance-none pr-7"
        >
          <option value="High" className="bg-white text-[#BD6C73]">High Priority</option>
          <option value="Medium" className="bg-white text-[#6B597F]">Medium Priority</option>
          <option value="Low" className="bg-white text-[#3F5B8D]">Low Priority</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#6B597F]">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>

      <button
        type="submit"
        className="px-3 py-2 text-xs font-bold rounded-lg bg-[#3F5B8D]/10 hover:bg-[#3F5B8D]/20 text-[#3F5B8D] border border-[#3F5B8D]/20 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
      >
        <PlusCircle className="w-3.5 h-3.5 text-[#3F5B8D]" />
        <span>Add Task</span>
      </button>
    </form>
  );
}

export default RoadMapTaskForm;



