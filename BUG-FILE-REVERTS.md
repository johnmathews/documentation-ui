# Bug: Tracked files silently reverted during long Claude Code sessions

**Date:** 2026-03-29
**Status:** Unresolved — cause not identified
**Severity:** High — caused significant rework (changes had to be re-applied 3+ times)

## Symptoms

During a long Claude Code session (~2 hours), edits to tracked git files were silently reverted to the last committed state. This happened at least 3 times. Each time:

- All modifications to **tracked files** were lost (reverted to HEAD)
- **Untracked files** (new files like `SearchPanel.svelte`) survived every time
- No error messages or warnings — the files just silently changed back
- The revert appeared to coincide with system-reminder messages saying files were "modified, either by the user or by a linter"

The pattern is consistent with `git checkout .` or `git restore .` being run, since those commands only affect tracked files and leave untracked files untouched.

## Files affected

All modified tracked files in the session:
- `src/routes/+layout.svelte`
- `src/lib/components/Sidebar.svelte`
- `src/lib/api.ts`
- `src/lib/server/api.ts`
- `src/lib/api.test.ts`
- `src/lib/stores.test.ts`
- `docs/development.md`
- `CLAUDE.md`

## Investigation

### Processes running (all cleared)

| Process | PID | Working directory | Verdict |
|---------|-----|-------------------|---------|
| Claude Code (this session) | 17760 | documentation-ui | Self — the session making changes |
| Claude Code (other session) | 9874 | rabobank/k8s | Cleared — different repo |
| nvim --embed | 57638 | rabobank/k8s | Cleared — different repo, no files open here |
| yaml-language-server | 58329 | (child of nvim) | Cleared — only serves nvim |
| marksman | 57740 | (child of nvim) | Cleared — only serves nvim |
| Vite dev server | various | documentation-ui | Reads files but shouldn't write/restore them |

### Hooks and formatters (all cleared)

- **Git hooks:** All `.sample` (inactive). No husky, no lint-staged.
- **Claude Code hooks:** All `peon-ping` sound notification hooks. None modify files.
- **Prettier:** Installed as npm dependency but no format-on-save configured. No `.prettierrc`.
- **ESLint:** No auto-fix plugin, no prettier integration.
- **VS Code settings:** Only `extensions.json` (recommends Svelte extension). No `settings.json` with format-on-save.
- **No file watchers found:** No `fswatch`, `entr`, `nodemon`, or similar processes.

### Timing pattern

The reverts seemed to occur during periods when:
1. Many files had been edited but not committed
2. The conversation context was being compressed (approaching context limits)
3. The Vite dev server was being restarted (`pkill` + restart)

## Possible causes (unverified)

1. **Context compression side effect** — When Claude Code compresses older messages, it may re-read files from disk. If something restores them between the edit and the re-read, the compressed state would reflect the reverted files. But this doesn't explain _what_ restores them.

2. **Vite dev server restart** — Killing and restarting the Vite process could trigger file system events that interact with an unknown tool. The SvelteKit dev server watches files for HMR but shouldn't modify them.

3. **Unknown process or OS-level mechanism** — macOS file versioning, Time Machine snapshots, or a background process we didn't identify.

4. **Claude Code internal behavior** — The tool might have an internal mechanism that restores files under certain conditions (e.g., when the Edit tool's preconditions aren't met after context compression).

## Mitigation

**Commit early and often.** After editing 2-3 files, commit immediately before doing verification steps (Playwright, tests, dev server restarts). This prevents losing work even if the revert happens again.

## Reproducing

The bug was intermittent and only observed during one long session. To attempt reproduction:

1. Start a long Claude Code session in this repo
2. Edit multiple tracked files without committing
3. Run the dev server, restart it, interact with Playwright
4. Wait for context compression to occur
5. Check `git status` — are the tracked file modifications still present?

## Would a worktree help?

Working in a git worktree could help in two ways:

1. **Isolation test:** If the bug is caused by something running `git restore .` or `git checkout .` on the main working tree, a worktree would be unaffected since it has its own working directory and index. If changes are still reverted in a worktree, the cause is something else (like Claude Code internals or a file-system-level mechanism).

2. **Prevention:** Even if we don't identify the root cause, working in a worktree provides natural protection — any rogue `git` command targeting the main worktree wouldn't affect the feature branch's worktree.

**Recommendation:** Next time a multi-file feature is developed in this repo, use a worktree. If the reverts don't happen, that strongly suggests the cause is a process targeting the main working tree. If they still happen, the cause is something that follows the active Claude Code session regardless of directory.

## Next steps

1. **Use a worktree for the next multi-file feature** as a controlled experiment. This both protects against the bug and narrows the root cause.
2. **Commit early and often** — after editing 2-3 files, commit immediately before running verification steps (Playwright, tests, dev server restarts). Committed changes cannot be silently reverted.
3. **Monitor `git status` proactively** — check `git status` before and after dev server restarts, context compressions, or any long pause in the session.
4. **If the bug recurs**, run `fs_usage -w -f filesys | grep documentation-ui` in a separate terminal to capture which process is writing to the files in real time.
