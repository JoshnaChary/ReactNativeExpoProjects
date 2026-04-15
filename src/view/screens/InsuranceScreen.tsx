import { useIsWeb } from "@/hooks/useIsWeb";
import { InsuranceMobileView } from "@/view/screens/mobile/InsuranceMobileView";
import { InsuranceWebView } from "@/view/screens/web/InsuranceWebView";

export const InsuranceScreen = () => {
  const isWeb = useIsWeb();
  return isWeb ? <InsuranceWebView /> : <InsuranceMobileView />;
};
