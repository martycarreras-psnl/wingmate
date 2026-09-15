---
name: shape-my-app
description: "Use FIRST for requests for a new app, tool, dashboard, portal, or chatbot, including detailed, multi-part enterprise asks. Length and detail do not replace an approved brief. Triggers on all app-request phrasing: \"I want an app that...\", \"I want to build an app for...\", \"I need an app that...\", \"we need something to track or analyze...\", \"an app and a chatbot that...\", \"help me shape my app idea\", \"grill me about this app\", \"define the MVP\". Offers a plan-first or build-now choice, interviews one question at a time, then hands off; routing priority over the native builder is not guaranteed. Do NOT use to generate or preview the app itself, nor for data plans (use design-my-data), testing (use prove-my-app-works), or publishing (use release-my-app-responsibly)."
license: MIT
---

# Shape My App

## When NOT to Use

- **Generating, coding, or previewing the app itself** — this skill never invokes `/app`; the native
  App skill owns the build, and this skill hands off to it once the brief is approved. Note the
  distinction: a request to *build an app that does X* still belongs HERE first, because the idea has
  not been shaped yet. Only route onward once the brief is approved, or when the user explicitly
  declines the interview and asks to build immediately.
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

## First turn: offer the choice

When ANY request for a new app, tool, dashboard, portal, or chatbot arrives without an approved
brief — however long, detailed, or confidently specified it is, and including plain build phrasing
like "build me an app that…" — do NOT start the interview silently, and do NOT hand straight to the
builder. A detailed request is not a shaped one: length signals enthusiasm, not resolved decisions,
and multi-deliverable asks ("an app AND a chatbot") need the interview most, because scope is the
thing most likely to be wrong. Ask ONE
question card first, before any other question, so the human chooses the path knowingly:

- **Option A — Shape it first (recommended).** A focused interview, one question at a time, ending
  in an approved brief with scoped requirements, explicit non-goals, and a confirmed visual
  direction, which the native app builder then builds from.
- **Option B — Build now.** Hand straight to the native app builder with what has been said so far.
  This explicitly leaves Wingmate's guided planning path; it is not an approved build plan.

State the trade-off plainly in the card, in the user's terms, not as sales copy:

- **Controls drift.** The brief fixes scope, requirement IDs, and explicit non-goals up front, so
  later work is checked against an agreed target instead of a moving one.
- **Keeps focus.** One question at a time resolves the primary user and core outcome before
  features accumulate, so the build starts from a decided shape rather than a guess.
- **Produces far better requirements.** Each requirement gets an observable acceptance criterion,
  which is what makes the later testing and release reviews meaningful rather than subjective.
- **Usually costs less overall.** Deciding in conversation is typically cheaper than discovering a
  wrong assumption after it has been built and rebuilding — though a genuinely small or throwaway
  app can be cheaper to just build. Say it as a likelihood, never as a guaranteed saving, and never
  quote a number you have not measured.

Rules for this turn:

- Recommend A for anything real, multi-user, long-lived, or touching business data; say plainly
  that B is the reasonable choice for a throwaway, a demo, or an idea already well specified.
- Ask this ONCE per idea. If the human explicitly picks B or explicitly asks to build without
  the interview, hand off to the native app
  builder without arguing, record in the workbook that shaping was declined and which decisions are
  therefore unresolved, and offer the interview again only if they later hit rework.
- An empty or cancelled card does not select B. Leave the path unresolved, update the workbook
  and journey, and wait for an explicit direction without repeating the card.
- Never treat B as approval of anything, and never let the choice itself become a second question.
- If the human already asked for the interview explicitly ("grill me", "help me shape this"), skip
  this card — the choice is already made — and go straight to the first real question.

For an explicit Build now choice, tell the human they may independently invoke native `/app`
here with the current context. Do not invoke it, manufacture an approved build prompt, or mark
brief/data gates complete. Record this as leaving the guided path, not completing it; retain all
unresolved decisions and approvals in the workbook and journey. Native permissions and separate
approvals still apply, and generation may provision resources even for synthetic data.
If they return for guided review, resume at the earliest unresolved decision without restarting
known answers. The normal approved handoff below applies only to the guided path.

## Workflow

1. Offer the plan-first / build-now choice above if it has not been made yet, then
   identify whether this is a new idea or revision. Reuse recorded decisions.
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
sharing, or publication. If the user explicitly chooses Build now, use the opt-out
handoff above instead of repeating the interview or silently invoking `/app`.
Otherwise, explain the remaining data/access decision and ask that one question.
A low-risk synthetic prototype can be considered in the next
phase without pretending unsupported mock-only capabilities exist.

Report workbook revision/location, approved scope, remaining blockers, and next
action. If the workbook was not saved, say so and provide the updated content.
