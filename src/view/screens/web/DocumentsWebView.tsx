import { MOCK_DOCUMENTS } from "@/constants/documentsMockData";
import { FIGMA_DOCUMENTS } from "@/constants/figmaDocumentsLayout";
import { WEB_HOME } from "@/constants/layout";
import { MOCK_PORTAL_SUMMARY } from "@/constants/mockData";
import { navigateFromMenuId } from "@/navigation/menuNavigation";
import type { RootStackParamList } from "@/navigation/types";
import { theme } from "@/theme";
import { DocumentRow } from "@/view/components/documents/DocumentRow";
import { Sidebar } from "@/view/components/portal/Sidebar";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const DocumentsWebView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<"forms" | "uploads">("forms");

  const pending = useMemo(
    () => MOCK_DOCUMENTS.filter((item) => item.section === "pending"),
    [],
  );
  const completed = useMemo(
    () => MOCK_DOCUMENTS.filter((item) => item.section === "completed"),
    [],
  );

  return (
    <View style={styles.page}>
      <View style={styles.frame}>
        <Sidebar
          summary={MOCK_PORTAL_SUMMARY}
          selectedNavId="documents"
          onNavItemPress={(id) => navigateFromMenuId(navigation, id)}
        />

        <View style={styles.main}>
          <Text style={styles.pageTitle}>Documents</Text>

          <View style={styles.tabRow}>
            <TouchableOpacity
              accessibilityRole="button"
              activeOpacity={0.8}
              onPress={() => setActiveTab("forms")}
            >
              <Text style={activeTab === "forms" ? styles.tabActive : styles.tabInactive}>Forms</Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityRole="button"
              activeOpacity={0.8}
              onPress={() => setActiveTab("uploads")}
            >
              <Text style={activeTab === "uploads" ? styles.tabActive : styles.tabInactive}>
                My Uploads
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.tabIndicator,
              activeTab === "forms" ? styles.formsIndicator : styles.uploadsIndicator,
            ]}
          />

          {activeTab === "forms" ? (
            <View style={styles.sectionsWrap}>
              <View>
                <Text style={styles.sectionLabel}>Awaiting your signature</Text>
                <View style={styles.list}>
                  {pending.map((item) => (
                    <DocumentRow key={item.id} item={item} />
                  ))}
                </View>
              </View>
              <View style={styles.completedWrap}>
                <Text style={styles.sectionLabel}>Completed</Text>
                <View style={styles.list}>
                  {completed.map((item) => (
                    <DocumentRow key={item.id} item={item} />
                  ))}
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No uploads yet.</Text>
            </View>
          )}
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
    paddingTop: FIGMA_DOCUMENTS.contentPaddingTop,
    paddingRight: FIGMA_DOCUMENTS.contentPaddingRight,
    paddingBottom: 36,
  },
  pageTitle: {
    minHeight: FIGMA_DOCUMENTS.pageTitleHeight,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.title20,
    lineHeight: 24,
    color: theme.colors.charcoal,
  },
  tabRow: {
    marginTop: FIGMA_DOCUMENTS.tabsTopGap,
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
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
    height: FIGMA_DOCUMENTS.tabsUnderlineHeight,
    backgroundColor: theme.colors.royal300,
  },
  formsIndicator: {
    width: FIGMA_DOCUMENTS.tabsUnderlineWidth,
  },
  uploadsIndicator: {
    width: 102,
    marginLeft: 86,
  },
  sectionsWrap: {
    marginTop: FIGMA_DOCUMENTS.sectionsTopGap,
  },
  sectionLabel: {
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.charcoal,
  },
  list: {
    marginTop: FIGMA_DOCUMENTS.sectionLabelBottomGap,
    gap: FIGMA_DOCUMENTS.cardGap,
  },
  completedWrap: {
    marginTop: 24,
  },
  empty: {
    marginTop: 28,
    borderWidth: 1,
    borderColor: theme.colors.ice200,
    minHeight: 104,
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
