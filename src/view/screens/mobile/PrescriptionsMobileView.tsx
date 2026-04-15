import { FIGMA_PRESCRIPTIONS } from "@/constants/figmaPrescriptionsLayout";
import { MOBILE_LAYOUT } from "@/constants/layout";
import { MOCK_PORTAL_SUMMARY } from "@/constants/mockData";
import { ROUTES } from "@/constants/navigation";
import { MOCK_PRESCRIPTIONS } from "@/constants/prescriptionsMockData";
import type { PrescriptionTab } from "@/model/PrescriptionItem";
import type { RootStackParamList } from "@/navigation/types";
import { theme } from "@/theme";
import { MobileScreenScaffold } from "@/view/components/mobile/MobileScreenScaffold";
import { PrescriptionRow } from "@/view/components/prescriptions/PrescriptionRow";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const PrescriptionsMobileView = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<PrescriptionTab>("active");

  const prescriptions = useMemo(
    () => MOCK_PRESCRIPTIONS.filter((item) => item.tab === activeTab),
    [activeTab],
  );

  return (
    <MobileScreenScaffold
      title="Prescriptions"
      menuTitle={MOCK_PORTAL_SUMMARY.memberPortalTitle}
      navItems={MOCK_PORTAL_SUMMARY.sidebarNav}
      selectedNavId="prescriptions"
      onSelectMenuItem={(id) => {
        if (id === "home") {
          navigation.navigate(ROUTES.HOME);
          return;
        }
        if (id === "messages") {
          navigation.navigate(ROUTES.MESSAGING);
          return;
        }
        if (id === "appointments") {
          navigation.navigate(ROUTES.APPOINTMENTS);
        }
      }}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Your Prescriptions</Text>

        <View style={styles.tabRow}>
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.8}
            style={styles.tabButton}
            onPress={() => setActiveTab("active")}
          >
            <Text style={activeTab === "active" ? styles.tabActive : styles.tabInactive}>
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.8}
            style={styles.tabButton}
            onPress={() => setActiveTab("inactive")}
          >
            <Text style={activeTab === "inactive" ? styles.tabActive : styles.tabInactive}>
              Inactive
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.tabIndicator,
            activeTab === "active" ? styles.tabIndicatorActive : styles.tabIndicatorInactive,
          ]}
        />

        <View style={styles.list}>
          {prescriptions.map((item) => (
            <PrescriptionRow key={item.id} item={item} compact />
          ))}
        </View>
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
    gap: 24,
  },
  tabButton: {
    minHeight: 24,
    justifyContent: "center",
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
    height: FIGMA_PRESCRIPTIONS.tabUnderlineHeight,
    backgroundColor: theme.colors.royal300,
  },
  tabIndicatorActive: {
    width: 52,
  },
  tabIndicatorInactive: {
    width: 64,
    marginLeft: 74,
  },
  list: {
    marginTop: 16,
    gap: 10,
  },
});
