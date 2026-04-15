import { FIGMA_MESSAGING } from "@/constants/figmaMessagingLayout";
import { FIGMA_NORTHSIDE_145 } from "@/constants/figmaNorthside145";
import type { NotificationItem } from "@/model/MessagingCenter";
import { theme } from "@/theme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type NotificationCardProps = {
  item: NotificationItem;
  onPressCta?: (id: string) => void;
  /** Figma node `1:45` — warm cards + outline CTAs */
  variant?: "simple" | "northside145";
};

export const NotificationCard = ({
  item,
  onPressCta,
  variant = "simple",
}: NotificationCardProps) => {
  const is145 = variant === "northside145";
  const outline =
    is145 && item.ctaVariant !== "filled";

  return (
    <View style={[styles.card, is145 && styles.card145]}>
      <Text style={styles.body}>{item.body}</Text>
      {item.meta ? <Text style={styles.meta}>{item.meta}</Text> : null}
      <TouchableOpacity
        style={[
          styles.cta,
          outline && styles.ctaOutline,
          is145 && styles.cta145,
        ]}
        activeOpacity={0.92}
        onPress={() => onPressCta?.(item.id)}
        accessibilityRole="button"
      >
        <Text style={[styles.ctaLabel, outline && styles.ctaLabelOutline]}>
          {item.ctaLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    alignSelf: "stretch",
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.borderCard,
    borderRadius: 0,
    padding: FIGMA_MESSAGING.notificationCardPadding,
  },
  card145: {
    backgroundColor: FIGMA_NORTHSIDE_145.cardBg,
    borderColor: FIGMA_NORTHSIDE_145.cardBorder,
    borderRadius: FIGMA_NORTHSIDE_145.cardRadius,
  },
  body: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: theme.typography.lineHeight.body,
    color: theme.colors.charcoal,
  },
  meta: {
    marginTop: theme.spacing.xs,
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.charcoal,
    opacity: 0.85,
  },
  cta: {
    marginTop: theme.spacing.md,
    alignSelf: "flex-end",
    backgroundColor: theme.colors.royal300,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xs,
    minHeight: 40,
    justifyContent: "center",
  },
  cta145: {
    minWidth: 120,
  },
  ctaOutline: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: FIGMA_NORTHSIDE_145.ctaOutlineBorder,
  },
  ctaLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.button16,
    lineHeight: 20,
    color: theme.colors.white,
    textAlign: "center",
  },
  ctaLabelOutline: {
    color: FIGMA_NORTHSIDE_145.ctaOutlineText,
  },
});
