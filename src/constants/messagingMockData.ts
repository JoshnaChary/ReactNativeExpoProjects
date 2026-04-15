import type {
  ChatMessage,
  MessageThread,
  NotificationItem,
} from "@/model/MessagingCenter";

/**
 * Sidebar threads — 4 rows: Northside, Care Team, Dr. J Kim, Billing.
 */
export const MOCK_THREADS: MessageThread[] = [
  {
    id: "t-northside",
    title: "Northside Clinic",
    preview: "Your April 3 appointment is confirmed with cardiology.",
    timestamp: "2:23 PM",
    kind: "notifications",
    unread: true,
  },
  {
    id: "t-care",
    title: "Care Team",
    preview: "We sent follow-up instructions to your portal.",
    timestamp: "Apr 3",
    kind: "notifications",
    unread: false,
  },
  {
    id: "t-drkim",
    title: "Dr. J Kim",
    preview: "Let me know if you have questions before Thursday.",
    timestamp: "Apr 3",
    kind: "conversation",
    unread: false,
  },
  {
    id: "t-billing",
    title: "Billing Questions",
    preview: "Your statement for March is ready to view.",
    timestamp: "Apr 3",
    kind: "notifications",
    unread: false,
  },
];

/** Figma node `1:45` — Northside Clinic stack */
const NOTIFICATIONS_NORTHSIDE: NotificationItem[] = [
  {
    id: "ns-1",
    listTime: "2:23 PM",
    body:
      "Your cardiology appointment on April 3 at 10:00 AM is confirmed. Please arrive 15 minutes early with your insurance card.",
    ctaLabel: "View",
    ctaVariant: "outline",
  },
  {
    id: "ns-2",
    listTime: "11:05 AM",
    body: "You’ve received a consent form to sign before your upcoming procedure.",
    ctaLabel: "Review & Sign",
    ctaVariant: "outline",
  },
  {
    id: "ns-3",
    listTime: "3:40 PM",
    body: "New lab results from your March 28 draw are available to review in your chart.",
    ctaLabel: "View",
    ctaVariant: "outline",
  },
];

const NOTIFICATIONS_CARE: NotificationItem[] = [
  {
    id: "n1",
    body: "Care team added notes from your last visit.",
    meta: "Apr 3, 2024 · 9:00 AM",
    ctaLabel: "View",
  },
];

const NOTIFICATIONS_BILLING: NotificationItem[] = [
  {
    id: "b1",
    body: "Your March statement is available in billing.",
    meta: "Apr 3, 2024 · 8:00 AM",
    ctaLabel: "View",
  },
];

export const MOCK_NOTIFICATIONS_BY_THREAD: Record<string, NotificationItem[]> = {
  "t-northside": NOTIFICATIONS_NORTHSIDE,
  "t-care": NOTIFICATIONS_CARE,
  "t-billing": NOTIFICATIONS_BILLING,
};

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    body: "Hi Jane, I wanted to let you know your lab results from last week are in. Overall they look good - I will go through them with you at your next appointment on April 3. In the meantime feel free to review them.",
    timestamp: "2:23 PM",
    isUser: false,
  },
  {
    id: "m2",
    body: "I have been feeling a bit better overall, though sleep is still a little difficult some nights.",
    timestamp: "2:50 PM",
    isUser: true,
  },
];

export function notificationsForThreadId(threadId: string): NotificationItem[] {
  return MOCK_NOTIFICATIONS_BY_THREAD[threadId] ?? NOTIFICATIONS_NORTHSIDE;
}
