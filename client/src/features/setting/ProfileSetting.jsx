import ProfileInfoForm from "./ProfileInfoForm";
import ProfilePictureUpload from "./ProfilePictureUpload";
import { User, ShieldCheck, AlertTriangle, Loader2 } from "lucide-react";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router";
import { sendVerifyOtp } from "../auth/authService";
import { useState } from "react";

function ProfileSetting() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);

  const handleVerifyClick = async () => {
    if (user?.isAccountVerified) return;
    setIsSending(true);
    try {
      await sendVerifyOtp();
      navigate("/verify-email");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#2E365A]/15 backdrop-blur-xl shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-[#2E365A]/15 pb-6">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-[#3F5B8D]/10 border border-[#3F5B8D]/20 text-[#3F5B8D]">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#2E365A] tracking-tight">
              Profile Info
            </h3>
            <p className="text-xs sm:text-sm text-[#6B597F] font-medium mt-0.5">
              Manage your personal information and how others see you on
              Lunchpad
            </p>
          </div>
        </div>

        {user?.isAccountVerified ? (
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#BD6C73]/10 text-[#BD6C73] border border-[#BD6C73]/30">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified Account
          </span>
        ) : (
          <button
            onClick={handleVerifyClick}
            disabled //{isSending}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/10 text-orange-600 border border-orange-500/30 hover:bg-orange-500/20 transition-colors cursor-pointer"
          >
            {isSending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5" />
            )}
            {isSending ? "Sending..." : "Unverified - Click to Verify"}
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-auto flex flex-col items-center md:items-start">
          <ProfilePictureUpload />
        </div>
        <div className="flex-1 w-full">
          <ProfileInfoForm />
        </div>
      </div>
    </div>
  );
}

export default ProfileSetting;
