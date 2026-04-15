import { FIGMA_QUESTIONNAIRES } from "@/constants/figmaQuestionnairesLayout";
import { WEB_HOME } from "@/constants/layout";
import { MOCK_PORTAL_SUMMARY } from "@/constants/mockData";
import { navigateFromMenuId } from "@/navigation/menuNavigation";
import { MOCK_QUESTIONNAIRES } from "@/constants/questionnairesMockData";
import type { QuestionnaireTab } from "@/model/QuestionnaireItem";
import type { RootStackParamList } from "@/navigation/types";
import { theme } from "@/theme";
import { QuestionnaireRow } from "@/view/components/questionnaires/QuestionnaireRow";
import { Sidebar } from "@/view/components/portal/Sidebar";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const QuestionnairesWebView = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<QuestionnaireTab>("todo");

  const items = useMemo(
    () => MOCK_QUESTIONNAIRES.filter((item) => item.tab === activeTab),
    [activeTab],
  );

  return (
    <View style={styles.page}>
      <View style={styles.frame}>
        <Sidebar
          summary={MOCK_PORTAL_SUMMARY}
          selectedNavId="questionnaires"
          onNavItemPress={(id) => navigateFromMenuId(navigation, id)}
        />

        <View style={styles.main}>
          <Text style={styles.pageTitle}>Questionnaires</Text>

          <View style={styles.tabRow}>
            <TouchableOpacity
              accessibilityRole="button"
              activeOpacity={0.8}
              style={styles.tabButton}
              onPress={() => setActiveTab("todo")}
            >
              <Text style={activeTab === "todo" ? styles.tabActive : styles.tabInactive}>
                To Do
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityRole="button"
              activeOpacity={0.8}
              style={styles.tabButton}
              onPress={() => setActiveTab("progress")}
            >
              <Text style={activeTab === "progress" ? styles.tabActive : styles.tabInactive}>
                Progress
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.tabIndicator,
              activeTab === "todo" ? styles.todoIndicator : styles.progressIndicator,
            ]}
          />

          <Text style={styles.helpText}>
            Please complete all the questionnaires that were assigned to you from your care team
            and provider to help track your progress
          </Text>

          <View style={styles.list}>
            {items.map((item) => (
              <QuestionnaireRow key={item.id} item={item} />
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
    paddingTop: FIGMA_QUESTIONNAIRES.contentPaddingTop,
    paddingLeft: FIGMA_QUESTIONNAIRES.contentPaddingLeft,
    paddingRight: FIGMA_QUESTIONNAIRES.contentPaddingRight,
    paddingBottom: theme.spacing.xxl,
  },
  pageTitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.title20,
    lineHeight: 24,
    color: theme.colors.charcoal,
  },
  tabRow: {
    marginTop: FIGMA_QUESTIONNAIRES.titleToTabsGap,
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
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
    height: FIGMA_QUESTIONNAIRES.tabUnderlineHeight,
    backgroundColor: theme.colors.royal300,
  },
  todoIndicator: {
    width: FIGMA_QUESTIONNAIRES.todoUnderlineWidth,
  },
  progressIndicator: {
    width: 68,
    marginLeft: 72,
  },
  helpText: {
    marginTop: FIGMA_QUESTIONNAIRES.tabsToHelpGap,
    width: 675,
    maxWidth: "100%",
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.charcoal,
  },
  list: {
    marginTop: FIGMA_QUESTIONNAIRES.helpToCardsGap,
    gap: FIGMA_QUESTIONNAIRES.cardsGap,
    width: "100%",
    maxWidth: 1091,
  },
});
