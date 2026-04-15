import { FIGMA_MAIN_SPACING } from "@/constants/figmaHomeLayout";
import { WEB_HOME } from "@/constants/layout";
import { ROUTES } from "@/constants/navigation";
import { theme } from "@/theme";
import { ActionCard } from "@/view/components/portal/ActionCard";
import { AppointmentCard } from "@/view/components/portal/AppointmentCard";
import { HomeHeader } from "@/view/components/portal/HomeHeader";
import { Sidebar } from "@/view/components/portal/Sidebar";
import { PortalScreenViewProps } from "@/view/types";
import type { RootStackParamList } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const actionMarginAfter = (index: number) => {
  if (index === 0) return FIGMA_MAIN_SPACING.messageCardToActionAppointment;
  if (index === 1) return FIGMA_MAIN_SPACING.actionAppointmentToActionRefill;
  return FIGMA_MAIN_SPACING.actionRefillToActionMessage;
};

export const PatientPortalWebView = ({ summary }: PortalScreenViewProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.page}>
      <View style={styles.frame}>
        <Sidebar
          summary={summary}
          selectedNavId="home"
          onNavItemPress={(id) => {
            if (id === "messages") {
              navigation.navigate(ROUTES.MESSAGING);
              return;
            }
            if (id === "appointments") {
              navigation.navigate(ROUTES.APPOINTMENTS);
            }
          }}
        />
        <ScrollView
          style={styles.mainScroll}
          contentContainerStyle={styles.mainScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <HomeHeader patientFirstName={summary.patientFirstName} />
          <Text style={styles.upcomingLabel}>{summary.upcomingSectionTitle}</Text>
          {summary.homeAppointment ? (
            <View style={styles.appointmentSlot}>
              <AppointmentCard appointment={summary.homeAppointment} />
            </View>
          ) : null}
          <Text style={styles.helpLabel}>{summary.helpSectionTitle}</Text>
          <View style={styles.messageSlot}>
            <ActionCard
              variant="message"
              headline={summary.messageHeadline}
              avatarUrl={summary.messageAvatarUrl}
              iconUrl={summary.messageIconUrl}
            />
          </View>
          {summary.quickActions.map((action, index) => (
            <View key={action.id} style={{ marginTop: actionMarginAfter(index) }}>
              <ActionCard variant="link" label={action.label} />
            </View>
          ))}
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
  mainScroll: {
    flex: 1,
    minWidth: 0,
    backgroundColor: theme.colors.white,
  },
  mainScrollContent: {
    paddingTop: FIGMA_MAIN_SPACING.contentPaddingTop,
    paddingLeft: FIGMA_MAIN_SPACING.contentPaddingLeft,
    paddingRight: FIGMA_MAIN_SPACING.contentPaddingRight,
    paddingBottom: FIGMA_MAIN_SPACING.contentPaddingBottom,
    flexGrow: 1,
  },
  upcomingLabel: {
    minHeight: FIGMA_MAIN_SPACING.upcomingTitleMinHeight,
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.body16,
    lineHeight: 22,
    color: theme.colors.charcoal,
  },
  appointmentSlot: {
    marginTop: FIGMA_MAIN_SPACING.appointmentCardMarginTop,
  },
  helpLabel: {
    minHeight: FIGMA_MAIN_SPACING.helpTitleMinHeight,
    marginTop: FIGMA_MAIN_SPACING.helpTitleMarginTop,
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.body16,
    lineHeight: 22,
    color: theme.colors.charcoal,
  },
  messageSlot: {
    marginTop: FIGMA_MAIN_SPACING.messageCardMarginTop,
  },
});
