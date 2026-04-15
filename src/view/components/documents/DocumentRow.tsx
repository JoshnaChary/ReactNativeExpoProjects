import { DOCUMENT_ICON_URL } from "@/constants/documentsMockData";
import type { DocumentItem } from "@/model/DocumentItem";
import { theme } from "@/theme";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type DocumentRowProps = {
  item: DocumentItem;
  compact?: boolean;
};

export const DocumentRow = ({ item, compact = false }: DocumentRowProps) => {
  if (compact) {
    return (
      <View style={styles.cardCompact}>
        <View style={styles.compactTop}>
          <View style={styles.iconCell}>
            <Image source={{ uri: DOCUMENT_ICON_URL }} style={styles.icon} resizeMode="cover" />
          </View>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>{item.title}</Text>
            <View
              style={[
                styles.statusChip,
                item.statusTone === "warning" ? styles.statusWarn : styles.statusSuccess,
              ]}
            >
              <Text style={styles.statusLabel}>{item.statusLabel}</Text>
            </View>
          </View>
        </View>

        <View style={styles.compactMetaWrap}>
          <Text style={styles.meta}>Assigned by: {item.assignedBy}</Text>
          <Text style={styles.meta}>Date: {item.date}</Text>
        </View>

        <Pressable accessibilityRole="button" style={styles.ctaCompact}>
          <Text style={styles.ctaText}>{item.ctaLabel}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <View style={styles.iconCell}>
          <Image source={{ uri: DOCUMENT_ICON_URL }} style={styles.icon} resizeMode="cover" />
        </View>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{item.title}</Text>
          <View
            style={[
              styles.statusChip,
              item.statusTone === "warning" ? styles.statusWarn : styles.statusSuccess,
            ]}
          >
            <Text style={styles.statusLabel}>{item.statusLabel}</Text>
          </View>
        </View>
      </View>

      <View style={styles.metaCol}>
        <Text style={styles.meta}>Assigned by: {item.assignedBy}</Text>
        <Text style={styles.meta}>Date: {item.date}</Text>
      </View>

      <Pressable accessibilityRole="button" style={styles.cta}>
        <Text style={styles.ctaText}>{item.ctaLabel}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: 104,
    borderWidth: 1,
    borderColor: theme.colors.borderCard,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  cardCompact: {
    borderWidth: 1,
    borderColor: theme.colors.borderCard,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  compactTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    minWidth: 0,
    gap: 14,
  },
  iconCell: {
    width: 70,
    height: 75,
    backgroundColor: theme.colors.ice100,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 51,
    height: 53,
  },
  titleWrap: {
    flex: 1,
    minWidth: 0,
    gap: 6,
  },
  title: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body18,
    lineHeight: 24,
    color: theme.colors.charcoal,
  },
  statusChip: {
    alignSelf: "flex-start",
    borderRadius: 80,
    paddingHorizontal: 16,
    minHeight: 26,
    justifyContent: "center",
  },
  statusWarn: {
    backgroundColor: theme.colors.sun100,
  },
  statusSuccess: {
    backgroundColor: theme.colors.forest100,
  },
  statusLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.ice500,
  },
  metaCol: {
    width: 278,
    borderLeftWidth: 1,
    borderLeftColor: theme.colors.ice200,
    paddingLeft: 16,
  },
  compactMetaWrap: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: theme.colors.ice200,
    paddingTop: 8,
    gap: 2,
  },
  meta: {
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.charcoal,
  },
  cta: {
    width: 187,
    minHeight: 40,
    borderWidth: 1,
    borderColor: theme.colors.ice200,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  ctaCompact: {
    marginTop: 10,
    minHeight: 40,
    borderWidth: 1,
    borderColor: theme.colors.ice200,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  ctaText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: 20,
    color: theme.colors.royal400,
  },
});
