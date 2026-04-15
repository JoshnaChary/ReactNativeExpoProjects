import { FIGMA_MESSAGING } from "@/constants/figmaMessagingLayout";
import { WEB_HOME } from "@/constants/layout";
import type { MessageThread } from "@/model/MessagingCenter";
import { theme } from "@/theme";
import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Sidebar } from "@/view/components/messaging/Sidebar";

type MessagingLayoutProps = {
  /** Column 1 — portal side menu (Figma `1:44`) */
  portalNav: ReactNode;
  threads: MessageThread[];
  selectedThreadId: string;
  onSelectThread: (id: string) => void;
  children: ReactNode;
};

/**
 * Three-column frame: portal nav | thread list | messages/detail.
 * Max width 1440 (WEB_HOME.frameWidth).
 */
export const MessagingLayout = ({
  portalNav,
  threads,
  selectedThreadId,
  onSelectThread,
  children,
}: MessagingLayoutProps) => {
  return (
    <View style={styles.page}>
      <View style={styles.frame}>
        <View style={styles.navCol}>{portalNav}</View>
        <View style={styles.gapPortalThreads} />
        <Sidebar
          threads={threads}
          selectedThreadId={selectedThreadId}
          onSelectThread={onSelectThread}
        />
        <View style={styles.gapThreadsDetail} />
        <View style={styles.messagesCol}>
          <View style={styles.messagesInner}>{children}</View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: "center",
  },
  frame: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    maxWidth: WEB_HOME.frameWidth,
    alignSelf: "stretch",
  },
  navCol: {
    width: FIGMA_MESSAGING.portalNavWidth,
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: "stretch",
  },
  gapPortalThreads: {
    width: FIGMA_MESSAGING.portalToThreadGap,
    flexGrow: 0,
    flexShrink: 0,
  },
  gapThreadsDetail: {
    width: FIGMA_MESSAGING.listToDetailGap,
    flexGrow: 0,
    flexShrink: 0,
  },
  messagesCol: {
    flex: 1,
    minWidth: 0,
    maxWidth: FIGMA_MESSAGING.messagesColumnMaxWidth,
    backgroundColor: theme.colors.white,
    alignSelf: "stretch",
  },
  messagesInner: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: FIGMA_MESSAGING.rightPanelPaddingH,
    paddingTop: FIGMA_MESSAGING.rightPanelPaddingTop,
    paddingBottom: 0,
  },
});
