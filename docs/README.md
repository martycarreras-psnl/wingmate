# Wingmate

**Big ideas deserve a good wingmate.**

AI can help you build an app. Wingmate helps you ask the right questions.

Wingmate is a community-built skills toolkit that brings structure, repeatability,
and a practical delivery method to app building with **Microsoft Copilot Cowork**.
Bring a simple idea. Work through one useful question at a time. Keep the whole
journey in one conversation, with a workbook and an interactive guide that keep
you oriented.

**[Download the skill pack](../downloads/Wingmate-Skills.zip)** |
**[Installation guide](../INSTALL.md)** |
**[Preview the journey template](../downloads/App-Journey.html)**

This is an independent, self-contained repository. There is no parent repository,
workspace package, synchronization task, or upstream runtime dependency to set up.
Node.js is only needed to develop or rebuild the distribution, not to use the
downloaded skills.

## From idea to a responsible release

| Stage | What helps | What you gain |
| --- | --- | --- |
| 1. Shape | **Shape My App** | Clear outcome, users, scope, exceptions, visual direction, and acceptance criteria |
| 2. Data | **Design My Data** | Reviewed sources, reuse decisions, operations, ownership, and access |
| 3. Build | Native **`/app`**, invoked by you | An explicitly scoped preview in the same conversation |
| 4. Pressure-test | **Pressure-Test My Prototype** | Workflow and design feedback, functional gaps, and scoped repairs |
| 5. Prove | **Prove My App Works** | Actual acceptance evidence and clear limits, not a checked-off wish list |
| 6. Release | **Release My App Responsibly** | A review of the exact build, audience, support, and recovery before human publication |

Grilling is built into every skill: one atomic question, a recommended answer,
lettered alternatives, and follow-up on the most consequential unknown.
Visual direction is part of discovery; a brand guide or screenshot is welcome,
but "recommend something for me" is a valid answer.

## Your idea is enough

After installing the five skills, select **Shape My App** through Cowork's
Sources picker if needed and say:

> I want an app that helps our team spot manufacturing line problems and manage
> cases to resolve them.

The skills maintain the details. You do not need to memorize the method or
write a requirements document first.

The **App Workbook** records requirements, business terms, visual direction,
data decisions, findings, evidence, revisions, and explicit approvals.
**App-Journey.html** turns that record into a simple six-stage map: where you are,
what is blocking progress, and the next prompt to paste into this conversation.
Expand stages and copy prompts; progress is maintained by the skills, not
editable checkboxes.

Each active skill updates the guide after **every workbook update**, including
individual answers and test results. It is a saved snapshot, not a live service:
native `/app` results are reconciled on the next pack-skill turn. File, HTML,
and clipboard capabilities vary. Failed saves must be reported as unsaved/stale.

## What Wingmate does not promise

- **No automatic orchestration.** Pack skill names are not slash commands.
  Human invocation and native approvals remain explicit.
- **No browser/computer-use automation.** Functional checks run only through
  available, safe non-browser app-code or authorized service test surfaces.
  UI checks use targeted human evidence. Static review never counts as execution.
- **No policy enforcement.** Instructions are not access controls. Real platform
  permissions, organizational policy, and separate approval UI still apply.
- **No automatic publication or live-data changes.** Test mutations require an
  approved isolated synthetic-data scope. Release review does not publish.
- **No compatibility overclaim.** Current packaging targets Copilot Cowork.
  Copilot Studio is an intended validation target, not a verified import or
  execution host for these ZIPs. Do not market this as a Studio plugin.

**Pilot status:** packaging and local interaction logic have automated checks.
They do not prove model behavior or tenant support. Run the
[behavioral evaluation](../evaluations/README.md) with synthetic data before
business use. Official product-documentation baseline: September 13, 2026.
See [platform boundaries](../references/platform-boundaries.md).

## Use this as your GitHub repository

Follow [Repository setup](../docs/REPOSITORY-SETUP.md) for the point-in-time import,
first commit, GitHub Pages setup, and release steps. No repository has been
created or published on your behalf.

The root **`index.html`** is the GitHub Pages landing page. It uses only relative
links, local assets, and the committed `downloads/`, so it works for project
sites as well as custom domains. The site describes Wingmate; it does not host
the apps you build with Cowork.

## Develop and rebuild

Use Node.js 22 or newer with npm:

```bash
npm ci
npm run check
```

`check` runs local tests, rebuilds deterministic upload archives in `downloads/`,
and stages the public website in `_site/`. No tenant, credentials, monorepo,
global CLI, or browser automation is needed.

```bash
npm run build
npm run build:site
npm run export -- --output ../wingmate-upload
```

The export command verifies checksums and requires a new destination with an
existing parent. It copies five individual skill ZIPs, templates, and metadata.
The all-in-one download bundle lives in `downloads/Wingmate-Skills.zip`.

| Path | Purpose |
| --- | --- |
| `skills/` | Five canonical `SKILL.md` bodies |
| `references/` | Shared method, workbook, journey HTML, visual direction, and testing guidance |
| `catalog.json` | Skill names and phase mapping |
| `evaluations/` | 37 behavioral pilot scenarios and procedure |
| `scripts/`, `bin/`, `tests/` | Standalone build, export, site staging, and checks |
| `downloads/` | Committed, generated distribution; do not edit directly |
| `index.html`, `assets/` | Public landing page |
| `.github/workflows/` | CI, manually triggered Pages deployment, and manual release |

Every skill ZIP carries its own references and version metadata. No sibling
skill, source repository, or live reference download is required for its method.
`pack.json` records SHA-256 hashes for the five skill ZIPs and two templates.
It does not hash itself or the enclosing download bundle.

See [Contributing](../CONTRIBUTING.md), [Changelog](../CHANGELOG.md), and
[License and attribution](../THIRD-PARTY-NOTICES.md). Microsoft product names refer
to their respective owners; Wingmate is not affiliated with or endorsed by Microsoft.
