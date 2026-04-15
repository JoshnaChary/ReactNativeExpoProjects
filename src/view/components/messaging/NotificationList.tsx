import { FIGMA_MESSAGING } from "@/constants/figmaMessagingLayout";
import { FIGMA_NORTHSIDE_145 } from "@/constants/figmaNorthside145";
import type { NotificationItem } from "@/model/MessagingCenter";
import { theme } from "@/theme";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { NotificationCard } from "@/view/components/messaging/NotificationCard";

export type NotificationListLayout = "simple" | "northside145";

type NotificationListProps = {
  title: string;
  notifications: NotificationItem[];
  onPressCta?: (id: string) => void;
  /** Figma node `1:45` — Northside Clinic */
  layout?: NotificationListLayout;
};

export const NotificationList = ({
  title,
  notifications,
  onPressCta,
  layout = "simple",
}: NotificationListProps) => {
  if (layout === "northside145") {
    return (
      <View style={styles.root145}>
        <Text style={styles.heading145} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.rule145} />
        <Text style={styles.dateSep145}>{FIGMA_NORTHSIDE_145.dateSeparator}</Text>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent145}
          showsVerticalScrollIndicator={false}
        >
          {notifications.map((n) => (
            <View key={n.id} style={styles.row145}>
              {n.listTime ? (
                <Text style={styles.listTime145}>{n.listTime}</Text>
              ) : (
                <View style={styles.listTimeSpacer} />
              )}
              <NotificationCard
                item={n}
                variant="northside145"
                onPressCta={onPressCta}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Text style={styles.heading}>{title}</Text>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {notifications.map((n) => (
          <NotificationCard key={n.id} item={n} onPressCta={onPressCta} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    minHeight: 0,
    minWidth: 0,
  },
  heading: {
    fontFamily: theme.typography.fontFamily.semibold,
    fontSize: theme.typography.size.title20,
    lineHeight: theme.typography.lineHeight.title,
    color: theme.colors.charcoal,
    textAlign: "left",
    marginBottom: FIGMA_MESSAGING.rightPanelHeaderMarginBottom,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: FIGMA_MESSAGING.rightPanelPaddingBottom,
    gap: FIGMA_MESSAGING.notificationCardGap,
  },
  root145: {
    flex: 1,
    minHeight: 0,
    minWidth: 0,
  },
  heading145: {
    fontFamily: theme.typography.fontFamily.semibold,
    fontSize: theme.typography.size.title20,
    lineHeight: theme.typography.lineHeight.title,
    color: theme.colors.charcoal,
    textAlign: "center",
    marginBottom: theme.spacing.sm,
  },
  rule145: {
    height: 1,
    backgroundColor: FIGMA_NORTHSIDE_145.ctaOutlineBorder,
    marginBottom: theme.spacing.md,
  },
  dateSep145: {
    textAlign: "center",
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.body,
    lineHeight: 20,
    color: theme.colors.charcoal,
    opacity: 0.55,
    marginBottom: theme.spacing.md,
  },
  scrollContent145: {
    paddingBottom: FIGMA_MESSAGING.rightPanelPaddingBottom,
    gap: FIGMA_MESSAGING.notificationCardGap,
  },
  row145: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: FIGMA_NORTHSIDE_145.listTimeGap,
  },
  listTime145: {
    width: FIGMA_NORTHSIDE_145.listTimeWidth,
    paddingTop: 2,
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.charcoal,
    opacity: 0.55,
    textAlign: "right",
  },
  listTimeSpacer: {
    width: FIGMA_NORTHSIDE_145.listTimeWidth,
  },
});
