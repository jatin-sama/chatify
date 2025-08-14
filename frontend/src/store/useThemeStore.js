import { create } from "zustand";

const BIOME_THEMES = ["overworld", "nether", "end", "cherry", "deepdark"];

export const useThemeStore = create((set, get) => ({
  theme: localStorage.getItem("chat-theme") || "coffee",
  biome: localStorage.getItem("chat-biome") || null,
  isMinecraftMode: localStorage.getItem("minecraft-mode") === "true",

  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    set({ theme });
  },

  setBiome: (biome) => {
    localStorage.setItem("chat-biome", biome);
    // Remove any existing biome classes
    BIOME_THEMES.forEach(b => {
      document.documentElement.classList.remove(`biome-${b}`);
    });
    // Add new biome class
    if (biome) {
      document.documentElement.classList.add(`biome-${biome}`);
    }
    set({ biome });
  },

  setMinecraftMode: (enabled) => {
    localStorage.setItem("minecraft-mode", enabled.toString());
    if (enabled) {
      const currentBiome = get().biome || "overworld";
      get().setBiome(currentBiome);
    } else {
      // Remove all biome classes
      BIOME_THEMES.forEach(b => {
        document.documentElement.classList.remove(`biome-${b}`);
      });
      // Restore regular theme
      document.documentElement.setAttribute("data-theme", get().theme);
    }
    set({ isMinecraftMode: enabled });
  },

  // Initialize theme on app load
  initializeTheme: () => {
    const { theme, biome, isMinecraftMode } = get();
    if (isMinecraftMode && biome) {
      document.documentElement.classList.add(`biome-${biome}`);
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }
}));
