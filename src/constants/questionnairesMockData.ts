import type { QuestionnaireItem } from "@/model/QuestionnaireItem";

export const MOCK_QUESTIONNAIRES: QuestionnaireItem[] = [
  {
    id: "q-phq9",
    tab: "todo",
    title: "PHQ9",
    descriptionLine: "Description: Depression screening",
    dateLine: "Date: April 4, 2026",
    assignedByLine: "Assigned by: Care Team",
    actionLabel: "Start",
  },
  {
    id: "q-gad7",
    tab: "todo",
    title: "GAD7",
    descriptionLine: "Description: Anxiety screening",
    dateLine: "Date: April 4, 2026",
    assignedByLine: "Assigned by: Care Team",
    actionLabel: "Start",
  },
  {
    id: "q-progress",
    tab: "progress",
    title: "PHQ9",
    descriptionLine: "Description: Depression screening",
    dateLine: "Date: April 4, 2026",
    assignedByLine: "Assigned by: Care Team",
  },
];
