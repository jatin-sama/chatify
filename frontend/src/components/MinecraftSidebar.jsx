import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { Users, MessageSquare, Settings } from "lucide-react";

const MinecraftSidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { authUser, logout } = useAuthStore();
  const { biome } = useThemeStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const getMinecraftAvatar = (user) => {
    const defaultAvatars = [
      '/minecraft-avatars/steve.png',
      '/minecraft-avatars/alex.png',
      '/minecraft-avatars/zombie.png',
      '/minecraft-avatars/skeleton.png',
      '/minecraft-avatars/creeper.png',
      '/minecraft-avatars/enderman.png'
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

  const filteredUsers = users.filter(user => 
    user._id !== authUser._id &&
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isUsersLoading) {
    return (
      <div className="w-64 bg-base-200 border-r-4 border-base-300 flex flex-col">
        <div className="p-4">
          <div className="minecraft-panel p-4 animate-pulse">
            <div className="h-4 bg-base-300 rounded mb-2"></div>
            <div className="h-4 bg-base-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 flex flex-col relative minecraft-ui">
      {/* Background texture */}
      <div className={`absolute inset-0 ${getBiomeTexture()} opacity-5`} />
      
      <div className="minecraft-panel flex-1 border-r-4 border-white/20 relative z-10">
        {/* Header */}
        <div className="p-4 border-b-2 border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="minecraft-avatar scale-75">
              <img
                src={getMinecraftAvatar(authUser)}
                alt="Your avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/minecraft-avatars/steve.png';
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="minecraft-font text-xs truncate">
                {authUser.fullName}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <div className="online-indicator" />
                <span className="minecraft-font text-xs opacity-70">Online</span>
              </div>
            </div>
          </div>
          
          {/* Search */}
          <input
            type="text"
            placeholder="Find players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="minecraft-input w-full"
          />
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto minecraft-scrollbar">
          <div className="p-2">
            <div className="flex items-center gap-2 mb-3 px-2">
              <Users size={12} />
              <span className="minecraft-font text-xs">
                Players ({filteredUsers.length})
              </span>
            </div>
            
            <div className="space-y-1">
              {filteredUsers.map((user) => (
                <button
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`
                    w-full p-3 flex items-center gap-3 minecraft-button text-left
                    transition-all duration-200 relative group
                    ${selectedUser?._id === user._id ? 'bg-primary/20 border-primary' : ''}
                  `}
                >
                  <div className="minecraft-avatar scale-75 relative">
                    <img
                      src={getMinecraftAvatar(user)}
                      alt={`${user.fullName} avatar`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/minecraft-avatars/alex.png';
                      }}
                    />
                    
                    {/* Online status */}
                    <div className={`absolute -bottom-1 -right-1 ${
                      user.isOnline ? 'online-indicator' : 'offline-indicator'
                    }`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="minecraft-font text-xs truncate">
                      {user.fullName}
                    </div>
                    <div className="minecraft-font text-xs opacity-60 truncate">
                      {user.isOnline ? 'Online' : 'Away'}
                    </div>
                  </div>
                  
                  {/* Message count indicator */}
                  <div className="flex flex-col items-end">
                    <MessageSquare size={10} className="opacity-50" />
                    {user.unreadCount > 0 && (
                      <div className="inventory-slot scale-50 bg-red-500 text-white">
                        <span className="minecraft-font text-xs">
                          {user.unreadCount > 9 ? '9+' : user.unreadCount}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Hover glow effect */}
                  {selectedUser?._id === user._id && (
                    <div className="absolute inset-0 enchanted-glow pointer-events-none rounded" />
                  )}
                </button>
              ))}
            </div>
            
            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <div className="minecraft-font text-xs opacity-50">
                  {searchTerm ? 'No players found' : 'No players online'}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t-2 border-white/20">
          <div className="flex gap-2">
            <button className="minecraft-button flex-1 flex items-center justify-center gap-2">
              <Settings size={10} />
              <span className="minecraft-font text-xs">Settings</span>
            </button>
            
            <button 
              onClick={logout}
              className="minecraft-button bg-red-600 border-red-800 text-white hover:bg-red-700"
            >
              <span className="minecraft-font text-xs">Quit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinecraftSidebar;
