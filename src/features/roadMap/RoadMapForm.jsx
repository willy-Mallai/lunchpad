import { FolderPlus } from "lucide-react";
import { useContext, useState } from "react";
import { RoadmapContext } from "./RoadmapProvider";

function RoadMapForm({ parentId, type }) {
  const { dispatch } = useContext(RoadmapContext);
  const [title, setTitle] = useState("");

  function handleAddFolder(e) {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch({ type, payload: { title, parentId } });
    setTitle("");
  }

  const isRoot = type === "ADD_ROOT_FOLDER";

  return (
    <form onSubmit={handleAddFolder} className="flex items-center gap-3">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder={
            isRoot
              ? "New Milestone Title (e.g., Semester 7, Fullstack Track)..."
              : "New Module Title (e.g., React Hooks, System Design)..."
          }
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all outline-none text-[#2E365A] font-medium placeholder-[#6B597F]/60 ${
            isRoot
              ? "bg-[#F0F4FA] border border-[#2E365A]/20 focus:border-[#3F5B8D] focus:ring-2 focus:ring-[#3F5B8D]/15"
              : "bg-white border border-[#2E365A]/20 focus:border-[#3F5B8D] focus:ring-2 focus:ring-[#3F5B8D]/15"
          }`}
        />
      </div>
      <button
        type="submit"
        className={`px-4 py-2.5 font-bold rounded-xl flex items-center gap-2 text-sm transition-all cursor-pointer active:scale-95 shadow-md ${
          isRoot
            ? "bg-[#3F5B8D] hover:bg-[#4E6EAA] text-white shadow-[#3F5B8D]/25"
            : "bg-[#3F5B8D]/10 hover:bg-[#3F5B8D]/20 text-[#3F5B8D] border border-[#3F5B8D]/20"
        }`}
      >
        <FolderPlus className="w-4 h-4" />
        <span className="hidden sm:inline">
          {isRoot ? "Add Milestone" : "Add Module"}
        </span>
      </button>
    </form>
  );
}

export default RoadMapForm;

