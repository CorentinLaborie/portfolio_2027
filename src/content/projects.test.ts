import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { projectIds } from "./fr/projects";
import { projectsContent as english } from "./en/projects";
import { projectsContent as french } from "./fr/projects";

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

  it("has a screenshot file for every slide of L’Empire du Malt, in both languages", () => {
    for (const content of [french, english]) {
      expect(content.empire.slides.length).toBeGreaterThan(0);
      for (const slide of content.empire.slides) {
        expect(existsSync(join(process.cwd(), "public", slide.src))).toBe(true);
      }
    }
  });
});
