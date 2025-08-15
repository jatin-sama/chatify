import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const { isMinecraftMode } = useThemeStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-16 sm:pt-20 px-2 sm:px-4">
        <div className={`
          bg-base-100 shadow-xl w-full max-w-6xl h-[calc(100vh-4rem)] sm:h-[calc(100vh-8rem)]
          ${isMinecraftMode ? 'rounded-none border-4 border-base-300 pixel-border' : 'rounded-lg'}
        `}>
          <div className={`
            flex h-full overflow-hidden
            ${isMinecraftMode ? 'rounded-none' : 'rounded-lg'}
          `}>
            {/* Responsive sidebar - hidden on mobile when chat is selected */}
            <div className={`
              ${selectedUser ? 'hidden lg:flex' : 'flex'}
              ${isMinecraftMode ? 'border-r-4 border-base-300' : ''}
            `}>
              <Sidebar />
            </div>

            {/* Chat area - full width on mobile */}
            <div className={`
              flex-1
              ${!selectedUser ? 'hidden lg:flex' : 'flex'}
            `}>
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
