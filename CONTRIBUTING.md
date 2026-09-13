# Contributing to Wingmate

Keep it approachable: someone with a one-sentence idea should be able to begin.
Use plain language, one-question discovery, explicit evidence, and predictable
same-conversation handoffs.

## Make a change

1. Install Node.js 22+ and run `npm ci`.
2. Edit canonical files in `skills/` and `references/`, not `downloads/`.
3. Add or adjust focused tests and behavioral cases in `evaluations/`.
4. For a user-visible skill change, bump `version` in `package.json` and regenerate
   `package-lock.json` with `npm install --package-lock-only --ignore-scripts`.
   Record the change in `CHANGELOG.md`. Use semantic versioning.
5. Run `npm run check`. Commit source, tests, version files, changelog, and
   regenerated `downloads/` together. CI rejects stale generated downloads.
6. Pilot affected behaviors in Cowork using synthetic data. Local tests cannot
   establish tenant support or that an AI follows an instruction consistently.

The package is private to prevent accidental npm publication. Distribution is
through GitHub source, download archives, and optional GitHub Releases.

## Preserve the contract

- Maintain both workbook and journey after each decision/evidence update.
- Never infer approval from silence, attachments, copied prompts, or checkboxes.
- Never claim a test ran when only code or a checklist was generated.
- Do not introduce browser/computer-use automation or profile/admin retry paths.
- Never add secrets, telemetry, external assets, or remote code to the HTML.
- Keep the site usable with relative URLs on a GitHub Pages project subpath.
- Do not claim Copilot Studio compatibility until separately verified.
- Preserve all license and attribution notices.

Report product/environment limitations separately from Wingmate defects. Include
the pack version, skill, expected/actual behavior, and a redacted synthetic
reproduction. Do not attach tokens, customer data, private workbook content, or
tenant screenshots that expose sensitive information.
