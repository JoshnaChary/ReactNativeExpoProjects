import { FIGMA_QUESTIONNAIRES } from "@/constants/figmaQuestionnairesLayout";
import type { QuestionnaireItem } from "@/model/QuestionnaireItem";
import { theme } from "@/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

type QuestionnaireRowProps = {
  item: QuestionnaireItem;
  compact?: boolean;
};

export const QuestionnaireRow = ({ item, compact = false }: QuestionnaireRowProps) => {
  return (
    <View style={[styles.card, compact && styles.cardCompact]}>
      <Text style={styles.title}>{item.title}</Text>

      <View style={[styles.divider, compact && styles.dividerCompact]} />

      <View style={styles.meta}>
        <Text style={styles.metaLine}>{item.descriptionLine}</Text>
        <Text style={styles.metaLine}>{item.dateLine}</Text>
        <Text style={styles.metaLine}>{item.assignedByLine}</Text>
      </View>

      {item.actionLabel ? (
        <Pressable
          accessibilityRole="button"
          style={[styles.startBtn, compact && styles.startBtnCompact]}
        >
          <Text style={styles.startLabel}>{item.actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: FIGMA_QUESTIONNAIRES.cardHeight,
    borderWidth: 1,
    borderColor: theme.colors.borderCard,
    backgroundColor: theme.colors.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
    gap: 16,
  },
  cardCompact: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: 10,
  },
  title: {
    width: 250,
    maxWidth: "100%",
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body18,
    lineHeight: 22,
    color: theme.colors.charcoal,
  },
  divider: {
    width: 1,
    height: FIGMA_QUESTIONNAIRES.dividerHeight,
    backgroundColor: theme.colors.ice300,
    opacity: 0.5,
  },
  dividerCompact: {
    display: "none",
  },
  meta: {
    width: 320,
    maxWidth: "100%",
    minWidth: 160,
  },
  metaLine: {
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.charcoal,
  },
  startBtn: {
    marginLeft: "auto",
    width: FIGMA_QUESTIONNAIRES.startButtonWidth,
    minHeight: FIGMA_QUESTIONNAIRES.actionButtonHeight,
    backgroundColor: theme.colors.royal300,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  startBtnCompact: {
    marginLeft: 0,
    alignSelf: "flex-start",
  },
  startLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: 19,
    color: theme.colors.white,
  },
});
