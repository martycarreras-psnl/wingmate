---
name: design-my-data
description: "Turns an approved app brief into a reviewed data plan — authoritative sources, reuse-vs-create decisions, records and relationships, connector operations, and who-sees-what — before Cowork /app builds anything. Use when the user says \"where should this app's data live\", \"can we reuse existing data\", \"what tables does my app need\", \"check the data plan before I build\", \"who should be able to see this data\", or asks whether a connector supports an operation. Do NOT use for shaping the idea itself (use shape-my-app instead), testing a build (use prove-my-app-works), or publishing (use release-my-app-responsibly). Never provisions schema, binds connectors, or changes permissions."
license: MIT
---

# Design My Data

## When NOT to Use

- **Shaping the idea or scope** — use **shape-my-app**; this skill starts from an approved brief.
- **Building the app or generating schema** — the native `/app` skill owns the build; never invoke it here.
- **Testing a build** — use **prove-my-app-works**, or **pressure-test-my-prototype** for a preview.
- **Publishing, sharing, or granting access** — use **release-my-app-responsibly**.
- Any request to actually create tables, bind a connector, write records, or change permissions —
  this skill plans and reviews only.

## Start here

Maintain [the workspace journey guide](references/app-journey.md) on invocation
and after every workbook update during this skill, not just at handoff.

Read [the shared method](references/methodology.md),
[App Workbook contract](references/app-workbook.md), and
[platform boundaries](references/platform-boundaries.md).
Use the data section of [selective checklists](references/delivery-checklists.md).

## Phase contract

**Inputs:** approved business scope, conceptual records and workflows, latest
workbook, and available source documentation or authorized read-only discovery.

**Outputs:** workbook section 3, reuse/extend/create decisions, explicit operation
capabilities, validation and ownership rules, audience/access matrix, and blockers.

**Stop conditions:** unsupported required operation; unresolved authoritative
source, ownership, sensitivity, or audience; unreviewed duplication; missing
approval for the proposed data plan. Do not perform schema, connector, record,
or permission mutations.

## Workflow

1. Match the scope to current brief approval. Missing inputs return to
   **Shape My App** only for the unresolved decisions.
2. Map each business concept to an authoritative source and owner. Inspect
   existing assets using available authorized read-only evidence; if unavailable,
   request an inventory or owner confirmation. Do not interpret no access as
   proof that no reusable data exists.
3. Prefer reuse, then extension, then justified creation. Pause on duplication
   risk with one question, recommended choice, and concrete trade-offs. Record
   the decision, evidence, and any approved exception. Do not impose Dataverse
   tables on an app whose actual backing store has not been verified.
4. For each source, distinguish live data, copied snapshots, and synthetic data.
   Verify the actual requested connector operation separately from read access.
   Schema-generation support is connector-specific, never assumed.
5. Resolve cardinality, identifiers, required fields, validation, states,
   duplicate handling, conflicting updates, write failures, and correction.
   Express requirements without hardcoding an unverified implementation.
6. Specify intended audience and who can see/do what. Determine what is known
   about runtime/connection identity and enforcement. Do not treat hidden UI
   as access control or assume sharing preserves source-level permissions.
7. Record sensitivity, retention, audit, and recovery decisions proportionately.
   Required unverified capabilities remain blockers to a live-data build.
8. Present the plan and ask for `APPROVE DATA PLAN rN` against the actual revision.
   Brief approval must still cover the current scope. Record proposed controls
   separately from enforcement that still needs connected acceptance evidence.

## Output format

Deliver workbook section 3 as markdown in this order, in chat and in the workbook:

```
Sources          — table: concept | authoritative source | owner | evidence | reuse/extend/create
Operations       — table: source | operation needed | verified supported? | evidence
Records          — records, relationships, identifiers, required fields, states
Rules            — validation, duplicates, conflicting updates, write failures, correction
Access           — audience matrix: role | can see | can do | how enforced
Sensitivity      — sensitivity, retention, audit, recovery decisions
Blockers         — unverified capabilities and unresolved decisions, each with an owner
```

Mark every unverified capability as a blocker, never as an assumed pass. Close each turn with the
single next question.

