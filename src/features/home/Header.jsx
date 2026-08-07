import { useContext } from "react";
import { Link } from "react-router";
import { ProfileContext } from "../setting/ProfileProvider";
import { StreakContext } from "../setting/StreakProvider";
import { Rocket, Flame, User, Menu, X } from "lucide-react";

function Header({ isMobileMenuOpen, onToggleMobileMenu }) {
  const { state: profileState } = useContext(ProfileContext);
  const { state: streakState } = useContext(StreakContext);

  const streakCount = streakState?.currentStreak || 0;
  const userName = profileState?.name || "User";
  const userPhoto = profileState?.photo;

  return (
    <header className="h-16 border-b border-[#2E365A]/15 bg-white/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between shrink-0 z-20 shadow-xs">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-xl bg-[#F0F4FA] text-[#2E365A] border border-[#2E365A]/15 hover:bg-[#E2E8F4] transition-all cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        <div className="p-2 rounded-xl bg-[#3F5B8D]/10 border border-[#3F5B8D]/20 text-[#3F5B8D]">
          <Rocket className="w-5 h-5" />
        </div>
        <Link
          to="/dashboard"
          className="text-lg sm:text-xl font-bold tracking-tight text-[#2E365A] hover:opacity-90 transition-opacity"
        >
          LunchPad
        </Link>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          to="/setting"
          className="px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold rounded-full bg-[#BD6C73]/10 text-[#BD6C73] border border-[#BD6C73]/30 hover:bg-[#BD6C73]/20 flex items-center gap-1.5 transition-all shadow-2xs"
          title="Daily Activity Streak"
        >
          <Flame className="w-3.5 h-3.5 fill-[#BD6C73]/20 text-[#BD6C73] animate-pulse" />
          <span>
            {streakCount}{" "}
            <span className="hidden sm:inline">
              {streakCount === 1 ? "Day" : "Days"}
            </span>{" "}
            Streak
          </span>
        </Link>

        <Link
          to="/setting"
          className="flex items-center gap-2.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#F0F4FA] hover:bg-[#E2E8F4] border border-[#2E365A]/15 text-xs font-semibold text-[#2E365A] transition-all cursor-pointer shadow-2xs"
        >
          <div className="w-6 h-6 rounded-full bg-[#3F5B8D]/15 border border-[#3F5B8D]/30 flex items-center justify-center overflow-hidden text-[#3F5B8D]">
            {userPhoto && typeof userPhoto === "string" ? (
              <img
                src={userPhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-3.5 h-3.5" />
            )}
          </div>
          <span className="hidden sm:inline max-w-[100px] truncate font-bold">
            {userName}
          </span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
