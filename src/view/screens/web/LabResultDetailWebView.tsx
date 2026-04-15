import { FIGMA_LAB_ASSETS } from "@/constants/figmaAssets";
import { FIGMA_LAB_RESULT_DETAIL } from "@/constants/figmaLabResultDetailLayout";
import { WEB_HOME } from "@/constants/layout";
import { MOCK_PORTAL_SUMMARY } from "@/constants/mockData";
import { ROUTES } from "@/constants/navigation";
import { navigateFromMenuId } from "@/navigation/menuNavigation";
import type { RootStackParamList } from "@/navigation/types";
import { theme } from "@/theme";
import { Sidebar } from "@/view/components/portal/Sidebar";
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

export const LabResultDetailWebView = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.page}>
      <View style={styles.frame}>
        <Sidebar
          summary={MOCK_PORTAL_SUMMARY}
          selectedNavId="lab"
          onNavItemPress={(id) => navigateFromMenuId(navigation, id)}
        />

        <ScrollView
          style={styles.main}
          contentContainerStyle={styles.mainContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topRow}>
            <Pressable
              accessibilityRole="button"
              onPress={() => navigation.navigate(ROUTES.LAB_RESULTS)}
            >
              <Text style={styles.backLink}>{"< Back"}</Text>
            </Pressable>
            <View style={styles.topRight}>
              <Text style={styles.prompt}>Any questions? Ask your provider</Text>
              <Pressable accessibilityRole="button" style={styles.messageBtn}>
                <Text style={styles.messageBtnLabel}>Message</Text>
              </Pressable>
            </View>
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
  },
  mainContent: {
    paddingTop: FIGMA_LAB_RESULT_DETAIL.contentPaddingTop,
    paddingLeft: FIGMA_LAB_RESULT_DETAIL.contentPaddingLeft,
    paddingRight: FIGMA_LAB_RESULT_DETAIL.contentPaddingRight,
    paddingBottom: theme.spacing.xxl,
    flexGrow: 1,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.md,
  },
  backLink: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.title20,
    lineHeight: 24,
    color: theme.colors.royal400,
  },
  topRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  prompt: {
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.body16,
    lineHeight: 20,
    color: theme.colors.charcoal,
  },
  messageBtn: {
    width: FIGMA_LAB_RESULT_DETAIL.messageButtonWidth,
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
    marginTop: FIGMA_LAB_RESULT_DETAIL.topRowToTitleGap,
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
    marginTop: FIGMA_LAB_RESULT_DETAIL.metaToMetricsGap,
    width: "100%",
    maxWidth: 633,
  },
  metricRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: FIGMA_LAB_RESULT_DETAIL.metricRowHeight,
    gap: theme.spacing.md,
  },
  metricCopy: {
    flex: 1,
    minWidth: 0,
  },
  metricLabel: {
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.title20,
    lineHeight: 24,
    color: theme.colors.charcoal,
  },
  metricRange: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body18,
    lineHeight: 24,
    color: theme.colors.charcoal,
  },
  metricValueBox: {
    width: FIGMA_LAB_RESULT_DETAIL.metricValueBoxWidth,
    minHeight: FIGMA_LAB_RESULT_DETAIL.metricValueBoxHeight,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  metricOk: {
    backgroundColor: "#D9ECDC",
  },
  metricWarn: {
    backgroundColor: "#FFF1DD",
  },
  metricValue: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.title20,
    lineHeight: 24,
    color: theme.colors.charcoal,
  },
  metricStatus: {
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.body16,
    lineHeight: 20,
    color: theme.colors.charcoal,
  },
  metricDivider: {
    width: FIGMA_LAB_RESULT_DETAIL.metricDividerWidth,
    height: 1,
    backgroundColor: theme.colors.borderCard,
  },
  historyTitle: {
    marginTop: FIGMA_LAB_RESULT_DETAIL.historyTopGap,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.title20,
    lineHeight: 24,
    color: theme.colors.charcoal,
  },
  chart: {
    marginTop: 8,
    width: FIGMA_LAB_RESULT_DETAIL.chartWidth,
    height: FIGMA_LAB_RESULT_DETAIL.chartHeight,
    resizeMode: "contain",
    maxWidth: "100%",
  },
});
