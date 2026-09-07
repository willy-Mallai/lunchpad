import { useProfile } from "../setting/useProfile";
import { NavLink } from "react-router";
import {
  LayoutDashboard,
  ListTodo,
  Calendar,
  Milestone,
  Settings,
  User,
  X,
  Rocket,
} from "lucide-react";

function NavBar({ isOpen, onClose }) {
  const { state: profileState } = useProfile();

  const navItems = [
    { to: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "task", label: "Task", icon: ListTodo },
    { to: "event", label: "Events", icon: Calendar },
    { to: "roadmap", label: "Roadmap", icon: Milestone },
    { to: "setting", label: "Settings", icon: Settings },
  ];

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <>
      <nav className="hidden md:flex w-64 border-r border-[#2E365A]/15 bg-white/90 p-4 shrink-0 flex-col justify-between backdrop-blur-md shadow-xs">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[#3F5B8D] text-white shadow-md shadow-[#3F5B8D]/25 font-bold"
                        : "text-[#6B597F] hover:text-[#2E365A] hover:bg-[#F0F4FA]"
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className="pt-4 border-t border-[#2E365A]/15 mt-auto">
          <NavLink
            to="setting"
            className="flex items-center gap-3 p-3 rounded-xl bg-[#F0F4FA] hover:bg-[#E2E8F4] border border-[#2E365A]/15 transition-all group"
          >
            <div className="w-8 h-8 rounded-full bg-[#3F5B8D]/15 border border-[#3F5B8D]/30 flex items-center justify-center overflow-hidden text-[#3F5B8D] text-xs font-bold">
              {profileState?.photo && typeof profileState.photo === "string" ? (
                <img
                  src={profileState.photo}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-4 h-4 text-[#3F5B8D]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#2E365A] truncate">
                {profileState?.name || "Developer"}
              </p>
              <p className="text-[10px] text-[#6B597F] truncate">
                {profileState?.email || "Manage settings"}
              </p>
            </div>
          </NavLink>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-[#171D30]/50 backdrop-blur-xs transition-opacity animate-fadeIn"
            onClick={onClose}
            aria-hidden="true"
          />

          <div className="relative w-72 max-w-[80vw] bg-white h-full p-5 flex flex-col justify-between shadow-2xl z-50 border-r border-[#2E365A]/15 animate-fadeIn">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2E365A]/15">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#3F5B8D]/10 text-[#3F5B8D]">
                    <Rocket className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-[#2E365A] text-base">
                    LunchPad Menu
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-[#F0F4FA] text-[#6B597F] hover:text-[#2E365A] transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ul className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        onClick={handleNavClick}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                            isActive
                              ? "bg-[#3F5B8D] text-white shadow-md shadow-[#3F5B8D]/25"
                              : "text-[#6B597F] hover:text-[#2E365A] hover:bg-[#F0F4FA]"
                          }`
                        }
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#2E365A]/15">
              <NavLink
                to="setting"
                onClick={handleNavClick}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#F0F4FA] hover:bg-[#E2E8F4] border border-[#2E365A]/15 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-[#3F5B8D]/15 border border-[#3F5B8D]/30 flex items-center justify-center overflow-hidden text-[#3F5B8D] text-xs font-bold">
                  {profileState?.photo &&
                  typeof profileState.photo === "string" ? (
                    <img
                      src={profileState.photo}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4 text-[#3F5B8D]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#2E365A] truncate">
                    {profileState?.name || "Developer"}
                  </p>
                  <p className="text-[10px] text-[#6B597F] truncate">
                    {profileState?.email || "Manage settings"}
                  </p>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
