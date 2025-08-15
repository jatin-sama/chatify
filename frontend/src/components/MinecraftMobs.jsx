import { useThemeStore } from "../store/useThemeStore";

const MinecraftMobs = () => {
  const { isMinecraftMode } = useThemeStore();

  if (!isMinecraftMode) return null;

  return (
    <div className="flex justify-center items-center gap-4 mb-6">
      {/* Creeper */}
      <div className="minecraft-mob creeper">
        <div className="mob-grid">
          {/* Creeper face pattern */}
          <div className="creeper-face">
            <div className="creeper-eyes">
              <div className="eye left-eye"></div>
              <div className="eye right-eye"></div>
            </div>
            <div className="creeper-mouth"></div>
          </div>
        </div>
      </div>

      {/* Skeleton */}
      <div className="minecraft-mob skeleton">
        <div className="mob-grid">
          {/* Skeleton face pattern */}
          <div className="skeleton-face">
            <div className="skeleton-eyes">
              <div className="eye-socket left-socket"></div>
              <div className="eye-socket right-socket"></div>
            </div>
            <div className="skeleton-nose"></div>
          </div>
        </div>
      </div>

      {/* Zombie */}
      <div className="minecraft-mob zombie">
        <div className="mob-grid">
          {/* Zombie face pattern */}
          <div className="zombie-face">
            <div className="zombie-eyes">
              <div className="zombie-eye left-zombie-eye"></div>
              <div className="zombie-eye right-zombie-eye"></div>
            </div>
            <div className="zombie-mouth"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinecraftMobs;
