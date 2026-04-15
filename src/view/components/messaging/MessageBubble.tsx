import { FIGMA_MESSAGING } from "@/constants/figmaMessagingLayout";
import { MESSAGING_CHAT } from "@/constants/messagingChatTheme";
import type { ChatMessage } from "@/model/MessagingCenter";
import { theme } from "@/theme";
import { StyleSheet, Text, View } from "react-native";

type MessageBubbleProps = {
  message: ChatMessage;
  maxWidth: number;
};

export const MessageBubble = ({ message, maxWidth }: MessageBubbleProps) => {
  const bubbleWidth = 356;
  return (
    <View
      style={[
        styles.col,
        message.isUser ? styles.colUser : styles.colProvider,
      ]}
    >
      {message.isUser ? <Text style={[styles.youLabel, styles.youLabelUser]}>You</Text> : null}
      <View
        style={[
          styles.bubble,
          { width: Math.min(bubbleWidth, maxWidth) },
          message.isUser ? styles.bubbleUser : styles.bubbleProvider,
        ]}
      >
        <Text style={styles.body}>{message.body}</Text>
      </View>
      <Text
        style={[
          styles.timeBelow,
          message.isUser ? styles.timeBelowUser : styles.timeBelowProvider,
        ]}
      >
        {message.timestamp}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  col: {
    width: "100%",
    marginBottom: FIGMA_MESSAGING.chatMessageGap,
  },
  colUser: {
    alignItems: "flex-end",
  },
  colProvider: {
    alignItems: "flex-start",
  },
  youLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    marginBottom: 4,
  },
  youLabelUser: {
    color: theme.colors.charcoal,
    opacity: 0.7,
    alignSelf: "flex-end",
  },
  bubble: {
    borderRadius: FIGMA_MESSAGING.chatBubbleRadius,
    paddingHorizontal: 22,
    paddingVertical: 20,
  },
  bubbleUser: {
    backgroundColor: MESSAGING_CHAT.bubbleUserBg,
    borderWidth: 0,
  },
  bubbleProvider: {
    backgroundColor: MESSAGING_CHAT.bubbleProviderBg,
    borderWidth: 0,
  },
  body: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body18,
    lineHeight: theme.typography.lineHeight.body,
    color: theme.colors.charcoal,
  },
  timeBelow: {
    marginTop: 6,
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.charcoal,
    opacity: 0.55,
  },
  timeBelowUser: {
    textAlign: "right",
    alignSelf: "flex-end",
    maxWidth: "100%",
  },
  timeBelowProvider: {
    textAlign: "left",
    alignSelf: "flex-start",
    maxWidth: "100%",
  },
});
