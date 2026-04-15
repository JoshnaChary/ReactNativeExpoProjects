import type { AccountSettingItem } from "@/model/AccountSettingItem";

export const MOCK_ACCOUNT_SETTINGS: AccountSettingItem[] = [
  {
    id: "name",
    label: "Full Name",
    value: "Jane Doe",
    canChange: false,
  },
  {
    id: "email",
    label: "Email",
    value: "jane.doe@mail.com",
    canChange: true,
  },
  {
    id: "password",
    label: "Password",
    value: "****************",
    canChange: true,
  },
  {
    id: "language",
    label: "Language",
    value: "English",
    canChange: true,
  },
];
