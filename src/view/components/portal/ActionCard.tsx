import { FIGMA_CARD, FIGMA_ICON } from "@/constants/figmaHomeLayout";
import { theme } from "@/theme";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";

export type ActionCardProps =
  | {
      variant: "message";
      headline: string;
      avatarUrl: string;
      iconUrl: string;
    }
  | {
      variant: "link";
      label: string;
    };

export const ActionCard = (props: ActionCardProps) => {
  if (props.variant === "message") {
    const isWeb = Platform.OS === "web";
    return (
      <Pressable
        style={({ pressed }) => [styles.card, styles.row, pressed && styles.pressed]}
        accessibilityRole="button"
      >
        <View style={styles.iconColumn}>
          <View style={styles.avatarWrap}>
            {isWeb ? (
              <>
                <Image
                  source={{ uri: props.avatarUrl }}
                  style={styles.avatarRingImage}
                  resizeMode="cover"
                />
                <Image
                  source={{ uri: props.iconUrl }}
                  style={styles.iconOverlay}
                  resizeMode="cover"
                />
              </>
            ) : (
              <View style={styles.avatarRing}>
                <View style={styles.iconOverlay}>
                  <View style={styles.envelopeBody}>
                    <View style={styles.envelopeTopFlap} />
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
        <Text style={styles.messageHeadline}>{props.headline}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.card, styles.linkOnly, pressed && styles.pressed]}
      accessibilityRole="button"
    >
      <Text style={styles.linkLabel}>{props.label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: FIGMA_CARD.width,
    height: FIGMA_CARD.height,
    backgroundColor: theme.colors.white,
    borderWidth: FIGMA_CARD.borderWidth,
    borderColor: theme.colors.borderCard,
    borderRadius: FIGMA_CARD.borderRadius,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: FIGMA_CARD.messagePaddingLeft,
    paddingRight: FIGMA_CARD.actionPaddingRight,
  },
  linkOnly: {
    justifyContent: "center",
    paddingLeft: FIGMA_CARD.actionPaddingLeft,
    paddingRight: FIGMA_CARD.actionPaddingRight,
  },
  pressed: {
    opacity: 0.96,
  },
  iconColumn: {
    width: FIGMA_ICON.messageAvatar,
    height: FIGMA_CARD.height,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarWrap: {
    width: FIGMA_ICON.messageAvatar,
    height: FIGMA_ICON.messageAvatar,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarRing: {
    width: FIGMA_ICON.messageAvatar,
    height: FIGMA_ICON.messageAvatar,
    borderRadius: FIGMA_ICON.messageAvatar / 2,
    backgroundColor: theme.colors.royal300,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarRingImage: {
    position: "absolute",
    width: FIGMA_ICON.messageAvatar,
    height: FIGMA_ICON.messageAvatar,
    borderRadius: FIGMA_ICON.messageAvatar / 2,
  },
  iconOverlay: {
    width: FIGMA_ICON.messageIconWidth,
    height: FIGMA_ICON.messageIconHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  envelopeBody: {
    width: 23,
    height: 17,
    borderWidth: 2,
    borderColor: theme.colors.white,
    borderRadius: 3,
    overflow: "hidden",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  envelopeTopFlap: {
    width: 14,
    height: 10,
    marginTop: -5,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderColor: theme.colors.white,
    transform: [{ rotate: "-45deg" }],
  },
  messageHeadline: {
    flex: 1,
    marginLeft: FIGMA_CARD.messageIconTextGap,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body18,
    lineHeight: 22,
    color: theme.colors.royal400,
  },
  linkLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.size.body18,
    lineHeight: 22,
    color: theme.colors.royal400,
    textAlign: "left",
  },
});
