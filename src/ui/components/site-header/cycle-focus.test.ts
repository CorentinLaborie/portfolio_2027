import { describe, expect, it } from "vitest";
import { cycleFocusIndex } from "./cycle-focus";

describe("cycleFocusIndex", () => {
  it("wraps from the last item to the first on Tab", () => {
    expect(cycleFocusIndex(4, 3, false)).toBe(0);
  });

  it("wraps from the first item to the last on Shift+Tab", () => {
    expect(cycleFocusIndex(4, 0, true)).toBe(3);
  });

  it("lets the browser move focus between inner items", () => {
    expect(cycleFocusIndex(4, 1, false)).toBeNull();
    expect(cycleFocusIndex(4, 2, true)).toBeNull();
  });

  it("enters the loop at its start or end when focus is outside it", () => {
    expect(cycleFocusIndex(4, -1, false)).toBe(0);
    expect(cycleFocusIndex(4, -1, true)).toBe(3);
  });

  it("returns null for an empty loop", () => {
    expect(cycleFocusIndex(0, -1, false)).toBeNull();
  });
});
