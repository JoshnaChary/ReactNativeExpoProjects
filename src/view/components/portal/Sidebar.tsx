import { WEB_HOME } from "@/constants/layout";
import { PatientPortalSummary, SidebarNavItem } from "@/model/PatientPortalSummary";
import { theme } from "@/theme";
import { HamburgerIcon } from "@/view/components/home/HamburgerIcon";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type SidebarProps = {
  summary: PatientPortalSummary;
  /** Figma nav: e.g. `messages` → open Messaging Center */
  onNavItemPress?: (navId: string) => void;
  /** Selected nav item id for dynamic dot marker */
  selectedNavId?: string;
};

const renderItem = (
  item: SidebarNavItem,
  index: number,
  onNavItemPress?: (navId: string) => void,
  selectedNavId?: string,
) => {
  if (item.kind === "divider") {
    return (
      <Text key={`d-${index}`} style={styles.dividerLine}>
        {item.line}
      </Text>
    );
  }
  if (item.kind === "spacer") {
    return <View key={`s-${index}`} style={styles.spacer} />;
  }
  return (
    <Pressable
      key={item.id}
      style={styles.linkRow}
      accessibilityRole="button"
      onPress={() => onNavItemPress?.(item.id)}
    >
      <Text style={styles.link}>{item.label}</Text>
      {(selectedNavId ? item.id === selectedNavId : item.showMessageDot) ? (
        <View style={styles.messageDot} />
      ) : null}
    </Pressable>
  );
};

export const Sidebar = ({ summary, onNavItemPress, selectedNavId }: SidebarProps) => {
  return (
    <View style={styles.shell}>
      <View style={styles.strip}>
        <View style={styles.stripInner}>
          <HamburgerIcon />
          <Text style={styles.stripTitle}>{summary.memberPortalTitle}</Text>
        </View>
      </View>
      <View style={styles.navPanel}>
        <ScrollView
          style={styles.navScroll}
          contentContainerStyle={styles.navInner}
          showsVerticalScrollIndicator={false}
        >
          {summary.sidebarNav.map((item, index) =>
            renderItem(item, index, onNavItemPress, selectedNavId),
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shell: {
    width: WEB_HOME.sidebarWidth,
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: "stretch",
  },
  strip: {
    height: WEB_HOME.sidebarHeaderHeight,
    backgroundColor: theme.colors.ice400,
    justifyContent: "center",
    paddingLeft: 14,
  },
  stripInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 21,
  },
  stripTitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.title20,
    lineHeight: 24,
    color: theme.colors.white,
    flex: 1,
  },
  navPanel: {
    flex: 1,
    backgroundColor: theme.colors.sidebarCanvas,
  },
  navScroll: {
    flex: 1,
  },
  navInner: {
    paddingLeft: 41,
    paddingTop: 37,
    paddingRight: 16,
    paddingBottom: 32,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 12,
  },
  link: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.title20,
    lineHeight: 28,
    color: theme.colors.charcoal,
  },
  dividerLine: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.title20,
    lineHeight: 28,
    color: theme.colors.dividerLine,
  },
  spacer: {
    height: 8,
  },
  messageDot: {
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: theme.colors.messageDot,
  },
});
