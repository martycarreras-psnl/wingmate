# Cowork platform boundary

Research baseline: 2026-09-13. Preview capabilities can change by tenant and date.
Use accessible current official documentation and observed tenant behavior before
making a capability-dependent recommendation. If verification is unavailable,
record "unverified" and supply a human verification step.

## Documented baseline, not a universal capability promise

- Native `/app` is a Frontier preview for generating and refining apps.
- App preview, opening an app to exercise it, and underlying-code review are
  documented. This does not establish an automated app test framework.
- Schema generation works in supported connectors; not every connector or
  operation is supported. Read access does not establish write permission.
- The launch announcement describes full-stack apps, Entra identity, connectors,
  Git-backed source control, deployment stages, and version isolation. Do not
  infer a specific framework, database, repository provider, migration path,
  backup, rollback command, or environment topology.
- Cowork's task file storage is not proof of where generated app records persist.
- App generation may create persistent resources. A request for synthetic data
  is not proof that `/app` has a resource-free/mock-only mode. Review native
  proposed actions and verify capabilities; stop before unapproved live changes.

## Sharing requires explicit review

The Cowork app-sharing guide warns that people with the link can use the app
including all its data, in the documented organizational eligibility context.
Do not assume source-level permissions are reproduced for every app recipient.
Verify the intended audience, runtime/connection identity, exposed data, and
representative-recipient behavior. Hidden controls and visual role simulations
are not authorization tests. Unresolved sensitive-data exposure blocks release.

## Skill execution boundaries

Skill selection can be explicit through the Sources picker or inferred from
descriptions. Instructions are not a guaranteed policy engine. Do not assume
`AGENTS.md` discovery, repository inheritance, command hooks, subagents, automatic
skill chaining, or programmatic invocation of `/app`.

Lack of guaranteed programmatic skill chaining does not imply separate chats.
Default to the human invoking `/app` in the current conversation and selecting
review skills there as needed. Carry forward available context. Only recommend
a session change for a user preference or a specific observed platform limitation.

Planning and release skills remain non-mutating. Prototype and acceptance skills
should execute safe non-browser functional tests following
[the functional testing protocol](functional-testing.md). They may exercise
approved disposable test data in an isolated environment, not live business
writes. They do not create schema, alter permissions, install tools, deploy a
server, or publish/share apps. Fallback execution depends on tools and actual
app code/interfaces available in the session; it is not a guaranteed capability.
Browser/computer-use automation is intentionally excluded even if available.
Do not probe, retry, or troubleshoot it, request Edge/profile/admin changes,
or use another automation tool to replace it. Request targeted human UI evidence.
Never mark a check passed merely because its procedure was generated or its
source looked plausible.

Do not bring unrelated PAC CLI commands, Vite ports, router choices,
generated adapter paths, Dataverse-only naming, or local tooling requirements
into a Cowork app unless a separate supported implementation path is explicitly
confirmed. Preserve the business requirement, not a platform-specific mechanism.

Wingmate is an independent community toolkit, not a Microsoft product or
certification. This pack's current import and execution contract targets
Microsoft Copilot Cowork. Copilot Studio is an intended validation target, not
an established compatible skill host. Do not promise Studio import, routing,
file persistence, or execution without separate observed validation.

## Sources

- [Launch announcement, 2026-09-10](https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/build-apps-in-copilot-cowork-and-copilot-studio/)
- [App skill and sharing](https://learn.microsoft.com/en-us/microsoft-365/copilot/cowork/use-cowork)
- [Skill upload, selection, and sharing](https://learn.microsoft.com/en-us/microsoft-365/copilot/cowork/cowork-customize)
- [Plugin and skill packaging](https://learn.microsoft.com/en-us/microsoft-365/copilot/cowork/cowork-plugin-development)
- [Cowork governance](https://learn.microsoft.com/en-us/microsoft-365/copilot/cowork/cowork-admin-governance)

These sources establish the baseline, not certification of a particular tenant
or of an app. Conflicts or newer behavior must be recorded in the workbook.
