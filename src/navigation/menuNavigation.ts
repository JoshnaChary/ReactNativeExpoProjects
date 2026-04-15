import { ROUTES } from "@/constants/navigation";
import type { RootStackParamList } from "@/navigation/types";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

const MENU_ROUTE_BY_ID: Record<string, keyof RootStackParamList> = {
  home: ROUTES.HOME,
  messages: ROUTES.MESSAGING,
  appointments: ROUTES.APPOINTMENTS,
  prescriptions: ROUTES.PRESCRIPTIONS,
  lab: ROUTES.LAB_RESULTS,
  questionnaires: ROUTES.QUESTIONNAIRES,
  documents: ROUTES.DOCUMENTS,
  billing: ROUTES.BILLING,
  insurance: ROUTES.INSURANCE,
  account: ROUTES.ACCOUNT,
};

export const navigateFromMenuId = (
  navigation: NativeStackNavigationProp<RootStackParamList>,
  id: string,
) => {
  const route = MENU_ROUTE_BY_ID[id];
  if (!route) return;
  navigation.navigate(route);
};
