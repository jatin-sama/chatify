import plugin from 'tailwindcss/plugin';

const BIOMES = {
  overworld: {
    "--color-bg": "#9bdd9b",
    "--color-surface": "#c4e8c4", 
    "--color-text": "#1a1a1a",
    "--color-text-secondary": "#2d4a2d",
    "--color-primary": "#4fa3f7",
    "--color-primary-hover": "#3d8fe6",
    "--color-secondary": "#d4a15f",
    "--color-accent": "#7bc77b",
    "--color-neutral": "#5a8c5a",
    "--color-border": "#8cc88c",
    "--color-input": "#ffffff",
    "--animation-primary": "grass-sway",
    "--particle-color": "#a8d8a8",
    "--glow-color": "#7bc77b"
  },
  nether: {
    "--color-bg": "#3f0f0f",
    "--color-surface": "#5c1a1a",
    "--color-text": "#ffe5d4",
    "--color-text-secondary": "#ffb899",
    "--color-primary": "#ff4d00",
    "--color-primary-hover": "#e63d00",
    "--color-secondary": "#8b0000",
    "--color-accent": "#ff6b1a",
    "--color-neutral": "#662020",
    "--color-border": "#994d4d",
    "--color-input": "#4a1515",
    "--animation-primary": "lava-bubble",
    "--particle-color": "#ff4d00",
    "--glow-color": "#ff6b1a"
  },
  end: {
    "--color-bg": "#e9e5c9",
    "--color-surface": "#f0ecd6",
    "--color-text": "#3f2a56",
    "--color-text-secondary": "#5d4173",
    "--color-primary": "#a56eff",
    "--color-primary-hover": "#9455f0",
    "--color-secondary": "#5d3a85",
    "--color-accent": "#b47aff",
    "--color-neutral": "#7a5ba3",
    "--color-border": "#c7a6ff",
    "--color-input": "#f7f4e6",
    "--animation-primary": "end-float",
    "--particle-color": "#a56eff",
    "--glow-color": "#b47aff"
  },
  cherry: {
    "--color-bg": "#f7d4e8",
    "--color-surface": "#fae0ed",
    "--color-text": "#3b2f2f",
    "--color-text-secondary": "#5c4a4a",
    "--color-primary": "#ff8ac8",
    "--color-primary-hover": "#ff6bb8",
    "--color-secondary": "#b4e68c",
    "--color-accent": "#ffb3d9",
    "--color-neutral": "#d69ec7",
    "--color-border": "#ffcce6",
    "--color-input": "#ffffff",
    "--animation-primary": "petal-fall",
    "--particle-color": "#ff8ac8",
    "--glow-color": "#ffb3d9"
  },
  deepdark: {
    "--color-bg": "#0b1013",
    "--color-surface": "#151c20",
    "--color-text": "#c5f6fa",
    "--color-text-secondary": "#91d4d9",
    "--color-primary": "#064663",
    "--color-primary-hover": "#0a5577",
    "--color-secondary": "#091f2c",
    "--color-accent": "#1a6b8a",
    "--color-neutral": "#1a3642",
    "--color-border": "#2a4f5c",
    "--color-input": "#1a2830",
    "--animation-primary": "sculk-pulse",
    "--particle-color": "#064663",
    "--glow-color": "#1a6b8a"
  }
};

const biomeThemes = plugin(function({ addBase, addUtilities }) {
  // Create CSS variables for each biome
  const biomeClasses = {};
  
  Object.entries(BIOMES).forEach(([biomeName, colors]) => {
    biomeClasses[`.biome-${biomeName}`] = {
      ...colors,
      // Map to DaisyUI compatible variables
      "--p": colors["--color-primary"],
      "--pf": colors["--color-primary-hover"],
      "--pc": colors["--color-text"],
      "--s": colors["--color-secondary"],
      "--sf": colors["--color-secondary"],
      "--sc": colors["--color-text"],
      "--a": colors["--color-accent"],
      "--af": colors["--color-accent"],
      "--ac": colors["--color-text"],
      "--n": colors["--color-neutral"],
      "--nf": colors["--color-neutral"],
      "--nc": colors["--color-text"],
      "--b1": colors["--color-bg"],
      "--b2": colors["--color-surface"],
      "--b3": colors["--color-border"],
      "--bc": colors["--color-text"],
      "--in": colors["--color-primary"],
      "--inc": colors["--color-text"],
      "--su": colors["--color-accent"],
      "--suc": colors["--color-text"],
      "--wa": "#f59e0b",
      "--wac": colors["--color-text"],
      "--er": "#ef4444",
      "--erc": colors["--color-text"]
    };
  });

  addBase(biomeClasses);

  // Add keyframe animations
  addBase({
    '@keyframes grass-sway': {
      '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
      '25%': { transform: 'translateX(1px) rotate(0.5deg)' },
      '75%': { transform: 'translateX(-1px) rotate(-0.5deg)' }
    },
    '@keyframes lava-bubble': {
      '0%, 100%': { transform: 'scale(1) translateY(0)' },
      '50%': { transform: 'scale(1.1) translateY(-2px)' }
    },
    '@keyframes end-float': {
      '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
      '33%': { transform: 'translateY(-3px) rotate(1deg)' },
      '66%': { transform: 'translateY(3px) rotate(-1deg)' }
    },
    '@keyframes petal-fall': {
      '0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: '0' },
      '50%': { transform: 'translateY(0) rotate(180deg)', opacity: '1' },
      '100%': { transform: 'translateY(10px) rotate(360deg)', opacity: '0' }
    },
    '@keyframes sculk-pulse': {
      '0%, 100%': { boxShadow: '0 0 0 0 var(--glow-color)', opacity: '1' },
      '50%': { boxShadow: '0 0 0 8px transparent', opacity: '0.8' }
    },
    '@keyframes particle-float': {
      '0%': { transform: 'translateY(100vh) translateX(0)', opacity: '0' },
      '10%': { opacity: '1' },
      '90%': { opacity: '1' },
      '100%': { transform: 'translateY(-10px) translateX(20px)', opacity: '0' }
    }
  });

  // Add utility classes for biome effects
  addUtilities({
    '.biome-animated': {
      animation: 'var(--animation-primary) 3s ease-in-out infinite'
    },
    '.biome-particle': {
      position: 'absolute',
      width: '4px',
      height: '4px',
      backgroundColor: 'var(--particle-color)',
      borderRadius: '50%',
      animation: 'particle-float 8s linear infinite',
      pointerEvents: 'none'
    },
    '.biome-glow': {
      boxShadow: '0 0 20px var(--glow-color)',
      transition: 'box-shadow 0.3s ease'
    },
    '.biome-glow:hover': {
      boxShadow: '0 0 30px var(--glow-color)'
    },
    '.biome-border': {
      border: '2px solid var(--color-border)',
      borderRadius: '8px'
    },
    '.biome-transition': {
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
    }
  });
});

export default biomeThemes;
