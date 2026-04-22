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

const MenuItem = ({
  item,
  onPress,
  selectedNavId,
}: {
  item: Extract<SidebarNavItem, { kind: "link" }>;
  onPress?: (navId: string) => void;
  selectedNavId?: string;
}) => {
  const showDot = selectedNavId ? item.id === selectedNavId : item.showMessageDot;
  return (
    <Pressable style={styles.linkRow} accessibilityRole="button" onPress={() => onPress?.(item.id)}>
      <Text style={styles.link}>{item.label}</Text>
      {showDot ? <View style={styles.messageDot} /> : <View style={styles.messageDotPlaceholder} />}
    </Pressable>
  );
};

const MenuDivider = ({ line }: { line: string }) => {
  const isLong = line.length > 18;
  return <View style={[styles.dividerLine, isLong ? styles.dividerLong : styles.dividerShort]} />;
};

// Build stable React keys for the sidebar nav list without relying on the map
// callback's index (Sonar rule typescript:S6479). Links already carry unique
// ids; spacers/dividers get a key derived from the most recent link plus how
// many non-link items have appeared since, so the key stays stable as long as
// the underlying sidebar data does.
type KeyedNavItem = { item: SidebarNavItem; key: string };

const buildKeyedNavItems = (nav: readonly SidebarNavItem[]): KeyedNavItem[] => {
  const result: KeyedNavItem[] = [];
  let prevLinkId = "start";
  let sinceLink = 0;
  for (const item of nav) {
    if (item.kind === "link") {
      prevLinkId = item.id;
      sinceLink = 0;
      result.push({ item, key: `link-${item.id}` });
    } else {
      sinceLink += 1;
      result.push({ item, key: `${item.kind}-after-${prevLinkId}-${sinceLink}` });
    }
  }
  return result;
};

export const Sidebar = ({ summary, onNavItemPress, selectedNavId }: SidebarProps) => {
  const keyedItems = buildKeyedNavItems(summary.sidebarNav);
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
          {keyedItems.map(({ item, key }) => {
            if (item.kind === "spacer") {
              return <View key={key} style={styles.spacer} />;
            }
            if (item.kind === "divider") {
              return <MenuDivider key={key} line={item.line} />;
            }
            return (
              <MenuItem
                key={key}
                item={item}
                onPress={onNavItemPress}
                selectedNavId={selectedNavId}
              />
            );
          })}
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
    width: "100%",
    minHeight: 28,
  },
  link: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.size.body18,
    lineHeight: 28,
    color: theme.colors.charcoal,
  },
  dividerLine: {
    height: 1,
    backgroundColor: "#E3E6EB",
    marginTop: 14,
    marginBottom: 13,
  },
  dividerShort: {
    width: 96,
  },
  dividerLong: {
    width: 156,
  },
  spacer: {
    height: 28,
  },
  messageDot: {
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: theme.colors.messageDot,
  },
  messageDotPlaceholder: {
    width: 11,
    height: 11,
    opacity: 0,
  },
});
