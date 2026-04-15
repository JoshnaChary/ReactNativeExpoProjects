import { MESSAGING_CHAT } from "@/constants/messagingChatTheme";
import { theme } from "@/theme";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type InputBarProps = {
  onSend?: (text: string) => void;
  onAttach?: () => void;
  placeholder?: string;
};

export const InputBar = ({
  onSend,
  onAttach,
  placeholder = "Message Here",
}: InputBarProps) => {
  const [text, setText] = useState("");

  const send = () => {
    const t = text.trim();
    if (!t) return;
    onSend?.(t);
    setText("");
  };

  return (
    <View style={styles.wrap}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        placeholderTextColor={`${theme.colors.charcoal}66`}
        multiline
        maxLength={4000}
        textAlignVertical="top"
      />
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={onAttach}
          accessibilityRole="button"
          accessibilityLabel="Attach file"
          hitSlop={8}
        >
          <Text style={styles.attachLink}>+ Attach file</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sendBtn, !text.trim() && styles.sendDisabled]}
          onPress={send}
          disabled={!text.trim()}
          accessibilityRole="button"
          accessibilityLabel="Send message"
        >
          <Text style={styles.sendLabel}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    borderTopWidth: 1,
    borderTopColor: MESSAGING_CHAT.bubbleBorder,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 0,
  },
  input: {
    minHeight: 88,
    maxHeight: 140,
    paddingHorizontal: 0,
    paddingVertical: 18,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body18,
    lineHeight: 22,
    color: theme.colors.charcoal,
    borderWidth: 0,
    backgroundColor: theme.colors.white,
  },
  actions: {
    borderTopWidth: 1,
    borderTopColor: MESSAGING_CHAT.bubbleBorder,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 62,
  },
  attachLink: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body18,
    lineHeight: 22,
    color: MESSAGING_CHAT.actionBlue,
  },
  sendBtn: {
    paddingHorizontal: 16,
    minHeight: 40,
    minWidth: 112,
    borderRadius: 0,
    backgroundColor: MESSAGING_CHAT.actionBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  sendDisabled: {
    opacity: 0.45,
  },
  sendLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: 20,
    color: theme.colors.white,
  },
});
