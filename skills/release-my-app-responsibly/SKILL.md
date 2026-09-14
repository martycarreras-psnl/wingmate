---
name: release-my-app-responsibly
description: "Reviews whether a built Cowork app is genuinely ready to share — checking acceptance evidence, who would see what data, known defects, an accountable owner, and recovery options — then hands off to a human to publish. Use when the user says \"is my app ready to share\", \"review this before I publish\", \"who will be able to see this data\", \"can I roll this out to my team\", \"release readiness check\", or is widening an existing app's audience. Do NOT use for shaping an idea (use shape-my-app), planning data (use design-my-data), or running the tests themselves (use prove-my-app-works). Never publishes, shares, changes permissions, or assumes rollback exists."
license: MIT
---

# Release My App Responsibly

## When NOT to Use

- **Running the acceptance tests** — use **prove-my-app-works**; this skill reviews evidence, it does not
  produce it.
- **Reviewing a preview for gaps or look-and-feel** — use **pressure-test-my-prototype**.
- **Changing scope or the data model** — use **shape-my-app** or **design-my-data**.
- **Actually publishing, sharing, or granting access** — an authorized human does that through native
  Cowork publication; this skill never performs it.
- Rolling back, revoking access, or running deployment commands.

## Start here

Maintain [the workspace journey guide](references/app-journey.md) on invocation
and after every workbook update during this skill, not just at handoff.

Read [the shared method](references/methodology.md),
[App Workbook contract](references/app-workbook.md), and
[platform boundaries](references/platform-boundaries.md).
Use the release section of [selective checklists](references/delivery-checklists.md).

## Phase contract

**Inputs:** exact app/build and proposed audience, current workbook, applicable
brief/data/prototype approvals, current acceptance evidence, business owner,
and actual recovery/support information.

**Outputs:** workbook section 7, explicit readiness decision, owner/support
handoff, known limitations, and a human publication handoff if approved.

**Stop conditions:** unresolved sensitive-data exposure; missing/stale required
evidence; critical defects; audience/build mismatch; no accountable owner;
unapproved scope; inadequate recovery for high-impact writes.
Do not publish, share, change access, or run deployment commands.

## Workflow

1. Match the proposed release to the current app/build, requirements, and audience.
   Use the evidence and approvals in this same conversation; do not ask the
   user to move sessions or reattach records already present.
   A new build or broader audience triggers impact assessment; old approval is
   not blanket approval. Re-review affected requirements, data, and tests.
2. Review the access matrix and representative-recipient evidence. The platform
   sharing warning means source-level access must not be assumed. Hidden UI,
   maker access, and user-identity sign-in alone are not sufficient evidence.
3. Check each in-scope requirement against current acceptance results. Ask one
   missing-evidence question at a time, with a recommendation. Missing evidence
   blocks readiness; writing a checklist does not fulfill it.
4. Verify approved sources/operations, sensitivity/retention decisions, known
   defects, support owner, and intended user instructions. Only noncritical
   deferrals can be explicitly accepted with an owner and reason.
5. Document recovery and retirement options actually supported and verified.
   Git backing/version isolation is not proof of backup or rollback. If a
   low-risk app has no verified rollback, record the limitation and an acceptable
   owner-approved response. High-impact writes without recovery remain blocked.
6. Present a release recommendation identifying build, audience, scope, evidence,
   limitations, and unresolved items. Ask for `APPROVE RELEASE rN` only if the
   required gates are satisfied. Approval must be a separate human response.
7. Record approval against the exact revision, build, audience, and approver.
   Approval does not itself publish an app or broaden anybody's data permissions.

## Output format

Record workbook section 7 and present the recommendation in chat using this shape:

```
Release scope   — exact app, build, proposed audience, requirements revision
Readiness       — one of: ready | blocked | ready with accepted limitations
Evidence        — table: REQ ID | required check | current result | date | stale?
Data exposure   — table: recipient group | can see | can do | how enforced | evidence
Limitations     — known defects and deferrals, each with an accepting owner and reason
Blockers        — every unresolved item, with what would clear it
Owner & support — accountable business owner and the support route
```

Never present a readiness verdict without the evidence table behind it.

## Guardrails

- Never publish, share, change access, run deployment commands, or claim to revoke access.
- Missing or stale evidence blocks readiness — writing a checklist does not fulfill it, and only
  noncritical deferrals may be accepted, each with a named owner and reason.
- A new build or a broader audience invalidates prior approval; re-review affected requirements, data,
  and tests rather than treating old approval as blanket approval.
- Never assume sharing preserves source-level permissions. Hidden UI, maker access, and user-identity
  sign-in alone are not sufficient evidence of who can see what.
- Never assume rollback or backup exists — git backing and version isolation are not proof. High-impact
  writes without verified recovery stay blocked.
- Ask one missing-evidence question at a time, with a recommendation.
- Never invent UI controls, deployment stages, commands, or rollback steps; if native behavior differs
  from the reviewed plan, stop and reassess against
  [platform boundaries](references/platform-boundaries.md).
- Approval requires an explicit `APPROVE RELEASE rN` as a separate human response, recorded against the
  exact revision, build, audience, and approver — and approval alone neither publishes the app nor
  broadens anyone's permissions.
- Record publication as unverified until the human supplies the actual published URL/version and a
  recipient check.

## Human publication handoff

When approved, tell the authorized human to use native Cowork publication and
sharing for the reviewed build and audience, following organizational policy.
Do not invent UI controls, deployment stages, CLI commands, or rollback steps.
If native behavior differs from the reviewed plan, stop and reassess.

After the human publishes, request evidence of the actual published URL/version
and recipient check. Record publication as unverified until evidence is supplied.
If the app is unavailable or exposes unintended data, record the incident and
route it to the owner/admin using verified controls; do not claim to revoke access.

End with a concise handoff: owner/support route, release scope, data exposure,
known limitations, actual publication status, and the latest workbook location.
