import { ROUTES } from "@/constants/navigation";
import { AppointmentsScreen } from "@/view/screens/AppointmentsScreen";
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
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
