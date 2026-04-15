import { FIGMA_LAB_ASSETS } from "@/constants/figmaAssets";
import { FIGMA_LAB_RESULTS } from "@/constants/figmaLabResultsLayout";
import type { LabResultItem } from "@/model/LabResultItem";
import { theme } from "@/theme";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type LabResultRowProps = {
  item: LabResultItem;
  compact?: boolean;
  onPressViewResults?: () => void;
};

export const LabResultRow = ({
  item,
  compact = false,
  onPressViewResults,
}: LabResultRowProps) => {
  return (
    <View style={[styles.card, compact && styles.cardCompact]}>
      <View style={[styles.leading, compact && styles.leadingCompact]}>
        <View style={styles.iconTile}>
          <Image source={{ uri: FIGMA_LAB_ASSETS.beakerIcon }} style={styles.icon} />
        </View>

        <View style={styles.leftCopy}>
          <Text style={styles.testName}>{item.testName}</Text>
          {item.statusLabel ? (
            <View
              style={[
                styles.statusChip,
                item.status === "waiting" ? styles.statusWaiting : styles.statusNew,
              ]}
            >
              <Text style={styles.statusLabel}>{item.statusLabel}</Text>
            </View>
          ) : null}
        </View>
      </View>

      <View style={[styles.divider, compact && styles.dividerCompact]} />

      <View style={styles.metaCol}>
        <Text style={styles.metaText}>{item.resultDateLine}</Text>
        <Text style={styles.metaText}>{item.orderedByLine}</Text>
      </View>

      {item.showViewResults ? (
        <Pressable
          accessibilityRole="button"
          onPress={onPressViewResults}
          style={[styles.viewResultsBtn, compact && styles.viewResultsBtnCompact]}
        >
          <Text style={styles.viewResultsLabel}>View Results</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: FIGMA_LAB_RESULTS.cardHeight,
    borderWidth: 1,
    borderColor: theme.colors.borderCard,
    backgroundColor: theme.colors.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 14,
  },
  cardCompact: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: 10,
  },
  leading: {
    width: 360,
    minWidth: 220,
    maxWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  leadingCompact: {
    width: "100%",
  },
  iconTile: {
    width: FIGMA_LAB_RESULTS.iconTileSize,
    height: FIGMA_LAB_RESULTS.iconTileSize,
    backgroundColor: theme.colors.royal100,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  leftCopy: {
    flex: 1,
    minWidth: 0,
  },
  testName: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body18,
    lineHeight: 22,
    color: theme.colors.charcoal,
  },
  statusChip: {
    marginTop: 8,
    minHeight: FIGMA_LAB_RESULTS.statusChipHeight,
    borderRadius: 80,
    justifyContent: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 14,
  },
  statusWaiting: {
    backgroundColor: theme.colors.ice100,
  },
  statusNew: {
    backgroundColor: theme.colors.royal100,
  },
  statusLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body,
    lineHeight: 17,
    color: theme.colors.ice500,
  },
  divider: {
    width: 1,
    height: FIGMA_LAB_RESULTS.dividerHeight,
    backgroundColor: theme.colors.ice300,
    opacity: 0.5,
  },
  dividerCompact: {
    display: "none",
  },
  metaCol: {
    width: 280,
    minWidth: 170,
    maxWidth: "100%",
    justifyContent: "center",
  },
  metaText: {
    fontFamily: theme.typography.fontFamily.light,
    fontSize: theme.typography.size.caption,
    lineHeight: 16,
    color: theme.colors.charcoal,
  },
  viewResultsBtn: {
    marginLeft: "auto",
    width: FIGMA_LAB_RESULTS.viewResultsWidth,
    minHeight: FIGMA_LAB_RESULTS.actionButtonHeight,
    borderWidth: 1,
    borderColor: theme.colors.ice200,
    backgroundColor: theme.colors.white,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  viewResultsBtnCompact: {
    marginLeft: 0,
    width: "100%",
    maxWidth: FIGMA_LAB_RESULTS.viewResultsWidth,
    alignSelf: "flex-start",
  },
  viewResultsLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body16,
    lineHeight: 19,
    color: theme.colors.royal400,
  },
});
