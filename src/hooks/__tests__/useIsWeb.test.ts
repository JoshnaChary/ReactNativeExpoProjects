describe("useIsWeb", () => {
  afterEach(() => {
    jest.resetModules();
    jest.dontMock("react-native");
  });

  it("returns true on web", () => {
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    const { useIsWeb } = require("@/hooks/useIsWeb");
    expect(useIsWeb()).toBe(true);
  });

  it("returns false on native", () => {
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    const { useIsWeb } = require("@/hooks/useIsWeb");
    expect(useIsWeb()).toBe(false);
  });
});
