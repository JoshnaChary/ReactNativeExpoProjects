import { FIGMA_APPOINTMENTS } from "@/constants/figmaAppointmentsLayout";
import type {
  AppointmentActionKind,
  AppointmentItem,
} from "@/model/AppointmentItem";
import { theme } from "@/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

type AppointmentRowProps = {
  appointment: AppointmentItem;
  compact?: boolean;
};

const actionLabel: Record<AppointmentActionKind, string> = {
  cancel: "Cancel Appointment",
  joinVideo: "Join Video",
};

export const AppointmentRow = ({ appointment, compact = false }: AppointmentRowProps) => {
  const isPast = appointment.tab === "past";

  return (
    <View style={[styles.card, compact && styles.cardCompact]}>
      <View style={[styles.main, compact && styles.mainCompact]}>
        <View style={[styles.dateTile, isPast && styles.dateTilePast]}>
          <Text style={styles.day}>{appointment.day}</Text>
          <Text style={styles.month}>{appointment.month}</Text>
        </View>

        <View style={styles.infoCol}>
          <Text style={styles.title}>{appointment.title}</Text>
          <View style={styles.statusChip}>
            <Text style={styles.statusLabel}>{appointment.statusLabel}</Text>
          </View>
        </View>

        <View style={[styles.vertDivider, compact && styles.vertDividerCompact]} />

        <View style={styles.metaCol}>
          <Text style={styles.metaLine}>{appointment.timeLine}</Text>
          <Text style={styles.metaLine}>{appointment.locationLine}</Text>
        </View>
      </View>

      {appointment.actions.length > 0 ? (
        <View style={[styles.actions, compact && styles.actionsCompact]}>
          {appointment.actions.map((action) => (
            <Pressable
              key={action}
              accessibilityRole="button"
              style={[
                styles.actionBtn,
                action === "cancel" ? styles.cancelBtn : styles.joinBtn,
                compact && styles.actionBtnCompact,
                compact && action === "cancel" && styles.cancelBtnCompact,
                compact && action === "joinVideo" && styles.joinBtnCompact,
              ]}
            >
              <Text
                numberOfLines={1}
                style={action === "cancel" ? styles.cancelLabel : styles.joinLabel}
              >
                {actionLabel[action]}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: FIGMA_APPOINTMENTS.cardHeight,
    borderWidth: 1,
    borderColor: theme.colors.borderCard,
    backgroundColor: theme.colors.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 16,
  },
  cardCompact: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: 12,
  },
  main: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
    gap: 14,
  },
  mainCompact: {
    alignItems: "flex-start",
    flexWrap: "wrap",
    rowGap: 12,
  },
  dateTile: {
    width: FIGMA_APPOINTMENTS.dateTileWidth,
    height: FIGMA_APPOINTMENTS.dateTileHeight,
    backgroundColor: theme.colors.royal100,
    alignItems: "center",
    justifyContent: "center",
  },
  dateTilePast: {
    backgroundColor: theme.colors.ice100,
  },
  day: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body18,
    lineHeight: 22,
    color: theme.colors.charcoal,
  },
  month: {
    marginTop: 5,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.charcoal,
  },
  infoCol: {
    width: 280,
    maxWidth: "100%",
    minWidth: 190,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  title: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body18,
    lineHeight: 22,
    color: theme.colors.charcoal,
  },
  statusChip: {
    marginTop: 5,
    width: FIGMA_APPOINTMENTS.statusChipWidth,
    minHeight: FIGMA_APPOINTMENTS.statusChipHeight,
    borderRadius: 80,
    backgroundColor: "#D9ECDC",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  statusLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body,
    lineHeight: 17,
    color: "#303A49",
  },
  vertDivider: {
    width: 1,
    height: FIGMA_APPOINTMENTS.sectionDividerHeight,
    backgroundColor: "#657080",
    opacity: 0.5,
  },
  vertDividerCompact: {
    display: "none",
  },
  metaCol: {
    width: 278,
    maxWidth: "100%",
    minWidth: 200,
    justifyContent: "center",
  },
  metaLine: {
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.charcoal,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 6,
    flexShrink: 0,
  },
  actionsCompact: {
    width: "100%",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  actionBtn: {
    minHeight: FIGMA_APPOINTMENTS.actionButtonHeight,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  actionBtnCompact: {
    minWidth: 160,
  },
  cancelBtnCompact: {
    minWidth: FIGMA_APPOINTMENTS.cancelButtonWidth,
  },
  joinBtnCompact: {
    minWidth: FIGMA_APPOINTMENTS.joinVideoWidth,
  },
  cancelBtn: {
    width: FIGMA_APPOINTMENTS.cancelButtonWidth,
    borderColor: theme.colors.ice200,
    backgroundColor: theme.colors.white,
  },
  joinBtn: {
    width: FIGMA_APPOINTMENTS.joinVideoWidth,
    borderColor: theme.colors.ice200,
    backgroundColor: theme.colors.ice200,
  },
  cancelLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: 19,
    color: "#9A2802",
    flexShrink: 0,
  },
  joinLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: 19,
    color: theme.colors.ice400,
    flexShrink: 0,
  },
});
