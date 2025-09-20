module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure this includes your components folder
  ],
  theme: {
    extend: {
      colors: {
        // Modern Light Mode Palette
        light: {
          // Background Colors
          bg: {
            primary: "#FAFBFC",      // Main background - very light blue-gray
            secondary: "#F8FAFC",    // Secondary background
            tertiary: "#F1F5F9",     // Tertiary background
            card: "#FFFFFF",         // Card background
            cardHover: "#F8FAFC",    // Card hover state
            overlay: "rgba(248, 250, 252, 0.85)", // Background overlay
          },
          // Text Colors
          text: {
            primary: "#0F172A",      // Primary text - very dark blue-gray
            secondary: "#334155",    // Secondary text - medium blue-gray
            tertiary: "#64748B",     // Tertiary text - lighter blue-gray
            muted: "#94A3B8",        // Muted text - light blue-gray
            inverse: "#FFFFFF",      // Inverse text for dark backgrounds
          },
          // Border Colors
          border: {
            primary: "#E2E8F0",      // Primary borders - light blue-gray
            secondary: "#CBD5E1",    // Secondary borders - medium blue-gray
            accent: "#C7D2FE",       // Accent borders - light purple
            focus: "#8B5CF6",        // Focus borders - purple
          },
          // Accent Colors
          accent: {
            primary: "#8B5CF6",      // Primary accent - purple
            secondary: "#06B6D4",    // Secondary accent - cyan
            success: "#10B981",      // Success - emerald
            warning: "#F59E0B",      // Warning - amber
            error: "#EF4444",        // Error - red
            info: "#3B82F6",         // Info - blue
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
            primary: "#8B5CF6",      // Primary interactive
            primaryHover: "#7C3AED", // Primary hover
            secondary: "#F1F5F9",    // Secondary interactive
            secondaryHover: "#E2E8F0", // Secondary hover
            disabled: "#94A3B8",     // Disabled state
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
        "light-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "light-md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "light-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "light-xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "terminal-light": "0 8px 25px -5px rgba(139, 92, 246, 0.15), 0 4px 10px -3px rgba(139, 92, 246, 0.1)",
        "terminal-dark": "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
