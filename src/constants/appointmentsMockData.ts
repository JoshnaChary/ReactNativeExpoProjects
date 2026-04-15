import type { AppointmentItem } from "@/model/AppointmentItem";

export const MOCK_APPOINTMENTS: AppointmentItem[] = [
  {
    id: "apt-1",
    tab: "upcoming",
    day: "14",
    month: "April",
    title: "Follow-up with Dr. J Kim",
    statusLabel: "Confirmed",
    timeLine: "Time: 5:00 PM ET - 5:30 PM ET",
    locationLine:
      "Location: 12165 Clarksville Pike, Clarksville, MD 21029, United States",
    actions: ["cancel"],
  },
  {
    id: "apt-2",
    tab: "upcoming",
    day: "14",
    month: "April",
    title: "Follow-up with Dr. J Kim",
    statusLabel: "Confirmed",
    timeLine: "Time: 5:00 PM ET - 5:30 PM ET",
    locationLine: "Location: Video Call",
    actions: ["cancel", "joinVideo"],
  },
  {
    id: "apt-past-1",
    tab: "past",
    day: "4",
    month: "Dec",
    title: "Follow-up with Dr. J Kim",
    statusLabel: "Completed",
    timeLine: "Time: 5:00 PM ET - 5:30 PM ET",
    locationLine:
      "Location: 12165 Clarksville Pike, Clarksville, MD 21029, United States",
    actions: [],
  },
  {
    id: "apt-past-2",
    tab: "past",
    day: "1",
    month: "Dec",
    title: "Follow-up with Dr. J Kim",
    statusLabel: "Completed",
    timeLine: "Time: 5:00 PM ET - 5:30 PM ET",
    locationLine: "Location: Video Call",
    actions: [],
  },
];
