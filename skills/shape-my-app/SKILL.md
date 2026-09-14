---
name: shape-my-app
description: "Shapes a rough business app idea into an approved, scoped brief before Cowork /app builds anything — one clarifying question at a time, with a confirmed visual direction. Use when the user says \"help me shape my app idea\", \"grill me about this app\", \"define the MVP\", \"what should my app actually do\", \"pick a visual direction from my brand guide\", or shares an inspiration screenshot before building. Do NOT use for building the app, connecting data (use design-my-data instead), testing a build, or publishing."
license: MIT
---

# Shape My App

## When NOT to Use

- **Building the app** — this skill never invokes `/app`; the native App skill owns the build.
- **Connecting data or choosing a schema** — use **design-my-data** instead, after the brief is approved.
- **Testing an existing build** — use **prove-my-app-works** for acceptance testing, or
  **pressure-test-my-prototype** for a built preview.
- **Publishing or sharing** — use **release-my-app-responsibly** instead.
- General questions about what Cowork apps can do, with no idea to shape — answer those directly.

## Start here

Maintain [the workspace journey guide](references/app-journey.md) on invocation
and after every workbook update during this skill, not just at handoff.

Read [the shared method](references/methodology.md) and
[App Workbook contract](references/app-workbook.md) before interviewing.
Use [selective checklists](references/delivery-checklists.md) when needed.
Read [visual direction discovery](references/visual-direction.md) once the
primary user and workflow are clear; do not wait for the user to request design help.
Read [platform boundaries](references/platform-boundaries.md) before any claim
about what native `/app` can do.

## Phase contract

**Inputs:** a business idea or existing brief, available business evidence, and
the current workbook if one exists. An incomplete idea is a valid starting point.

**Outputs:** workbook sections 1, 1a (Visual Direction), 2, and 4; scoped
requirements with measurable acceptance criteria; review depth; explicit
non-goals; a human-reviewed brief including a confirmed visual direction.

**Stop conditions:** unresolved core outcome, workflow, authority, or audience;
conflicting terminology that changes meaning; no explicit brief approval.
Do not build, provision, or invoke `/app`.

## Workflow

1. Identify whether this is a new idea or revision. Reuse recorded decisions.
   Reflect the business objective in a short paragraph, separating facts from
   assumptions. Ask the highest-value missing question, not a questionnaire.
2. Use the shared grilling cadence on every turn: one atomic question, your
   recommended answer, lettered alternatives when appropriate, then wait.
3. Resolve the primary outcome and user before expanding workflow boundaries.
   Challenge concrete exceptions: rejection, withdrawal, correction, absent
   approver, or overdue work. Follow dependencies depth-first.
4. Clarify reporting, collaboration, authority, and who-sees-what requirements.
   Distinguish business requirements from suggested product features. Do not
   invent an approval chain, AI agent, automation, or organizational hierarchy.
5. Propose standard/enhanced review depth with rationale. Unknown sensitivity
   stays unresolved. Keep the standard path short but retain essential gates.
6. Record canonical terms as they are resolved. Identify conceptual records,
   relationships, and lifecycle states without choosing physical tables.
7. Give each requirement a stable ID and observable acceptance criterion.
   Separate MVP, explicit non-goals, deferred work, and unconfirmed assumptions.
8. Invite visual inspiration using the visual-direction reference: a brand-guide
   link, screenshot/example app, a few descriptive words, or a recommendation
   from you. Ask one question at a time. Reference material is optional; a
   confirmed recommended direction is enough. Reuse preferences already supplied.
   Record required branding separately from inspiration in section 1a, with
   access limitations, device needs, and accessibility constraints. Do not
   demand a detailed design prompt or assume an inaccessible guide was reviewed.
9. Present the draft brief, including Visual Direction, for review. Request `APPROVE BRIEF rN` for its actual
   revision as a separate human response. Until then it is a draft, not approved.
   Record approval scope/date/person; later material edits invalidate it.

## Output format

Deliver the brief as markdown sections in this order, in chat (and into the workbook when one exists):

```
1.  Business objective      — short paragraph, facts separated from assumptions
1a. Visual Direction        — confirmed direction; required branding listed apart from inspiration
2.  Scope                   — MVP table: requirement ID | requirement | acceptance criterion
4.  Non-goals & deferred    — bulleted, with unconfirmed assumptions called out
    Review depth            — standard or enhanced, with rationale
```

Keep each requirement to one observable acceptance criterion. Close every turn with the single
next question, never a questionnaire.

## Guardrails

- Never invoke `/app`, provision resources, connect data, or write to any live system from this skill.
- Always ask exactly one atomic question per turn, with your recommended answer, then wait.
- Never fabricate an approval chain, automation, AI agent, org hierarchy, or user need the human did not state.
- If required context is missing or cannot be found — the primary user, the core outcome, the approver —
  record it as an open blocker and ask about it; do not fill the gap with an assumption presented as fact.
- If a brand guide or screenshot is unavailable or unreadable, say so and offer a recommended direction
  instead; never claim to have reviewed material you could not open.
- Always present the draft brief for review and confirm before treating it as approved — approval requires
  an explicit `APPROVE BRIEF rN` from the human, and later material edits invalidate it.
- Do not restate platform capabilities without checking
  [platform boundaries](references/platform-boundaries.md) first.

## Handoff

Recommend **Design My Data** with the current workbook before native generation.
Continue that review in this same conversation using the answers already given.
If routing needs assistance, suggest selecting it in Sources here; do not ask
the user to start another chat or attach a workbook already available here.
Brief approval does not authorize schema changes, live connections, writes,
sharing, or publication. If the user wants to build immediately, explain the
remaining data/access decision and ask that one question rather than silently
invoking `/app`. A low-risk synthetic prototype can be considered in the next
phase without pretending unsupported mock-only capabilities exist.

Report workbook revision/location, approved scope, remaining blockers, and next
action. If the workbook was not saved, say so and provide the updated content.
