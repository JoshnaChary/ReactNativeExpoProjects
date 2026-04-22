import { MOCK_BILLING_ITEMS } from "@/constants/billingMockData";
import { FIGMA_BILLING } from "@/constants/figmaBillingLayout";
import { MOBILE_LAYOUT } from "@/constants/layout";
import { MOCK_PORTAL_SUMMARY } from "@/constants/mockData";
import { navigateFromMenuId } from "@/navigation/menuNavigation";
import type { RootStackParamList } from "@/navigation/types";
import { theme } from "@/theme";
import { BillingRow } from "@/view/components/billing/BillingRow";
import { MobileScreenScaffold } from "@/view/components/mobile/MobileScreenScaffold";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const BillingMobileView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<"outstanding" | "history" | "payment">(
    "outstanding",
  );
  const tabIndicatorStyle = {
    outstanding: styles.indicatorOutstanding,
    history: styles.indicatorHistory,
    payment: styles.indicatorPayment,
  }[activeTab];

  return (
    <MobileScreenScaffold
      title="Billing"
      menuTitle={MOCK_PORTAL_SUMMARY.memberPortalTitle}
      navItems={MOCK_PORTAL_SUMMARY.sidebarNav}
      selectedNavId="billing"
      onSelectMenuItem={(id) => navigateFromMenuId(navigation, id)}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
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
        <View style={[styles.tabIndicator, tabIndicatorStyle]} />

        {activeTab === "outstanding" ? (
          <>
            <View style={styles.summaryWrap}>
              <Text style={styles.summaryLabel}>Total outstanding balance:</Text>
              <Text style={styles.summaryBig}>$360.00</Text>
              <Text style={styles.summaryLabel}>Last payment</Text>
              <Text style={styles.summarySmall}>March 4, 2026</Text>
            </View>
            <View style={styles.list}>
              {MOCK_BILLING_ITEMS.map((item) => (
                <BillingRow key={item.id} item={item} compact />
              ))}
            </View>
          </>
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No records in this tab yet.</Text>
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
    gap: 14,
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
    height: FIGMA_BILLING.tabsUnderlineHeight,
    backgroundColor: theme.colors.royal300,
  },
  indicatorOutstanding: {
    width: 92,
  },
  indicatorHistory: {
    width: 54,
    marginLeft: 104,
  },
  indicatorPayment: {
    width: 66,
    marginLeft: 173,
  },
  summaryWrap: {
    marginTop: 24,
    gap: 4,
  },
  summaryLabel: {
    marginTop: 8,
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.body16,
    lineHeight: 20,
    color: theme.colors.charcoal,
  },
  summaryBig: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 36,
    lineHeight: 44,
    color: theme.colors.charcoal,
  },
  summarySmall: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.title20,
    lineHeight: 24,
    color: theme.colors.charcoal,
  },
  list: {
    marginTop: 16,
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
