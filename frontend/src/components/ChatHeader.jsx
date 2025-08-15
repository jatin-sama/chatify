import { X, ArrowLeft } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const { isMinecraftMode } = useThemeStore();

  return (
    <div className={`
      p-2.5 border-b
      ${isMinecraftMode ? 'border-b-4 border-base-300' : 'border-base-300'}
    `}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile back button */}
          <button
            onClick={() => setSelectedUser(null)}
            className={`
              lg:hidden flex items-center justify-center
              ${isMinecraftMode ? 'pixel-btn border-2 border-base-300 w-8 h-8' : 'btn btn-sm btn-circle btn-ghost'}
            `}
          >
            <ArrowLeft size={16} />
          </button>

          {/* Avatar */}
          <div className="avatar">
            <div className={`
              size-10 relative
              ${isMinecraftMode ? 'rounded-none border-2 border-base-300' : 'rounded-full'}
            `}>
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className={isMinecraftMode ? 'image-rendering-pixelated' : ''}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className={`
              font-medium
              ${isMinecraftMode ? 'font-mono text-sm' : ''}
            `}>
              {selectedUser.fullName}
            </h3>
            <p className={`
              text-sm text-base-content/70
              ${isMinecraftMode ? 'font-mono text-xs' : ''}
            `}>
              {onlineUsers.includes(selectedUser._id) ? "🟢 Online" : "⚫ Offline"}
            </p>
          </div>
        </div>

        {/* Desktop close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className={`
            hidden lg:flex
            ${isMinecraftMode ? 'pixel-btn border-2 border-error p-2' : 'btn btn-sm btn-ghost btn-circle'}
          `}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
