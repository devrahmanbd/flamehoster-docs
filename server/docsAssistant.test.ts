import { describe, expect, it } from "vitest";
import { answerDocsQuestion, isRestrictedDocsQuestion, searchGuideContext } from "./docsAssistant";

describe("docs assistant safety and retrieval", () => {
  it("recognizes terminal and host-level requests as restricted", () => {
    expect(isRestrictedDocsQuestion("How do I SSH into the host and restart Docker?"))
      .toBe(true);
  });

  it("retrieves relevant published Web UI guide sections", () => {
    const matches = searchGuideContext("Where can I configure SSL certificates for my domain?");
    expect(matches.length).toBeGreaterThan(0);
    expect(matches.some((match) => match.slug === "ssl-tls")).toBe(true);
    expect(matches.some((match) => match.section.includes("Let's Encrypt"))).toBe(true);
  });

  it("returns a safe redirect when no public guide matches", async () => {
    const result = await answerDocsQuestion({
      question: "zzyzx quantum aurora",
      version: "v0.9",
      requestKey: "vitest-no-match",
    });
    expect(result.shouldRedirect).toBe(true);
    expect(result.citations).toEqual([]);
  });
});
