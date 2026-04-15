import { FIGMA_INSURANCE } from "@/constants/figmaInsuranceLayout";
import { MOBILE_LAYOUT } from "@/constants/layout";
import { MOCK_PORTAL_SUMMARY } from "@/constants/mockData";
import { navigateFromMenuId } from "@/navigation/menuNavigation";
import type { RootStackParamList } from "@/navigation/types";
import { theme } from "@/theme";
import { MobileScreenScaffold } from "@/view/components/mobile/MobileScreenScaffold";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

export const InsuranceMobileView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <MobileScreenScaffold
      title="Insurance"
      menuTitle={MOCK_PORTAL_SUMMARY.memberPortalTitle}
      navItems={MOCK_PORTAL_SUMMARY.sidebarNav}
      selectedNavId="insurance"
      onSelectMenuItem={(id) => navigateFromMenuId(navigation, id)}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Insurance</Text>
        <Pressable accessibilityRole="button" style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>Add Primary Insurance</Text>
        </Pressable>
        <Text style={styles.copy}>
          You currently have no insurance on file.{"\n"}Add your primary insurance to ensure
          accurate billing. Secondary and tertiary plans can be added after.
        </Text>
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
  primaryBtn: {
    marginTop: 24,
    width: "100%",
    maxWidth: 280,
    minHeight: FIGMA_INSURANCE.buttonHeight,
    backgroundColor: theme.colors.royal300,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  primaryBtnText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: 20,
    color: theme.colors.white,
  },
  copy: {
    marginTop: 24,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: 22,
    color: theme.colors.charcoal,
  },
});
