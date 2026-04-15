import { FIGMA_MESSAGING } from "@/constants/figmaMessagingLayout";
import type { MessageThread } from "@/model/MessagingCenter";
import { theme } from "@/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ThreadItemProps = {
  thread: MessageThread;
  selected: boolean;
  onPress: (id: string) => void;
};

/**
 * Figma list row:
 * Row 1: title (+ unread dot) | timestamp
 * Row 2: preview
 * Selected: blue bar on right edge of item
 */
export const ThreadItem = ({ thread, selected, onPress }: ThreadItemProps) => {
  return (
    <Pressable
      style={[styles.row, selected && styles.rowSelected]}
      onPress={() => onPress(thread.id)}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <View style={styles.main}>
        <View style={styles.topLine}>
          <View style={styles.titleWithDot}>
            <Text style={styles.title} numberOfLines={1}>
              {thread.title}
            </Text>
            {selected ? <View style={styles.unreadDot} /> : null}
          </View>
          <Text style={styles.time}>{thread.timestamp}</Text>
        </View>
        <Text style={styles.preview} numberOfLines={2}>
          {thread.preview}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    paddingVertical: FIGMA_MESSAGING.threadRowPaddingV,
    paddingLeft: FIGMA_MESSAGING.threadRowPaddingH,
    paddingRight: FIGMA_MESSAGING.threadRowPaddingH,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderCard,
    backgroundColor: theme.colors.sidebarCanvas,
  },
  rowSelected: {
    backgroundColor: theme.colors.royal100,
    borderRightWidth: FIGMA_MESSAGING.selectedBorderRightWidth,
    borderRightColor: theme.colors.royal300,
  },
  main: {
    flex: 1,
    minWidth: 0,
  },
  topLine: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: theme.spacing.sm,
    width: "100%",
  },
  titleWithDot: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
    gap: 8,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.royal300,
    marginTop: 7,
    flexShrink: 0,
  },
  title: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.semibold,
    fontSize: theme.typography.size.body16,
    lineHeight: FIGMA_MESSAGING.threadTitleLineHeight,
    color: theme.colors.charcoal,
    textAlign: "left",
  },
  time: {
    flexShrink: 0,
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.charcoal,
    opacity: 0.65,
    textAlign: "right",
    minWidth: FIGMA_MESSAGING.threadTimestampMinWidth,
    maxWidth: FIGMA_MESSAGING.threadTimestampMaxWidth,
  },
  preview: {
    marginTop: FIGMA_MESSAGING.threadTitleToPreview,
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.body,
    lineHeight: FIGMA_MESSAGING.threadPreviewLineHeight,
    color: theme.colors.charcoal,
    opacity: 0.72,
    textAlign: "left",
  },
});
