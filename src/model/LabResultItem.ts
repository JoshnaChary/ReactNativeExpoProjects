export type LabResultsTab = "recent" | "past";
export type LabResultStatus = "waiting" | "new";

export type LabResultItem = {
  id: string;
  tab: LabResultsTab;
  section: "waiting" | "completed";
  testName: string;
  statusLabel?: string;
  status?: LabResultStatus;
  resultDateLine: string;
  orderedByLine: string;
  showViewResults?: boolean;
};
