import { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";
import { Image, Send, Smile, Mic, MicOff } from "lucide-react";
import toast from "react-hot-toast";

const MinecraftMessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();
  const { biome } = useThemeStore();

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

  const minecraftEmojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣',
    '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '😘',
    '⚔️', '🏹', '🛡️', '🔥', '💎', '🗡️', '🪓', '⛏️',
    '🧱', '🟫', '🟩', '🟦', '🟪', '🟨', '🟧', '🟥',
    '🌱', '🌿', '🌳', '🍄', '🌸', '🌺', '🌻', '🌷'
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
      // Play Minecraft sound effect
      playMinecraftSound('message_send');
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    }
  };

  const playMinecraftSound = (type) => {
    // Create audio context for pixel-style sound effects
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      switch(type) {
        case 'message_send':
          oscillator.frequency.value = 800;
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
          break;
        case 'click':
          oscillator.frequency.value = 600;
          gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
          break;
      }

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      // Silently fail if audio context is not available
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    playMinecraftSound('click');
    // TODO: Implement voice recording functionality
    if (!isRecording) {
      toast.success("Voice recording started");
    } else {
      toast.success("Voice recording stopped");
    }
  };

  const addEmoji = (emoji) => {
    setText(text + emoji);
    setShowEmojis(false);
    playMinecraftSound('click');
  };

  return (
    <div className="minecraft-panel p-4 border-t-4 border-white/20 relative">
      {/* Background texture */}
      <div className={`absolute inset-0 ${getBiomeTexture()} opacity-5`} />
      
      <div className="relative z-10">
        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-3 relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-20 rounded border-2 border-white/30"
              style={{ imageRendering: 'pixelated' }}
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 minecraft-button bg-red-600 text-white p-1 scale-75"
            >
              ×
            </button>
          </div>
        )}

        <form onSubmit={handleSendMessage} className="flex gap-2">
          {/* File Input */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          {/* Image Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="minecraft-button p-3 inventory-slot"
            title="Attach image"
          >
            <Image size={12} />
          </button>

          {/* Voice Recording Button */}
          <button
            type="button"
            onClick={toggleRecording}
            className={`minecraft-button p-3 inventory-slot ${
              isRecording ? 'bg-red-600 border-red-800 text-white' : ''
            }`}
            title={isRecording ? "Stop recording" : "Start voice recording"}
          >
            {isRecording ? <MicOff size={12} /> : <Mic size={12} />}
          </button>

          {/* Message Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message..."
              className="minecraft-input w-full pr-16"
              maxLength={500}
            />
            
            {/* Character Counter */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="minecraft-font text-xs opacity-50">
                {text.length}/500
              </span>
            </div>
          </div>

          {/* Emoji Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowEmojis(!showEmojis);
                playMinecraftSound('click');
              }}
              className="minecraft-button p-3 inventory-slot"
              title="Add emoji"
            >
              <Smile size={12} />
            </button>

            {/* Emoji Picker */}
            {showEmojis && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowEmojis(false)}
                />
                <div className="absolute bottom-full right-0 mb-2 minecraft-panel border-2 border-white/30 p-2 z-20 max-w-64">
                  <div className="grid grid-cols-8 gap-1">
                    {minecraftEmojis.map((emoji, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => addEmoji(emoji)}
                        className="inventory-slot scale-75 hover:bg-white/20"
                        title={`Add ${emoji}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!text.trim() && !imagePreview}
            className={`minecraft-button p-3 inventory-slot ${
              (text.trim() || imagePreview) 
                ? 'bg-green-600 border-green-800 text-white hover:bg-green-700' 
                : 'opacity-50 cursor-not-allowed'
            }`}
            title="Send message"
          >
            <Send size={12} />
          </button>
        </form>

        {/* Typing Indicator */}
        <div className="mt-2 flex items-center justify-between">
          <div className="minecraft-font text-xs opacity-50">
            {text.length > 0 && (
              <span className="flex items-center gap-1">
                <div className="w-1 h-1 bg-current rounded-full animate-pulse" />
                Typing...
              </span>
            )}
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setText("/tp ")}
              className="minecraft-font text-xs opacity-70 hover:opacity-100 transition-opacity"
              title="Teleport command"
            >
              /tp
            </button>
            <button
              type="button"
              onClick={() => setText("/give ")}
              className="minecraft-font text-xs opacity-70 hover:opacity-100 transition-opacity"
              title="Give command"
            >
              /give
            </button>
            <button
              type="button"
              onClick={() => setText("/time set day")}
              className="minecraft-font text-xs opacity-70 hover:opacity-100 transition-opacity"
              title="Set time to day"
            >
              /day
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinecraftMessageInput;
