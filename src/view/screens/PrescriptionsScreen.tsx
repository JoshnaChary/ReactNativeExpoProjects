import { useIsWeb } from "@/hooks/useIsWeb";
import { PrescriptionsMobileView } from "@/view/screens/mobile/PrescriptionsMobileView";
import { PrescriptionsWebView } from "@/view/screens/web/PrescriptionsWebView";

export const PrescriptionsScreen = () => {
  const isWeb = useIsWeb();
  return isWeb ? <PrescriptionsWebView /> : <PrescriptionsMobileView />;
};
