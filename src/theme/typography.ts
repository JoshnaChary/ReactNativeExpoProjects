/**
 * Inter scale from Figma Main View (`1:10`). Families loaded via `@expo-google-fonts/inter`.
 */
export const typography = {
  fontFamily: {
    light: "Inter_300Light",
    regular: "Inter_400Regular",
    medium: "Inter_500Medium",
    semibold: "Inter_600SemiBold",
  },
  size: {
    xs: 11,
    caption: 13,
    body: 14,
    body16: 16,
    body18: 18,
    title20: 20,
    button16: 16,
  },
  lineHeight: {
    tight: 16,
    body: 22,
    title: 26,
    multiline: 44,
  },
} as const;
