---
name: pressure-test-my-prototype
description: "Use when someone wants to pressure-test a Cowork app, find functional gaps, or compare it with agreed visual direction. Runs available safe non-browser app-code or service tests; requests targeted human UI evidence. Never invokes or troubleshoots browser/computer use."
license: MIT
---

# Pressure-Test My Prototype

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

## Handoff

Recommend **Prove My App Works** once the prototype gate is approved.
Continue here using current requirements and preview findings. If necessary,
guide the user to select that skill in Sources without changing conversations.
A visually simulated manager view is not evidence of real authorization.
Prototype success is not proof of persisted writes, working connectors, or
release readiness. Preserve those distinctions in the handoff.
