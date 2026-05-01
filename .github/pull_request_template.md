<!--
ClearForge PR template. Read CONTRIBUTING.md before opening.
This description IS the handoff document for the next agent.
-->

## Summary

<!-- 1-3 bullets describing what changed. Be concrete. -->

-
-
-

## Why

<!--
Why this change matters. Link the GitHub issue with `Closes #N` if applicable.
For agent-driven changes, briefly explain the trigger (user request, code review finding,
follow-up to PR #N, etc.).
-->

## Test plan

<!-- Check what was verified. Add or remove items as needed for this change. -->

- [ ] `npm run build` passes locally
- [ ] No new TypeScript errors (`npm run typecheck`)
- [ ] Visually verified in dev (`npm run dev`)
- [ ] If touching `/scorecard/*`, full 20-question flow still works
- [ ] If touching `/discover/*`, all phases still work (URL → research → value-chain → chat → PDF)
- [ ] If touching industry pages, verified at least one slug renders correctly
- [ ] If touching `/api/*`, verified the route returns expected shape
- [ ] No new orphaned assets in `/public` (every new asset is referenced from source)
- [ ] CLAUDE.md updated if architecture or version changed

## Risk

<!--
What could break? What's the rollback plan?
For most PRs: "Low — single component change, build passes." That's fine.
For migrations, infra changes, or anything touching shared data: be explicit.
-->

## Screenshots / loom (if visual)

<!-- Optional. Required for any UI change. -->

## Linked issues / PRs

<!-- Closes #N, follow-up to #N, etc. -->

---

<sub>Agent identifier (Claude / Codex / Human): </sub>
