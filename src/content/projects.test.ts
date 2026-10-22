import { describe, expect, it } from "vitest";
import { projectIds, toProjectId } from "./fr/projects";
import { projectsContent as english } from "./en/projects";
import { projectsContent as french } from "./fr/projects";

describe("toProjectId", () => {
  it("keeps the values of the project selector", () => {
    expect(toProjectId("y")).toBe("y");
    expect(toProjectId("micro")).toBe("micro");
    expect(toProjectId("empire")).toBe("empire");
  });

  it("falls back to Y for an unknown value", () => {
    expect(toProjectId("unknown")).toBe("y");
  });
});

describe("project options", () => {
  it("offers every project in both languages, in the same order", () => {
    expect(french.options.map((option) => option.value)).toEqual([...projectIds]);
    expect(english.options.map((option) => option.value)).toEqual([...projectIds]);
  });

  it("gives L’Empire du Malt its stack and its link in both languages", () => {
    expect(french.empire.stack).toEqual(["Bubble.io", "Node.js", "Express", "Vercel"]);
    expect(english.empire.stack).toEqual(french.empire.stack);
    expect(french.empire.url).toBe("https://lempiredumalt.fr");
    expect(english.empire.url).toBe(french.empire.url);
  });
});
