import plugin from 'tailwindcss/plugin';

const BIOMES = {
  overworld: {
    "--color-bg": "#6db33f",        // Minecraft grass green
    "--color-surface": "#8fbc5a",    // Lighter grass
    "--color-text": "#2d5016",       // Dark green text
    "--color-text-secondary": "#3d6b1f",
    "--color-primary": "#56c0e0",   // Sky blue
    "--color-primary-hover": "#4a9dc4",
    "--color-secondary": "#8c6239",  // Oak wood brown
    "--color-accent": "#7fb547",     // Bright grass
    "--color-neutral": "#5a7a36",
    "--color-border": "#7fb547",
    "--color-input": "#ffffff",
    "--animation-primary": "grass-sway",
    "--particle-color": "#9ed65e",   // Light green particles
    "--glow-color": "#7fb547",
    "--block-texture": "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><rect width=\"16\" height=\"16\" fill=\"%236db33f\"/><rect x=\"0\" y=\"0\" width=\"8\" height=\"8\" fill=\"%237fb547\"/><rect x=\"8\" y=\"8\" width=\"8\" height=\"8\" fill=\"%237fb547\"/></svg>')"
  },
  nether: {
    "--color-bg": "#2d0f0f",        // Dark nether brick red
    "--color-surface": "#5c1e1e",    // Nether brick
    "--color-text": "#ffd6cc",       // Light orange text
    "--color-text-secondary": "#ffab94",
    "--color-primary": "#ff6600",   // Lava orange
    "--color-primary-hover": "#ff4400",
    "--color-secondary": "#800000",  // Dark red
    "--color-accent": "#ff9933",     // Bright lava
    "--color-neutral": "#4d1a1a",
    "--color-border": "#994d4d",
    "--color-input": "rgba(90, 30, 30, 0.9)",
    "--animation-primary": "lava-bubble",
    "--particle-color": "#ff6600",   // Lava ember color
    "--glow-color": "#ff9933",
    "--block-texture": "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><rect width=\"16\" height=\"16\" fill=\"%232d0f0f\"/><rect x=\"0\" y=\"0\" width=\"4\" height=\"4\" fill=\"%235c1e1e\"/><rect x=\"8\" y=\"0\" width=\"4\" height=\"4\" fill=\"%235c1e1e\"/><rect x=\"4\" y=\"4\" width=\"4\" height=\"4\" fill=\"%235c1e1e\"/><rect x=\"12\" y=\"4\" width=\"4\" height=\"4\" fill=\"%235c1e1e\"/><rect x=\"0\" y=\"8\" width=\"4\" height=\"4\" fill=\"%235c1e1e\"/><rect x=\"8\" y=\"8\" width=\"4\" height=\"4\" fill=\"%235c1e1e\"/><rect x=\"4\" y=\"12\" width=\"4\" height=\"4\" fill=\"%235c1e1e\"/><rect x=\"12\" y=\"12\" width=\"4\" height=\"4\" fill=\"%235c1e1e\"/></svg>')"
  },
  end: {
    "--color-bg": "#fffbf0",        // End stone pale yellow
    "--color-surface": "#f5f0da",    // Lighter end stone
    "--color-text": "#4a3c5c",       // Dark purple text
    "--color-text-secondary": "#6b5680",
    "--color-primary": "#b47edd",   // Chorus purple
    "--color-primary-hover": "#a066cc",
    "--color-secondary": "#2b2b2b",  // Obsidian black
    "--color-accent": "#d699ff",     // Light purple
    "--color-neutral": "#8a6ba3",
    "--color-border": "#c7a6ff",
    "--color-input": "rgba(255, 251, 240, 0.95)",
    "--animation-primary": "end-float",
    "--particle-color": "#b47edd",   // Purple void particles
    "--glow-color": "#d699ff",
    "--block-texture": "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><rect width=\"16\" height=\"16\" fill=\"%23fffbf0\"/><circle cx=\"4\" cy=\"4\" r=\"1\" fill=\"%23f5f0da\"/><circle cx=\"12\" cy=\"4\" r=\"1\" fill=\"%23f5f0da\"/><circle cx=\"8\" cy=\"8\" r=\"1\" fill=\"%23f5f0da\"/><circle cx=\"4\" cy=\"12\" r=\"1\" fill=\"%23f5f0da\"/><circle cx=\"12\" cy=\"12\" r=\"1\" fill=\"%23f5f0da\"/></svg>')"
  },
  cherry: {
    "--color-bg": "#e6f2e6",        // Soft grass background
    "--color-surface": "#f0d6e8",    // Pink-tinted surface
    "--color-text": "#2d4a2d",       // Dark green text
    "--color-text-secondary": "#4a3c4a",
    "--color-primary": "#ff69b4",   // Hot pink cherry
    "--color-primary-hover": "#ff1493",
    "--color-secondary": "#90ee90",  // Light green
    "--color-accent": "#ffb6c1",     // Light pink
    "--color-neutral": "#dda0dd",
    "--color-border": "#ffcce6",
    "--color-input": "rgba(255, 255, 255, 0.95)",
    "--animation-primary": "petal-fall",
    "--particle-color": "#ff69b4",   // Pink cherry petals
    "--glow-color": "#ffb6c1",
    "--block-texture": "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><rect width=\"16\" height=\"16\" fill=\"%23e6f2e6\"/><ellipse cx=\"4\" cy=\"3\" rx=\"2\" ry=\"1\" fill=\"%23ff69b4\" opacity=\"0.7\"/><ellipse cx=\"12\" cy=\"6\" rx=\"2\" ry=\"1\" fill=\"%23ff69b4\" opacity=\"0.7\"/><ellipse cx=\"6\" cy=\"10\" rx=\"2\" ry=\"1\" fill=\"%23ff69b4\" opacity=\"0.7\"/><ellipse cx=\"14\" cy=\"13\" rx=\"2\" ry=\"1\" fill=\"%23ff69b4\" opacity=\"0.7\"/></svg>')"
  },
  deepdark: {
    "--color-bg": "#0a0a0a",        // Deep dark black
    "--color-surface": "#1a1a1a",    // Sculk block dark
    "--color-text": "#40e0d0",       // Bright cyan text
    "--color-text-secondary": "#20b2aa",
    "--color-primary": "#006666",   // Dark teal
    "--color-primary-hover": "#008080",
    "--color-secondary": "#000033",  // Very dark blue
    "--color-accent": "#00cccc",     // Bright cyan
    "--color-neutral": "#003333",
    "--color-border": "#004d4d",
    "--color-input": "rgba(26, 26, 26, 0.9)",
    "--animation-primary": "sculk-pulse",
    "--particle-color": "#00cccc",   // Cyan sculk particles
    "--glow-color": "#40e0d0",
    "--block-texture": "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><rect width=\"16\" height=\"16\" fill=\"%230a0a0a\"/><path d=\"M2,2 Q4,1 6,2 Q8,3 10,2 Q12,1 14,2 Q14,4 13,6 Q14,8 13,10 Q14,12 13,14 Q11,14 10,13 Q8,14 6,13 Q4,14 2,13 Q2,11 3,10 Q2,8 3,6 Q2,4 2,2\" fill=\"%2300cccc\" opacity=\"0.3\"/></svg>')"
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
