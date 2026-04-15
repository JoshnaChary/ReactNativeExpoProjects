import { FIGMA_MAIN_SPACING } from "@/constants/figmaHomeLayout";
import { theme } from "@/theme";
import { StyleSheet, Text, View } from "react-native";

type HomeHeaderProps = {
  patientFirstName: string;
};

export const HomeHeader = ({ patientFirstName }: HomeHeaderProps) => {
  return (
    <View
      style={[
        styles.wrap,
        { marginBottom: FIGMA_MAIN_SPACING.greetingToUpcomingTitle },
      ]}
    >
      <Text style={styles.title}>Hello, {patientFirstName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    minHeight: FIGMA_MAIN_SPACING.greetingMinHeight,
    justifyContent: "center",
  },
  title: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.title20,
    lineHeight: 36,
    color: theme.colors.charcoal,
  },
});
