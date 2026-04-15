import {
  MOCK_CHAT_MESSAGES,
  MOCK_THREADS,
  notificationsForThreadId,
} from "@/constants/messagingMockData";
import { MOCK_PORTAL_SUMMARY } from "@/constants/mockData";
import { ROUTES } from "@/constants/navigation";
import type { RootStackParamList } from "@/navigation/types";
import type { MessageThread } from "@/model/MessagingCenter";
import { theme } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MobileScreenScaffold } from "@/view/components/mobile/MobileScreenScaffold";
import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FIGMA_NORTHSIDE_145 } from "@/constants/figmaNorthside145";

type ScreenMode = "list" | "thread";

export const MessagingCenterMobileView = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [mode, setMode] = useState<ScreenMode>("list");
  const [draft, setDraft] = useState("");
  const [selectedThreadId, setSelectedThreadId] = useState(
    () =>
      MOCK_THREADS.find((t) => t.kind === "conversation")?.id ?? MOCK_THREADS[0].id,
  );

  const selectedThread = useMemo(
    () => MOCK_THREADS.find((t) => t.id === selectedThreadId) ?? MOCK_THREADS[0] ?? null,
    [selectedThreadId],
  );
  const isNorthsideNotifications =
    mode === "thread" && selectedThread?.kind === "notifications" && selectedThread.id === "t-northside";

  const openThread = (threadId: string) => {
    setSelectedThreadId(threadId);
    setMode("thread");
  };

  const threadContent =
    selectedThread?.kind === "notifications" ? (
      <ScrollView
        style={styles.threadScreen}
        contentContainerStyle={styles.notificationsContent}
        showsVerticalScrollIndicator={false}
      >
        {isNorthsideNotifications ? (
          <Text style={styles.northsideDate}>April 1, 2026</Text>
        ) : null}
        {notificationsForThreadId(selectedThread.id).map((item) => (
          <View
            key={item.id}
            style={[
              styles.notificationCard,
              isNorthsideNotifications && styles.notificationCardNorthside,
            ]}
          >
            <Text style={styles.notificationText}>{item.body}</Text>
            {item.meta ? <Text style={styles.notificationMeta}>{item.meta}</Text> : null}
            <Pressable
              style={[
                styles.notificationCta,
                isNorthsideNotifications && styles.notificationCtaNorthside,
              ]}
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.notificationCtaLabel,
                  isNorthsideNotifications && styles.notificationCtaLabelNorthside,
                ]}
              >
                {item.ctaLabel}
              </Text>
            </Pressable>
            {isNorthsideNotifications && item.listTime ? (
              <Text style={styles.northsideTime}>{item.listTime}</Text>
            ) : null}
          </View>
        ))}
      </ScrollView>
    ) : (
      <View style={styles.threadScreen}>
        <ScrollView
          style={styles.chatScroll}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {MOCK_CHAT_MESSAGES.map((msg) => (
            <View
              key={msg.id}
              style={[styles.bubbleRow, msg.isUser ? styles.bubbleRowUser : styles.bubbleRowProvider]}
            >
              <View
                style={[
                  styles.bubble,
                  msg.isUser ? styles.bubbleUser : styles.bubbleProvider,
                ]}
              >
                <Text style={styles.bubbleText}>{msg.body}</Text>
              </View>
              <Text style={styles.bubbleTime}>{msg.timestamp}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.composer}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Message Here"
            placeholderTextColor={`${theme.colors.charcoal}88`}
            style={styles.composerInput}
            multiline
          />
          <View style={styles.composerActions}>
            <Pressable accessibilityRole="button">
              <Text style={styles.attachLink}>+ Attach file</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              style={[styles.sendBtn, !draft.trim() && styles.sendBtnDisabled]}
              disabled={!draft.trim()}
              onPress={() => setDraft("")}
            >
              <Text style={styles.sendLabel}>Send</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );

  if (mode === "thread") {
    return (
      <SafeAreaView style={styles.threadPage} edges={["top", "left", "right", "bottom"]}>
        <View style={styles.threadBackBar}>
          <Pressable
            accessibilityRole="button"
            onPress={() => setMode("list")}
            style={styles.backOnlyBtn}
          >
            <Text style={styles.backOnlyLabel}>Back</Text>
          </Pressable>
        </View>
        {threadContent}
      </SafeAreaView>
    );
  }

  return (
    <MobileScreenScaffold
      title="Messages"
      menuTitle={MOCK_PORTAL_SUMMARY.memberPortalTitle}
      navItems={MOCK_PORTAL_SUMMARY.sidebarNav}
      selectedNavId="messages"
      onSelectMenuItem={(id) => {
        if (id === "home") {
          navigation.navigate(ROUTES.HOME);
          return;
        }
        if (id === "messages") {
          setMode("list");
          return;
        }
        if (id === "billing") {
          setSelectedThreadId("t-billing");
          setMode("thread");
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
      <FlatList
        data={MOCK_THREADS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => openThread(item.id)}
            accessibilityRole="button"
            style={styles.threadCard}
          >
            <View style={styles.threadTop}>
              <View style={styles.threadTitleRow}>
                <Text style={styles.threadTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                {item.id === selectedThreadId ? <View style={styles.unreadDot} /> : null}
              </View>
              <Text style={styles.threadTime}>{item.timestamp}</Text>
            </View>
            <Text style={styles.threadPreview} numberOfLines={2}>
              {item.preview}
            </Text>
          </Pressable>
        )}
      />
    </MobileScreenScaffold>
  );
};

const styles = StyleSheet.create({
  threadPage: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  threadBackBar: {
    minHeight: 56,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  backOnlyBtn: {
    alignSelf: "flex-start",
    minHeight: 36,
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  backOnlyLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: 20,
    color: theme.colors.royal400,
  },
  listContent: {
    padding: 12,
    gap: 10,
  },
  threadCard: {
    borderWidth: 1,
    borderColor: theme.colors.ice200,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: theme.colors.white,
  },
  threadTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },
  threadTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    minWidth: 0,
    gap: 8,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.messageDot,
  },
  threadTitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body18,
    lineHeight: 22,
    color: theme.colors.charcoal,
    flex: 1,
  },
  threadTime: {
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.charcoal,
    opacity: 0.7,
  },
  threadPreview: {
    marginTop: 6,
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.body16,
    lineHeight: theme.typography.lineHeight.body,
    color: theme.colors.charcoal,
    opacity: 0.8,
  },
  threadScreen: {
    flex: 1,
  },
  notificationsContent: {
    padding: 12,
    gap: 12,
    paddingBottom: 28,
  },
  northsideDate: {
    textAlign: "center",
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.charcoal,
    opacity: 0.7,
    marginBottom: 6,
  },
  notificationCard: {
    borderWidth: 1,
    borderColor: theme.colors.ice200,
    borderRadius: 12,
    backgroundColor: theme.colors.white,
    padding: 14,
  },
  notificationCardNorthside: {
    backgroundColor: FIGMA_NORTHSIDE_145.cardBg,
    borderColor: "#000000",
  },
  notificationText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body18,
    lineHeight: theme.typography.lineHeight.body,
    color: theme.colors.charcoal,
  },
  notificationMeta: {
    marginTop: 6,
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.charcoal,
    opacity: 0.75,
  },
  notificationCta: {
    marginTop: 10,
    alignSelf: "flex-end",
    minHeight: 40,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.royal300,
    justifyContent: "center",
    borderRadius: 0,
  },
  notificationCtaNorthside: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.ice200,
    minWidth: 133,
  },
  notificationCtaLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: 20,
    color: theme.colors.white,
  },
  notificationCtaLabelNorthside: {
    color: theme.colors.royal400,
    textAlign: "center",
  },
  northsideTime: {
    marginTop: 6,
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.charcoal,
    opacity: 0.75,
  },
  chatScroll: {
    flex: 1,
  },
  chatContent: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 10,
  },
  bubbleRow: {
    width: "100%",
  },
  bubbleRowProvider: {
    alignItems: "flex-start",
  },
  bubbleRowUser: {
    alignItems: "flex-end",
  },
  bubble: {
    maxWidth: "86%",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
  },
  bubbleProvider: {
    backgroundColor: "#F0F1F5",
  },
  bubbleUser: {
    backgroundColor: "#DAF6F8",
  },
  bubbleText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: theme.typography.lineHeight.body,
    color: theme.colors.charcoal,
  },
  bubbleTime: {
    marginTop: 4,
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.charcoal,
    opacity: 0.65,
  },
  composer: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.ice200,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12,
  },
  composerInput: {
    minHeight: 76,
    maxHeight: 140,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: theme.typography.lineHeight.body,
    color: theme.colors.charcoal,
    paddingVertical: 8,
  },
  composerActions: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.ice200,
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  attachLink: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: 20,
    color: theme.colors.royal400,
  },
  sendBtn: {
    minWidth: 96,
    minHeight: 40,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.royal300,
    borderRadius: 8,
  },
  sendBtnDisabled: {
    opacity: 0.45,
  },
  sendLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: 20,
    color: theme.colors.white,
  },
});
