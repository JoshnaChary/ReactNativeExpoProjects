import type { SidebarNavItem } from "@/model/PatientPortalSummary";
import { theme } from "@/theme";
import type { ReactNode } from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { AppMenuDrawer } from "@/view/components/mobile/AppMenuDrawer";
import { AppTopBar } from "@/view/components/mobile/AppTopBar";

type MobileScreenScaffoldProps = {
  title: string;
  menuTitle: string;
  navItems: SidebarNavItem[];
  selectedNavId?: string;
  onSelectMenuItem: (id: string) => void;
  rightAction?: ReactNode;
  children: ReactNode;
};

/**
 * Shared mobile scaffold with common top bar and menu drawer.
 * Use this for all mobile screens to keep header/menu behavior consistent.
 */
export const MobileScreenScaffold = ({
  title,
  menuTitle,
  navItems,
  selectedNavId,
  onSelectMenuItem,
  rightAction,
  children,
}: MobileScreenScaffoldProps) => {
  const insets = useSafeAreaInsets();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right", "bottom"]}>
      <AppTopBar title={title} onMenuPress={() => setMenuOpen(true)} rightAction={rightAction} />
      <View style={styles.content}>{children}</View>

      <AppMenuDrawer
        visible={menuOpen}
        title={menuTitle}
        navItems={navItems}
        selectedNavId={selectedNavId}
        topInset={insets.top}
        onClose={() => setMenuOpen(false)}
        onSelectItem={(id) => {
          setMenuOpen(false);
          onSelectMenuItem(id);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});
