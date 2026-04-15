/**
 * Northside Clinic — right panel (Figma node `1:45`).
 * File: Patient-Portal---Medplum-Migration · `mOGFlmG2mdvOWrIkXvxhGd`
 */
import { MESSAGING_CHAT } from "@/constants/messagingChatTheme";

export const FIGMA_NORTHSIDE_145 = {
  /** Warm notification surface */
  cardBg: "#FFF3E0",
  cardBorder: "#EED6B0",
  cardRadius: 8,
  /** Left column for list time (outside card) */
  listTimeWidth: 52,
  listTimeGap: 12,
  /** Shared date line with chat */
  dateSeparator: MESSAGING_CHAT.dateSeparator,
  /** Outline CTA (blue text, white fill, grey border) */
  ctaOutlineBorder: "#E2E8F0",
  ctaOutlineText: "#3B82F6",
} as const;
