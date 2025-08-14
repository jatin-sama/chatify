import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import { useThemeStore } from "../store/useThemeStore";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import MinecraftChatHeader from "./MinecraftChatHeader";
import MinecraftMessageInput from "./MinecraftMessageInput";
import MinecraftSidebar from "./MinecraftSidebar";
import MessageSkeleton from "./skeletons/MessageSkeleton";

const MinecraftChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const { biome } = useThemeStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const getMinecraftAvatar = (user) => {
    // Default Minecraft character avatars
    const defaultAvatars = [
      '/minecraft-avatars/steve.png',
      '/minecraft-avatars/alex.png',
      '/minecraft-avatars/zombie.png',
      '/minecraft-avatars/skeleton.png',
      '/minecraft-avatars/creeper.png'
    ];
    
    // Use user ID to consistently assign avatar
    const avatarIndex = user?._id ? user._id.charCodeAt(0) % defaultAvatars.length : 0;
    return user?.profilePic || defaultAvatars[avatarIndex];
  };

  const getBiomeClass = () => {
    switch(biome) {
      case 'overworld': return 'overworld-chat-bubble';
      case 'nether': return 'nether-chat-bubble';
      case 'end': return 'end-chat-bubble';
      case 'cherry': return 'cherry-chat-bubble';
      case 'deepdark': return 'deepdark-chat-bubble';
      default: return 'overworld-chat-bubble';
    }
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

  if (isMessagesLoading) {
    return (
      <div className="flex h-screen minecraft-ui">
        <MinecraftSidebar />
        <div className="flex-1 flex flex-col">
          <MinecraftChatHeader />
          <div className="flex-1 p-4">
            <MessageSkeleton />
          </div>
          <MinecraftMessageInput />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen minecraft-ui">
      <MinecraftSidebar />
      
      <div className="flex-1 flex flex-col relative">
        {/* Biome background texture */}
        <div className={`absolute inset-0 ${getBiomeTexture()} opacity-10 pointer-events-none`} />
        
        <MinecraftChatHeader />
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3 minecraft-scrollbar relative z-10">
          {messages.map((message, index) => {
            const isOwn = message.senderId === authUser._id;
            const showAvatar = index === 0 || messages[index - 1].senderId !== message.senderId;
            
            return (
              <div
                key={message._id}
                className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}
                ref={index === messages.length - 1 ? messageEndRef : null}
              >
                {/* Avatar */}
                {showAvatar && (
                  <div className="flex-shrink-0">
                    <div className="minecraft-avatar relative group">
                      <img
                        src={getMinecraftAvatar(isOwn ? authUser : selectedUser)}
                        alt="avatar"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = isOwn ? '/minecraft-avatars/steve.png' : '/minecraft-avatars/alex.png';
                        }}
                      />
                      
                      {/* Online status indicator */}
                      <div className={`absolute -bottom-1 -right-1 ${
                        isOwn ? 'online-indicator' : 'online-indicator'
                      }`} />
                      
                      {/* Hover tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs minecraft-font opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        {isOwn ? authUser.fullName : selectedUser.fullName}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Message bubble */}
                <div className={`flex-1 max-w-xs md:max-w-md lg:max-w-lg ${isOwn ? 'text-right' : 'text-left'}`}>
                  {showAvatar && (
                    <div className="minecraft-font text-xs mb-1 opacity-70">
                      <span>{isOwn ? authUser.fullName : selectedUser.fullName}</span>
                      <span className="ml-2">{formatMessageTime(message.createdAt)}</span>
                    </div>
                  )}
                  
                  <div className={`minecraft-chat-bubble ${getBiomeClass()} ${
                    isOwn ? 'ml-auto' : 'mr-auto'
                  } relative group`}>
                    {/* Message content */}
                    {message.image && (
                      <div className="mb-2">
                        <img
                          src={message.image}
                          alt="Attachment"
                          className="max-w-full h-auto rounded border-2 border-white/30"
                          style={{ imageRendering: 'pixelated' }}
                        />
                      </div>
                    )}
                    
                    {message.text && (
                      <div className="minecraft-font">{message.text}</div>
                    )}
                    
                    {/* Enchanted glow effect for special messages */}
                    {message.text?.includes('!') && (
                      <div className="absolute inset-0 enchanted-glow pointer-events-none rounded" />
                    )}
                  </div>
                </div>
                
                {/* Spacer for alignment */}
                {!showAvatar && <div className="w-11 flex-shrink-0" />}
              </div>
            );
          })}
          
          {/* Empty state */}
          {messages.length === 0 && selectedUser && (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="minecraft-avatar mb-4 scale-150">
                <img
                  src={getMinecraftAvatar(selectedUser)}
                  alt="avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/minecraft-avatars/alex.png';
                  }}
                />
              </div>
              <h3 className="minecraft-font-lg mb-2">Welcome to the chat!</h3>
              <p className="minecraft-font text-xs opacity-70">
                Start your conversation with {selectedUser.fullName}
              </p>
            </div>
          )}
        </div>
        
        <MinecraftMessageInput />
      </div>
    </div>
  );
};

export default MinecraftChatContainer;
