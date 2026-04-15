import { MOBILE_LAYOUT } from "@/constants/layout";
import { theme } from "@/theme";
import { HamburgerIcon } from "@/view/components/home/HamburgerIcon";
import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type AppTopBarProps = {
  title: string;
  onMenuPress: () => void;
  rightAction?: ReactNode;
};

/**
 * Shared mobile top app bar used by all mobile screens.
 */
export const AppTopBar = ({ title, onMenuPress, rightAction }: AppTopBarProps) => {
  return (
    <View style={styles.bar}>
      <Pressable
        onPress={onMenuPress}
        style={({ pressed }) => [styles.menuHit, pressed && styles.pressed]}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Open menu"
      >
        <HamburgerIcon />
      </Pressable>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.rightSlot}>{rightAction ?? null}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    height: MOBILE_LAYOUT.headerHeight,
    backgroundColor: theme.colors.ice400,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 14,
    paddingRight: 10,
  },
  menuHit: {
    minWidth: MOBILE_LAYOUT.minTouchTarget,
    minHeight: MOBILE_LAYOUT.minTouchTarget,
    justifyContent: "center",
    alignItems: "flex-start",
    marginRight: 21,
  },
  pressed: {
    opacity: 0.85,
  },
  title: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.title20,
    lineHeight: 24,
    color: theme.colors.white,
  },
  rightSlot: {
    minWidth: 44,
    minHeight: 44,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
