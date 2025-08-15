import { useThemeStore } from "../store/useThemeStore";

const ThemeDebug = () => {
  const { theme, biome, isMinecraftMode, setMinecraftMode, setTheme } = useThemeStore();

  const handleForceClassic = () => {
    // Force classic mode
    setMinecraftMode(false);
    // Force a theme refresh
    setTimeout(() => {
      setTheme("garden");
    }, 100);
  };

  const handleForceMinecraft = () => {
    setMinecraftMode(true);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-base-100 border border-base-300 rounded-lg p-3 text-xs space-y-2" style={{fontWeight: 'normal'}}>
      <div><strong>Debug Panel</strong></div>
      <div>Theme: {theme}</div>
      <div>Biome: {biome}</div>
      <div>Minecraft Mode: {isMinecraftMode ? "ON" : "OFF"}</div>
      <div>HTML class: {document.documentElement.className}</div>
      <div>HTML data-theme: {document.documentElement.getAttribute('data-theme') || 'none'}</div>
      <button 
        onClick={handleForceClassic}
        className="btn btn-xs btn-primary mr-1"
      >
        Force Classic
      </button>
      <button 
        onClick={handleForceMinecraft}
        className="btn btn-xs btn-secondary"
      >
        Force Minecraft
      </button>
    </div>
  );
};

export default ThemeDebug;
