import { useIsWeb } from "@/hooks/useIsWeb";
import { AppointmentsMobileView } from "@/view/screens/mobile/AppointmentsMobileView";
import { AppointmentsWebView } from "@/view/screens/web/AppointmentsWebView";

export const AppointmentsScreen = () => {
  const isWeb = useIsWeb();
  return isWeb ? <AppointmentsWebView /> : <AppointmentsMobileView />;
};
