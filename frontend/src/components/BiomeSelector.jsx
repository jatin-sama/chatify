import { useState, useEffect } from "react";
import { useThemeStore } from "../store/useThemeStore";
import { BIOMES } from "../constants";
import { ChevronDown } from "lucide-react";

const BiomeSelector = () => {
  const { biome, setBiome, isMinecraftMode } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  if (!isMinecraftMode) return null;

  const currentBiome = BIOMES.find(b => b.id === biome) || BIOMES[0];

  return (
    <div className="relative">
      <button
        className={`
          btn btn-ghost btn-sm flex items-center gap-2 biome-transition
          ${isMinecraftMode ? 'pixel-btn text-xs font-mono border-2 border-base-300' : ''}
          ${isTransitioning ? 'portal-transition' : ''}
        `}
        onClick={() => setIsOpen(!isOpen)}
        disabled={isTransitioning}
      >
        <span className="text-lg">{currentBiome.icon}</span>
        <span className="hidden sm:inline text-sm">{currentBiome.name}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className={`
            absolute top-full right-0 mt-2 w-48 bg-base-100 shadow-lg border z-20
            ${isMinecraftMode ? 'rounded-none border-4 border-base-300 pixel-border' : 'rounded-lg border-base-300'}
          `}>
            {BIOMES.map((biomeOption) => (
              <button
                key={biomeOption.id}
                className={`
                  w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-base-200
                  transition-all duration-200 pixel-btn border-0
                  ${biome === biomeOption.id ? 'bg-primary/20 text-primary border-2 border-primary' : 'border-2 border-transparent'}
                  ${isMinecraftMode ? 'font-mono text-xs' : ''}
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
