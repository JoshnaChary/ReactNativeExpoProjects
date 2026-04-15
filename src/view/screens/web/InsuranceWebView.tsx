import { FIGMA_INSURANCE } from "@/constants/figmaInsuranceLayout";
import { WEB_HOME } from "@/constants/layout";
import { MOCK_PORTAL_SUMMARY } from "@/constants/mockData";
import { navigateFromMenuId } from "@/navigation/menuNavigation";
import type { RootStackParamList } from "@/navigation/types";
import { theme } from "@/theme";
import { Sidebar } from "@/view/components/portal/Sidebar";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const InsuranceWebView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.page}>
      <View style={styles.frame}>
        <Sidebar
          summary={MOCK_PORTAL_SUMMARY}
          selectedNavId="insurance"
          onNavItemPress={(id) => navigateFromMenuId(navigation, id)}
        />

        <View style={styles.main}>
          <Text style={styles.pageTitle}>Insurance</Text>
          <Pressable accessibilityRole="button" style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>Add Primary Insurance</Text>
          </Pressable>
          <Text style={styles.copy}>
            You currently have no insurance on file.{"\n"}Add your primary insurance to ensure
            accurate billing. Secondary and tertiary plans can be added after.
          </Text>
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
    paddingTop: FIGMA_INSURANCE.contentPaddingTop,
    paddingRight: FIGMA_INSURANCE.contentPaddingRight,
    paddingBottom: 36,
  },
  pageTitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.title20,
    lineHeight: 24,
    color: theme.colors.charcoal,
  },
  primaryBtn: {
    marginTop: FIGMA_INSURANCE.titleToButtonGap,
    width: FIGMA_INSURANCE.buttonWidth,
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
    marginTop: FIGMA_INSURANCE.buttonToCopyGap,
    width: FIGMA_INSURANCE.copyWidth,
    maxWidth: "100%",
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body18,
    lineHeight: 24,
    color: theme.colors.charcoal,
  },
});
