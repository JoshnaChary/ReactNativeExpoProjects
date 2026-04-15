export type ThreadKind = "notifications" | "conversation";

export type MessageThread = {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
  kind: ThreadKind;
  /** Unread: blue dot next to title (Figma) */
  unread?: boolean;
};

export type NotificationCtaVariant = "filled" | "outline";

export type NotificationItem = {
  id: string;
  body: string;
  /** Secondary line inside card (optional) */
  meta?: string;
  ctaLabel: string;
  /** Time in left column outside card — Figma `1:45` */
  listTime?: string;
  ctaVariant?: NotificationCtaVariant;
};

export type ChatMessage = {
  id: string;
  body: string;
  timestamp: string;
  /** true = patient/user (right), false = provider (left) */
  isUser: boolean;
};
