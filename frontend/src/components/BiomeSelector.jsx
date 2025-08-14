import { useState } from "react";
import { useThemeStore } from "../store/useThemeStore";
import { BIOMES } from "../constants";
import { ChevronDown } from "lucide-react";

const BiomeSelector = () => {
  const { biome, setBiome, isMinecraftMode } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);

  if (!isMinecraftMode) return null;

  const currentBiome = BIOMES.find(b => b.id === biome) || BIOMES[0];

  return (
    <div className="relative">
      <button
        className="btn btn-ghost btn-sm flex items-center gap-2 biome-transition"
        onClick={() => setIsOpen(!isOpen)}
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
          <div className="absolute top-full right-0 mt-2 w-48 bg-base-100 rounded-lg shadow-lg border border-base-300 z-20">
            {BIOMES.map((biomeOption) => (
              <button
                key={biomeOption.id}
                className={`
                  w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-base-200 first:rounded-t-lg last:rounded-b-lg
                  ${biome === biomeOption.id ? 'bg-primary/10 text-primary' : ''}
                `}
                onClick={() => {
                  setBiome(biomeOption.id);
                  setIsOpen(false);
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
