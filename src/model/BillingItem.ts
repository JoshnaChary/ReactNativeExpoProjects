export type BillingTab = "outstanding" | "history" | "payment";

export type BillingItem = {
  id: string;
  title: string;
  amount: string;
  invoiceId: string;
  dueDate: string;
  statusLabel: string;
  statusTone: "overdue" | "pending";
};
