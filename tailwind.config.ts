import type { Config } from "tailwindcss";

const config = {
  darkMode: "media", // Disable dark mode
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    extend: {
      fontSize: {
        xs: "1rem", // 14px
        sm: "0.875rem", // 15px
        base: "1rem", // 17px
        md: "1.125rem", // 18px
        lg: "1.3125rem", // 21px
        xl: "1.625rem", // 26px
      },
      fontFamily: {
        grotesk: ["FoundersGrotesk", "Inter", "system-ui", "sans-serif"],
        twk: ["TWKEverett", "Inter", "system-ui", "sans-serif"],
        heading: ["TWKEverett", "Inter", "system-ui", "sans-serif"],
        sans: ["FoundersGrotesk", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        heading: "var(--heading)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        error: "hsl(var(--error))",
        info: "hsl(var(--info))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      lineHeight: {
        heading: "1.3",
      },
      keyframes: {
        // Accordion animations (existing)
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },

        // Fade animations
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-left": {
          from: { opacity: "0", transform: "translateX(-10px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-right": {
          from: { opacity: "0", transform: "translateX(10px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },

        // Scale animations
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "scale-out": {
          from: { opacity: "1", transform: "scale(1)" },
          to: { opacity: "0", transform: "scale(0.95)" },
        },
        "scale-bounce": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },

        // Slide animations
        "slide-in-up": {
          from: { opacity: "0", transform: "translateY(100%)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-down": {
          from: { opacity: "0", transform: "translateY(-100%)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-100%)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(100%)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-out-up": {
          from: { opacity: "1", transform: "translateY(0)" },
          to: { opacity: "0", transform: "translateY(-100%)" },
        },
        "slide-out-down": {
          from: { opacity: "1", transform: "translateY(0)" },
          to: { opacity: "0", transform: "translateY(100%)" },
        },
        "slide-out-left": {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(-100%)" },
        },
        "slide-out-right": {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(100%)" },
        },

        // Loading animations
        typing: {
          "0%, 100%": { transform: "scale(0.6)", opacity: "0.6" },
          "50%": { transform: "scale(1)", opacity: "1" },
        },
        dots: {
          "0%, 20%": { color: "transparent" },
          "50%": { color: "currentColor" },
          "100%": { color: "transparent" },
        },
        skeleton: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },

        // Special effects
        aurora: {
          from: { backgroundPosition: "50% 50%, 50% 50%" },
          to: { backgroundPosition: "350% 50%, 350% 50%" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(56, 189, 248, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(56, 189, 248, 0.6)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },

        // Gradient animations
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "gradient-y": {
          "0%, 100%": { backgroundPosition: "50% 0%" },
          "50%": { backgroundPosition: "50% 100%" },
        },
        "gradient-xy": {
          "0%, 100%": { backgroundPosition: "0% 0%" },
          "25%": { backgroundPosition: "100% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
          "75%": { backgroundPosition: "0% 100%" },
        },

        // Magic UI animations
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        "border-beam": {
          "100%": { "offset-distance": "100%" },
        },
        shine: {
          "0%": { "background-position": "0% 0%" },
          "50%": { "background-position": "100% 100%" },
          "100%": { "background-position": "0% 0%" },
        },
        "spin-around": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        slide: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        ripple: {
          "0%, 100%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(0.9)",
          },
        },
      },
      animation: {
        // Accordion animations (existing)
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",

        // Fade animations
        "fade-in": "fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-out": "fade-out 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in-up": "fade-in-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in-down": "fade-in-down 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in-left": "fade-in-left 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in-right": "fade-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1)",

        // Scale animations
        "scale-in": "scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-out": "scale-out 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-bounce": "scale-bounce 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6)",

        // Slide animations
        "slide-in-up": "slide-in-up 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in-down": "slide-in-down 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in-left": "slide-in-left 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in-right": "slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-out-up": "slide-out-up 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-out-down": "slide-out-down 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-out-left": "slide-out-left 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-out-right": "slide-out-right 0.2s cubic-bezier(0.16, 1, 0.3, 1)",

        // Loading animations
        typing: "typing 1.4s infinite both",
        dots: "dots 1.5s infinite linear",
        skeleton: "skeleton 2s ease-in-out infinite",

        // Special effects
        aurora: "aurora 60s ease infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        shake: "shake 0.5s ease-in-out",
        wiggle: "wiggle 1s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",

        // Gradient animations
        "gradient-x": "gradient-x 3s ease infinite",
        "gradient-y": "gradient-y 3s ease infinite",
        "gradient-xy": "gradient-xy 4s ease infinite",

        // Enhanced standard animations
        spin: "spin 1s linear infinite",
        ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bounce: "bounce 1s infinite",

        // Magic UI animations
        marquee: "marquee var(--duration, 40s) linear infinite",
        "marquee-vertical":
          "marquee-vertical var(--duration, 40s) linear infinite",
        "border-beam": "border-beam calc(var(--duration) * 1s) infinite linear",
        shine: "shine var(--shine-pulse-duration, 2s) linear infinite",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
        slide: "slide var(--speed) ease-in-out infinite alternate",
        ripple: "ripple 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
