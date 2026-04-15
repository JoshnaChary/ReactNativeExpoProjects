export type PrescriptionTab = "active" | "inactive";

export type PrescriptionItem = {
  id: string;
  tab: PrescriptionTab;
  medicationName: string;
  refillLabel: string;
  dosageLine: string;
  frequencyLine: string;
};
