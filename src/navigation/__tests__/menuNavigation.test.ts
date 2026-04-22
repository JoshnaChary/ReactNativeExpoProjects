import { ROUTES } from "@/constants/navigation";
import { navigateFromMenuId } from "@/navigation/menuNavigation";
import type { RootStackParamList } from "@/navigation/types";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Nav = NativeStackNavigationProp<RootStackParamList>;

const makeNav = () => {
  const navigate = jest.fn();
  return { nav: { navigate } as unknown as Nav, navigate };
};

describe("navigateFromMenuId", () => {
  it.each([
    ["home", ROUTES.HOME],
    ["messages", ROUTES.MESSAGING],
    ["appointments", ROUTES.APPOINTMENTS],
    ["prescriptions", ROUTES.PRESCRIPTIONS],
    ["lab", ROUTES.LAB_RESULTS],
    ["questionnaires", ROUTES.QUESTIONNAIRES],
    ["documents", ROUTES.DOCUMENTS],
    ["billing", ROUTES.BILLING],
    ["insurance", ROUTES.INSURANCE],
    ["account", ROUTES.ACCOUNT],
  ])("maps menu id %s -> route %s", (id, route) => {
    const { nav, navigate } = makeNav();
    navigateFromMenuId(nav, id);
    expect(navigate).toHaveBeenCalledWith(route);
  });

  it("is a no-op for unknown ids (e.g. dividers/spacers/logout)", () => {
    const { nav, navigate } = makeNav();
    navigateFromMenuId(nav, "logout");
    navigateFromMenuId(nav, "unknown");
    expect(navigate).not.toHaveBeenCalled();
  });
});
