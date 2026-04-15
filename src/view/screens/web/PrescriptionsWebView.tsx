import { FIGMA_PRESCRIPTIONS } from "@/constants/figmaPrescriptionsLayout";
import { WEB_HOME } from "@/constants/layout";
import { MOCK_PORTAL_SUMMARY } from "@/constants/mockData";
import { ROUTES } from "@/constants/navigation";
import { MOCK_PRESCRIPTIONS } from "@/constants/prescriptionsMockData";
import type { PrescriptionTab } from "@/model/PrescriptionItem";
import type { RootStackParamList } from "@/navigation/types";
import { theme } from "@/theme";
import { PrescriptionRow } from "@/view/components/prescriptions/PrescriptionRow";
import { Sidebar } from "@/view/components/portal/Sidebar";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const PrescriptionsWebView = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<PrescriptionTab>("active");

  const prescriptions = useMemo(
    () => MOCK_PRESCRIPTIONS.filter((p) => p.tab === activeTab),
    [activeTab],
  );

  return (
    <View style={styles.page}>
      <View style={styles.frame}>
        <Sidebar
          summary={MOCK_PORTAL_SUMMARY}
          selectedNavId="prescriptions"
          onNavItemPress={(id) => {
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
        />

        <View style={styles.main}>
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
              <PrescriptionRow key={item.id} item={item} />
            ))}
          </View>
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
    paddingTop: FIGMA_PRESCRIPTIONS.contentPaddingTop,
    paddingLeft: FIGMA_PRESCRIPTIONS.contentPaddingLeft,
    paddingRight: FIGMA_PRESCRIPTIONS.contentPaddingRight,
    paddingBottom: theme.spacing.xxl,
  },
  pageTitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.title20,
    lineHeight: 24,
    color: theme.colors.charcoal,
  },
  tabRow: {
    marginTop: FIGMA_PRESCRIPTIONS.titleToTabsGap,
    flexDirection: "row",
    alignItems: "center",
    gap: 28,
  },
  tabButton: {
    minHeight: 24,
    justifyContent: "center",
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
    height: FIGMA_PRESCRIPTIONS.tabUnderlineHeight,
    backgroundColor: theme.colors.royal300,
  },
  tabIndicatorActive: {
    width: FIGMA_PRESCRIPTIONS.activeUnderlineWidth,
  },
  tabIndicatorInactive: {
    width: 78,
    marginLeft: 98,
  },
  list: {
    marginTop: FIGMA_PRESCRIPTIONS.tabsToCardsGap,
    gap: FIGMA_PRESCRIPTIONS.cardsGap,
    width: "100%",
    maxWidth: 1091,
  },
});
