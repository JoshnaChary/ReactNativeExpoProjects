export type AppointmentActionKind = "cancel" | "joinVideo";
export type AppointmentTab = "upcoming" | "past";

export type AppointmentItem = {
  id: string;
  tab: AppointmentTab;
  day: string;
  month: string;
  title: string;
  statusLabel: string;
  timeLine: string;
  locationLine: string;
  actions: AppointmentActionKind[];
};
