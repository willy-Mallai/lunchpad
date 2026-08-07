import SettingManager from "../features/setting/SettingManager";
import Streak from "../features/setting/Streak";
import { Settings, Sparkles } from "lucide-react";

function Setting() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      {/* Settings Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#222B45] border border-[#2E365A] backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-[#3F5B8D]/20 border border-[#3F5B8D]/40 text-[#92A1C2]">
            <Settings className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Account Settings
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#3F5B8D]/20 text-[#92A1C2] border border-[#3F5B8D]/40">
                <Sparkles className="w-3.5 h-3.5 text-[#BD6C73]" /> Preferences
              </span>
            </div>
            <p className="text-sm text-[#92A1C2] mt-1">
              Manage your personal profile information, avatar, and active daily streak
            </p>
          </div>
        </div>
      </div>


      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SettingManager />
        </div>
        <div className="lg:col-span-1">
          <Streak />
        </div>
      </div>
    </div>
  );
}

export default Setting;

