import { FIGMA_CONFIG } from "@/constants/figma";
import { getFigmaDesignTokens } from "@/services/figmaTokenService";

describe("getFigmaDesignTokens", () => {
  it("rejects with a message pointing at the Figma file", async () => {
    await expect(getFigmaDesignTokens()).rejects.toThrow(FIGMA_CONFIG.fileUrl);
  });
});
