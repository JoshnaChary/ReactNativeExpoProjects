import { FIGMA_PRESCRIPTIONS } from "@/constants/figmaPrescriptionsLayout";
import type { PrescriptionItem } from "@/model/PrescriptionItem";
import { theme } from "@/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PrescriptionRowProps = {
  item: PrescriptionItem;
  compact?: boolean;
};

export const PrescriptionRow = ({ item, compact = false }: PrescriptionRowProps) => {
  return (
    <View style={[styles.card, compact && styles.cardCompact]}>
      <View style={[styles.leftCol, compact && styles.leftColCompact]}>
        <Text style={styles.medicationName}>{item.medicationName}</Text>
        <View style={styles.refillChip}>
          <Text style={styles.refillLabel}>{item.refillLabel}</Text>
        </View>
      </View>

      <View style={[styles.divider, compact && styles.dividerCompact]} />

      <View style={styles.metaCol}>
        <Text style={styles.metaText}>{item.dosageLine}</Text>
        <Text style={styles.metaText}>{item.frequencyLine}</Text>
      </View>

      <View style={[styles.actionsCol, compact && styles.actionsColCompact]}>
        <Pressable accessibilityRole="button" style={styles.viewDetailsBtn}>
          <Text style={styles.viewDetailsLabel}>View Details</Text>
        </Pressable>
        <Pressable accessibilityRole="button" style={styles.requestRefillBtn}>
          <Text style={styles.requestRefillLabel}>Request Refill</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: FIGMA_PRESCRIPTIONS.cardHeight,
    borderWidth: 1,
    borderColor: theme.colors.borderCard,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  cardCompact: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: 10,
  },
  leftCol: {
    width: 330,
    minWidth: 220,
    maxWidth: "100%",
    justifyContent: "center",
  },
  leftColCompact: {
    width: "100%",
    minWidth: 0,
  },
  medicationName: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body18,
    lineHeight: 22,
    color: theme.colors.charcoal,
  },
  refillChip: {
    marginTop: 7,
    width: FIGMA_PRESCRIPTIONS.refillChipWidth,
    minHeight: FIGMA_PRESCRIPTIONS.refillChipHeight,
    borderRadius: 80,
    backgroundColor: "#D9ECDC",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  refillLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body,
    lineHeight: 17,
    color: "#303A49",
  },
  divider: {
    width: 1,
    height: FIGMA_PRESCRIPTIONS.dividerHeight,
    backgroundColor: "#657080",
    opacity: 0.5,
  },
  dividerCompact: {
    display: "none",
  },
  metaCol: {
    width: 260,
    minWidth: 170,
    maxWidth: "100%",
    justifyContent: "center",
  },
  metaText: {
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.charcoal,
  },
  actionsCol: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
    flex: 1,
    minWidth: 0,
  },
  actionsColCompact: {
    justifyContent: "flex-start",
    flexWrap: "wrap",
    width: "100%",
  },
  viewDetailsBtn: {
    width: FIGMA_PRESCRIPTIONS.actionButtonWidth,
    minHeight: FIGMA_PRESCRIPTIONS.actionButtonHeight,
    borderWidth: 1,
    borderColor: theme.colors.ice200,
    backgroundColor: theme.colors.white,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  viewDetailsLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: 19,
    color: theme.colors.royal400,
  },
  requestRefillBtn: {
    width: FIGMA_PRESCRIPTIONS.actionButtonWidth,
    minHeight: FIGMA_PRESCRIPTIONS.actionButtonHeight,
    backgroundColor: theme.colors.royal300,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  requestRefillLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: 19,
    color: theme.colors.white,
  },
});
