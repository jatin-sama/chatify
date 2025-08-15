import { useEffect, useState } from "react";
import { useThemeStore } from "../store/useThemeStore";

const BiomeParticles = () => {
  const { biome, isMinecraftMode } = useThemeStore();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!isMinecraftMode || !biome) {
      setParticles([]);
      return;
    }

    const particleCount = getParticleCount(biome);
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 12, // Longer delays for more variation
      size: getParticleSize(biome),
      type: getParticleType(biome),
      speed: Math.random() * 0.5 + 0.5 // Random speed multiplier
    }));

    setParticles(newParticles);
  }, [biome, isMinecraftMode]);

  const getParticleCount = (biomeName) => {
    switch (biomeName) {
      case "nether": return 18;      // More lava embers
      case "end": return 15;         // More void particles
      case "cherry": return 25;      // Lots of cherry petals
      case "overworld": return 12;   // More nature particles
      case "deepdark": return 8;     // Sculk particles
      default: return 0;
    }
  };

  const getParticleSize = (biomeName) => {
    switch (biomeName) {
      case "cherry": return Math.random() * 8 + 6;  // 6-14px petals
      case "end": return Math.random() * 4 + 3;     // 3-7px void particles
      case "nether": return Math.random() * 6 + 4;  // 4-10px embers
      case "deepdark": return Math.random() * 5 + 3; // 3-8px sculk
      default: return Math.random() * 4 + 3;        // 3-7px default
    }
  };

  const getParticleType = (biomeName) => {
    switch (biomeName) {
      case "cherry": return "petal";
      case "end": return "void";
      case "nether": return "ember";
      case "deepdark": return "sculk";
      default: return "default";
    }
  };

  const getParticleStyles = (particle) => {
    const baseStyles = {
      left: `${particle.left}%`,
      animationDelay: `${particle.animationDelay}s`,
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      position: 'absolute',
      pointerEvents: 'none'
    };

    switch (particle.type) {
      case "petal":
        return {
          ...baseStyles,
          backgroundColor: "var(--particle-color)",
          borderRadius: "50% 0 50% 0",
          animation: "cherry-petal-dance 8s linear infinite",
          boxShadow: "0 0 2px rgba(255,105,180,0.5)",
          transform: 'rotate(0deg)'
        };
      case "void":
        return {
          ...baseStyles,
          backgroundColor: "var(--particle-color)",
          borderRadius: "50%",
          animation: "end-void-float 12s linear infinite",
          boxShadow: "0 0 6px var(--particle-color)",
          opacity: 0.8
        };
      case "ember":
        return {
          ...baseStyles,
          backgroundColor: "var(--particle-color)",
          borderRadius: "50%",
          animation: "nether-ember-rise 6s linear infinite",
          boxShadow: "0 0 8px var(--particle-color), 0 0 4px rgba(255,102,0,0.8)",
          filter: 'brightness(1.2)'
        };
      case "sculk":
        return {
          ...baseStyles,
          backgroundColor: "var(--particle-color)",
          borderRadius: "50%",
          animation: "sculk-pulse-particle 10s linear infinite",
          boxShadow: "0 0 10px var(--particle-color), 0 0 5px rgba(64,224,208,0.6)",
          opacity: 0.9
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: "var(--particle-color)",
          borderRadius: "50%",
          animation: "overworld-particle-drift 15s linear infinite",
          boxShadow: "0 0 3px rgba(127,181,71,0.4)",
          opacity: 0.7
        };
    }
  };

  // Always return null - no particles/animations
  return null;
};

export default BiomeParticles;
