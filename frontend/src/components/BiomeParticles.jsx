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
      animationDelay: Math.random() * 8,
      size: getParticleSize(biome),
      type: getParticleType(biome)
    }));

    setParticles(newParticles);
  }, [biome, isMinecraftMode]);

  const getParticleCount = (biomeName) => {
    switch (biomeName) {
      case "nether": return 15;
      case "end": return 12;
      case "cherry": return 20;
      case "overworld": return 8;
      case "deepdark": return 6;
      default: return 0;
    }
  };

  const getParticleSize = (biomeName) => {
    switch (biomeName) {
      case "cherry": return Math.random() * 6 + 4; // 4-10px petals
      case "end": return Math.random() * 3 + 2; // 2-5px particles
      case "nether": return Math.random() * 4 + 3; // 3-7px embers
      default: return Math.random() * 3 + 2; // 2-5px default
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
    };

    switch (particle.type) {
      case "petal":
        return {
          ...baseStyles,
          backgroundColor: "var(--particle-color)",
          borderRadius: "50% 0 50% 0",
          animation: "petal-fall 6s linear infinite",
        };
      case "void":
        return {
          ...baseStyles,
          backgroundColor: "var(--particle-color)",
          borderRadius: "50%",
          animation: "end-float 4s ease-in-out infinite",
          boxShadow: "0 0 4px var(--particle-color)",
        };
      case "ember":
        return {
          ...baseStyles,
          backgroundColor: "var(--particle-color)",
          borderRadius: "50%",
          animation: "lava-bubble 2s ease-in-out infinite",
          boxShadow: "0 0 6px var(--particle-color)",
        };
      case "sculk":
        return {
          ...baseStyles,
          backgroundColor: "var(--particle-color)",
          borderRadius: "50%",
          animation: "sculk-pulse 3s ease-in-out infinite",
          opacity: 0.7,
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: "var(--particle-color)",
          borderRadius: "50%",
          animation: "particle-float 8s linear infinite",
        };
    }
  };

  if (!isMinecraftMode || !biome || particles.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={getParticleStyles(particle)}
        />
      ))}
    </div>
  );
};

export default BiomeParticles;
