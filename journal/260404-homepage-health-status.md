# Homepage health status badges

## What changed

Brought the per-source health info from `/status` onto the homepage project table so users can
see scan health without a separate visit.

## Additions to `src/routes/+page.svelte`

- Overall system status badge (Healthy / Degraded / Error) rendered between the masthead and
  the table, styled to match the status page and linking through to `/status`.
- New sortable **Status** column showing the per-source health (Healthy / Warning / Error /
  Unknown) with the same color scheme as the status page. `consecutive_failures` displays in
  parentheses when > 0, and the same hover tooltip text is reused (including `last_error` for
  warning/error states).
- Relative time-ago label (`1m ago` / `2h ago` / `3d ago`) rendered beside each "Last updated"
  date, derived from the same document `modified_at` value that drives the date itself — not
  from `last_indexed`, since the user wanted the existing date's context, not the scan time.

## Data fetching

`loadData()` now fetches `/api/tree` and `/api/health` in parallel via `Promise.all`. The
health call is wrapped in `.catch(() => null)` so if the health endpoint fails the table still
renders — just without the status column content or the overall badge.

`healthBySource` is a `$derived.by` that builds a `Record<string, HealthSource>` keyed by
source name for O(1) lookup in the sort comparator and each-row render. Used a plain object
instead of `Map` to avoid the `svelte/prefer-svelte-reactivity` lint rule (the object is
rebuilt fresh on every `health` change, so no reactive collection is needed).

## Sorting

Status sort uses the same `statusOrder` ranking as the status page (`error` < `warning` <
`unknown` < `healthy`) so ascending-sort surfaces problems first. Added `"status"` to the
`SortCol` union and gave it an ascending default (same as `"project"`).

## Mobile

The existing `@media (max-width: 640px)` rule that hides `.col-date` now also hides the
`.time-ago` span, so narrow screens still show the date without the extra label next to it.

## Docs

Updated `docs/architecture.md` Homepage entry to describe the new Status column, the overall
badge, and the time-ago label.

## Notes

There is now some duplication between the homepage and `/status` for `timeAgo`, the status
label/tooltip helpers, and the status-color CSS classes. Not extracted to shared utilities for
now — each file has a small, self-contained copy, and the next time the rules diverge or a
third page wants the same treatment, that will be the right moment to pull them out.
