---
name: pressure-test-my-prototype
description: "Pressure-tests a Cowork app preview against real user scenarios — hunting workflow gaps, confusing paths, missing edge cases, and drift from the agreed visual direction — then records findings against requirement IDs. Use when the user says \"pressure-test my prototype\", \"poke holes in this app\", \"review my preview\", \"does this match the design we agreed\", \"what's missing from this build\", or shares a preview for critique. Do NOT use for shaping an idea (use shape-my-app), planning data (use design-my-data), formal acceptance testing (use prove-my-app-works), or publishing (use release-my-app-responsibly). Never invokes or troubleshoots browser/computer use."
license: MIT
---

# Pressure-Test My Prototype

## When NOT to Use

- **No preview or review evidence exists** — go back to **shape-my-app** or the native `/app` build first.
- **Formal requirement-by-requirement acceptance testing** — use **prove-my-app-works**.
- **Changing the data model or scope** — route to **design-my-data** or **shape-my-app**; this skill
  records findings, it does not redesign.
- **Publishing or sharing** — use **release-my-app-responsibly**.
- **Anything requiring a browser or computer use** — out of scope by design; request human evidence instead.
- Rebuilding the app or mutating live data.

## Start here

Maintain [the workspace journey guide](references/app-journey.md) on invocation
and after every workbook update during this skill, not just at handoff.

Read [the shared method](references/methodology.md) and
[App Workbook contract](references/app-workbook.md).
Use [selective checklists](references/delivery-checklists.md) for scenarios and
[platform boundaries](references/platform-boundaries.md) for capability limits.
Read [visual direction review](references/visual-direction.md) before comparing
the preview with the brief's branding or inspiration.
Read [functional testing](references/functional-testing.md) before interaction.

## Phase contract

**Inputs:** a preview or adequate screenshots/walkthrough evidence, scoped
requirements, data plan, latest workbook, and a representative review persona.

**Outputs:** workbook section 5 with observed findings, affected requirement/data
IDs, visual-direction discrepancies, executed functional results in section 6,
blocked paths, decisions on feedback, and updated brief/data decisions where needed.

**Stop conditions:** major workflow confusion, missing critical exceptions,
unresolved model changes, or no review evidence. Screenshots alone cannot prove
interactive behavior or persistence. Block unsafe actions, not independent safe
checks. Do not mutate live data or rebuild the app; test-record mutations require
the isolated scope defined in the functional testing protocol.

## Workflow

1. Identify the exact preview/build and whether it uses synthetic, copied, or
   connected data. If unknown, treat interactions as potentially live writes.
   Use the preview and approved plan already available in this conversation.
   Do not request a new session or re-upload of context that is present.
   Ask for preview access/evidence only if genuinely unavailable.
2. Choose the highest-value user task. Give a concrete scenario, not "do you like
   the design?" Use realistic synthetic examples where supported.
3. Execute safe non-browser checks against actual app code/tests or independently
   authorized test interfaces. Never invoke or troubleshoot browser/computer use,
   including alternate browser runners. Follow the functional testing capability ladder.
   Do not stop at instructions for the user when you can run the path. If no safe
   execution works, record attempts/reasons, inspect available static evidence,
   and request only the blocked human step. Static inspection is not a test pass.
4. Walk applicable happy, empty, error, rejected, overdue, and missing-owner paths.
   Check whether the user can understand the next action without coaching.
   Include reporting, labels, keyboard flow, and relevant display sizes.
   Compare with section 1a (Visual Direction): mandatory branding, the aspects
   borrowed from references, hierarchy, density, and patterns to avoid. Do not
   assume the user wanted every detail of an inspiration screenshot replicated.
   If visual evidence is unavailable, record the comparison as unreviewed.
   Surface accessibility/usability conflicts even when the preview looks similar.
5. Ask one atomic follow-up at a time with a recommendation and lettered choices.
   Separate a preference from a workflow defect or incorrect business model.
6. Record each finding with a feedback ID and affected requirement/data IDs.
   Link executed scenarios to TEST IDs in section 6 with expected/actual results,
   evidence, build/mode, and cleanup status. Report functional gaps as well as UX
   feedback; never infer stored changes from a toast alone.
   Decide accept/reject/defer; record the rationale and owner. Translate accepted
   findings into intentional brief/data changes instead of collecting screenshots
   with no follow-through.
7. Increment revision for material changes and invalidate affected approvals.
   Route model or scope changes to **Design My Data** or **Shape My App**.
   Supply a scoped native `/app` change prompt only after those approvals are
   renewed. Re-review the resulting preview; do not assume the change succeeded.
   Keep native `/app` revisions and subsequent reviews in this same conversation.
   Once a repair is available, rerun failed paths and relevant regression checks
   using the same safe execution protocol.
8. When the primary flow is understandable and critical findings are resolved,
   request `APPROVE PROTOTYPE rN`. Record the specific preview and scope.

## Output format

Record workbook section 5 (and section 6 for anything executed) and summarize in chat as markdown
sections, each finding a bullet and each table a real markdown table, in this order:

```
Findings        — feedback ID | affected REQ/DATA IDs | what happened | expected | severity | decision
                  decision is exactly one of: accept | reject | defer, each with an owner and rationale
Paths walked    — happy, empty, error, rejected, overdue, missing-owner — with status per path
Visual check    — section 1a aspect | agreed | observed | verdict, or "unreviewed" when evidence is absent
Executed tests  — TEST ID | expected | actual | evidence | cleanup status
Blocked         — what could not be checked, and why
Next question   — one atomic follow-up with a recommendation and lettered choices
```

Separate a preference from a workflow defect or an incorrect business model in every finding.
Show the findings table before asking the next question, and review it with the user before recording
any accept/reject/defer decision.

## Guardrails

- Never invoke, troubleshoot, or recommend browser/computer use, including alternate browser runners.
- Inspect the app's own tools, scripts, and test files to decide what can be run — never invent a tool or
  a test runner that the session does not actually expose.
- If the preview, build, or review evidence is missing, unavailable, or cannot be opened, say so plainly and
  request only the blocked step; never fabricate a finding, a screenshot, or an observed behavior.
- Always confirm the primary flow is understandable with the user before requesting prototype approval.
- Never mutate live data or rebuild the app; test-record mutations require the isolated scope defined in
  the functional testing protocol, with recorded cleanup.
- If the data mode is unknown, treat every interaction as a potentially live write.
- Ask one atomic follow-up at a time, with a recommendation and lettered choices — never a questionnaire,
  and never "do you like the design?" in place of a concrete scenario.
- Do not stop at instructions for the user when you can safely run the path yourself; equally, never claim a
  path was exercised when it was only inspected. Static inspection is not a test pass.
- Never infer a stored change from a toast or success message alone.
- If visual evidence is unavailable, record the comparison as unreviewed rather than assuming a match; and
  never assume the user wanted every detail of an inspiration screenshot replicated.
- Surface accessibility and usability conflicts even when the preview looks close to the reference.
- A visually simulated manager view is not evidence of real authorization, and prototype success is not
  proof of persisted writes, working connectors, or release readiness — preserve those distinctions.
- Material changes increment the revision and invalidate affected approvals; say so rather than carrying a
  stale approval forward.

## Handoff

Recommend **Prove My App Works** once the prototype gate is approved.
Continue here using current requirements and preview findings. If necessary,
guide the user to select that skill in Sources without changing conversations.
A visually simulated manager view is not evidence of real authorization.
Prototype success is not proof of persisted writes, working connectors, or
release readiness. Preserve those distinctions in the handoff.
