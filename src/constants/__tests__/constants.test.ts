import { API_CONFIG } from "@/constants/api";
import { PORTAL_COPY } from "@/constants/copy";
import { ROUTES } from "@/constants/navigation";

describe("API_CONFIG", () => {
  it("uses https and a positive timeout", () => {
    expect(API_CONFIG.baseUrl.startsWith("https://")).toBe(true);
    expect(API_CONFIG.timeoutMs).toBeGreaterThan(0);
  });
});

describe("PORTAL_COPY", () => {
  it("exposes the expected user-facing strings", () => {
    expect(PORTAL_COPY).toEqual({
      loading: "Loading your health record...",
      error: "Could not load your portal data.",
      retry: "Retry",
      emptyState: "No records available yet.",
    });
  });
});

describe("ROUTES", () => {
  it("declares a unique route name for each screen", () => {
    const values = Object.values(ROUTES);
    expect(new Set(values).size).toBe(values.length);
  });

  it("includes the core portal destinations", () => {
    expect(ROUTES.HOME).toBe("Home");
    expect(ROUTES.MESSAGING).toBe("Messaging");
    expect(ROUTES.LAB_RESULT_DETAIL).toBe("LabResultDetail");
  });
});
