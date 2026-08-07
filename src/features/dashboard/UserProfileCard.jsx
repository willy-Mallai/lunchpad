import { useContext } from "react";
import { Link } from "react-router";
import { ProfileContext } from "../setting/ProfileProvider";
import { User, ArrowRight } from "lucide-react";

function UserProfileCard() {
  const { state: profileState } = useContext(ProfileContext);

  const userName = profileState?.name || "User Profile";
  const userEmail = profileState?.email || "No email set";
  const userBio = profileState?.bio;
  const userPhoto = profileState?.photo;

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-white via-[#F4F7FC] to-[#EBF0F7] border border-[#2E365A]/15 backdrop-blur-xl shadow-sm space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#F0F4FA] border-2 border-[#3F5B8D]/30 flex items-center justify-center overflow-hidden text-[#3F5B8D] font-bold text-lg">
          {userPhoto && typeof userPhoto === "string" ? (
            <img src={userPhoto} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <User className="w-6 h-6 text-[#3F5B8D]" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-bold text-[#2E365A] truncate">{userName}</h4>
          <p className="text-xs text-[#6B597F] font-medium truncate">{userEmail}</p>
        </div>
      </div>

      {userBio && (
        <p className="text-xs text-[#6B597F] italic bg-[#F0F4FA] p-2.5 rounded-lg border border-[#2E365A]/10">
          "{userBio}"
        </p>
      )}

      <div className="pt-2">
        <Link
          to="/setting"
          className="w-full py-2.5 px-4 rounded-xl bg-[#3F5B8D] hover:bg-[#4E6EAA] text-xs font-semibold text-white border border-[#3F5B8D]/40 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
        >
          <span>Manage Profile & Settings</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default UserProfileCard;


