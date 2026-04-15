import type { PrescriptionItem } from "@/model/PrescriptionItem";

export const MOCK_PRESCRIPTIONS: PrescriptionItem[] = [
  {
    id: "rx-sertraline",
    tab: "active",
    medicationName: "Sertraline",
    refillLabel: "5 refills remaining",
    dosageLine: "Dosage: 50mg",
    frequencyLine: "Frequency: Weekly",
  },
  {
    id: "rx-lorazepam",
    tab: "active",
    medicationName: "Lorazepam",
    refillLabel: "5 refills remaining",
    dosageLine: "Dosage: 50mg",
    frequencyLine: "Frequency: Weekly",
  },
  {
    id: "rx-archived",
    tab: "inactive",
    medicationName: "Bupropion",
    refillLabel: "0 refills remaining",
    dosageLine: "Dosage: 150mg",
    frequencyLine: "Frequency: Daily",
  },
];
