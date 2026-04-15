import { MOCK_BILLING_ITEMS } from "@/constants/billingMockData";
import { FIGMA_BILLING } from "@/constants/figmaBillingLayout";
import { WEB_HOME } from "@/constants/layout";
import { MOCK_PORTAL_SUMMARY } from "@/constants/mockData";
import { navigateFromMenuId } from "@/navigation/menuNavigation";
import type { RootStackParamList } from "@/navigation/types";
import { theme } from "@/theme";
import { BillingRow } from "@/view/components/billing/BillingRow";
import { Sidebar } from "@/view/components/portal/Sidebar";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const BillingWebView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<"outstanding" | "history" | "payment">(
    "outstanding",
  );

  return (
    <View style={styles.page}>
      <View style={styles.frame}>
        <Sidebar
          summary={MOCK_PORTAL_SUMMARY}
          selectedNavId="billing"
          onNavItemPress={(id) => navigateFromMenuId(navigation, id)}
        />

        <View style={styles.main}>
          <Text style={styles.pageTitle}>Billing</Text>
          <View style={styles.tabRow}>
            <TouchableOpacity accessibilityRole="button" activeOpacity={0.8} onPress={() => setActiveTab("outstanding")}>
              <Text style={activeTab === "outstanding" ? styles.tabActive : styles.tabInactive}>
                Outstanding
              </Text>
            </TouchableOpacity>
            <TouchableOpacity accessibilityRole="button" activeOpacity={0.8} onPress={() => setActiveTab("history")}>
              <Text style={activeTab === "history" ? styles.tabActive : styles.tabInactive}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity accessibilityRole="button" activeOpacity={0.8} onPress={() => setActiveTab("payment")}>
              <Text style={activeTab === "payment" ? styles.tabActive : styles.tabInactive}>Payment</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.tabIndicator,
              activeTab === "outstanding"
                ? styles.indicatorOutstanding
                : activeTab === "history"
                  ? styles.indicatorHistory
                  : styles.indicatorPayment,
            ]}
          />

          {activeTab === "outstanding" ? (
            <>
              <View style={styles.summaryRow}>
                <View style={styles.summaryBlock}>
                  <Text style={styles.summaryLabel}>Total outstanding balance:</Text>
                  <Text style={styles.summaryBig}>$360.00</Text>
                </View>
                <View style={styles.summaryBlock}>
                  <Text style={styles.summaryLabel}>Last payment</Text>
                  <Text style={styles.summarySmall}>March 4, 2026</Text>
                </View>
              </View>
              <View style={styles.list}>
                {MOCK_BILLING_ITEMS.map((item) => (
                  <BillingRow key={item.id} item={item} />
                ))}
              </View>
            </>
          ) : (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No records in this tab yet.</Text>
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
    paddingTop: FIGMA_BILLING.contentPaddingTop,
    paddingRight: FIGMA_BILLING.contentPaddingRight,
    paddingBottom: 36,
  },
  pageTitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.title20,
    lineHeight: 24,
    color: theme.colors.charcoal,
  },
  tabRow: {
    marginTop: FIGMA_BILLING.tabsTopGap,
    flexDirection: "row",
    alignItems: "center",
    gap: 22,
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
    height: FIGMA_BILLING.tabsUnderlineHeight,
    backgroundColor: theme.colors.royal300,
  },
  indicatorOutstanding: {
    width: FIGMA_BILLING.tabsUnderlineWidth,
  },
  indicatorHistory: {
    width: 64,
    marginLeft: 145,
  },
  indicatorPayment: {
    width: 78,
    marginLeft: 229,
  },
  summaryRow: {
    marginTop: FIGMA_BILLING.summaryTopGap,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 70,
  },
  summaryBlock: {
    minWidth: 250,
  },
  summaryLabel: {
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.body16,
    lineHeight: 22,
    color: theme.colors.charcoal,
  },
  summaryBig: {
    marginTop: 10,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 42,
    lineHeight: 50,
    color: theme.colors.charcoal,
  },
  summarySmall: {
    marginTop: 10,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 24,
    lineHeight: 30,
    color: theme.colors.charcoal,
  },
  list: {
    marginTop: FIGMA_BILLING.cardsTopGap,
    gap: FIGMA_BILLING.cardGap,
  },
  empty: {
    marginTop: 28,
    borderWidth: 1,
    borderColor: theme.colors.ice200,
    minHeight: 104,
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
