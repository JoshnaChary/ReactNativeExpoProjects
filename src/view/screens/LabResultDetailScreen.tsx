import { useIsWeb } from "@/hooks/useIsWeb";
import { LabResultDetailMobileView } from "@/view/screens/mobile/LabResultDetailMobileView";
import { LabResultDetailWebView } from "@/view/screens/web/LabResultDetailWebView";

export const LabResultDetailScreen = () => {
  const isWeb = useIsWeb();
  return isWeb ? <LabResultDetailWebView /> : <LabResultDetailMobileView />;
};