## Asking the user questions

Ask every clarifying question through the interactive question card
(`core-AskUserQuestion`), not as plain text in your reply. The card is the default;
plain text is the fallback.

Use only a question tool actually exposed by the session and follow its advertised schema.
`core-AskUserQuestion` is a host-specific example, not a guaranteed tool name or capability.
If the host cannot represent an open-ended card, use the plain-text fallback.

- **One question per card**, matching the one-atomic-question cadence — never batch the
  interview into a multi-question card.
- **The lettered alternatives become the options.** Offer 2-5, each a genuinely different
  outcome, labelled by what happens rather than by position. Put your recommendation first
  and begin its description with `Recommended —` plus the reason, so the recommendation
  survives in the card.
- **Open-ended answers** (a name, a number, a source, a description) use a card with an
  empty options array rather than invented choices.
- **Fall back to plain text** when the card is unavailable, when the answer is an artifact
  the user must supply (a screenshot, a brand guide, a link, evidence), or when the options
  cannot be enumerated honestly.
- **Never put an approval gate on a card.** `APPROVE BRIEF rN`, `APPROVE DATA PLAN rN`,
  `APPROVE PROTOTYPE rN` and `APPROVE RELEASE rN` must stay an explicit typed human
  response, so approval remains deliberate and auditable.
- An empty or cancelled card leaves the decision unresolved. Do not automatically repeat it,
  select an option, or treat silence as consent. Continue only independent safe discussion;
  dependent actions remain blocked until the human explicitly resolves the decision.

## Guardrails

- Never create schema, bind a connector, write records, or change permissions from this skill.
- Always ask exactly one atomic question per turn, with a recommended answer, then wait.
- Never treat lack of read access as proof that no reusable data exists — request an inventory or
  owner confirmation instead.
- Never assume a connector supports a write or schema-generation operation because read access works;
  verify each operation separately and record it as a blocker if it cannot be confirmed.
- Never treat hidden UI as access control, or assume sharing preserves source-level permissions.
- If ownership, sensitivity, audience, or the authoritative source cannot be determined, record it as
  an open blocker and ask; never fabricate an owner, a table, or an approval chain.
- Always present the plan for review and confirm before treating it as approved — approval requires an
  explicit `APPROVE DATA PLAN rN` from the human against the actual revision.
- Do not state what native `/app` can do without checking
  [platform boundaries](references/platform-boundaries.md) first.

## Native `/app` handoff

Only after scope and data-plan approvals are valid, provide a prompt for the
human to use with `/app` in this same conversation:

> Build the scope in our current App Workbook at revision [actual revision]
> using the approved decisions in this conversation.
> Preserve its glossary, requirement IDs, data decisions, and non-goals.
> Follow section 1a (Visual Direction), including required branding, chosen
> layout/density, patterns to avoid, device needs, and accessibility constraints.
> Use its reviewed reference summary; do not assume reference links are accessible.
> Flag unsupported required fonts, assets, or presentation behavior before substituting.
> Use only the approved sources and operations. Do not add schema, live writes,
> or sharing beyond the reviewed plan. Surface capability gaps before proceeding.
> Ask one atomic question with a recommendation when a material decision is
> missing. Do not publish. Produce a preview for scenario-based review.

Substitute the actual revision and approved mode. For unresolved live-data
capabilities, propose a synthetic-only prototype plan for explicit approval,
keeping live work blocked. Verify native support before promising this mode;
synthetic data alone does not guarantee resource-free generation.
Do not execute `/app` yourself. Tell the human to invoke it here, not in a new
session. The native App skill owns the approved build; this review skill's
no-mutation boundary must not prevent that separate, human-requested action.
After the preview is available, continue with **Pressure-Test My Prototype**
in this same conversation. Do not tell the user to leave and return.

Carry the confirmed visual-direction summary into the prompt or attached
workbook already available here; do not require exporting or reattaching it, or
hand off only inspiration URLs. If section 1a is missing from
an older workbook, return to **Shape My App** for that one decision using
[visual direction discovery](references/visual-direction.md), not the full intake.
