export type SidebarNavItem =
  | { kind: "link"; id: string; label: string; showMessageDot?: boolean }
  | { kind: "divider"; line: string }
  | { kind: "spacer" };

export type HomeUpcomingAppointment = {
  dayNumber: string;
  monthLabel: string;
  providerLine: string;
  timeLine: string;
  joinVideoLabel: string;
};

export type HomeQuickAction = {
  id: string;
  label: string;
};

export type PatientPortalSummary = {
  memberPortalTitle: string;
  patientFirstName: string;
  sidebarNav: SidebarNavItem[];
  upcomingSectionTitle: string;
  helpSectionTitle: string;
  homeAppointment: HomeUpcomingAppointment | null;
  messageHeadline: string;
  messageAvatarUrl: string;
  messageIconUrl: string;
  quickActions: HomeQuickAction[];
};
