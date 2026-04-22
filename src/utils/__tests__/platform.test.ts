describe("utils/platform", () => {
  afterEach(() => {
    jest.resetModules();
    jest.dontMock("react-native");
  });

  it("isWeb is true on web", () => {
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    const { isWeb } = require("@/utils/platform");
    expect(isWeb).toBe(true);
  });

  it("isWeb is false on native", () => {
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    const { isWeb } = require("@/utils/platform");
    expect(isWeb).toBe(false);
  });
});
