import { useEffect } from "react";
import { useStreak } from "./useStreak";
import { Flame, Trophy, Clock, Zap } from "lucide-react";
import { updateStreak } from "./userService";

function Streak() {
  const { state, dispatch } = useStreak();

  useEffect(() => {
    const today = new Date().toDateString();
    if (state.lastStreakDate === today) return;
    // Make the setTimeout callback async!
    const timer = setTimeout(
      async () => {
        try {
          // 1. Tell the backend we survived 10 minutes! The backend does the math.
          const newStreakData = await updateStreak();

          // 2. The backend sends us the new record, and we update the UI!
          dispatch({ type: "SET_STREAK", payload: newStreakData });
        } catch (err) {
          console.log(err.message);
        }
      },
      5 * 60 * 1000,
    ); // 5 minutes
    return () => clearTimeout(timer);
  }, [state.lastStreakDate, dispatch]);

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#2E365A]/15 backdrop-blur-xl shadow-sm space-y-6">
      <div className="flex items-center gap-3 border-b border-[#2E365A]/15 pb-5">
        <div className="p-2.5 rounded-xl bg-[#BD6C73]/10 border border-[#BD6C73]/30 text-[#BD6C73] shadow-xs">
          <Flame className="w-6 h-6 fill-[#BD6C73]/20" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#2E365A] tracking-tight flex items-center gap-2">
            Activity Streak
          </h3>
          <p className="text-xs text-[#6B597F] font-medium mt-0.5">
            Keep your momentum going daily
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="p-5 rounded-xl bg-[#F0F4FA] border border-[#BD6C73]/30 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#BD6C73]/10 text-[#BD6C73]">
              <Flame className="w-8 h-8 fill-[#BD6C73]/20 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B597F]">
                Current Streak
              </div>
              <div className="text-4xl font-extrabold text-[#BD6C73] tracking-tight mt-0.5">
                {state.currentStreak}{" "}
                <span className="text-sm font-semibold text-[#6B597F]">
                  {state.currentStreak === 1 ? "day" : "days"}
                </span>
              </div>
            </div>
          </div>
          <Zap className="w-5 h-5 text-[#BD6C73]" />
        </div>

        <div className="p-4 rounded-xl bg-[#F0F4FA] border border-[#2E365A]/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#3F5B8D]/10 text-[#3F5B8D] border border-[#3F5B8D]/20">
              <Trophy className="w-4 h-4 text-[#BD6C73]" />
            </div>
            <span className="text-xs font-bold text-[#2E365A]">
              Longest Streak Record
            </span>
          </div>
          <span className="text-base font-extrabold text-[#3F5B8D]">
            {state.longestStreak} {state.longestStreak === 1 ? "day" : "days"}
          </span>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-[#F0F4FA] border border-[#2E365A]/15 flex items-start gap-3">
        <div className="mt-0.5 relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BD6C73] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#BD6C73]"></span>
        </div>
        <div className="text-xs text-[#6B597F] leading-relaxed">
          <p className="font-bold text-[#2E365A] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#6B597F] inline" /> Auto Tracker
            Active
          </p>
          <p className="mt-1 text-[11px] text-[#6B597F] font-medium">
            Your streak updates automatically after spending 10 active minutes
            in Lunchpad each day.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Streak;
