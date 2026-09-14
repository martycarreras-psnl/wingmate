---
name: prove-my-app-works
description: "Runs functional acceptance testing on a built Cowork app — maps every requirement to a test, executes what can safely be run, and reports honest coverage with evidence limits. Use when the user says \"check my app actually works\", \"test this before I show my team\", \"does it meet the requirements\", \"run the acceptance tests\", \"what's the test coverage\", or wants regression checks after a fix. Do NOT use for shaping an idea (use shape-my-app), planning data (use design-my-data), reviewing a preview for gaps and look-and-feel (use pressure-test-my-prototype), or publishing (use release-my-app-responsibly). Never invokes or troubleshoots browser/computer use; rendered UI checks require human evidence."
license: MIT
---

# Prove My App Works

## When NOT to Use

- **No identifiable build yet** — an idea or brief goes to **shape-my-app**, a data plan to **design-my-data**.
- **Reviewing a preview for workflow gaps or visual direction** — use **pressure-test-my-prototype**.
- **Deciding whether to release** — use **release-my-app-responsibly**; this skill supplies evidence, not the
  release decision.
- **Anything requiring a browser or computer use** — out of scope by design; ask for human evidence instead.
- Live or destructive production writes, or working around denied consent, DLP, or authorization.

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

## Output format

Record results in workbook section 6 and summarize in chat using this shape:

```
Coverage table  — TEST ID | REQ/DATA IDs | scenario | expected | actual | status | evidence
                  status is exactly one of: passed | failed | blocked | not run | stale | N/A
Counts          — passed / failed / not run / blocked / stale / N/A
Defects         — defect ID | affected REQ IDs | severity | scoped repair prompt
Limitations     — what could not be executed, and why
Human steps     — only the checks that genuinely require a person, as a short numbered procedure
```

State actual evidence, never a confidence score or percentage-ready claim.

## Guardrails

- Never invoke, troubleshoot, or recommend browser/computer use, including alternate browser runners.
- Never publish, share, or perform live/destructive production writes; only approved isolated test-record
  mutations are permitted, and every one needs recorded cleanup.
- Never work around denied consent, DLP, or authorization by reaching for another tool; human sign-in and
  approval stay with the human.
- Inspect available capabilities rather than inventing a tool — if the platform advertises a test capability
  with no matching tool, record it as blocked instead of fabricating a runner.
- A generated test plan is "not run". Static inspection is not a pass. Unavailable execution stays blocked.
- Never claim a connected requirement passed on mock-only evidence, and never infer a stored change from a
  success notification — reopen and confirm persistence.
- If nothing could be executed, say so plainly and state that the app is unverified; never soften a blocked
  run into an implied pass.
- If the build, source, requirements, or test evidence is missing, unavailable, or cannot be retrieved,
  record it as blocked with the reason and ask one question; never fabricate a result to fill the gap.
- If a required tool or connection is unavailable, record the attempt and its failure rather than retrying
  in a loop or substituting an unauthorized path.
- Always show the coverage table and its counts before recommending a release review, and confirm any
  deferral with its owner before recording it.
- Attribute user-reported evidence as user-reported; a screenshot of a final state cannot establish the
  preceding actions.
- Critical access, integrity, and core-workflow failures cannot be waived by this skill.

## Handoff

Produce a coverage summary: requirements covered, passed, failed, not run,
blocked, stale, and N/A. State the actual evidence, not a confidence score.
Recommend **Release My App Responsibly** only when required checks have current
passing evidence. Continue that review in this same conversation; select its
skill through Sources here only if routing needs help.
Noncritical deferrals need explicit owner acceptance and must
not be labeled passes. Critical access, integrity, and core-workflow failures
cannot be waived by this skill.
