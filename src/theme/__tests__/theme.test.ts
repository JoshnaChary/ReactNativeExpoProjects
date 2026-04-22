import { theme } from "@/theme";
import { colors } from "@/theme/colors";
import { radius } from "@/theme/radius";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

describe("theme tokens", () => {
  it("aggregates color, spacing, radius and typography modules", () => {
    expect(theme.colors).toBe(colors);
    expect(theme.spacing).toBe(spacing);
    expect(theme.radius).toBe(radius);
    expect(theme.typography).toBe(typography);
  });

  it("exposes the full Figma color palette as hex strings", () => {
    const values = Object.values(colors);
    expect(values.length).toBeGreaterThan(0);
    for (const value of values) {
      expect(value).toMatch(/^#[0-9A-F]{6}$/i);
    }
  });

  it("exposes a monotonically increasing spacing scale", () => {
    const order: Array<keyof typeof spacing> = [
      "xxs",
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "xxl",
      "xxxl",
    ];
    for (let i = 1; i < order.length; i++) {
      expect(spacing[order[i]]).toBeGreaterThan(spacing[order[i - 1]]);
    }
  });

  it("exposes non-negative numeric radius tokens", () => {
    for (const value of Object.values(radius)) {
      expect(typeof value).toBe("number");
      expect(value).toBeGreaterThanOrEqual(0);
    }
  });

  it("exposes a complete typography scale", () => {
    expect(Object.keys(typography.fontFamily)).toEqual([
      "light",
      "regular",
      "medium",
      "semibold",
    ]);
    for (const v of Object.values(typography.size)) {
      expect(v).toBeGreaterThan(0);
    }
    for (const v of Object.values(typography.lineHeight)) {
      expect(v).toBeGreaterThan(0);
    }
  });
});
