import { FIGMA_QUESTIONNAIRES } from "@/constants/figmaQuestionnairesLayout";
import { MOBILE_LAYOUT } from "@/constants/layout";
import { MOCK_PORTAL_SUMMARY } from "@/constants/mockData";
import { navigateFromMenuId } from "@/navigation/menuNavigation";
import { MOCK_QUESTIONNAIRES } from "@/constants/questionnairesMockData";
import type { QuestionnaireTab } from "@/model/QuestionnaireItem";
import type { RootStackParamList } from "@/navigation/types";
import { theme } from "@/theme";
import { MobileScreenScaffold } from "@/view/components/mobile/MobileScreenScaffold";
import { QuestionnaireRow } from "@/view/components/questionnaires/QuestionnaireRow";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const QuestionnairesMobileView = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<QuestionnaireTab>("todo");

  const items = useMemo(
    () => MOCK_QUESTIONNAIRES.filter((item) => item.tab === activeTab),
    [activeTab],
  );

  return (
    <MobileScreenScaffold
      title="Questionnaires"
      menuTitle={MOCK_PORTAL_SUMMARY.memberPortalTitle}
      navItems={MOCK_PORTAL_SUMMARY.sidebarNav}
      selectedNavId="questionnaires"
      onSelectMenuItem={(id) => navigateFromMenuId(navigation, id)}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
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
            <QuestionnaireRow key={item.id} item={item} compact />
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
    gap: 18,
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
    height: FIGMA_QUESTIONNAIRES.tabUnderlineHeight,
    backgroundColor: theme.colors.royal300,
  },
  todoIndicator: {
    width: 48,
  },
  progressIndicator: {
    width: 62,
    marginLeft: 64,
  },
  helpText: {
    marginTop: 12,
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.charcoal,
  },
  list: {
    marginTop: 14,
    gap: 8,
  },
});
