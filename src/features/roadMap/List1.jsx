import { ChevronDown, ChevronUp, FolderOpen, Trash2, CheckCircle } from "lucide-react";
import RoadMapTaskForm from "./RoadMapTaskForm";
import { useContext } from "react";
import { RoadmapContext } from "./RoadmapProvider";

function List1({ node, isExpand, setIsExpand, parentId }) {
  const { dispatch } = useContext(RoadmapContext);
  const childId = node.id;

  const totalTasks = node.children ? node.children.length : 0;
  const completedTasks = node.children
    ? node.children.filter((t) => t.completed).length
    : 0;

  return (
    <div className="rounded-xl bg-white border border-[#2E365A]/15 p-3.5 sm:p-4 shadow-2xs hover:border-[#3F5B8D]/40 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#3F5B8D]/10 border border-[#3F5B8D]/20 text-[#3F5B8D]">
            <FolderOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h4 className="text-sm font-bold text-[#2E365A]">
                {node.title}
              </h4>
              {totalTasks > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#F0F4FA] text-[#6B597F] border border-[#2E365A]/15">
                  <CheckCircle className="w-3 h-3 text-[#BD6C73]" />
                  {completedTasks}/{totalTasks}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            type="button"
            onClick={() => setIsExpand((prev) => !prev)}
            className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-[#F0F4FA] hover:bg-[#3F5B8D] text-[#2E365A] hover:text-white border border-[#2E365A]/15 transition-all cursor-pointer"
          >
            <span>{isExpand ? "Hide Tasks" : "Show Tasks"}</span>
            {isExpand ? (
              <ChevronUp className="w-3.5 h-3.5 text-[#6B597F]" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-[#6B597F]" />
            )}
          </button>

          <button
            type="button"
            onClick={() =>
              dispatch({
                type: "DELETE_CHILD_FOLDER",
                payload: { childId, parentId },
              })
            }
            className="p-1.5 rounded-lg bg-[#F0F4FA] hover:bg-[#BD6C73]/10 text-[#6B597F] hover:text-[#BD6C73] border border-[#2E365A]/15 hover:border-[#BD6C73]/30 transition-all cursor-pointer"
            title="Delete Module"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {isExpand && (
        <div className="mt-3 pt-3 border-t border-[#2E365A]/15">
          <RoadMapTaskForm dispatch={dispatch} parentChildId={node.id} />
        </div>
      )}
    </div>
  );
}

export default List1;



