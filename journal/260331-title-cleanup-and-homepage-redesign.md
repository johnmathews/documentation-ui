# Title Cleanup and Homepage Redesign

## Changes

### Source prefix stripping from document titles
Documents in projects like "Document Stream" had titles prefixed with the project name (e.g., "DocumentStream — Implementation Plan"). Added `stripSourcePrefix()` to `src/lib/titles.ts` that normalizes both the source name and title to lowercase alphanumeric for flexible matching, then strips the prefix along with leading grammar characters (hyphens, em-dashes, colons, commas). Applied in `displayTitle()` when a `source` property is provided, and in the document page breadcrumbs and browser title tag.

### SKILL.md title handling
Files at `skills/<name>/SKILL.md` were showing as "About" or "Skill" — uninformative titles that could collide across skills. Added a path-based override in `displayTitle()` that formats these as "Skill: Code Review" (using the parent directory name with Title Case and acronym preservation).

### Homepage redesign
Replaced the card grid (showing per-project document lists) with a GOV.UK-style table listing projects with columns: Project, Last updated, Documents. Content-sized rather than full-width. Renamed "All Documents" nav link to "Projects".

### Journal and Engineering Team page fixes
- Journal: removed `margin-left: auto; text-align: right` from entry titles so they flow naturally after the source badge instead of being pushed to the far right.
- Engineering Team: removed file path display from document entries (the `.engineering-team/...` paths were visual noise).

### CI/CD workflow
Created `.github/workflows/docker-publish.yml` to build and push the Docker image to `ghcr.io/johnmathews/documentation-ui` on push to main.

## Testing
Added 17 new test cases covering `stripSourcePrefix` (10 cases), `displayTitle` with source prefix stripping (2 cases), and SKILL.md title handling (5 cases). All 174 tests pass.
