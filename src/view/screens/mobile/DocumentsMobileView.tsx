import { FIGMA_DOCUMENTS } from "@/constants/figmaDocumentsLayout";
import { MOBILE_LAYOUT } from "@/constants/layout";
import { MOCK_PORTAL_SUMMARY } from "@/constants/mockData";
import { MOCK_DOCUMENTS } from "@/constants/documentsMockData";
import { navigateFromMenuId } from "@/navigation/menuNavigation";
import type { RootStackParamList } from "@/navigation/types";
import { theme } from "@/theme";
import { MobileScreenScaffold } from "@/view/components/mobile/MobileScreenScaffold";
import { DocumentRow } from "@/view/components/documents/DocumentRow";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const DocumentsMobileView = () => {
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
    <MobileScreenScaffold
      title="Documents"
      menuTitle={MOCK_PORTAL_SUMMARY.memberPortalTitle}
      navItems={MOCK_PORTAL_SUMMARY.sidebarNav}
      selectedNavId="documents"
      onSelectMenuItem={(id) => navigateFromMenuId(navigation, id)}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Documents</Text>

        <View style={styles.tabRow}>
          <TouchableOpacity accessibilityRole="button" activeOpacity={0.8} onPress={() => setActiveTab("forms")}>
            <Text style={activeTab === "forms" ? styles.tabActive : styles.tabInactive}>Forms</Text>
          </TouchableOpacity>
          <TouchableOpacity accessibilityRole="button" activeOpacity={0.8} onPress={() => setActiveTab("uploads")}>
            <Text style={activeTab === "uploads" ? styles.tabActive : styles.tabInactive}>My Uploads</Text>
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
                  <DocumentRow key={item.id} item={item} compact />
                ))}
              </View>
            </View>
            <View style={styles.completedWrap}>
              <Text style={styles.sectionLabel}>Completed</Text>
              <View style={styles.list}>
                {completed.map((item) => (
                  <DocumentRow key={item.id} item={item} compact />
                ))}
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No uploads yet.</Text>
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
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
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
    height: FIGMA_DOCUMENTS.tabsUnderlineHeight,
    backgroundColor: theme.colors.royal300,
  },
  formsIndicator: {
    width: 48,
  },
  uploadsIndicator: {
    width: 88,
    marginLeft: 66,
  },
  sectionsWrap: {
    marginTop: 20,
  },
  sectionLabel: {
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.charcoal,
  },
  list: {
    marginTop: 8,
    gap: 10,
  },
  completedWrap: {
    marginTop: 18,
  },
  empty: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: theme.colors.ice200,
    minHeight: 94,
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
