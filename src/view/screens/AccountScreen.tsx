import { useIsWeb } from "@/hooks/useIsWeb";
import { AccountMobileView } from "@/view/screens/mobile/AccountMobileView";
import { AccountWebView } from "@/view/screens/web/AccountWebView";

export const AccountScreen = () => {
  const isWeb = useIsWeb();
  return isWeb ? <AccountWebView /> : <AccountMobileView />;
};
