export type DocumentTab = "forms" | "uploads";

export type DocumentStatusTone = "warning" | "success";

export type DocumentItem = {
  id: string;
  section: "pending" | "completed";
  title: string;
  statusLabel: string;
  statusTone: DocumentStatusTone;
  assignedBy: string;
  date: string;
  ctaLabel: string;
};
