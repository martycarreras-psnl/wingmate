---
name: design-my-data
description: "Use when reviewing an app's source of truth, existing data reuse, records and relationships, connector operations, or data access before building or connecting a Cowork app. Produces a reviewed data plan; does not provision schema, bind connectors, or change permissions."
license: MIT
---

# Design My Data

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
