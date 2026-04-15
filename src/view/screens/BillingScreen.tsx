import { useIsWeb } from "@/hooks/useIsWeb";
import { BillingMobileView } from "@/view/screens/mobile/BillingMobileView";
import { BillingWebView } from "@/view/screens/web/BillingWebView";

export const BillingScreen = () => {
  const isWeb = useIsWeb();
  return isWeb ? <BillingWebView /> : <BillingMobileView />;
};
