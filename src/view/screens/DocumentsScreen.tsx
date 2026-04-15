import { useIsWeb } from "@/hooks/useIsWeb";
import { DocumentsMobileView } from "@/view/screens/mobile/DocumentsMobileView";
import { DocumentsWebView } from "@/view/screens/web/DocumentsWebView";

export const DocumentsScreen = () => {
  const isWeb = useIsWeb();
  return isWeb ? <DocumentsWebView /> : <DocumentsMobileView />;
};
