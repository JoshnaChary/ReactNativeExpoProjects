import { MOCK_APPOINTMENTS } from "@/constants/appointmentsMockData";
import { FIGMA_APPOINTMENTS } from "@/constants/figmaAppointmentsLayout";
import { WEB_HOME } from "@/constants/layout";
import { ROUTES } from "@/constants/navigation";
import type { RootStackParamList } from "@/navigation/types";
import { theme } from "@/theme";
import { AppointmentRow } from "@/view/components/appointments/AppointmentRow";
import { Sidebar } from "@/view/components/portal/Sidebar";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import {
  Pressable,
  type LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MOCK_PORTAL_SUMMARY } from "@/constants/mockData";
import type { AppointmentTab } from "@/model/AppointmentItem";

export const AppointmentsWebView = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<AppointmentTab>("upcoming");
  const [tabMetrics, setTabMetrics] = useState<Record<AppointmentTab, { x: number; width: number }>>(
    {
      upcoming: { x: 0, width: FIGMA_APPOINTMENTS.tabUnderlineWidth },
      past: { x: 0, width: FIGMA_APPOINTMENTS.tabUnderlinePastWidth },
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
    <View style={styles.page}>
      <View style={styles.frame}>
        <Sidebar
          summary={MOCK_PORTAL_SUMMARY}
          selectedNavId="appointments"
          onNavItemPress={(id) => {
            if (id === "home") {
              navigation.navigate(ROUTES.HOME);
              return;
            }
            if (id === "messages") {
              navigation.navigate(ROUTES.MESSAGING);
            }
          }}
        />

        <View style={styles.main}>
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
              <Text
                style={activeTab === "upcoming" ? styles.tabActive : styles.tabInactive}
              >
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
              <AppointmentRow key={appointment.id} appointment={appointment} />
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
    paddingTop: FIGMA_APPOINTMENTS.contentPaddingTop,
    paddingLeft: FIGMA_APPOINTMENTS.contentPaddingLeft,
    paddingRight: FIGMA_APPOINTMENTS.contentPaddingRight,
    paddingBottom: theme.spacing.xxl,
    backgroundColor: theme.colors.white,
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
  },
  requestBtn: {
    width: FIGMA_APPOINTMENTS.requestButtonWidth,
    minHeight: FIGMA_APPOINTMENTS.requestButtonHeight,
    backgroundColor: theme.colors.royal300,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  requestBtnLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: 19,
    color: theme.colors.white,
  },
  tabRow: {
    marginTop: FIGMA_APPOINTMENTS.titleToTabsGap,
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
    position: "absolute",
    bottom: 0,
    height: FIGMA_APPOINTMENTS.tabUnderlineHeight,
    backgroundColor: theme.colors.royal300,
  },
  list: {
    marginTop: FIGMA_APPOINTMENTS.tabsToCardsGap,
    gap: FIGMA_APPOINTMENTS.cardsGap,
    width: "100%",
    maxWidth: 1091,
  },
});
