import { useState, useEffect } from "react";
import { useThemeStore } from "../store/useThemeStore";
import { BIOMES } from "../constants";
import { ChevronDown } from "lucide-react";

const BiomeSelector = () => {
  const { biome, setBiome, isMinecraftMode } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleBiomeChange = async (newBiome) => {
    if (newBiome === biome) {
      setIsOpen(false);
      return;
    }

    // No animations - immediate change
    setBiome(newBiome);

    setIsOpen(false);
  };

  if (!isMinecraftMode) return null;

  const currentBiome = BIOMES.find(b => b.id === biome) || BIOMES[0];

  return (
    <div className="relative biome-selector">
      <button
        className={`
          btn btn-ghost btn-sm flex items-center gap-2
          ${isMinecraftMode ? 'pixel-btn text-xs font-mono border-2 border-base-300' : ''}
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg">{currentBiome.icon}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[60]"
            onClick={() => setIsOpen(false)}
          />
          <div className={`
            absolute top-full right-0 mt-2 w-48 bg-base-100 shadow-xl border z-[70] max-h-[60vh] overflow-y-auto dropdown biome-selector-dropdown
            ${isMinecraftMode ? 'rounded-none border-4 border-base-300 pixel-border' : 'rounded-lg border-base-300'}
          `}>
            {BIOMES.map((biomeOption) => (
              <button
                key={biomeOption.id}
                className={`
                  w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-base-200
                  ${isMinecraftMode ? 'pixel-btn border-0 font-mono text-xs' : ''}
                  ${biome === biomeOption.id ? 'bg-primary/20 text-primary' : 'border-transparent'}
                  first:rounded-t-lg last:rounded-b-lg
                `}
                onClick={() => {
                  handleBiomeChange(biomeOption.id);
                }}
              >
                <span className="text-lg">{biomeOption.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-sm">{biomeOption.name}</div>
                  <div className="text-xs text-base-content/70">{biomeOption.description}</div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BiomeSelector;
