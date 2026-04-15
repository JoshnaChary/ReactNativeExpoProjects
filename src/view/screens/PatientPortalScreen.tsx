import { PORTAL_COPY } from "@/constants/copy";
import { useIsWeb } from "@/hooks/useIsWeb";
import { theme } from "@/theme";
import { PatientPortalMobileView } from "@/view/screens/mobile/PatientPortalMobileView";
import { PatientPortalWebView } from "@/view/screens/web/PatientPortalWebView";
import { usePatientPortalViewModel } from "@/viewmodel/usePatientPortalViewModel";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const PatientPortalScreen = () => {
  const isWeb = useIsWeb();
  const { summary, isLoading, errorMessage, load } = usePatientPortalViewModel();

  useEffect(() => {
    void load();
  }, [load]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.body}>{PORTAL_COPY.loading}</Text>
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{errorMessage}</Text>
        <Pressable onPress={() => void load()} style={styles.retryButton}>
          <Text style={styles.retryLabel}>{PORTAL_COPY.retry}</Text>
        </Pressable>
      </View>
    );
  }

  if (!summary) {
    return (
      <View style={styles.centered}>
        <Text style={styles.body}>{PORTAL_COPY.emptyState}</Text>
      </View>
    );
  }

  return isWeb ? (
    <PatientPortalWebView summary={summary} />
  ) : (
    <PatientPortalMobileView summary={summary} />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.white,
    padding: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  body: {
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.charcoal,
    fontSize: theme.typography.size.body18,
    lineHeight: theme.typography.lineHeight.body,
  },
  error: {
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.rose500,
    fontSize: theme.typography.size.body18,
    lineHeight: theme.typography.lineHeight.body,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: theme.colors.royal300,
    borderRadius: theme.radius.sm,
    minHeight: 44,
    paddingHorizontal: theme.spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  retryLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.white,
    fontSize: theme.typography.size.body16,
    lineHeight: theme.typography.lineHeight.body,
  },
});
