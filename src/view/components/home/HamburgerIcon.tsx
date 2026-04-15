import { theme } from "@/theme";
import { StyleSheet, View } from "react-native";

export const HamburgerIcon = () => {
  return (
    <View style={styles.wrap} accessibilityLabel="Menu">
      <View style={styles.bar} />
      <View style={styles.bar} />
      <View style={styles.bar} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: 29,
    gap: 5,
    justifyContent: "center",
  },
  bar: {
    height: 4,
    width: 29,
    backgroundColor: theme.colors.white,
    borderRadius: 1,
  },
});
