import { useProfile } from "../setting/useProfile";
import { useStreak } from "../setting/useStreak";
import { Sparkles, Flame } from "lucide-react";

function DashboardHeader() {
  const { state: profileState } = useProfile();
  const { state: streakState } = useStreak();

  const streakCount = streakState?.currentStreak || 0;
  const userName = profileState?.name || "Developer";

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-white via-[#F4F7FC] to-[#EBF0F7] border border-[#2E365A]/15 p-6 sm:p-8 backdrop-blur-xl shadow-sm">
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#3F5B8D]/10 text-[#3F5B8D] border border-[#3F5B8D]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#BD6C73]" />
            <span>Lunchpad Overview</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#2E365A] tracking-tight">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-[#2E365A] to-[#3F5B8D] bg-clip-text text-transparent">
              {userName}
            </span>{" "}
          </h1>
          <p className="text-sm text-[#6B597F] max-w-xl font-medium">
            Track your active tasks, scheduled events, learning roadmap, and
            daily activity streak all in one place.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-3 rounded-2xl bg-white border border-[#BD6C73]/30 flex items-center gap-3 shadow-xs">
            <div className="p-2 rounded-xl bg-[#BD6C73]/10 text-[#BD6C73]">
              <Flame className="w-6 h-6 fill-[#BD6C73]/20 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-[#6B597F] tracking-wider">
                Active Streak
              </div>
              <div className="text-lg font-bold text-[#BD6C73]">
                {streakCount} {streakCount === 1 ? "Day" : "Days"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
