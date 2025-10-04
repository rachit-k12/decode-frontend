/**
 * Design tokens and utility functions
 * Provides programmatic access to design system values
 */

import { theme } from "@/app/theme";

/**
 * Get a CSS custom property value
 */
export function getCSSVariable(name: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--${name}`)
    .trim();
}

/**
 * Set a CSS custom property value
 */
export function setCSSVariable(name: string, value: string): void {
  if (typeof window === "undefined") return;
  document.documentElement.style.setProperty(`--${name}`, value);
}

/**
 * Convert HSL CSS variable to RGB for opacity manipulation
 */
export function hslToRgb(
  h: number,
  s: number,
  l: number
): [number, number, number] {
  s /= 100;
  l /= 100;

  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  return [
    Math.round(255 * f(0)),
    Math.round(255 * f(8)),
    Math.round(255 * f(4)),
  ];
}

/**
 * Get color with opacity
 * Usage: getColorWithOpacity('primary', 0.5)
 */
export function getColorWithOpacity(color: string, opacity: number): string {
  return `hsl(var(--${color}) / ${opacity})`;
}

/**
 * Responsive breakpoint helpers
 */
export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const;

export function getBreakpoint(): keyof typeof breakpoints {
  if (typeof window === "undefined") return "mobile";

  const width = window.innerWidth;
  if (width >= breakpoints.wide) return "wide";
  if (width >= breakpoints.desktop) return "desktop";
  if (width >= breakpoints.tablet) return "tablet";
  return "mobile";
}

/**
 * Check if device prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Get animation duration based on motion preference
 */
export function getAnimationDuration(
  type: "fast" | "normal" | "slow" = "normal"
): number {
  if (prefersReducedMotion()) return 0;
  return theme.animation.duration[type];
}

/**
 * Spacing scale helper
 * Usage: spacing(2) => '0.5rem'
 */
export function spacing(multiplier: number): string {
  return `${multiplier * 0.25}rem`;
}

/**
 * Focus ring styles for accessibility
 */
export const focusRing = {
  default:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  inset:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
  none: "focus-visible:outline-none",
} as const;

/**
 * Common transition classes
 */
export const transitions = {
  colors: "transition-colors duration-200",
  all: "transition-all duration-300",
  transform: "transition-transform duration-300",
  opacity: "transition-opacity duration-200",
} as const;

/**
 * Shadow classes by elevation
 */
export const shadows = {
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  none: "shadow-none",
} as const;

/**
 * Border radius classes
 */
export const radius = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
  none: "rounded-none",
} as const;

/**
 * Typography scale classes
 */
export const typography = {
  h1: "text-4xl md:text-5xl font-semibold font-heading leading-tight tracking-tight",
  h2: "text-3xl md:text-4xl font-semibold font-heading leading-tight tracking-tight",
  h3: "text-2xl md:text-3xl font-semibold font-heading leading-snug",
  h4: "text-xl md:text-2xl font-medium font-heading leading-snug",
  h5: "text-lg md:text-xl font-medium font-heading leading-normal",
  h6: "text-base md:text-lg font-medium font-heading leading-normal",
  body: "text-base leading-relaxed",
  small: "text-sm leading-normal",
  tiny: "text-xs leading-tight",
} as const;

/**
 * Container width classes
 */
export const containers = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  full: "max-w-full",
} as const;

/**
 * Z-index scale
 */
export const zIndex = theme.zIndex;

/**
 * Common layout patterns
 */
export const layouts = {
  center: "flex items-center justify-center",
  stack: "flex flex-col",
  hstack: "flex flex-row items-center",
  spaceBetween: "flex items-center justify-between",
  grid: {
    responsive: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    dense: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    auto: "grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]",
  },
} as const;
