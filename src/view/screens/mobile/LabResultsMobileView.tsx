import { FIGMA_LAB_RESULTS } from "@/constants/figmaLabResultsLayout";
import { MOBILE_LAYOUT } from "@/constants/layout";
import { MOCK_LAB_RESULTS } from "@/constants/labResultsMockData";
import { MOCK_PORTAL_SUMMARY } from "@/constants/mockData";
import { ROUTES } from "@/constants/navigation";
import { navigateFromMenuId } from "@/navigation/menuNavigation";
import type { LabResultsTab } from "@/model/LabResultItem";
import type { RootStackParamList } from "@/navigation/types";
import { theme } from "@/theme";
import { LabResultRow } from "@/view/components/lab/LabResultRow";
import { MobileScreenScaffold } from "@/view/components/mobile/MobileScreenScaffold";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import {
  type LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const LabResultsMobileView = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<LabResultsTab>("recent");
  const [tabMetrics, setTabMetrics] = useState<Record<LabResultsTab, { x: number; width: number }>>(
    {
      recent: { x: 0, width: 56 },
      past: { x: 0, width: 40 },
    },
  );

  const tabItems = useMemo(
    () => MOCK_LAB_RESULTS.filter((item) => item.tab === activeTab),
    [activeTab],
  );
  const waitingItems = tabItems.filter((item) => item.section === "waiting");
  const completedItems = tabItems.filter((item) => item.section === "completed");

  const onTabLayout = (tab: LabResultsTab) => (event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    setTabMetrics((prev) => {
      const current = prev[tab];
      if (current.x === x && current.width === width) return prev;
      return { ...prev, [tab]: { x, width } };
    });
  };

  return (
    <MobileScreenScaffold
      title="Lab results"
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
        <Text style={styles.pageTitle}>Lab Results</Text>

        <View style={styles.tabRow}>
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.8}
            style={styles.tabButton}
            onLayout={onTabLayout("recent")}
            onPress={() => setActiveTab("recent")}
          >
            <Text style={activeTab === "recent" ? styles.tabActive : styles.tabInactive}>
              Recent
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.8}
            style={styles.tabButton}
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

        {activeTab === "recent" ? (
          <>
            {waitingItems.length > 0 ? (
              <View style={styles.sectionWrap}>
                <Text style={styles.sectionLabel}>Waiting for results</Text>
                <View style={styles.cards}>
                  {waitingItems.map((item) => (
                    <LabResultRow
                      key={item.id}
                      item={item}
                      compact
                      onPressViewResults={() => navigation.navigate(ROUTES.LAB_RESULT_DETAIL)}
                    />
                  ))}
                </View>
              </View>
            ) : null}

            {completedItems.length > 0 ? (
              <View style={styles.sectionWrap}>
                <Text style={styles.sectionLabel}>Completed</Text>
                <View style={styles.cards}>
                  {completedItems.map((item) => (
                    <LabResultRow
                      key={item.id}
                      item={item}
                      compact
                      onPressViewResults={() => navigation.navigate(ROUTES.LAB_RESULT_DETAIL)}
                    />
                  ))}
                </View>
              </View>
            ) : null}
          </>
        ) : (
          <View style={styles.pastWrap}>
            <View style={styles.cards}>
              {tabItems.map((item) => (
                <LabResultRow
                  key={item.id}
                  item={item}
                  compact
                  onPressViewResults={() => navigation.navigate(ROUTES.LAB_RESULT_DETAIL)}
                />
              ))}
            </View>
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
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    alignSelf: "flex-start",
    position: "relative",
    paddingBottom: 6,
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
    position: "absolute",
    bottom: 0,
    height: FIGMA_LAB_RESULTS.tabUnderlineHeight,
    backgroundColor: theme.colors.royal300,
  },
  sectionWrap: {
    marginTop: 16,
  },
  sectionLabel: {
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.charcoal,
  },
  cards: {
    marginTop: 8,
    gap: 10,
  },
  pastWrap: {
    marginTop: 16,
  },
});
