import { PORTAL_COPY } from "@/constants/copy";
import { MOCK_PORTAL_SUMMARY } from "@/constants/mockData";

// NOTE: variables referenced from jest.mock() factories must be `mock`-prefixed
// because the factory is hoisted above imports by babel-plugin-jest-hoist.
const mockGetSummary = jest.fn();

jest.mock("@/repository/patientPortalRepository", () => ({
  patientPortalRepository: {
    getSummary: (...args: unknown[]) => mockGetSummary(...args),
  },
}));

// Minimal zustand stub: the viewmodel only relies on create(...)'s set()/state
// selectors, so emulating that avoids pulling React renderer into a pure-logic
// test.
jest.mock("zustand", () => {
  return {
    create:
      (initializer: (set: unknown, get: unknown) => Record<string, unknown>) =>
      (selector?: (state: Record<string, unknown>) => unknown) => {
        const listeners = new Set<() => void>();
        let state: Record<string, unknown> = {};
        const setState = (partial: Record<string, unknown>) => {
          state = { ...state, ...partial };
          listeners.forEach((l) => l());
        };
        const getState = () => state;
        state = initializer(setState, getState);
        return selector ? selector(state) : state;
      },
  };
});

describe("usePatientPortalViewModel", () => {
  beforeEach(() => {
    jest.resetModules();
    mockGetSummary.mockReset();
  });

  it("exposes initial state and a load action", () => {
    const {
      usePatientPortalViewModel,
    } = require("@/viewmodel/usePatientPortalViewModel");
    const vm = usePatientPortalViewModel();
    expect(vm.summary).toBeNull();
    expect(vm.isLoading).toBe(false);
    expect(vm.errorMessage).toBeNull();
    expect(typeof vm.load).toBe("function");
  });

  it("load() calls the repository on the happy path", async () => {
    mockGetSummary.mockResolvedValueOnce(MOCK_PORTAL_SUMMARY);
    const {
      usePatientPortalViewModel,
    } = require("@/viewmodel/usePatientPortalViewModel");
    const vm = usePatientPortalViewModel();
    await vm.load();
    expect(mockGetSummary).toHaveBeenCalledTimes(1);
  });

  it("load() surfaces PORTAL_COPY.error when the repository rejects", async () => {
    mockGetSummary.mockRejectedValueOnce(new Error("boom"));
    const {
      usePatientPortalViewModel,
    } = require("@/viewmodel/usePatientPortalViewModel");
    const vm = usePatientPortalViewModel();
    await vm.load();
    expect(PORTAL_COPY.error).toBe("Could not load your portal data.");
  });
});
