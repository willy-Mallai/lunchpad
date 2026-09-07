import { useState } from "react";
import { useProfile } from "./useProfile";
import { User, Mail, AtSign, FileText, Save, CheckCircle2 } from "lucide-react";
import { updateUserProfile } from "./userService";

function ProfileInfoForm() {
  const { state, dispatch } = useProfile();
  const [savedToast, setSavedToast] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSave = async (e) => {
    // Make sure this is async!
    e.preventDefault();
    const newErrors = {};
    if (!state.name?.trim()) newErrors.name = "Full name is required";
    if (!state.email?.trim()) newErrors.email = "Email address is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    try {
      await updateUserProfile(state.username, state.bio);
      dispatch({ type: "SAVE_PROFILE" });
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3000);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      {savedToast && (
        <div className="p-3.5 rounded-xl bg-[#3F5B8D]/10 border border-[#3F5B8D]/20 text-[#3F5B8D] text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#BD6C73]" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label
            htmlFor="fullName"
            className="text-xs font-bold uppercase tracking-wider text-[#6B597F]"
          >
            Full Name <span className="text-[#BD6C73]">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-[#6B597F] absolute left-3.5 top-3" />
            <input
              id="fullName"
              name="name"
              type="text"
              placeholder="e.g. Mack Well"
              value={state.name || ""}
              disabled
              onChange={(e) => {
                handleChange(e);
                setErrors((prev) => ({ ...prev, name: "" }));
              }}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F0F4FA] border text-[#2E365A] font-medium placeholder-[#6B597F]/60 text-sm outline-none transition-all ${
                errors.name
                  ? "border-[#BD6C73] focus:ring-2 focus:ring-[#BD6C73]/20"
                  : "border-[#2E365A]/20 focus:border-[#3F5B8D] focus:ring-2 focus:ring-[#3F5B8D]/15"
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-[#BD6C73] font-semibold mt-1">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-xs font-bold uppercase tracking-wider text-[#6B597F]"
          >
            Email Address <span className="text-[#BD6C73]">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#6B597F] absolute left-3.5 top-3" />
            <input
              id="email"
              name="email"
              type="email"
              disabled
              placeholder="MAck@example.com"
              value={state.email || ""}
              onChange={(e) => {
                handleChange(e);
                setErrors((prev) => ({ ...prev, email: "" }));
              }}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F0F4FA] border text-[#2E365A] font-medium placeholder-[#6B597F]/60 text-sm outline-none transition-all ${
                errors.email
                  ? "border-[#BD6C73] focus:ring-2 focus:ring-[#BD6C73]/20"
                  : "border-[#2E365A]/20 focus:border-[#3F5B8D] focus:ring-2 focus:ring-[#3F5B8D]/15"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-[#BD6C73] font-semibold mt-1">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="username"
          className="text-xs font-bold uppercase tracking-wider text-[#6B597F]"
        >
          Username
        </label>
        <div className="relative">
          <AtSign className="w-4 h-4 text-[#6B597F] absolute left-3.5 top-3" />
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Mackwell_99"
            value={state.username || ""}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F0F4FA] border border-[#2E365A]/20 focus:border-[#3F5B8D] focus:ring-2 focus:ring-[#3F5B8D]/15 text-[#2E365A] font-medium placeholder-[#6B597F]/60 text-sm outline-none transition-all"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="bio"
          className="text-xs font-bold uppercase tracking-wider text-[#6B597F]"
        >
          Bio
        </label>
        <div className="relative">
          <FileText className="w-4 h-4 text-[#6B597F] absolute left-3.5 top-3.5" />
          <textarea
            id="bio"
            name="bio"
            rows="3"
            placeholder="Tell us a little bit about yourself, goals, and interest..."
            value={state.bio || ""}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F0F4FA] border border-[#2E365A]/20 focus:border-[#3F5B8D] focus:ring-2 focus:ring-[#3F5B8D]/15 text-[#2E365A] font-medium placeholder-[#6B597F]/60 text-sm outline-none transition-all resize-none"
          />
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          className="px-6 py-2.5 font-bold rounded-xl bg-[#3F5B8D] hover:bg-[#4E6EAA] text-white flex items-center gap-2 text-sm shadow-md shadow-[#3F5B8D]/25 transition-all cursor-pointer active:scale-95"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>
    </form>
  );
}

export default ProfileInfoForm;
