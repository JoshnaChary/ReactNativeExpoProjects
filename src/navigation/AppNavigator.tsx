import { ROUTES } from "@/constants/navigation";
import { AppointmentsScreen } from "@/view/screens/AppointmentsScreen";
import { BillingScreen } from "@/view/screens/BillingScreen";
import { DocumentsScreen } from "@/view/screens/DocumentsScreen";
import { InsuranceScreen } from "@/view/screens/InsuranceScreen";
import { LabResultDetailScreen } from "@/view/screens/LabResultDetailScreen";
import { LabResultsScreen } from "@/view/screens/LabResultsScreen";
import { QuestionnairesScreen } from "@/view/screens/QuestionnairesScreen";
import { AccountScreen } from "@/view/screens/AccountScreen";
import { PrescriptionsScreen } from "@/view/screens/PrescriptionsScreen";
import { PatientPortalScreen } from "@/view/screens/PatientPortalScreen";
import { MessagingCenterScreen } from "@/view/screens/MessagingCenterScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={ROUTES.HOME}
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name={ROUTES.HOME} component={PatientPortalScreen} />
        <RootStack.Screen
          name={ROUTES.MESSAGING}
          component={MessagingCenterScreen}
        />
        <RootStack.Screen
          name={ROUTES.APPOINTMENTS}
          component={AppointmentsScreen}
        />
        <RootStack.Screen
          name={ROUTES.PRESCRIPTIONS}
          component={PrescriptionsScreen}
        />
        <RootStack.Screen
          name={ROUTES.LAB_RESULTS}
          component={LabResultsScreen}
        />
        <RootStack.Screen
          name={ROUTES.LAB_RESULT_DETAIL}
          component={LabResultDetailScreen}
        />
        <RootStack.Screen
          name={ROUTES.QUESTIONNAIRES}
          component={QuestionnairesScreen}
        />
        <RootStack.Screen name={ROUTES.DOCUMENTS} component={DocumentsScreen} />
        <RootStack.Screen name={ROUTES.BILLING} component={BillingScreen} />
        <RootStack.Screen name={ROUTES.INSURANCE} component={InsuranceScreen} />
        <RootStack.Screen name={ROUTES.ACCOUNT} component={AccountScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
