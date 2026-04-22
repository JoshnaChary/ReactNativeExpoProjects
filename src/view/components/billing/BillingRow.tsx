import type { BillingItem } from "@/model/BillingItem";
import { theme } from "@/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

type BillingRowProps = {
  item: BillingItem;
  compact?: boolean;
};

// Map the compact flag to the matching style keys so the JSX below renders
// exactly one tree and Sonar doesn't see the old near-identical duplicate
// branches (previously 26 lines / 335 tokens).
const pickVariant = (compact: boolean) =>
  compact
    ? {
        card: styles.cardCompact,
        left: styles.leftCompact,
        meta: styles.metaCompact,
        actions: styles.actionsCompact,
        secondaryBtn: styles.secondaryBtnCompact,
        primaryBtn: styles.primaryBtnCompact,
      }
    : {
        card: styles.card,
        left: styles.left,
        meta: styles.metaCol,
        actions: styles.actions,
        secondaryBtn: styles.secondaryBtn,
        primaryBtn: styles.primaryBtn,
      };

export const BillingRow = ({ item, compact = false }: BillingRowProps) => {
  const v = pickVariant(compact);
  const isOverdue = item.statusTone === "overdue";

  return (
    <View style={v.card}>
      {isOverdue ? <View style={styles.overdueBar} /> : null}

      <View style={v.left}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.amount}>{item.amount}</Text>
      </View>

      <View style={v.meta}>
        <Text style={styles.meta}>Invoice ID: {item.invoiceId}</Text>
        <Text style={styles.meta}>Due date: {item.dueDate}</Text>
        <Text style={[styles.meta, isOverdue && styles.overdueText]}>
          Status: {item.statusLabel}
        </Text>
      </View>

      <View style={v.actions}>
        <Pressable accessibilityRole="button" style={v.secondaryBtn}>
          <Text style={styles.secondaryBtnText}>View Details</Text>
        </Pressable>
        <Pressable accessibilityRole="button" style={v.primaryBtn}>
          <Text style={styles.primaryBtnText}>Pay Now</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: 104,
    borderWidth: 1,
    borderColor: theme.colors.borderCard,
    backgroundColor: theme.colors.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 12,
  },
  cardCompact: {
    minHeight: 104,
    borderWidth: 1,
    borderColor: theme.colors.borderCard,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  overdueBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 7,
    backgroundColor: "#FF0022",
  },
  left: {
    flex: 1,
    minWidth: 0,
    paddingLeft: 4,
  },
  leftCompact: {
    paddingLeft: 4,
  },
  title: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body18,
    lineHeight: 24,
    color: theme.colors.charcoal,
  },
  amount: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body18,
    lineHeight: 24,
    color: theme.colors.charcoal,
  },
  metaCol: {
    width: 260,
    borderLeftWidth: 1,
    borderLeftColor: theme.colors.ice300,
    paddingLeft: 14,
  },
  metaCompact: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: theme.colors.ice300,
    paddingTop: 8,
  },
  meta: {
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.charcoal,
  },
  overdueText: {
    color: "#FF0022",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionsCompact: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "stretch",
    gap: 8,
  },
  secondaryBtn: {
    minWidth: 133,
    minHeight: 40,
    borderWidth: 1,
    borderColor: theme.colors.ice200,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  secondaryBtnText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: 20,
    color: theme.colors.royal400,
  },
  secondaryBtnCompact: {
    flex: 1,
    minHeight: 40,
    borderWidth: 1,
    borderColor: theme.colors.ice200,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  primaryBtn: {
    minWidth: 133,
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    backgroundColor: theme.colors.royal300,
  },
  primaryBtnCompact: {
    flex: 1,
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    backgroundColor: theme.colors.royal300,
  },
  primaryBtnText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: 20,
    color: theme.colors.white,
  },
});
