import { Platform } from "react-native";

export const useIsWeb = () => Platform.OS === "web";
