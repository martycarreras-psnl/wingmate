---
name: prove-my-app-works
description: "Use when a Cowork app needs functional acceptance testing, coverage, or regression checks. Executes available safe non-browser app-code/service tests and records evidence limits. Never invokes or troubleshoots browser/computer use; rendered UI checks require human evidence."
license: MIT
---

# Prove My App Works

## Start here

Maintain [the workspace journey guide](references/app-journey.md) on invocation
and after every workbook update during this skill, not just at handoff.

Read [the shared method](references/methodology.md),
[App Workbook contract](references/app-workbook.md), and the acceptance section
of [selective checklists](references/delivery-checklists.md).
Consult [platform boundaries](references/platform-boundaries.md) before assuming
test tooling, connector operations, or recipient permission behavior.
Read [functional testing](references/functional-testing.md) before execution.

## Phase contract

**Inputs:** current requirements, reviewed prototype, data/access plan, a specific
implemented build, latest workbook, and available authorized test evidence.

**Outputs:** requirement-to-test coverage, executed acceptance results in workbook
section 6, capability attempts/blockers, defects, cleanup status, and scoped
human procedures only where execution is unavailable or outside safe scope.

**Stop conditions:** a required scenario is failed, blocked, not run, or stale;
mock-only evidence is being used to claim a connected requirement passed;
no identifiable build; critical authorization/data-integrity failures.
Never publish or perform live/destructive production test writes. Approved
isolated test-record mutations are permitted by the functional testing protocol.

## Workflow

1. Confirm the app/build, mode, requirements revision, review depth, and approvals.
   Preserve historical results but mark inapplicable evidence stale.
   Reuse the current conversation's workbook, preview, and review findings;
   do not require a new session or reattachment of available context.
2. Assign a TEST ID to each scenario and link its REQ/DATA IDs. Every in-scope
   requirement needs an observable criterion, including negative behavior where
   applicable. Describe setup, role, steps, expected result, and cleanup owner.
3. Use the smallest appropriate set: core workflow, intended CRUD operations,
   state transitions, filters/totals, required-field validation, and relevant
   accessibility behavior. Add concurrency, duplicates, failures, and audit
   checks for enhanced-risk apps. N/A requires a reason.
   Include required observable criteria from section 1a (Visual Direction),
   linked to REQ IDs. Visual resemblance alone does not prove readable contrast,
   keyboard operation, or status recognition without color. Record evidence and
   limits using [visual direction review](references/visual-direction.md).
4. Follow the non-browser functional testing ladder: isolated execution of actual
   app code/tests, then independently authorized service-level checks. Never
   invoke or troubleshoot browser/computer use or alternate browser runners.
   Inspect capabilities and test scripts rather than inventing tools.
   A generated test plan is "not run"; unavailable execution stays blocked/not run.
5. Run safe independent paths and approved isolated test-data operations yourself.
   Record attempts, failures, side effects, and cleanup. Never work around denied
   consent, DLP, or authorization through another tool. Human sign-in/approval
   stays with the human. For rendered UI checks or when no safe execution is possible, record static
   findings separately and give only the remaining human procedure. Ask one
   missing-scope/evidence question at a time, not permission for every safe click.
6. Check persistence after reopening, not only a success notification. Check
   recipient visibility using separately authorized representative users, not
   a simulated role selector or just the maker's session.
7. Record expected/actual result, build, role, mode, date, observer, source, and
   limitations. Attribute user-reported evidence as user-reported. A screenshot
   of a final state alone cannot establish every preceding action.
8. Failed behavior becomes a defect with affected IDs and a scoped repair prompt
   for native `/app`. Requirement changes return to the relevant planning skill.
   Rerun affected scenarios after changes; keep unaffected evidence only with
   a documented applicability rationale.

## Handoff

Produce a coverage summary: requirements covered, passed, failed, not run,
blocked, stale, and N/A. State the actual evidence, not a confidence score.
Recommend **Release My App Responsibly** only when required checks have current
passing evidence. Continue that review in this same conversation; select its
skill through Sources here only if routing needs help.
Noncritical deferrals need explicit owner acceptance and must
not be labeled passes. Critical access, integrity, and core-workflow failures
cannot be waived by this skill.
