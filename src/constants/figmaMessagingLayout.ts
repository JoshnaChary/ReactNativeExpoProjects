/**
 * Messaging Center — Figma `Patient-Portal---Medplum-Migration`
 * Node `1:86` (Dr. J Kim): portal rail | thread list | detail panel.
 */
import { WEB_HOME } from "@/constants/layout";

/** Use full Member Portal nav list column in Messaging Center. */
const NAV = WEB_HOME.sidebarWidth;
const GAP = 6;
const THREADS = 344;
const MESSAGES_COL = WEB_HOME.frameWidth - NAV - GAP - THREADS;

export const FIGMA_MESSAGING = {
  frameWidth: WEB_HOME.frameWidth,
  /** Column 1 — static Member Portal rail */
  portalNavWidth: NAV,
  /** Gap between column 1 and 2 */
  portalToThreadGap: GAP,
  /** Column 2 — thread list */
  threadListWidth: THREADS,
  /** No extra gap between column 2 and 3 in node `1:86` */
  listToDetailGap: 0,
  /** Column 3 — detail/chat panel */
  messagesColumnMaxWidth: MESSAGES_COL,
  chatColumnMaxWidth: MESSAGES_COL,
  leftHeaderHeight: 74,
  threadRowPaddingH: 20,
  threadRowPaddingV: 16,
  threadTitleToPreview: 4,
  threadTitleLineHeight: 22,
  threadPreviewLineHeight: 20,
  threadTimestampMinWidth: 72,
  threadTimestampMaxWidth: 88,
  selectedBorderRightWidth: 4,
  rightPanelHeaderMarginBottom: 24,
  rightPanelPaddingH: 0,
  rightPanelPaddingTop: 0,
  rightPanelPaddingBottom: 48,
  notificationCardGap: 16,
  notificationCardPadding: 20,
  chatBubbleMaxWidthRatio: 0.92,
  chatBubbleRadius: 8,
  inputBarHeight: 56,
  inputBarPaddingH: 16,
  chatMessageGap: 12,
  /** @deprecated use portalToThreadGap */
  mainToListGap: GAP,
  /** @deprecated use threadListWidth */
  leftPanelWidth: THREADS,
  /** @deprecated use messagesColumnMaxWidth */
  rightPanelMaxWidth: MESSAGES_COL,
} as const;
