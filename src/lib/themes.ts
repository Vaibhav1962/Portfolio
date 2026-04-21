export type ThemeName = "light" | "dark" | "dawn" | "midnight";

export const THEME_ORDER: ThemeName[] = ["light", "dark", "dawn", "midnight"];

export const THEME_LABELS: Record<ThemeName, string> = {
  light: "Light",
  dark: "Dark",
  dawn: "Dawn Parchment",
  midnight: "Midnight Archive",
};
