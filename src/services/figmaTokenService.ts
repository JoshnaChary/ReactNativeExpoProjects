import { FIGMA_CONFIG } from "@/constants/figma";

export type FigmaDesignTokens = {
  colors: Record<string, string>;
  spacing: Record<string, number>;
  radius: Record<string, number>;
  typography: Record<
    string,
    {
      fontSize: number;
      lineHeight: number;
      fontWeight: number;
      fontFamily: string;
    }
  >;
};

export const getFigmaDesignTokens = async (): Promise<FigmaDesignTokens> => {
  throw new Error(
    `Figma MCP token extraction requires authenticated MCP access for ${FIGMA_CONFIG.fileUrl}.`,
  );
};
