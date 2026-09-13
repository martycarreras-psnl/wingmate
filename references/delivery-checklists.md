# Selective review prompts

Use the applicable items only. Ask one question at a time using the shared
cadence. A checklist is not a script to recite or a substitute for evidence.

## Shape

- What measurable business outcome justifies this app?
- Who performs the primary workflow? Who receives its output?
- What starts/finishes the process? What causes rejection, cancellation, or rework?
- Who has decision authority? Does it change with delegation or absence?
- Which reports are necessary to operate the process?
- Where does collaboration happen? Does an app, deterministic workflow, or
  human decision serve the need better than AI?
- What is explicitly outside the first release?
- After the primary workflow is clear, invite a brand guide, inspiration
  screenshot/link, plain-language preference, or agent-recommended direction.
  Follow [visual direction discovery](visual-direction.md); do not require a reference.

## Data

- Is an existing source already authoritative for this concept?
- What evidence supports reuse, extension, or creation? Unknown is not absent.
- Is the data live, a copied snapshot, or synthetic? How fresh must it be?
- Which exact operations are supported and permitted for this connector?
- Where do persistent writes go? Who owns the connection and data?
- Which fields are required? What validates them at the trusted write boundary?
- What prevents duplicate submissions, lost updates, or invalid transitions?
- Who can see which data? What verifies enforcement beyond the UI?
- What are retention, correction, deletion, and audit expectations?

## Prototype

- Execute safe non-browser scenarios using
  [functional testing](functional-testing.md), not just a proposed checklist.
- Walk the main workflow using representative synthetic examples where possible.
- Include empty, loading, unavailable-data, invalid-input, rejected, overdue,
  missing-owner, and failure/retry situations where relevant.
- Ask the reviewer to perform a task, not to agree that the screen looks good.
- Include keyboard/label clarity and screen-size needs relevant to actual users.
- Record confusing terms, missing relationships, extra steps, and reporting gaps.
- A role simulation proves UX intent only, not real access isolation.
- Compare the preview with the confirmed Visual Direction, including required
  branding versus optional inspiration. Record unreviewed references and any
  accessibility/usability conflict instead of claiming compliance.

## Acceptance

- Use the functional testing capability ladder before handing work to the user.
  Record execution attempts, actual results, coverage limits, and test-data cleanup.
- Link every in-scope requirement to a scenario and expected result.
- For intended writes, check create/read/update/delete only where each is in scope.
- Verify persistence after reopening, not just a toast or optimistic UI change.
- Check filters, calculations, lifecycle transitions, and mandatory field behavior.
- Check unauthorized actions/data with separately authorized representative users.
- Exercise permission denial, connector failure, duplicate attempts, and concurrent
  edits where applicable. Do not conduct destructive tests on live business data.
- Verify labels, keyboard navigation, focus, and comprehensible validation errors.
- Verify required design criteria from Visual Direction using observable REQ-linked
  checks. A screenshot is not proof of measured contrast or keyboard behavior.
- Distinguish mock evidence from connected-runtime evidence.
- Record tests you could not execute and why; no invented coverage percentages.

## Release

- Match the reviewed build and audience to the actual proposed publication.
- Confirm data exposure with representative-recipient evidence.
- Confirm data source/write operation approval and required acceptance evidence.
- Resolve critical defects; explicitly accept only noncritical deferrals.
- Identify the owner, support route, usage instructions, and known limitations.
- Verify available recovery/retirement options; do not promise rollback.
- If high-impact writes lack an acceptable recovery procedure, block release.
- Obtain explicit human approval, then hand off to native publication.
- After publication, record actual evidence rather than reporting approval as success.
