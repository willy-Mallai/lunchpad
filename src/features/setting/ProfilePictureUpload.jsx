import { useContext, useState } from "react";
import { ProfileContext } from "./ProfileProvider";
import { Camera, User as UserIcon } from "lucide-react";

function ProfilePictureUpload() {
  const { state, dispatch } = useContext(ProfileContext);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      dispatch({
        type: "UPDATE_PHOTO",
        payload: file,
      });
    }
  };

  const imageSrc =
    preview || (typeof state.photo === "string" ? state.photo : null);

  return (
    <div className="flex flex-col items-center gap-3">
      <label
        htmlFor="avatar-upload"
        className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-[#3F5B8D]/30 bg-[#F0F4FA] shadow-md group flex items-center justify-center cursor-pointer transition-all hover:border-[#3F5B8D] hover:shadow-[#3F5B8D]/15 ring-4 ring-[#3F5B8D]/10"
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Profile Avatar"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-[#3F5B8D] transition-colors">
            <UserIcon className="w-12 h-12 stroke-[1.5]" />
          </div>
        )}

        <div className="absolute inset-0 bg-[#2E365A]/80 backdrop-blur-xs flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 text-white">
          <Camera className="w-5 h-5 text-white" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-white">
            Upload
          </span>
        </div>
      </label>

      <input
        id="avatar-upload"
        name="avatar"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      <div className="text-center">
        <p className="text-xs font-bold text-[#2E365A]">Profile Photo</p>
        <p className="text-[11px] text-[#6B597F] mt-0.5 font-medium">
          JPG, PNG or GIF (Max 5MB)
        </p>
      </div>
    </div>
  );
}

export default ProfilePictureUpload;
