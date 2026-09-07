import { ChevronDown, ChevronUp, Folder, Trash2, Layers } from "lucide-react";
import RoadMapForm from "./RoadMapForm";
import { useRoadmap } from "./useRoadmap";

function List0({ node, isExpand, setIsExpand }) {
  const { dispatch } = useRoadmap();

  let totalTasks = 0;
  let completedTasks = 0;
  const moduleCount = node.children ? node.children.length : 0;

  if (node.children) {
    node.children.forEach((child) => {
      if (child.children) {
        child.children.forEach((t) => {
          totalTasks++;
          if (t.completed) completedTasks++;
        });
      }
    });
  }

  const pct =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="rounded-2xl bg-[#F0F4FA] border border-[#2E365A]/15 shadow-2xs overflow-hidden transition-all duration-200 hover:border-[#3F5B8D]/40">
      {/* Header Bar */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-[#3F5B8D]/10 border border-[#3F5B8D]/20 text-[#3F5B8D]">
            <Folder className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-base font-bold text-[#2E365A] tracking-wide">
                {node.title}
              </h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white text-[#2E365A] border border-[#2E365A]/15">
                <Layers className="w-3 h-3 text-[#3F5B8D]" />
                {moduleCount} {moduleCount === 1 ? "Module" : "Modules"}
              </span>
              {totalTasks > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#3F5B8D]/10 text-[#3F5B8D] border border-[#3F5B8D]/20">
                  {completedTasks}/{totalTasks} tasks ({pct}%)
                </span>
              )}
            </div>

            {totalTasks > 0 && (
              <div className="w-48 bg-[#DCE3F0] rounded-full h-1.5 mt-2 overflow-hidden border border-[#2E365A]/10">
                <div
                  className="bg-[#3F5B8D] h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${pct}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            type="button"
            onClick={() => setIsExpand((prev) => !prev)}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-white hover:bg-[#3F5B8D] text-[#2E365A] hover:text-white border border-[#2E365A]/15 transition-all cursor-pointer"
          >
            <span>{isExpand ? "Collapse" : "Expand"}</span>
            {isExpand ? (
              <ChevronUp className="w-4 h-4 text-[#6B597F]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#6B597F]" />
            )}
          </button>

          <button
            type="button"
            onClick={() =>
              dispatch({ type: "DELETE_ROOT_FOLDER", payload: node.id })
            }
            className="p-2 rounded-xl bg-white hover:bg-[#BD6C73]/10 text-[#6B597F] hover:text-[#BD6C73] border border-[#2E365A]/15 hover:border-[#BD6C73]/30 transition-all cursor-pointer"
            title="Delete Milestone"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isExpand && (
        <div className="p-4 sm:p-5 border-t border-[#2E365A]/15 bg-white space-y-4">
          <div className="bg-[#F0F4FA] p-3.5 rounded-xl border border-[#2E365A]/15">
            <RoadMapForm type="ADD_CHILD_FOLDER" parentId={node.id} />
          </div>
        </div>
      )}
    </div>
  );
}

export default List0;
