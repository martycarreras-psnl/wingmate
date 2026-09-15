# Start with Wingmate

**Big ideas deserve a good wingmate.**

This pack contains five skills for Microsoft Copilot Cowork. It is not a
Copilot Studio plugin or a GitHub Copilot extension.

## Install the skills

1. Download `Wingmate-Skills.zip` and extract it.
2. In Cowork, open **Customize > Skills > Add > Upload skill**.
3. Upload each of these five inner ZIPs separately:
   - `shape-my-app.zip`
   - `design-my-data.zip`
   - `pressure-test-my-prototype.zip`
   - `prove-my-app-works.zip`
   - `release-my-app-responsibly.zip`
4. After synchronization, start one conversation with the installed versions.
   Select **Shape My App** through Sources if routing needs help.
5. Start with a simple idea, for example:

   > I want an app that helps our team spot manufacturing line problems and
   > manage cases to resolve them.

You do not need an expert prompt. The skill asks one question at a time, offers
a recommendation, and records the decisions. It invites visual preferences,
brand guidance, or inspiration screenshots when useful.

New ideas get a one-time **Shape it first / Build now** choice. Say "grill me"
or "shape this first" to go straight to the interview. Build now explicitly
leaves the guided path without approving unresolved plans or native actions;
cancelling the question selects neither option. Cards are preferred when
available, while approval gates remain separate typed responses. Built-in
routing may still take precedence, so select Shape My App in Sources if needed.

Keep planning, building, and reviews in that same conversation. Only native
`/app` is a slash command; do not type `/shape-my-app`. The skills provide
natural-language next prompts and a scoped native build handoff when ready.
Native app availability, skill customization, and tools depend on tenant policy.

## Two files you do not have to fill out

The skills create and maintain an **App Workbook** and **App-Journey.html**
using available workspace file tools. The HTML guide shows the full method,
your current task, blockers, progress, and copyable prompts. Expand a stage to
learn why it matters. Copying a prompt does not invoke a skill or approve work.

The standalone files in this download are optional blank templates, not skills
to upload. Open the personalized guide your skill creates. Do not overwrite a
populated workbook with the blank template.

Every active skill refreshes the journey after each workbook update, not just
at handoffs. Native `/app` does not run that maintenance automatically; the next
pack-skill turn reconciles the build evidence. No background synchronization is
promised. If workspace saving fails, the skill must report unsaved/stale files.
HTML/clipboard support varies; prompts remain selectable without scripts.

## Update an existing installation

Preserve your populated workbook and journey. Replace all five skills together
using Cowork's supported replacement controls. Import may create numbered
duplicates; do not leave old and new versions enabled together. A fresh
conversation after installation/update is setup, not a requirement between
app-building stages. Bring existing records only if context is genuinely missing.

## Know the boundaries

- No browser/computer-use automation, retry loops, or browser setup instructions.
- Safe functional tests use actual available non-browser app code or independently
  authorized service test interfaces. Missing UI evidence requires a targeted
  human observation, not a fabricated pass.
- Approvals are explicit and tied to scope, revision, build, and audience.
  The skills do not publish, share, or change permissions.
- This is community guidance, not a policy engine or Microsoft certification.
  Pilot it with synthetic data before relying on it for business data.
- Current packaging targets Cowork. Copilot Studio compatibility is not yet
  validated.

No accounts, secrets, npm installation, or local server are needed to obtain
these files. Your use of Cowork itself requires Microsoft's applicable access.
