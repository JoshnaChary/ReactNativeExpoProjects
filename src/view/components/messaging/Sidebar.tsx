import { FIGMA_MESSAGING } from "@/constants/figmaMessagingLayout";
import type { MessageThread } from "@/model/MessagingCenter";
import { theme } from "@/theme";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ThreadItem } from "@/view/components/messaging/ThreadItem";

type SidebarProps = {
  threads: MessageThread[];
  selectedThreadId: string;
  onSelectThread: (id: string) => void;
  headerTitle?: string;
};

export const Sidebar = ({
  threads,
  selectedThreadId,
  onSelectThread,
  headerTitle = "Messages",
}: SidebarProps) => {
  return (
    <View style={styles.shell}>
      <View style={styles.headerStrip}>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
      </View>
      <FlatList
        data={threads}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThreadItem
            thread={item}
            selected={item.id === selectedThreadId}
            onPress={onSelectThread}
          />
        )}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  shell: {
    width: FIGMA_MESSAGING.threadListWidth,
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: "stretch",
    backgroundColor: theme.colors.sidebarCanvas,
    borderRightWidth: 1,
    borderRightColor: theme.colors.borderCard,
  },
  headerStrip: {
    height: FIGMA_MESSAGING.leftHeaderHeight,
    backgroundColor: theme.colors.ice400,
    justifyContent: "center",
    paddingLeft: 22,
  },
  headerTitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.title20,
    lineHeight: 24,
    color: theme.colors.white,
    textAlign: "left",
  },
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: theme.spacing.xl,
  },
});
