import { create } from "zustand";

const BIOME_THEMES = ["overworld", "nether", "end", "cherry", "deepdark"];

export const useThemeStore = create((set, get) => ({
  theme: localStorage.getItem("chat-theme") || "coffee",
  biome: localStorage.getItem("chat-biome") || "overworld",
  isMinecraftMode: localStorage.getItem("minecraft-mode") === "true", // Default to false

  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    // Only apply theme if not in Minecraft mode
    if (!get().isMinecraftMode) {
      document.documentElement.setAttribute("data-theme", theme);
    }
    set({ theme });
  },

  setBiome: (biome) => {
    localStorage.setItem("chat-biome", biome);
    // Only apply biome if in Minecraft mode
    if (get().isMinecraftMode) {
      // Remove any existing biome classes
      BIOME_THEMES.forEach(b => {
        document.documentElement.classList.remove(`biome-${b}`);
      });
      // Remove theme attribute in Minecraft mode
      document.documentElement.removeAttribute("data-theme");
      // Add new biome class
      if (biome) {
        document.documentElement.classList.add(`biome-${biome}`);
      }
    }
    set({ biome });
  },

  setMinecraftMode: (enabled) => {
    localStorage.setItem("minecraft-mode", enabled.toString());

    // Always clean slate first
    document.documentElement.classList.remove('minecraft-ui');
    BIOME_THEMES.forEach(b => {
      document.documentElement.classList.remove(`biome-${b}`);
    });
    document.documentElement.removeAttribute("data-theme");

    if (enabled) {
      const currentBiome = get().biome || "overworld";
      document.documentElement.classList.add('minecraft-ui');
      document.documentElement.classList.add(`biome-${currentBiome}`);
    } else {
      // Restore regular theme
      document.documentElement.setAttribute("data-theme", get().theme);
    }
    set({ isMinecraftMode: enabled });
  },

  // Initialize theme on app load
  initializeTheme: () => {
    const { theme, biome, isMinecraftMode } = get();

    // Clean slate - remove all possible conflicting classes and attributes
    document.documentElement.classList.remove('minecraft-ui');
    BIOME_THEMES.forEach(b => {
      document.documentElement.classList.remove(`biome-${b}`);
    });
    document.documentElement.removeAttribute("data-theme");

    if (isMinecraftMode) {
      document.documentElement.classList.add('minecraft-ui');
      if (biome) {
        document.documentElement.classList.add(`biome-${biome}`);
      }
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }
}));
