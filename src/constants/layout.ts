/** Node `1:10` — Main View frame */
export const WEB_HOME = {
  frameWidth: 1440,
  frameHeight: 800,
  sidebarWidth: 309,
  sidebarHeaderHeight: 74,
  mainToSidebarGap: 12,
  /** Primary content column width inside main area */
  contentColumnWidth: 653,
  actionCardHeight: 104,
  dateTileWidth: 70,
  dateTileHeight: 75,
  joinVideoButtonWidth: 124,
  joinVideoButtonHeight: 39,
} as const;

export const MOBILE_LAYOUT = {
  minTouchTarget: 44,
  headerHeight: 74,
  horizontalPadding: 18,
  actionCardHeight: 104,
} as const;
