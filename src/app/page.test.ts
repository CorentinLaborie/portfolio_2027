import { describe, expect, it } from "vitest";
import * as home from "./page";

describe("home page", () => {
  it("renders on each request, so the hero age is never frozen at build time", () => {
    expect(home.dynamic).toBe("force-dynamic");
  });
});
