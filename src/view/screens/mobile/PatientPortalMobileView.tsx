import { FIGMA_MAIN_SPACING } from "@/constants/figmaHomeLayout";
import { MOBILE_LAYOUT } from "@/constants/layout";
import { ROUTES } from "@/constants/navigation";
import type { RootStackParamList } from "@/navigation/types";
import { theme } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MobileScreenScaffold } from "@/view/components/mobile/MobileScreenScaffold";
import { ActionCard } from "@/view/components/portal/ActionCard";
import { AppointmentCard } from "@/view/components/portal/AppointmentCard";
import { HomeHeader } from "@/view/components/portal/HomeHeader";
import { PortalScreenViewProps } from "@/view/types";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const actionMarginAfter = (index: number) => {
  if (index === 0) return FIGMA_MAIN_SPACING.messageCardToActionAppointment;
  if (index === 1) return FIGMA_MAIN_SPACING.actionAppointmentToActionRefill;
  return FIGMA_MAIN_SPACING.actionRefillToActionMessage;
};

export const PatientPortalMobileView = ({ summary }: PortalScreenViewProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <MobileScreenScaffold
      title={summary.memberPortalTitle}
      menuTitle={summary.memberPortalTitle}
      navItems={summary.sidebarNav}
      selectedNavId="home"
      onSelectMenuItem={(id) => {
        if (id === "messages") {
          navigation.navigate(ROUTES.MESSAGING);
          return;
        }
        if (id === "appointments") {
          navigation.navigate(ROUTES.APPOINTMENTS);
          return;
        }
        if (id === "prescriptions") {
          navigation.navigate(ROUTES.PRESCRIPTIONS);
        }
      }}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
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
    </MobileScreenScaffold>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: MOBILE_LAYOUT.horizontalPadding,
    paddingTop: 28,
    paddingBottom: theme.spacing.xxl,
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
