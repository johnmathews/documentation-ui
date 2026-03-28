import { describe, it, expect } from "vitest";
import { displaySource, displayTitle } from "$lib/titles";

describe("displaySource", () => {
 it("converts hyphens to spaces and title-cases", () => {
  expect(displaySource("documentation-mcp-server")).toBe("Documentation MCP Server");
 });

 it("converts underscores to spaces and title-cases", () => {
  expect(displaySource("my_project_name")).toBe("My Project Name");
 });

 it("uppercases known acronyms", () => {
  expect(displaySource("documentation-ui")).toBe("Documentation UI");
  expect(displaySource("dns-proxy")).toBe("DNS Proxy");
  expect(displaySource("api-gateway")).toBe("API Gateway");
 });

 it("preserves already-uppercase short words", () => {
  expect(displaySource("MCP")).toBe("MCP");
 });

 it("handles single word", () => {
  expect(displaySource("journal")).toBe("Journal");
 });

 it("collapses multiple separators", () => {
  expect(displaySource("a--b__c")).toBe("A B C");
 });

 it("returns original name for empty string", () => {
  // displaySource returns name if result would be empty after trim
  expect(displaySource("")).toBe("");
 });
});

describe("displayTitle edge cases", () => {
 it("strips nested directory paths and shows only filename", () => {
  expect(displayTitle({ title: null, file_path: "a/b/c/my-doc.md" })).toBe("My Doc");
 });

 it("handles .engineering-team path", () => {
  expect(displayTitle({ title: null, file_path: ".engineering-team/evaluation-report.md" })).toBe("Evaluation Report");
 });

 it("keeps short acronyms uppercase in non-root filename", () => {
  expect(displayTitle({ title: null, file_path: "docs/API_GUIDE.md" })).toBe("API Guide");
 });

 it("uses raw filename for root-level files", () => {
  expect(displayTitle({ title: null, file_path: "README.md" })).toBe("README.md");
  expect(displayTitle({ title: null, file_path: "CLAUDE.md" })).toBe("CLAUDE.md");
  expect(displayTitle({ title: "Some Project Title", file_path: "README.md" })).toBe("README.md");
 });

 it("prefers title over filename when title is present", () => {
  expect(
   displayTitle({
    title: "My Custom Title",
    file_path: "docs/something-else.md",
   }),
  ).toBe("My Custom Title");
 });

 it("falls back to filename when title contains a slash", () => {
  expect(
   displayTitle({
    title: "docs/readme.md",
    file_path: "docs/readme.md",
   }),
  ).toBe("Readme");
 });

 it("returns raw filename for root file even when title ends with .md", () => {
  expect(
   displayTitle({
    title: "readme.md",
    file_path: "readme.md",
   }),
  ).toBe("readme.md");
 });
});
