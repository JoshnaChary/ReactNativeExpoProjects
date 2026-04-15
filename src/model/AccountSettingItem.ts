export type AccountTab = "settings" | "notifications" | "delegates";

export type AccountSettingItem = {
  id: string;
  label: string;
  value: string;
  canChange: boolean;
};
