import type { AccountSettingItem } from "@/model/AccountSettingItem";
import { theme } from "@/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

type AccountSettingRowProps = {
  item: AccountSettingItem;
  compact?: boolean;
};

export const AccountSettingRow = ({ item, compact = false }: AccountSettingRowProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.copyWrap}>
        <Text style={styles.label}>{item.label}:</Text>
        <Text style={styles.value}>{item.value}</Text>
      </View>
      {item.canChange ? (
        <Pressable accessibilityRole="button" style={[styles.changeBtn, compact && styles.changeBtnCompact]}>
          <Text style={styles.changeBtnText}>Change</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: 104,
    borderWidth: 1,
    borderColor: theme.colors.borderCard,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  copyWrap: {
    flex: 1,
    minWidth: 0,
  },
  label: {
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.body16,
    lineHeight: 20,
    color: theme.colors.charcoal,
  },
  value: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: 20,
    color: theme.colors.charcoal,
  },
  changeBtn: {
    width: 133,
    minHeight: 40,
    borderWidth: 1,
    borderColor: theme.colors.ice200,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  changeBtnCompact: {
    width: 110,
  },
  changeBtnText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: 20,
    color: theme.colors.royal400,
  },
});
