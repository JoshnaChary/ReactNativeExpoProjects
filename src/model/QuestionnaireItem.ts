export type QuestionnaireTab = "todo" | "progress";

export type QuestionnaireItem = {
  id: string;
  tab: QuestionnaireTab;
  title: string;
  descriptionLine: string;
  dateLine: string;
  assignedByLine: string;
  actionLabel?: string;
};
