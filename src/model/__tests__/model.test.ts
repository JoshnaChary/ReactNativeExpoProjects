import type { AccountSettingItem } from "@/model/AccountSettingItem";
import type {
  AppointmentActionKind,
  AppointmentItem,
  AppointmentTab,
} from "@/model/AppointmentItem";
import type { BillingItem, BillingTab } from "@/model/BillingItem";
import type {
  DocumentItem,
  DocumentStatusTone,
  DocumentTab,
} from "@/model/DocumentItem";
import type {
  LabResultItem,
  LabResultStatus,
  LabResultsTab,
} from "@/model/LabResultItem";
import type {
  ChatMessage,
  MessageThread,
  NotificationCtaVariant,
  NotificationItem,
  ThreadKind,
} from "@/model/MessagingCenter";
import type {
  HomeQuickAction,
  HomeUpcomingAppointment,
  PatientPortalSummary,
  SidebarNavItem,
} from "@/model/PatientPortalSummary";
import type { PrescriptionItem, PrescriptionTab } from "@/model/PrescriptionItem";
import type {
  QuestionnaireItem,
  QuestionnaireTab,
} from "@/model/QuestionnaireItem";

// Models are pure TypeScript types. These smoke tests exist to:
//  1. Ensure every model module can be imported (catches circular-import regressions).
//  2. Document the shape of each model via a valid literal that type-checks.
// Any coverage contribution from these files is zero by design (types are erased),
// but importing guards against dead modules and keeps the public surface documented.

describe("domain model literals type-check", () => {
  it("builds a complete PatientPortalSummary literal", () => {
    const link: SidebarNavItem = { kind: "link", id: "home", label: "Home" };
    const divider: SidebarNavItem = { kind: "divider", line: "___" };
    const spacer: SidebarNavItem = { kind: "spacer" };
    const upcoming: HomeUpcomingAppointment = {
      dayNumber: "14",
      monthLabel: "April",
      providerLine: "Dr. X",
      timeLine: "3 PM",
      joinVideoLabel: "Join",
    };
    const action: HomeQuickAction = { id: "apt", label: "Book" };

    const summary: PatientPortalSummary = {
      memberPortalTitle: "Member Portal",
      patientFirstName: "Jane",
      sidebarNav: [link, spacer, divider],
      upcomingSectionTitle: "Upcoming",
      helpSectionTitle: "Help",
      homeAppointment: upcoming,
      messageHeadline: "3 msgs",
      messageAvatarUrl: "https://example/avatar",
      messageIconUrl: "https://example/icon",
      quickActions: [action],
    };

    expect(summary.sidebarNav).toHaveLength(3);
    expect(summary.homeAppointment?.dayNumber).toBe("14");
  });

  it("builds appointment / prescription / billing / document / lab / questionnaire / account literals", () => {
    const appointment: AppointmentItem = {
      id: "a1",
      tab: "upcoming" satisfies AppointmentTab,
      day: "14",
      month: "Apr",
      title: "Checkup",
      statusLabel: "Confirmed",
      timeLine: "3 PM",
      locationLine: "Remote",
      actions: ["cancel", "joinVideo"] satisfies AppointmentActionKind[],
    };
    const prescription: PrescriptionItem = {
      id: "p1",
      tab: "active" satisfies PrescriptionTab,
      medicationName: "Med",
      refillLabel: "Refill",
      dosageLine: "10mg",
      frequencyLine: "Daily",
    };
    const billing: BillingItem = {
      id: "b1",
      title: "Visit",
      amount: "$20",
      invoiceId: "INV1",
      dueDate: "2026-05-01",
      statusLabel: "Due",
      statusTone: "pending",
    };
    const billingTab: BillingTab = "outstanding";
    const document: DocumentItem = {
      id: "d1",
      section: "pending",
      title: "Form",
      statusLabel: "New",
      statusTone: "success" satisfies DocumentStatusTone,
      assignedBy: "Dr. X",
      date: "2026-04-01",
      ctaLabel: "Open",
    };
    const documentTab: DocumentTab = "forms";
    const lab: LabResultItem = {
      id: "l1",
      tab: "recent" satisfies LabResultsTab,
      section: "waiting",
      testName: "CBC",
      status: "new" satisfies LabResultStatus,
      resultDateLine: "Today",
      orderedByLine: "Dr. X",
    };
    const questionnaire: QuestionnaireItem = {
      id: "q1",
      tab: "todo" satisfies QuestionnaireTab,
      title: "Intake",
      descriptionLine: "Please complete",
      dateLine: "Today",
      assignedByLine: "Care team",
    };
    const account: AccountSettingItem = {
      id: "name",
      label: "Name",
      value: "Jane",
      canChange: true,
    };

    expect(appointment.actions).toContain("cancel");
    expect(prescription.tab).toBe("active");
    expect(billing.statusTone).toBe("pending");
    expect(billingTab).toBe("outstanding");
    expect(document.section).toBe("pending");
    expect(documentTab).toBe("forms");
    expect(lab.section).toBe("waiting");
    expect(questionnaire.title).toBe("Intake");
    expect(account.canChange).toBe(true);
  });

  it("builds messaging center literals for every variant", () => {
    const kinds: ThreadKind[] = ["notifications", "conversation"];
    const ctaVariants: NotificationCtaVariant[] = ["filled", "outline"];
    const thread: MessageThread = {
      id: "t1",
      title: "T",
      preview: "hi",
      timestamp: "now",
      kind: "conversation",
      unread: true,
    };
    const notification: NotificationItem = {
      id: "n1",
      body: "Hi",
      meta: "sub",
      ctaLabel: "Open",
      listTime: "1m",
      ctaVariant: "outline",
    };
    const chat: ChatMessage = {
      id: "c1",
      body: "hello",
      timestamp: "now",
      isUser: true,
    };
    expect(kinds).toContain(thread.kind);
    expect(ctaVariants).toContain(notification.ctaVariant);
    expect(chat.isUser).toBe(true);
  });
});
