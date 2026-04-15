import { FIGMA_CARD } from "@/constants/figmaHomeLayout";
import { HomeUpcomingAppointment } from "@/model/PatientPortalSummary";
import { theme } from "@/theme";
import { WEB_HOME } from "@/constants/layout";
import { Pressable, StyleSheet, Text, View } from "react-native";

type AppointmentCardProps = {
  appointment: HomeUpcomingAppointment;
};

export const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.dateTile}>
        <Text style={styles.day}>{appointment.dayNumber}</Text>
        <Text style={styles.month}>{appointment.monthLabel}</Text>
      </View>
      <View style={styles.copy}>
        <Text style={styles.line1}>{appointment.providerLine}</Text>
        <Text style={styles.line2}>{appointment.timeLine}</Text>
      </View>
      <Pressable
        style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
        accessibilityRole="button"
      >
        <Text style={styles.ctaLabel}>{appointment.joinVideoLabel}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: FIGMA_CARD.width,
    minHeight: FIGMA_CARD.height,
    backgroundColor: theme.colors.white,
    borderWidth: FIGMA_CARD.borderWidth,
    borderColor: theme.colors.borderCard,
    borderRadius: FIGMA_CARD.borderRadius,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: FIGMA_CARD.appointmentPaddingLeft,
    paddingRight: FIGMA_CARD.appointmentPaddingRight,
    paddingVertical: 10,
  },
  dateTile: {
    width: WEB_HOME.dateTileWidth,
    height: WEB_HOME.dateTileHeight,
    flexShrink: 0,
    backgroundColor: theme.colors.royal100,
    alignItems: "center",
    justifyContent: "center",
  },
  day: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body18,
    lineHeight: 22,
    color: theme.colors.charcoal,
    textAlign: "center",
  },
  month: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.charcoal,
    textAlign: "center",
  },
  copy: {
    flex: 1,
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 0,
    flexWrap: "wrap",
    marginLeft: FIGMA_CARD.dateToCopyGap,
    marginRight: FIGMA_CARD.copyToButtonGap,
    justifyContent: "center",
    minWidth: 0,
  },
  line1: {
    flexShrink: 1,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body18,
    lineHeight: 22,
    color: theme.colors.charcoal,
    marginBottom: 4,
    width: "100%",
  },
  line2: {
    flexShrink: 1,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body18,
    lineHeight: 22,
    color: theme.colors.charcoal,
    width: "100%",
  },
  cta: {
    width: WEB_HOME.joinVideoButtonWidth,
    height: WEB_HOME.joinVideoButtonHeight,
    backgroundColor: theme.colors.royal300,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flexShrink: 0,
  },
  ctaPressed: {
    opacity: 0.92,
  },
  ctaLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.button16,
    lineHeight: 20,
    color: theme.colors.white,
    textAlign: "center",
  },
});
