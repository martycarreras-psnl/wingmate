# Wingmate App Workbook template and contract

Create one workbook per app in a user-selected document location. Markdown is a
portable representation, not a requirement for repository files or a particular
Cowork storage API. Blank entries mean unresolved, never approved or passed.
Do not copy confidential source records into this workbook; use minimal
descriptions, references, and synthetic examples.

The skills maintain this record as the conversation progresses. Users need not
upload this blank template or manually fill it in. Reuse the current record
through planning, native `/app`, and reviews in one conversation. Export/attachment
is for persistence or an actual later-session recovery, not a phase prerequisite.
When file saving is unavailable, label updates unsaved and keep them visible here.

## Identity and delivery state

| Field | Value |
| --- | --- |
| App name / identifier | |
| Business owner | |
| Workbook location | |
| Journey HTML location | |
| Workbook revision | r1 |
| Last updated / by | |
| Skills pack version | Read `references/pack-version.json` |
| Current phase | shape / data / build / prototype / acceptance / release |
| Review depth / rationale / confirmation | standard / enhanced / unresolved |
| App URL / build or visible version + timestamp | |
| Target environment / mode | synthetic preview / connected preview / published / unknown |
| Approved audience | |
| Overall status | draft / blocked / ready for review / approved for specified gate |
| Next action / owner | |

After every update, refresh the workspace's `App-Journey.html` from this record
using the journey contract bundled with each skill. Its source revision and source
update timestamp must match this workbook. HTML is a derived snapshot, not an
editable approval record. Report a failed HTML save separately from workbook
success; do not mark a planned refresh as successful.

## 1. Business brief

Problem, current process, desired measurable outcome, primary/secondary users,
MVP scope, non-goals, reporting needs, constraints, unresolved assumptions.

| Requirement ID | Actor | Trigger and intended outcome | Business rule / exception | Acceptance criterion | Priority |
| --- | --- | --- | --- | --- | --- |

Describe lifecycle transitions, who may perform them, rejection/cancellation,
delegation, and recovery. Separate human decisions from deterministic automation
and AI assistance. No AI decision authority is assumed.

## 1a. Visual Direction

A short confirmed direction in plain language, including an agent-recommended
default if the user has no reference or preference. Confirm it within brief
approval; do not require a separate design exercise.

| Reference / location | Guide / screenshot / description | Access status / inspected by / date | What to borrow | Mandatory rule or optional inspiration |
| --- | --- | --- | --- | --- |

| Design aspect | Agreed direction / constraint | Source or recommendation | Status / related REQ IDs |
| --- | --- | --- | --- |
| Required branding / authorized assets | | | |
| Layout / navigation / visual hierarchy | | | |
| Information density / spacing | | | |
| Typography / palette / status indicators | | | |
| Patterns to avoid | | | |
| Device / viewing / input context | | | |
| Accessibility / usability constraints | | | |

Record conflicts, inaccessible guides, unknown specifications, and unverified
native support explicitly. No references is valid; do not invent brand rules.
Link required observable criteria to REQ IDs. Store a reviewed summary for the
build handoff rather than relying only on external links. Use redacted examples
and only assets the user is authorized to share/use.

## 2. Business glossary

| Canonical term | Definition / relationship | Avoided aliases |
| --- | --- | --- |

This is business language, not a glossary of programming terms. Use the same
terms in labels and data display names where the platform supports them.

## 3. Data and access plan

| Data ID | Business concept / relationships | Authoritative source / owner | Existing asset evidence | Reuse / extend / create proposal and reason | Live / copied / synthetic | Sensitivity / retention |
| --- | --- | --- | --- | --- | --- | --- |

| Data ID | Connector / source | Requested operation | Capability evidence / date | Identity used / known limits | Confirmation status |
| --- | --- | --- | --- | --- | --- |

| Audience / role | Data visible | Allowed actions | Enforcement mechanism / evidence | Representative-user check |
| --- | --- | --- | --- | --- |

Document required fields, validation, identifiers, uniqueness, relationship
cardinality, lifecycle rules, conflict handling, write failure/retry behavior,
and recovery. Distinguish proposed policy from verified enforcement.

## 4. Decision log and open questions

| Decision ID | Decision / rationale | Alternatives | Evidence | Status | Approver / date / revision |
| --- | --- | --- | --- | --- | --- |

| Open question / blocker | Affected IDs | Owner | Resolution or noncritical deferral rationale |
| --- | --- | --- | --- |

## 5. Prototype review

| Feedback ID | Requirement / data IDs | Scenario / role / build | Observation and source | Proposed change | Accept / reject / defer | Decision owner |
| --- | --- | --- | --- | --- | --- | --- |

Keep observation separate from interpretation. Record how accepted findings
alter the brief/data plan and which approvals now need renewal.

## 6. Acceptance evidence

Record runtime evidence here during both prototype and acceptance review.

| Execution setup | Value / evidence |
| --- | --- |
| Target URL / build / role / mode | |
| Safe test scope / approver / date | |
| Isolated data / permitted operations / contained side effects | |
| Available and attempted execution surfaces / outcome / blocker | |
| Created test-record IDs / cleanup authorization / result / remaining owner | |

| Test ID | Requirement / data IDs | Build / mode / role / date | Steps / expected result | Actual result / evidence reference | Status | Observer / limitations |
| --- | --- | --- | --- | --- | --- | --- |

Allowed test statuses: not run, passed, failed, blocked, stale, N/A (with reason).
Add an execution method: non-browser code/component, service-level, or human
UI execution. Browser/computer-use automation is excluded from this pack.
Preserve any historical results with their original method and build; do not
relabel them as newly executed evidence. Static review is a separate finding, not
functional execution. Generated test instructions are "not run". User-reported
results retain that attribution. Record which layer a pass actually covers;
unit/service checks cannot prove UI behavior or a live integration they bypassed.

## 7. Release record

Target app/build, exact audience, exposure summary, current requirement coverage,
remaining defects/limitations, owner and support contact, recovery options
actually verified, retirement/data-retention plan, readiness recommendation.

| Gate | Status | Approver / date | Workbook revision | App/build / audience / scope | Approval text or blocker |
| --- | --- | --- | --- | --- | --- |

Publication result is separate from approval. Record actual URL, publication
time, observed version, and recipient verification only after evidence is
provided. Approval is not proof that publication happened.

## 8. Change and handoff history

| Revision / date | Change and reason | Affected IDs | Stale evidence / approvals | Required re-review | Next owner |
| --- | --- | --- | --- | --- | --- |

End each phase with a compact handoff: current state, latest workbook location,
revision, approvals still valid for this scope, blockers, and next skill.
