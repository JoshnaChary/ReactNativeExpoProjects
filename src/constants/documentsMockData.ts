import type { DocumentItem } from "@/model/DocumentItem";

export const DOCUMENT_ICON_URL =
  "https://www.figma.com/api/mcp/asset/314bb756-e714-49ca-8ca0-f66acf53f2ed";

export const MOCK_DOCUMENTS: DocumentItem[] = [
  {
    id: "doc-1",
    section: "pending",
    title: "Consent Form",
    statusLabel: "Signature required",
    statusTone: "warning",
    assignedBy: "Carol Knoll",
    date: "April 1, 2026",
    ctaLabel: "Review & Sign",
  },
  {
    id: "doc-2",
    section: "completed",
    title: "Consent Form",
    statusLabel: "Signed",
    statusTone: "success",
    assignedBy: "Carol Knoll",
    date: "April 1, 2026",
    ctaLabel: "Review & Sign",
  },
];
