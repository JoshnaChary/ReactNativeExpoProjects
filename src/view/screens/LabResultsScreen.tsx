import { useIsWeb } from "@/hooks/useIsWeb";
import { LabResultsMobileView } from "@/view/screens/mobile/LabResultsMobileView";
import { LabResultsWebView } from "@/view/screens/web/LabResultsWebView";

export const LabResultsScreen = () => {
  const isWeb = useIsWeb();
  return isWeb ? <LabResultsWebView /> : <LabResultsMobileView />;
};
