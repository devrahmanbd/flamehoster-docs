import { describe, expect, it } from "vitest";
import {
  findGuide,
  getAdjacentGuides,
  getGuideHref,
  groupsForEdition,
  guidesForEdition,
  relatedGuides,
  searchGuides,
} from "./docs";

describe("BrickDocs edition-aware content model", () => {
  it("keeps all guide links explicitly scoped to a shareable edition route", () => {
    expect(getGuideHref("ssl-tls", "shared")).toBe("/docs/shared/ssl-tls");
    expect(getGuideHref("deploying-apps", "dedicated")).toBe("/docs/dedicated/deploying-apps");
  });

  it("does not expose dedicated-only deployment content in the Shared guide index or search", () => {
    expect(findGuide("deploying-apps", "shared")).toBeUndefined();
    expect(guidesForEdition("shared").some((guide) => guide.slug === "deploying-apps")).toBe(false);
    expect(searchGuides("deploy", "shared").some((guide) => guide.slug === "deploying-apps")).toBe(false);
    expect(searchGuides("deploy", "dedicated").some((guide) => guide.slug === "deploying-apps")).toBe(true);
  });

  it("only renders sidebar groups that contain published guides for the selected edition", () => {
    for (const edition of ["shared", "dedicated"] as const) {
      const availableSlugs = new Set(guidesForEdition(edition).map((guide) => guide.slug));
      const groups = groupsForEdition(edition);
      expect(groups.length).toBeGreaterThan(0);
      expect(groups.every((group) => group.guides.length > 0)).toBe(true);
      expect(groups.every((group) => group.guides.every((guide) => availableSlugs.has(guide.slug)))).toBe(true);
    }
  });

  it("keeps adjacent and related guide relationships inside the active edition", () => {
    const guide = findGuide("getting-started", "shared");
    expect(guide).toBeDefined();
    const adjacent = getAdjacentGuides("getting-started", "shared");
    const availableSlugs = new Set(guidesForEdition("shared").map((item) => item.slug));
    expect(adjacent.previous).toBeUndefined();
    expect(adjacent.next && availableSlugs.has(adjacent.next.slug)).toBe(true);
    expect(relatedGuides(guide!, "shared").every((item) => availableSlugs.has(item.slug))).toBe(true);
  });
});
