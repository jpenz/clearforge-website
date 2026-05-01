# Contributing — ClearForge.ai

Working agreement for both AI coding agents (Claude, Codex) and humans contributing to this repo.
Read this before opening a PR.

---

## Branch protection

`main` is protected. **No direct pushes.** Every change ships through a pull request.

If you find yourself wanting to push direct to `main` to "save time," stop. The handoff between
agents only works if every change has a reviewable surface.

---

## Branch naming

Use the agent prefix so attribution is visible at a glance in `git log --all --graph --oneline`:

| Prefix | Who |
|---|---|
| `claude/<scope>-<short-desc>` | Claude (Anthropic) |
| `codex/<scope>-<short-desc>` | Codex (OpenAI) |
| `human/<scope>-<short-desc>` | James (or any human contributor) |
| `fix/<short-desc>` | Hotfix from any source — short, urgent, narrow |

Examples:
- `codex/seo-meta-description-rewrite`
- `claude/industries-add-aerospace`
- `human/contact-form-supabase-wire`

---

## Commit format — conventional commits

Every commit message starts with one of these prefixes:

| Prefix | When to use |
|---|---|
| `feat:` | A new user-visible feature or capability |
| `fix:` | A bug fix |
| `refactor:` | Code change that neither fixes a bug nor adds a feature |
| `perf:` | Performance improvement |
| `a11y:` | Accessibility improvement |
| `docs:` | Documentation only (README, CLAUDE.md, this file) |
| `chore:` | Build, deps, tooling, config — no source change |
| `style:` | Whitespace, formatting, no behavior change |
| `test:` | Test-only change |

Subject line: under 80 chars, imperative ("add", not "added"), no trailing period.

Include a `Co-Authored-By` trailer for AI-authored commits:

```
feat: add aerospace industry page

Body explaining what + why.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

For Codex commits:
```
Co-Authored-By: Codex <noreply@openai.com>
```

This makes `git log --author="Codex"` and `git log --author="Claude"` filter cleanly.

---

## Pull request requirements

Every PR description follows the template at `.github/pull_request_template.md`. Required sections:

1. **Summary** — what changed in 1-3 bullets
2. **Why** — why this change matters; link the issue if there is one
3. **Test plan** — checklist of what was verified (build passes, visual check, scorecard flow, etc.)
4. **Risk** — what could break, what to roll back if it does

The PR description IS the handoff document. The next agent reads the description, not commit
messages or random notes. Make it complete enough that someone with no context can understand
the change.

**One logical change per PR.** Do not bundle a feature with a refactor with a bug fix.
Reviewing and reverting are both easier with focused PRs.

---

## Required checks before merge

- [ ] `npm run build` passes locally
- [ ] No new TypeScript errors
- [ ] If touching `/scorecard/*`, the full 20-question flow still works end-to-end
- [ ] If touching `/discover/*`, all three phases (URL → research → value-chain → chat → PDF)
      still work
- [ ] If new images go into `/public`, they are referenced from source in the same PR
      (no orphaned assets)
- [ ] CLAUDE.md is updated if the change affects architecture or version

---

## Versioning

Version is tracked as `V8.X` in commit messages and as `v8.X` git tags.

Tag every shipped version:

```bash
git tag v8.28 <commit-sha>
git push origin v8.28
```

Then `git diff v8.27..v8.28 --stat` shows exactly what shipped between two versions.

Rollback is `git revert v8.27..v8.28` — one command.

---

## Issues

Found a bug or want to flag a problem you can't immediately fix? Open a GitHub Issue.

In the issue:
- Reproduction steps (URL or component path, what you did, what happened, what you expected)
- File path + line number if known
- Severity hint: `[blocker]` `[major]` `[minor]` `[nit]` in the title

Reference the issue in the fix PR with `Closes #N` to auto-link and auto-close on merge.

---

## What NOT to do

- ❌ Don't push direct to `main` — protected
- ❌ Don't bundle unrelated changes in one PR
- ❌ Don't use generic commit messages like "update" or "fix bug"
- ❌ Don't skip the PR template
- ❌ Don't merge a PR with failing build
- ❌ Don't create a custom tracker file (`AGENT_LOG.md`, `CHANGES.md`) — git is the tracker
- ❌ Don't write documentation files unless explicitly requested by the project owner

---

## Quick reference for the next agent

You're picking up where someone left off. Before you start:

```bash
# What's on main?
git log --oneline -10

# What's the latest version?
git tag --list | sort -V | tail -1

# What changed in the last shipped version?
git diff $(git tag --list | sort -V | tail -2 | head -1)..HEAD --stat

# Anyone working on a branch?
git branch -a

# Any open PRs?
gh pr list

# Any open issues?
gh issue list
```

Read the latest 3-5 commit messages. Read CLAUDE.md. Read recent PR descriptions. Then start.
