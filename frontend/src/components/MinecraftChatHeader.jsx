import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";
import { X, MoreVertical, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import BiomeSelector from "./BiomeSelector";

const MinecraftChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { biome } = useThemeStore();
  const [isMuted, setIsMuted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const getMinecraftAvatar = (user) => {
    const defaultAvatars = [
      '/minecraft-avatars/steve.png',
      '/minecraft-avatars/alex.png',
      '/minecraft-avatars/zombie.png',
      '/minecraft-avatars/skeleton.png',
      '/minecraft-avatars/creeper.png'
    ];
    
    const avatarIndex = user?._id ? user._id.charCodeAt(0) % defaultAvatars.length : 0;
    return user?.profilePic || defaultAvatars[avatarIndex];
  };

  const getBiomeTexture = () => {
    switch(biome) {
      case 'overworld': return 'grass-block-texture';
      case 'nether': return 'nether-brick-texture';
      case 'end': return 'end-stone-texture';
      case 'cherry': return 'wood-block-texture';
      case 'deepdark': return 'stone-block-texture';
      default: return 'grass-block-texture';
    }
  };

  const getBiomeTitle = () => {
    switch(biome) {
      case 'overworld': return '🌱 Overworld Chat';
      case 'nether': return '🔥 Nether Portal';
      case 'end': return '⭐ End Dimension';
      case 'cherry': return '🌸 Cherry Grove';
      case 'deepdark': return '🕳️ Deep Dark';
      default: return '💬 Chat';
    }
  };

  if (!selectedUser) {
    return (
      <div className="minecraft-panel p-4 border-b-4 border-white/20 relative">
        <div className={`absolute inset-0 ${getBiomeTexture()} opacity-5`} />
        <div className="relative z-10">
          <div className="minecraft-font-lg text-center">
            {getBiomeTitle()}
          </div>
          <div className="minecraft-font text-xs text-center opacity-70 mt-2">
            Select a player to start chatting
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="minecraft-panel p-4 border-b-4 border-white/20 relative">
      {/* Background texture */}
      <div className={`absolute inset-0 ${getBiomeTexture()} opacity-5`} />
      
      <div className="flex items-center justify-between relative z-10">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="minecraft-avatar relative">
            <img
              src={getMinecraftAvatar(selectedUser)}
              alt={`${selectedUser.fullName} avatar`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/minecraft-avatars/alex.png';
              }}
            />
            
            {/* Online status with animation */}
            <div className={`absolute -bottom-1 -right-1 ${
              selectedUser.isOnline ? 'online-indicator' : 'offline-indicator'
            }`} />
          </div>
          
          <div className="flex-1">
            <div className="minecraft-font">
              {selectedUser.fullName}
            </div>
            <div className="minecraft-font text-xs opacity-70 flex items-center gap-2">
              <span>{selectedUser.isOnline ? 'Online' : 'Last seen recently'}</span>
              {selectedUser.isOnline && (
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                  <span>Active now</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Biome Selector */}
          <BiomeSelector />
          
          {/* Sound Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="minecraft-button p-2"
            title={isMuted ? "Unmute sounds" : "Mute sounds"}
          >
            {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
          </button>

          {/* Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="minecraft-button p-2"
            >
              <MoreVertical size={12} />
            </button>

            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute top-full right-0 mt-2 minecraft-panel border-2 border-white/30 z-20 min-w-48">
                  <button className="w-full p-3 minecraft-button text-left minecraft-font text-xs hover:bg-white/10">
                    View Profile
                  </button>
                  <button className="w-full p-3 minecraft-button text-left minecraft-font text-xs hover:bg-white/10">
                    Clear History
                  </button>
                  <button className="w-full p-3 minecraft-button text-left minecraft-font text-xs hover:bg-white/10">
                    Block User
                  </button>
                  <div className="border-t-2 border-white/20 my-1" />
                  <button className="w-full p-3 minecraft-button text-left minecraft-font text-xs hover:bg-red-500/20 text-red-400">
                    Report User
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Close Chat */}
          <button
            onClick={() => setSelectedUser(null)}
            className="minecraft-button p-2 bg-red-600 border-red-800 text-white hover:bg-red-700"
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {/* Connection Status Bar */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="minecraft-font text-xs opacity-70">
            Connected to {getBiomeTitle()}
          </span>
        </div>
        
        {/* Ping indicator */}
        <div className="flex items-center gap-1">
          <div className="health-bar">
            <div className="health-heart" />
            <div className="health-heart" />
            <div className="health-heart" />
            <div className="health-heart" />
            <div className="health-heart empty" />
          </div>
          <span className="minecraft-font text-xs opacity-50 ml-2">85ms</span>
        </div>
      </div>
    </div>
  );
};

export default MinecraftChatHeader;
