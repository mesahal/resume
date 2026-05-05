module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure this includes your components folder
  ],
  theme: {
    extend: {
      colors: {
        // Sophisticated Light Mode Palette
        light: {
          // Background Colors
          bg: {
            primary: "#FEFEFE",      // Main background - pure white with warmth
            secondary: "#F8FAFC",    // Secondary background - very light blue-gray
            tertiary: "#F1F5F9",     // Tertiary background - light blue-gray
            card: "#FFFFFF",         // Card background - pure white
            cardHover: "#F8FAFC",    // Card hover state
            overlay: "rgba(255, 255, 255, 0.60)", // Background overlay - more transparent
          },
          // Text Colors
          text: {
            primary: "#0F172A",      // Primary text - deep navy
            secondary: "#1E293B",    // Secondary text - dark slate blue
            tertiary: "#475569",     // Tertiary text - medium slate blue
            muted: "#64748B",        // Muted text - light slate blue
            accent: "#7C3AED",       // Accent text - rich purple
            inverse: "#FFFFFF",      // Inverse text for dark backgrounds
          },
          // Border Colors
          border: {
            primary: "#CBD5E1",      // Primary borders - medium blue-gray
            secondary: "#B0BCCC",    // Secondary borders - darker blue-gray
            accent: "#C4B5FD",       // Accent borders - light purple
            focus: "#7C3AED",        // Focus borders - purple
          },
          // Accent Colors
          accent: {
            primary: "#7C3AED",      // Primary accent - rich purple
            secondary: "#0EA5E9",    // Secondary accent - sky blue
            success: "#059669",      // Success - emerald green
            warning: "#D97706",      // Warning - amber orange
            error: "#DC2626",        // Error - red
            info: "#2563EB",         // Info - blue
          },
          // Surface Colors
          surface: {
            primary: "#FFFFFF",      // Primary surface
            secondary: "#F8FAFC",    // Secondary surface
            tertiary: "#F1F5F9",     // Tertiary surface
            elevated: "#FFFFFF",     // Elevated surface (modals, dropdowns)
          },
          // Interactive Colors
          interactive: {
            primary: "#7C3AED",      // Primary interactive
            primaryHover: "#6D28D9", // Primary hover
            secondary: "#F1F5F9",    // Secondary interactive
            secondaryHover: "#E2E8F0", // Secondary hover
            disabled: "#94A3B8",     // Disabled state
          },
          // Gradient Colors
          gradient: {
            primary: "from-purple-600 via-purple-500 to-purple-700",
            secondary: "from-blue-500 via-sky-500 to-cyan-500",
            accent: "from-emerald-500 via-teal-500 to-cyan-500",
            warm: "from-orange-500 via-red-500 to-pink-500",
          }
        },
        // Legacy colors for backward compatibility
        tealBlue: "#00796B",
        tealBlueHover: "#00574B",
        primaryButton: "#4CAF50",
        primaryButtonHover: "#388E3C",
        secondaryButton: "#FF7043",
        secondaryButtonHover: "#D84315",
        background: "#FFFFFF",
        backgroundHover: "#F5F5F5",
        cardBackground: "#81D4FA",
        cardBackgroundHover: "#4FC3F7",
        borderGray: "#BDBDBD",
        borderGrayHover: "#9E9E9E",
        primaryText: "#303F9F",
        primaryTextHover: "#1A237E",
        secondaryText: "#BDBDBD",
        secondaryTextHover: "#9E9E9E",
        successMessage: "#155724",
        successMessageBackground: "#d4edda",
        errorMessage: "#721c24",
        errorMessageBackground: "#f8d7da",
      },
      boxShadow: {
        "custom-light": "0 4px 6px rgba(0, 0, 0, 0.1)",
        "custom-dark": "0 10px 15px rgba(0, 0, 0, 0.3)",
        // New sophisticated shadow system
        "light-sm": "0 2px 6px 0 rgba(0, 0, 0, 0.10), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "light-md": "0 6px 12px -2px rgba(0, 0, 0, 0.12), 0 3px 6px -1px rgba(0, 0, 0, 0.07)",
        "light-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "light-xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        // Purple-tinted shadows for brand elements
        "purple-sm": "0 2px 4px 0 rgba(124, 58, 237, 0.1), 0 1px 2px 0 rgba(124, 58, 237, 0.06)",
        "purple-md": "0 4px 8px 0 rgba(124, 58, 237, 0.12), 0 2px 4px 0 rgba(124, 58, 237, 0.08)",
        "purple-lg": "0 8px 16px 0 rgba(124, 58, 237, 0.15), 0 4px 8px 0 rgba(124, 58, 237, 0.1)",
        "purple-xl": "0 12px 24px 0 rgba(124, 58, 237, 0.2), 0 6px 12px 0 rgba(124, 58, 237, 0.15)",
        // Terminal shadows
        "terminal-light": "0 8px 25px -5px rgba(124, 58, 237, 0.25), 0 4px 10px -3px rgba(124, 58, 237, 0.1)",
        "terminal-dark": "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
        // Card shadows
        "card-light": "0 4px 12px 0 rgba(0, 0, 0, 0.10), 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        "card-hover": "0 8px 24px -4px rgba(0, 0, 0, 0.14), 0 4px 8px -2px rgba(124, 58, 237, 0.10)",
      },
    },
  },
  plugins: [],
};
