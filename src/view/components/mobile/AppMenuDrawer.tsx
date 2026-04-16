import type { SidebarNavItem } from "@/model/PatientPortalSummary";
import { theme } from "@/theme";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type AppMenuDrawerProps = {
  visible: boolean;
  title: string;
  navItems: SidebarNavItem[];
  selectedNavId?: string;
  topInset: number;
  onClose: () => void;
  onSelectItem: (id: string) => void;
};

/**
 * Shared mobile menu drawer. This is the single source of truth for
 * hamburger menu behavior on mobile screens.
 */
export const AppMenuDrawer = ({
  visible,
  title,
  navItems,
  selectedNavId,
  topInset,
  onClose,
  onSelectItem,
}: AppMenuDrawerProps) => {
  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.modalRoot}>
        <Pressable
          style={styles.modalBackdrop}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close menu"
        />
        <View style={[styles.menuPanel, { paddingTop: topInset + theme.spacing.lg }]}>
          <Text style={styles.menuTitle}>{title}</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {navItems.map((item, index) => (
              <NavRow
                key={`${item.kind}-${index}`}
                item={item}
                onSelectItem={onSelectItem}
                selectedNavId={selectedNavId}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const NavRow = ({
  item,
  onSelectItem,
  selectedNavId,
}: {
  item: SidebarNavItem;
  onSelectItem: (id: string) => void;
  selectedNavId?: string;
}) => {
  if (item.kind === "divider") {
    return (
      <View
        style={[
          styles.menuDivider,
          item.line.length > 18 ? styles.menuDividerLong : styles.menuDividerShort,
        ]}
      />
    );
  }
  if (item.kind === "spacer") {
    return <View style={styles.menuSpacer} />;
  }
  return (
    <Pressable
      style={styles.menuLinkRow}
      accessibilityRole="button"
      onPress={() => onSelectItem(item.id)}
    >
      <Text style={styles.menuLink}>{item.label}</Text>
      {(selectedNavId ? item.id === selectedNavId : item.showMessageDot) ? (
        <View style={styles.menuDot} />
      ) : (
        <View style={styles.menuDotPlaceholder} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  menuPanel: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "86%",
    maxWidth: 320,
    backgroundColor: theme.colors.sidebarCanvas,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    borderBottomRightRadius: theme.spacing.sm,
    zIndex: 1,
    elevation: 6,
  },
  menuTitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.title20,
    color: theme.colors.charcoal,
    marginBottom: theme.spacing.md,
  },
  menuLinkRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 28,
  },
  menuLink: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.size.body18,
    color: theme.colors.charcoal,
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#E3E6EB",
    marginTop: 14,
    marginBottom: 13,
  },
  menuDividerShort: {
    width: 96,
  },
  menuDividerLong: {
    width: 156,
  },
  menuSpacer: {
    height: 28,
  },
  menuDot: {
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: theme.colors.messageDot,
  },
  menuDotPlaceholder: {
    width: 11,
    height: 11,
    opacity: 0,
  },
});
