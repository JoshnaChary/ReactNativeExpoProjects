import type { BillingItem } from "@/model/BillingItem";

export const MOCK_BILLING_ITEMS: BillingItem[] = [
  {
    id: "bill-1",
    title: "Follow Up - Medication Review",
    amount: "$180",
    invoiceId: "001122",
    dueDate: "April 3, 2026",
    statusLabel: "Overdue",
    statusTone: "overdue",
  },
  {
    id: "bill-2",
    title: "Follow Up - Medication Review",
    amount: "$180",
    invoiceId: "001122",
    dueDate: "April 3, 2026",
    statusLabel: "Pending",
    statusTone: "pending",
  },
];
