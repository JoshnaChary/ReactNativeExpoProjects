import { API_CONFIG } from "@/constants/api";

// We mock axios here rather than load the real module because axios 1.x eagerly
// imports its fetch adapter at module-load time, and that adapter crashes under
// Node 25 + Expo's streams polyfill with "Cannot cancel a stream that already
// has a reader". The crash happens before any test body runs, so mocking is the
// only way to exercise httpClient under Jest. Runtime HTTP behaviour is covered
// by Expo/axios themselves; this test only verifies our wiring.
// NOTE: variables referenced from jest.mock() factories must be `mock`-prefixed
// because the factory is hoisted above imports by babel-plugin-jest-hoist.
const mockCreate = jest.fn().mockReturnValue({
  defaults: { baseURL: "__unset__", timeout: -1 },
});
jest.mock("axios", () => ({
  __esModule: true,
  default: { create: mockCreate },
}));

describe("httpClient", () => {
  it("calls axios.create with baseURL and timeout from API_CONFIG", () => {
    jest.isolateModules(() => {
      require("@/services/httpClient");
    });
    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: API_CONFIG.baseUrl,
      timeout: API_CONFIG.timeoutMs,
    });
  });
});
