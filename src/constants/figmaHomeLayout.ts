import { WEB_HOME } from "@/constants/layout";

export const FIGMA_MAIN_SPACING = {
  contentPaddingTop: 36,
  contentPaddingLeft: 28,
  contentPaddingRight: 40,
  contentPaddingBottom: 48,
  greetingMinHeight: 36,
  greetingToUpcomingTitle: 23,
  upcomingTitleMinHeight: 36,
  appointmentCardMarginTop: -5,
  helpTitleMarginTop: 49,
  helpTitleMinHeight: 36,
  messageCardMarginTop: -8,
  messageCardToActionAppointment: 15,
  actionAppointmentToActionRefill: 14,
  actionRefillToActionMessage: 15,
} as const;

export const FIGMA_CARD = {
  width: 653,
  height: 104,
  borderRadius: 0,
  borderWidth: 1,
  appointmentPaddingLeft: 15,
  appointmentPaddingRight: 24,
  dateToCopyGap: 27,
  copyToButtonGap: 12,
  messagePaddingLeft: 21,
  messageIconTextGap: 14,
  actionPaddingLeft: 24,
  actionPaddingRight: 24,
} as const;

export const FIGMA_ICON = {
  messageAvatar: 56,
  messageIconWidth: 31,
  messageIconHeight: 29,
  messageIconRadius: 12,
} as const;
