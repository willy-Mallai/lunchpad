import { useRoadmap } from "./useRoadmap";
import RoadMapForm from "./RoadMapForm";
import RoadMapItem from "./RoadMapItem";
import { Milestone, CheckCircle2, FolderKanban, Sparkles } from "lucide-react";

function RoadMapManager() {
  const { state } = useRoadmap();

  let totalTasks = 0;
  let completedTasks = 0;
  let totalModules = 0;

  state.forEach((root) => {
    if (root.children) {
      totalModules += root.children.length;
      root.children.forEach((module) => {
        if (module.children) {
          module.children.forEach((task) => {
            totalTasks++;
            if (task.completed) completedTasks++;
          });
        }
      });
    }
  });

  const progressPercent =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-2xl bg-white border border-[#2E365A]/15 backdrop-blur-xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-[#3F5B8D]/10 border border-[#3F5B8D]/20 text-[#3F5B8D] shadow-2xs">
            <Milestone className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-[#2E365A]">
                Roadmap Manager
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#3F5B8D]/10 text-[#3F5B8D] border border-[#3F5B8D]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#BD6C73]" /> Dynamic Tree
              </span>
            </div>
            <p className="text-sm text-[#6B597F] font-medium mt-1">
              Plan milestones, structure modules, and track task completions
              step-by-step
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="px-4 py-2.5 rounded-xl bg-[#F0F4FA] border border-[#2E365A]/15 flex items-center gap-3">
            <FolderKanban className="w-4 h-4 text-[#3F5B8D]" />
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#6B597F]">
                Modules
              </div>
              <div className="text-sm font-bold text-[#2E365A]">
                {totalModules}
              </div>
            </div>
          </div>

          <div className="px-4 py-2.5 rounded-xl bg-[#F0F4FA] border border-[#2E365A]/15 flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#BD6C73]" />
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#6B597F]">
                Tasks Done
              </div>
              <div className="text-sm font-bold text-[#2E365A]">
                {completedTasks} / {totalTasks}
              </div>
            </div>
          </div>

          <div className="px-4 py-2.5 rounded-xl bg-[#F0F4FA] border border-[#2E365A]/15 flex flex-col justify-center min-w-[130px]">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#6B597F]">
                Progress
              </span>
              <span className="font-bold text-[#3F5B8D]">
                {progressPercent}%
              </span>
            </div>
            <div className="w-full bg-[#DCE3F0] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#3F5B8D] to-[#6B597F] h-1.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-[#2E365A]/15 backdrop-blur-md shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B597F] mb-3 flex items-center gap-2">
          Create New Roadmap Milestone
        </h3>
        <RoadMapForm type="ADD_ROOT_FOLDER" />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-[#2E365A]/15 backdrop-blur-md shadow-sm">
        {state.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-[#2E365A]/20 rounded-xl">
            <Milestone className="w-12 h-12 text-[#6B597F] mx-auto mb-3" />
            <h4 className="text-base font-bold text-[#2E365A]">
              No milestones yet
            </h4>
            <p className="text-sm text-[#6B597F] mt-1 max-w-sm mx-auto font-medium">
              Add your first roadmap milestone using the form above to get
              started organizing your topics.
            </p>
          </div>
        ) : (
          <RoadMapItem depth={0} />
        )}
      </div>
    </div>
  );
}

export default RoadMapManager;
