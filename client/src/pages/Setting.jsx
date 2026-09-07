import ErrorBoundary from "../components/ErrorBoundoundary";
import SettingManager from "../features/setting/SettingManager";
import Streak from "../features/setting/Streak";
import { Settings, Sparkles, LogOut } from "lucide-react";
import { useAuth } from "../features/auth/useAuth";

function Setting() {
  const { logout } = useAuth();
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      {/* Settings Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#2E365A] backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-[#3F5B8D]/20 border border-[#3F5B8D]/40 text-[#92A1C2]">
            <Settings className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-[#2E365A]">
                Account Settings
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#3F5B8D]/20 text-[#92A1C2] border border-[#3F5B8D]/40">
                <Sparkles className="w-3.5 h-3.5 text-[#BD6C73]" /> Preferences
              </span>
            </div>
            <p className="text-sm text-[#92A1C2] mt-1">
              Manage your personal profile information, avatar, and active daily
              streak
            </p>
          </div>
        </div>
        
        {/* Logout Button */}
        <div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-[#BD6C73] bg-[#BD6C73]/10 hover:bg-[#BD6C73]/20 border border-[#BD6C73]/30 transition-all active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ErrorBoundary>
            <SettingManager />
          </ErrorBoundary>
        </div>
        <div className="lg:col-span-1">
          <ErrorBoundary>
            <Streak />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

export default Setting;
