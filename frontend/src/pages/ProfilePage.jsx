import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { Camera, Mail, User, Upload, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const { isMinecraftMode } = useThemeStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset previous errors
    setUploadError(null);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      const error = 'Please select an image file (JPG, PNG, GIF, etc.)';
      setUploadError(error);
      toast.error(error);
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      const error = 'Image size should be less than 5MB';
      setUploadError(error);
      toast.error(error);
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const base64Image = reader.result;
        setSelectedImg(base64Image);
        await updateProfile({ profilePic: base64Image });
        setUploadError(null);
        toast.success(isMinecraftMode ? "🎨 Skin updated!" : "Profile picture updated!");
      } catch (error) {
        console.error('Error uploading image:', error);
        const errorMsg = error.response?.data?.message || 'Failed to upload image. Please check your internet connection and try again.';
        setUploadError(errorMsg);
        toast.error(errorMsg);
        setSelectedImg(null);
      }
    };

    reader.onerror = () => {
      const error = 'Error reading file. Please try again.';
      setUploadError(error);
      toast.error(error);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen pt-24 pb-8">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className={`
          bg-base-300 p-6 space-y-8
          ${isMinecraftMode ? 'rounded-none border-4 border-base-300 pixel-border' : 'rounded-xl'}
        `}>
          <div className="text-center">
            <h1 className={`
              text-2xl font-semibold
              ${isMinecraftMode ? 'font-mono minecraft-ui' : ''}
            `}>
              {isMinecraftMode ? '🏃 Player Profile' : 'Profile'}
            </h1>
            <p className={`
              mt-2
              ${isMinecraftMode ? 'font-mono text-sm' : ''}
            `}>
              {isMinecraftMode ? 'Your avatar and game info' : 'Your profile information'}
            </p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className={`
                  size-32 object-cover border-4
                  ${isMinecraftMode ? 'rounded-none border-primary image-rendering-pixelated' : 'rounded-full'}
                `}
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 cursor-pointer 
                  transition-all duration-200
                  ${isMinecraftMode ? 'rounded-none border-2 border-primary pixel-btn' : 'rounded-full'}
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            
            <p className={`
              text-sm text-zinc-400
              ${isMinecraftMode ? 'font-mono text-xs' : ''}
            `}>
              {isUpdatingProfile 
                ? (isMinecraftMode ? "⚡ Uploading texture..." : "Uploading...") 
                : (isMinecraftMode ? "📸 Click to change skin" : "Click the camera icon to update your photo")
              }
            </p>
            
            {/* Upload Error Display */}
            {uploadError && (
              <div className={`
                flex items-center gap-2 text-error text-sm p-3 border border-error/20 bg-error/10
                ${isMinecraftMode ? 'rounded-none font-mono text-xs' : 'rounded-lg'}
              `}>
                <AlertCircle className="w-4 h-4" />
                <span>{uploadError}</span>
              </div>
            )}

            {/* Upload Instructions */}
            <div className={`
              text-xs text-base-content/60 text-center max-w-sm
              ${isMinecraftMode ? 'font-mono' : ''}
            `}>
              <p>• Supported formats: JPG, PNG, GIF</p>
              <p>• Maximum size: 5MB</p>
              <p>• Recommended: Square images (1:1 ratio)</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className={`
                text-sm text-zinc-400 flex items-center gap-2
                ${isMinecraftMode ? 'font-mono' : ''}
              `}>
                <User className="w-4 h-4" />
                {isMinecraftMode ? 'Player Name' : 'Full Name'}
              </div>
              <p className={`
                px-4 py-2.5 bg-base-200 border
                ${isMinecraftMode ? 'rounded-none border-2 font-mono text-sm' : 'rounded-lg'}
              `}>
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className={`
                text-sm text-zinc-400 flex items-center gap-2
                ${isMinecraftMode ? 'font-mono' : ''}
              `}>
                <Mail className="w-4 h-4" />
                {isMinecraftMode ? 'Account Email' : 'Email Address'}
              </div>
              <p className={`
                px-4 py-2.5 bg-base-200 border
                ${isMinecraftMode ? 'rounded-none border-2 font-mono text-sm' : 'rounded-lg'}
              `}>
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className={`
            mt-6 bg-base-300 p-6
            ${isMinecraftMode ? 'rounded-none border-2 border-base-200' : 'rounded-xl'}
          `}>
            <h2 className={`
              text-lg font-medium mb-4
              ${isMinecraftMode ? 'font-mono' : ''}
            `}>
              {isMinecraftMode ? '📊 Player Stats' : 'Account Information'}
            </h2>
            <div className={`
              space-y-3 text-sm
              ${isMinecraftMode ? 'font-mono' : ''}
            `}>
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>{isMinecraftMode ? 'Joined Server' : 'Member Since'}</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>{isMinecraftMode ? 'Player Status' : 'Account Status'}</span>
                <span className="text-green-500">{isMinecraftMode ? '🟢 Online' : 'Active'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
