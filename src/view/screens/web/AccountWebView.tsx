import { MOCK_ACCOUNT_SETTINGS } from "@/constants/accountMockData";
import { FIGMA_ACCOUNT } from "@/constants/figmaAccountLayout";
import { WEB_HOME } from "@/constants/layout";
import { MOCK_PORTAL_SUMMARY } from "@/constants/mockData";
import { navigateFromMenuId } from "@/navigation/menuNavigation";
import type { RootStackParamList } from "@/navigation/types";
import { theme } from "@/theme";
import { AccountSettingRow } from "@/view/components/account/AccountSettingRow";
import { Sidebar } from "@/view/components/portal/Sidebar";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const AccountWebView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<"settings" | "notifications" | "delegates">(
    "settings",
  );

  return (
    <View style={styles.page}>
      <View style={styles.frame}>
        <Sidebar
          summary={MOCK_PORTAL_SUMMARY}
          selectedNavId="account"
          onNavItemPress={(id) => navigateFromMenuId(navigation, id)}
        />

        <View style={styles.main}>
          <Text style={styles.pageTitle}>Account</Text>

          <View style={styles.tabRow}>
            <TouchableOpacity accessibilityRole="button" activeOpacity={0.8} onPress={() => setActiveTab("settings")}>
              <Text style={activeTab === "settings" ? styles.tabActive : styles.tabInactive}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityRole="button"
              activeOpacity={0.8}
              onPress={() => setActiveTab("notifications")}
            >
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
                <AccountSettingRow key={item.id} item={item} />
              ))}
            </View>
          ) : (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No items in this tab yet.</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: "center",
  },
  frame: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    maxWidth: WEB_HOME.frameWidth,
    alignSelf: "stretch",
    gap: WEB_HOME.mainToSidebarGap,
  },
  main: {
    flex: 1,
    minWidth: 0,
    backgroundColor: theme.colors.white,
    paddingTop: FIGMA_ACCOUNT.contentPaddingTop,
    paddingRight: FIGMA_ACCOUNT.contentPaddingRight,
    paddingBottom: 36,
  },
  pageTitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.title20,
    lineHeight: 24,
    color: theme.colors.charcoal,
  },
  tabRow: {
    marginTop: FIGMA_ACCOUNT.tabsTopGap,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  tabActive: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.title20,
    lineHeight: 24,
    color: theme.colors.charcoal,
  },
  tabInactive: {
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.title20,
    lineHeight: 24,
    color: theme.colors.charcoal,
  },
  tabIndicator: {
    marginTop: 4,
    height: FIGMA_ACCOUNT.tabsUnderlineHeight,
    backgroundColor: theme.colors.royal300,
  },
  indicatorSettings: {
    width: FIGMA_ACCOUNT.tabsUnderlineWidth,
  },
  indicatorNotifications: {
    width: 108,
    marginLeft: 96,
  },
  indicatorDelegates: {
    width: 170,
    marginLeft: 218,
  },
  list: {
    marginTop: FIGMA_ACCOUNT.cardsTopGap,
    maxWidth: 562,
    gap: FIGMA_ACCOUNT.cardGap,
  },
  empty: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: theme.colors.ice200,
    minHeight: 104,
    maxWidth: 562,
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
