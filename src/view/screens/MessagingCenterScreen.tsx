import { MOCK_PORTAL_SUMMARY } from "@/constants/mockData";
import { ROUTES } from "@/constants/navigation";
import {
  MOCK_CHAT_MESSAGES,
  MOCK_THREADS,
  notificationsForThreadId,
} from "@/constants/messagingMockData";
import type { RootStackParamList } from "@/navigation/types";
import { useIsWeb } from "@/hooks/useIsWeb";
import { theme } from "@/theme";
import { ChatView } from "@/view/components/messaging/ChatView";
import { MessagingLayout } from "@/view/components/messaging/MessagingLayout";
import { NotificationList } from "@/view/components/messaging/NotificationList";
import { Sidebar as PortalNavSidebar } from "@/view/components/portal/Sidebar";
import { MessagingCenterMobileView } from "@/view/screens/mobile/MessagingCenterMobileView";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

export const MessagingCenterScreen = () => {
  const isWeb = useIsWeb();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedThreadId, setSelectedThreadId] = useState(
    () =>
      MOCK_THREADS.find((t) => t.kind === "conversation")?.id ?? MOCK_THREADS[0].id,
  );

  const selectedThread = useMemo(
    () => MOCK_THREADS.find((t) => t.id === selectedThreadId) ?? MOCK_THREADS[0],
    [selectedThreadId],
  );

  const rightPanel = useMemo(() => {
    if (selectedThread.kind === "notifications") {
      return (
        <NotificationList
          title={selectedThread.title}
          notifications={notificationsForThreadId(selectedThread.id)}
          layout={
            selectedThread.id === "t-northside" ? "northside145" : "simple"
          }
        />
      );
    }
    return (
      <ChatView
        threadTitle={selectedThread.title}
        messages={MOCK_CHAT_MESSAGES}
        onSend={() => {}}
        onAttach={() => {}}
        onRequestAppointment={() => {}}
      />
    );
  }, [selectedThread]);

  const onSelectThread = useCallback((id: string) => {
    setSelectedThreadId(id);
  }, []);

  if (!isWeb) {
    return <MessagingCenterMobileView />;
  }

  return (
    <View style={styles.safe}>
      <MessagingLayout
        portalNav={
          <PortalNavSidebar
            summary={MOCK_PORTAL_SUMMARY}
            selectedNavId="messages"
            onNavItemPress={(id) => {
              if (id === "home") {
                navigation.navigate(ROUTES.HOME);
                return;
              }
              if (id === "appointments") {
                navigation.navigate(ROUTES.APPOINTMENTS);
              }
            }}
          />
        }
        threads={MOCK_THREADS}
        selectedThreadId={selectedThreadId}
        onSelectThread={onSelectThread}
      >
        {rightPanel}
      </MessagingLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});
