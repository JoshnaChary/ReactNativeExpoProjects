import { FIGMA_LAB_ASSETS } from "@/constants/figmaAssets";
import { FIGMA_LAB_RESULT_DETAIL } from "@/constants/figmaLabResultDetailLayout";
import { MOBILE_LAYOUT } from "@/constants/layout";
import { MOCK_PORTAL_SUMMARY } from "@/constants/mockData";
import { ROUTES } from "@/constants/navigation";
import { navigateFromMenuId } from "@/navigation/menuNavigation";
import type { RootStackParamList } from "@/navigation/types";
import { theme } from "@/theme";
import { MobileScreenScaffold } from "@/view/components/mobile/MobileScreenScaffold";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const METRICS = [
  {
    id: "m-total",
    label: "Total cholesterol:",
    range: "Normal range: less than 200 mg/dL",
    value: "188 mg/dL",
    status: "within range",
    tone: "ok" as const,
  },
  {
    id: "m-hdl",
    label: "HDL - Good cholesterol",
    range: "Normal range: 40 - 60 mg/DL",
    value: "52 mg/dL",
    status: "within range",
    tone: "ok" as const,
  },
  {
    id: "m-ldl",
    label: "LCL - Bad cholesterol",
    range: "Normal range: less than 100 mg/dL",
    value: "118 mg/dL",
    status: "above range",
    tone: "warn" as const,
  },
];

export const LabResultDetailMobileView = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <MobileScreenScaffold
      title="Lab Results"
      menuTitle={MOCK_PORTAL_SUMMARY.memberPortalTitle}
      navItems={MOCK_PORTAL_SUMMARY.sidebarNav}
      selectedNavId="lab"
      onSelectMenuItem={(id) => navigateFromMenuId(navigation, id)}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate(ROUTES.LAB_RESULTS)}
          >
            <Text style={styles.backLink}>{"< Back"}</Text>
          </Pressable>
          <Pressable accessibilityRole="button" style={styles.messageBtn}>
            <Text style={styles.messageBtnLabel}>Message</Text>
          </Pressable>
        </View>

        <Text style={styles.title}>Lipid panel</Text>
        <Text style={styles.meta}>Ordered by: Dr. J. Kim</Text>
        <Text style={styles.meta}>Sample collected: April 3, 2026</Text>
        <Text style={styles.meta}>Lab: ABC labs</Text>

        <View style={styles.metrics}>
          {METRICS.map((metric, index) => (
            <View key={metric.id}>
              <View style={styles.metricRow}>
                <View style={styles.metricCopy}>
                  <Text style={styles.metricLabel}>{metric.label}</Text>
                  <Text style={styles.metricRange}>{metric.range}</Text>
                </View>
                <View
                  style={[
                    styles.metricValueBox,
                    metric.tone === "ok" ? styles.metricOk : styles.metricWarn,
                  ]}
                >
                  <Text style={styles.metricValue}>{metric.value}</Text>
                  <Text style={styles.metricStatus}>{metric.status}</Text>
                </View>
              </View>
              {index < METRICS.length - 1 ? <View style={styles.metricDivider} /> : null}
            </View>
          ))}
        </View>

        <Text style={styles.historyTitle}>History:</Text>
        <Image source={{ uri: FIGMA_LAB_ASSETS.lipidHistoryChart }} style={styles.chart} />
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
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.md,
  },
  backLink: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body18,
    lineHeight: 22,
    color: theme.colors.royal400,
  },
  messageBtn: {
    minWidth: 108,
    minHeight: FIGMA_LAB_RESULT_DETAIL.messageButtonHeight,
    borderWidth: 1,
    borderColor: theme.colors.ice200,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  messageBtnLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: 19,
    color: theme.colors.royal400,
  },
  title: {
    marginTop: 16,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.title20,
    lineHeight: 24,
    color: theme.colors.charcoal,
  },
  meta: {
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.charcoal,
  },
  metrics: {
    marginTop: 24,
    width: "100%",
  },
  metricRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minHeight: 76,
  },
  metricCopy: {
    flex: 1,
    minWidth: 0,
  },
  metricLabel: {
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.body18,
    lineHeight: 22,
    color: theme.colors.charcoal,
  },
  metricRange: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: 20,
    color: theme.colors.charcoal,
  },
  metricValueBox: {
    width: 140,
    minHeight: 72,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  metricOk: {
    backgroundColor: "#D9ECDC",
  },
  metricWarn: {
    backgroundColor: "#FFF1DD",
  },
  metricValue: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body18,
    lineHeight: 22,
    color: theme.colors.charcoal,
  },
  metricStatus: {
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.body16,
    lineHeight: 20,
    color: theme.colors.charcoal,
  },
  metricDivider: {
    marginTop: 8,
    height: 1,
    width: "100%",
    backgroundColor: theme.colors.borderCard,
  },
  historyTitle: {
    marginTop: 18,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.title20,
    lineHeight: 24,
    color: theme.colors.charcoal,
  },
  chart: {
    marginTop: 8,
    width: "100%",
    height: 320,
    resizeMode: "contain",
  },
});
