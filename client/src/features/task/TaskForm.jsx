import { ClipboardPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTask } from "./useTask";
import { addTask } from "./taskService";

function TaskForm() {
  const { dispatch } = useTask();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const inputField = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const newTask = await addTask(title, priority);

      dispatch({ type: "addTask", payload: newTask });
      setTitle("");
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    inputField.current?.focus();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-3"
    >
      <div className="relative flex-1 w-full">
        <input
          ref={inputField}
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 bg-[#F0F4FA] border border-[#2E365A]/20 rounded-xl text-[#2E365A] placeholder-[#6B597F]/60 focus:outline-none focus:border-[#3F5B8D] focus:ring-2 focus:ring-[#3F5B8D]/15 transition-all text-sm font-medium"
        />
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full sm:w-auto px-4 py-3 bg-[#F0F4FA] border border-[#2E365A]/20 rounded-xl text-[#2E365A] font-medium focus:outline-none focus:border-[#3F5B8D] transition-all text-sm cursor-pointer"
        >
          <option value="Low" className="bg-white text-[#2E365A]">
            Low Priority
          </option>
          <option value="Medium" className="bg-white text-[#2E365A]">
            Medium Priority
          </option>
          <option value="High" className="bg-white text-[#2E365A]">
            High Priority
          </option>
        </select>

        <button
          type="submit"
          disabled={!title.trim()}
          className="w-full sm:w-auto px-5 py-3 bg-[#3F5B8D] hover:bg-[#4E6EAA] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-md shadow-[#3F5B8D]/25 flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-95 text-sm"
        >
          <ClipboardPlus className="w-5 h-5" />
          <span>Add Task</span>
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
