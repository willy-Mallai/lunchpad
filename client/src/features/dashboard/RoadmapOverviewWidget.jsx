import { useRoadmap } from "../roadMap/useRoadmap";
import { Link } from "react-router";
import { Milestone, ArrowRight, Layers } from "lucide-react";

function RoadmapOverviewWidget() {
  const { state: roadmapState } = useRoadmap();
  const roadmap = roadmapState || [];

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#2E365A]/15 backdrop-blur-xl shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-[#2E365A]/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#6B597F]/10 text-[#6B597F] border border-[#6B597F]/20">
            <Milestone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#2E365A] tracking-tight">
              Learning Roadmap
            </h3>
            <p className="text-xs text-[#6B597F]">
              {roadmap.length} active milestone topic{roadmap.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>
        <Link
          to="/roadMap"
          className="px-3 py-1.5 rounded-xl bg-[#F0F4FA] hover:bg-[#3F5B8D] text-xs font-semibold text-[#2E365A] hover:text-white flex items-center gap-1.5 border border-[#2E365A]/15 transition-all"
        >
          <span>Open Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {roadmap.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-[#2E365A]/20 rounded-xl">
          <Milestone className="w-10 h-10 text-[#6B597F] mx-auto mb-2" />
          <p className="text-sm font-medium text-[#6B597F]">No roadmap items created</p>
          <Link
            to="/roadMap"
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#6B597F] bg-[#6B597F]/10 rounded-lg hover:bg-[#6B597F]/20 transition-all"
          >
            Create Roadmap
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roadmap.map((root) => {
            let rootTotal = 0;
            let rootDone = 0;
            if (root.children) {
              root.children.forEach((child) => {
                if (child.children) {
                  child.children.forEach((t) => {
                    rootTotal++;
                    if (t.completed) rootDone++;
                  });
                }
              });
            }
            const pct =
              rootTotal > 0 ? Math.round((rootDone / rootTotal) * 100) : 0;

            return (
              <div
                key={root.id}
                className="p-4 rounded-xl bg-[#F0F4FA] border border-[#2E365A]/15 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#2E365A] truncate">
                    {root.title}
                  </h4>
                  <span className="text-xs font-bold text-[#3F5B8D]">
                    {pct}%
                  </span>
                </div>

                <div className="w-full bg-[#DCE3F0] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#3F5B8D] to-[#6B597F] h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#6B597F] font-medium pt-1">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3 text-[#6B597F]" />
                    {root.children?.length || 0} Modules
                  </span>
                  <span>
                    {rootDone}/{rootTotal} Tasks done
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RoadmapOverviewWidget;


