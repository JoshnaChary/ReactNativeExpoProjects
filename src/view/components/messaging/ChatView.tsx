import { FIGMA_MESSAGING } from "@/constants/figmaMessagingLayout";
import { MESSAGING_CHAT } from "@/constants/messagingChatTheme";
import type { ChatMessage } from "@/model/MessagingCenter";
import { theme } from "@/theme";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { InputBar } from "@/view/components/messaging/InputBar";
import { MessageBubble } from "@/view/components/messaging/MessageBubble";

const CONTENT_LEFT = 38;
const CONTENT_RIGHT = 27;
const REQUEST_BUTTON_WIDTH = 201;

type ChatViewProps = {
  threadTitle: string;
  messages: ChatMessage[];
  onSend?: (text: string) => void;
  onAttach?: () => void;
  onRequestAppointment?: () => void;
};

export const ChatView = ({
  threadTitle,
  messages,
  onSend,
  onAttach,
  onRequestAppointment,
}: ChatViewProps) => {
  return (
    <View style={styles.root}>
      <View style={styles.headerTop}>
        <Text style={styles.topTitle} numberOfLines={1}>
          {threadTitle}
        </Text>
        <TouchableOpacity
          style={styles.topCta}
          onPress={onRequestAppointment}
          activeOpacity={0.92}
          accessibilityRole="button"
        >
          <Text style={styles.topCtaLabel}>Request Appointment</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerRule} />

      <View style={styles.metaRow}>
        <Text style={styles.actorLabel}>Dr. J Kim</Text>
        <Text style={styles.dateSep}>{MESSAGING_CHAT.dateSeparator}</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} maxWidth={356} />
        ))}
      </ScrollView>

      <View style={styles.inputWrap}>
        <InputBar onSend={onSend} onAttach={onAttach} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    minWidth: 0,
    minHeight: 0,
    backgroundColor: theme.colors.white,
  },
  headerTop: {
    height: 53,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: CONTENT_RIGHT,
  },
  topTitle: {
    fontFamily: theme.typography.fontFamily.semibold,
    fontSize: theme.typography.size.title20,
    lineHeight: 22,
    color: theme.colors.charcoal,
    textAlign: "center",
  },
  topCta: {
    position: "absolute",
    right: CONTENT_RIGHT,
    top: 7,
    width: REQUEST_BUTTON_WIDTH,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: MESSAGING_CHAT.actionBlue,
  },
  topCtaLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: 20,
    color: theme.colors.white,
    textAlign: "center",
  },
  headerRule: {
    height: 1,
    backgroundColor: MESSAGING_CHAT.bubbleBorder,
  },
  metaRow: {
    paddingLeft: CONTENT_LEFT,
    paddingRight: CONTENT_RIGHT,
    paddingTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  actorLabel: {
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.charcoal,
    opacity: 0.55,
  },
  scroll: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    paddingLeft: CONTENT_LEFT,
    paddingRight: CONTENT_RIGHT,
    paddingTop: 10,
    paddingBottom: FIGMA_MESSAGING.rightPanelPaddingBottom,
  },
  dateSep: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.charcoal,
    opacity: 0.55,
    textAlign: "center",
  },
  inputWrap: {
    flexShrink: 0,
    width: "100%",
  },
});
