import { MOCK_APPOINTMENTS } from "@/constants/appointmentsMockData";
import { FIGMA_APPOINTMENTS } from "@/constants/figmaAppointmentsLayout";
import { MOBILE_LAYOUT } from "@/constants/layout";
import { MOCK_PORTAL_SUMMARY } from "@/constants/mockData";
import { navigateFromMenuId } from "@/navigation/menuNavigation";
import type { RootStackParamList } from "@/navigation/types";
import { theme } from "@/theme";
import { AppointmentRow } from "@/view/components/appointments/AppointmentRow";
import { MobileScreenScaffold } from "@/view/components/mobile/MobileScreenScaffold";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import {
  Pressable,
  type LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { AppointmentTab } from "@/model/AppointmentItem";

export const AppointmentsMobileView = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<AppointmentTab>("upcoming");
  const [tabMetrics, setTabMetrics] = useState<Record<AppointmentTab, { x: number; width: number }>>(
    {
      upcoming: { x: 0, width: 90 },
      past: { x: 0, width: 40 },
    },
  );
  const appointments = useMemo(
    () => MOCK_APPOINTMENTS.filter((item) => item.tab === activeTab),
    [activeTab],
  );

  const onTabLayout = (tab: AppointmentTab) => (event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    setTabMetrics((prev) => {
      const current = prev[tab];
      if (current.x === x && current.width === width) return prev;
      return { ...prev, [tab]: { x, width } };
    });
  };

  return (
    <MobileScreenScaffold
      title="Appointments"
      menuTitle={MOCK_PORTAL_SUMMARY.memberPortalTitle}
      navItems={MOCK_PORTAL_SUMMARY.sidebarNav}
      selectedNavId="appointments"
      onSelectMenuItem={(id) => navigateFromMenuId(navigation, id)}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Text style={styles.pageTitle}>Appointments</Text>
          <Pressable accessibilityRole="button" style={styles.requestBtn}>
            <Text style={styles.requestBtnLabel}>Request Appointment</Text>
          </Pressable>
        </View>

        <View style={styles.tabRow}>
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.8}
            style={styles.tabButton}
            hitSlop={8}
            onLayout={onTabLayout("upcoming")}
            onPress={() => setActiveTab("upcoming")}
          >
            <Text style={activeTab === "upcoming" ? styles.tabActive : styles.tabInactive}>
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.8}
            style={styles.tabButton}
            hitSlop={8}
            onLayout={onTabLayout("past")}
            onPress={() => setActiveTab("past")}
          >
            <Text style={activeTab === "past" ? styles.tabActive : styles.tabInactive}>
              Past
            </Text>
          </TouchableOpacity>
          <View
            pointerEvents="none"
            style={[
              styles.tabIndicator,
              {
                left: tabMetrics[activeTab].x,
                width: tabMetrics[activeTab].width,
              },
            ]}
          />
        </View>

        <View style={styles.list}>
          {appointments.map((appointment) => (
            <AppointmentRow key={appointment.id} appointment={appointment} compact />
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
    paddingTop: 24,
    paddingHorizontal: MOBILE_LAYOUT.horizontalPadding,
    paddingBottom: theme.spacing.xxl,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.md,
  },
  pageTitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.title20,
    lineHeight: 24,
    color: theme.colors.charcoal,
    flexShrink: 1,
  },
  requestBtn: {
    minHeight: FIGMA_APPOINTMENTS.requestButtonHeight,
    backgroundColor: theme.colors.royal300,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    minWidth: 168,
  },
  requestBtnLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: 19,
    color: theme.colors.white,
  },
  tabRow: {
    marginTop: 26,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    alignSelf: "flex-start",
    position: "relative",
    paddingBottom: 6,
  },
  tabButton: {
    minHeight: 28,
    justifyContent: "center",
    paddingVertical: 0,
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
    position: "absolute",
    bottom: 0,
    height: FIGMA_APPOINTMENTS.tabUnderlineHeight,
    backgroundColor: theme.colors.royal300,
  },
  list: {
    marginTop: 20,
    gap: 10,
  },
});
