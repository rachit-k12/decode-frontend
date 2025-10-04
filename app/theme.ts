/**
 * Theme configuration and design tokens
 * All theme values should be consumed via CSS variables for proper dark mode support
 */

export const theme = {
  colors: {
    // Base colors using HSL format for easy manipulation
    light: {
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      card: "0 0% 100%",
      cardForeground: "240 10% 3.9%",
      popover: "0 0% 100%",
      popoverForeground: "240 10% 3.9%",
      primary: "240 5.9% 10%",
      primaryForeground: "0 0% 98%",
      secondary: "240 4.8% 95.9%",
      secondaryForeground: "240 5.9% 10%",
      muted: "240 4.8% 95.9%",
      mutedForeground: "240 3.8% 46.1%",
      accent: "240 4.8% 95.9%",
      accentForeground: "240 5.9% 10%",
      destructive: "0 84.2% 60.2%",
      destructiveForeground: "0 0% 98%",
      border: "240 5.9% 90%",
      input: "240 5.9% 90%",
      ring: "240 5.9% 10%",
    },
    dark: {
      background: "240 10% 3.9%",
      foreground: "0 0% 98%",
      card: "240 10% 3.9%",
      cardForeground: "0 0% 98%",
      popover: "240 10% 3.9%",
      popoverForeground: "0 0% 98%",
      primary: "0 0% 98%",
      primaryForeground: "240 5.9% 10%",
      secondary: "240 3.7% 15.9%",
      secondaryForeground: "0 0% 98%",
      muted: "240 3.7% 15.9%",
      mutedForeground: "240 5% 64.9%",
      accent: "240 3.7% 15.9%",
      accentForeground: "0 0% 98%",
      destructive: "0 62.8% 30.6%",
      destructiveForeground: "0 0% 98%",
      border: "240 3.7% 15.9%",
      input: "240 3.7% 15.9%",
      ring: "240 4.9% 83.9%",
    },
    semantic: {
      success: "142 76% 36%",
      warning: "38 92% 50%",
      error: "0 84.2% 60.2%",
      info: "217 91% 60%",
    },
  },
  typography: {
    fontFamily: {
      sans: ["FoundersGrotesk", "system-ui", "sans-serif"],
      heading: ["TWKEverett", "system-ui", "sans-serif"],
      mono: ["ui-monospace", "Menlo", "monospace"],
    },
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      // Note: Bold (700) is intentionally excluded
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
    letterSpacing: {
      tight: "-0.025em",
      normal: "0",
      wide: "0.025em",
    },
  },
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "3rem", // 48px
    "3xl": "4rem", // 64px
  },
  borderRadius: {
    sm: "0.375rem", // 6px
    md: "0.5rem", // 8px
    lg: "0.75rem", // 12px
    xl: "1rem", // 16px
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
  },
  animation: {
    duration: {
      fast: 150, // ms
      normal: 300, // ms
      slow: 500, // ms
    },
    easing: {
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
  breakpoints: {
    mobile: "0px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1280px",
  },
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modalBackdrop: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
  },
} as const;

export type Theme = typeof theme;

/**
 * Generate CSS variable declarations for the theme
 * This is used in the root layout to inject theme variables
 */
export function generateCSSVariables(mode: "light" | "dark" = "dark") {
  const colors = mode === "dark" ? theme.colors.dark : theme.colors.light;

  return Object.entries(colors)
    .map(([key, value]) => {
      const cssVarName = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      return `--${cssVarName}: ${value};`;
    })
    .join("\n    ");
}

/**
 * Semantic color mappings for common UI patterns
 */
export const semanticColors = {
  success: {
    background: "hsl(var(--success) / 0.1)",
    border: "hsl(var(--success) / 0.3)",
    text: "hsl(var(--success))",
  },
  warning: {
    background: "hsl(var(--warning) / 0.1)",
    border: "hsl(var(--warning) / 0.3)",
    text: "hsl(var(--warning))",
  },
  error: {
    background: "hsl(var(--error) / 0.1)",
    border: "hsl(var(--error) / 0.3)",
    text: "hsl(var(--error))",
  },
  info: {
    background: "hsl(var(--info) / 0.1)",
    border: "hsl(var(--info) / 0.3)",
    text: "hsl(var(--info))",
  },
} as const;
