import { MOCK_ACCOUNT_SETTINGS } from "@/constants/accountMockData";
import { FIGMA_ACCOUNT } from "@/constants/figmaAccountLayout";
import { MOBILE_LAYOUT } from "@/constants/layout";
import { MOCK_PORTAL_SUMMARY } from "@/constants/mockData";
import { navigateFromMenuId } from "@/navigation/menuNavigation";
import type { RootStackParamList } from "@/navigation/types";
import { theme } from "@/theme";
import { AccountSettingRow } from "@/view/components/account/AccountSettingRow";
import { MobileScreenScaffold } from "@/view/components/mobile/MobileScreenScaffold";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const AccountMobileView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<"settings" | "notifications" | "delegates">(
    "settings",
  );

  return (
    <MobileScreenScaffold
      title="Account"
      menuTitle={MOCK_PORTAL_SUMMARY.memberPortalTitle}
      navItems={MOCK_PORTAL_SUMMARY.sidebarNav}
      selectedNavId="account"
      onSelectMenuItem={(id) => navigateFromMenuId(navigation, id)}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Account</Text>
        <View style={styles.tabRow}>
          <TouchableOpacity accessibilityRole="button" activeOpacity={0.8} onPress={() => setActiveTab("settings")}>
            <Text style={activeTab === "settings" ? styles.tabActive : styles.tabInactive}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity accessibilityRole="button" activeOpacity={0.8} onPress={() => setActiveTab("notifications")}>
            <Text style={activeTab === "notifications" ? styles.tabActive : styles.tabInactive}>
              Notifications
            </Text>
          </TouchableOpacity>
          <TouchableOpacity accessibilityRole="button" activeOpacity={0.8} onPress={() => setActiveTab("delegates")}>
            <Text style={activeTab === "delegates" ? styles.tabActive : styles.tabInactive}>
              Delegate/Care Givers
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.tabIndicator,
            activeTab === "settings"
              ? styles.indicatorSettings
              : activeTab === "notifications"
                ? styles.indicatorNotifications
                : styles.indicatorDelegates,
          ]}
        />

        {activeTab === "settings" ? (
          <View style={styles.list}>
            {MOCK_ACCOUNT_SETTINGS.map((item) => (
              <AccountSettingRow key={item.id} item={item} compact />
            ))}
          </View>
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No items in this tab yet.</Text>
          </View>
        )}
      </ScrollView>
    </MobileScreenScaffold>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingTop: 20,
    paddingHorizontal: MOBILE_LAYOUT.horizontalPadding,
    paddingBottom: theme.spacing.xxl,
  },
  pageTitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.title20,
    lineHeight: 24,
    color: theme.colors.charcoal,
  },
  tabRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  tabActive: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body18,
    lineHeight: 22,
    color: theme.colors.charcoal,
  },
  tabInactive: {
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.body18,
    lineHeight: 22,
    color: theme.colors.charcoal,
  },
  tabIndicator: {
    marginTop: 4,
    height: FIGMA_ACCOUNT.tabsUnderlineHeight,
    backgroundColor: theme.colors.royal300,
  },
  indicatorSettings: {
    width: 68,
  },
  indicatorNotifications: {
    width: 92,
    marginLeft: 80,
  },
  indicatorDelegates: {
    width: 142,
    marginLeft: 184,
  },
  list: {
    marginTop: 18,
    gap: 10,
  },
  empty: {
    marginTop: 18,
    borderWidth: 1,
    borderColor: theme.colors.ice200,
    minHeight: 94,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  emptyText: {
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.body16,
    lineHeight: 20,
    color: theme.colors.charcoal,
  },
});
