# Working on Wingmate

Wingmate is a standalone skills-and-documentation repository. Read README.md,
CONTRIBUTING.md, and the relevant skill/reference before editing.

- Canonical content lives in skills/ and references/. Generated downloads/
  must be rebuilt, not edited.
- Preserve the same-conversation, one-question-at-a-time method, explicit
  approvals, honest evidence, and per-update workbook/journey maintenance.
- Browser/computer-use automation is intentionally excluded. Run non-browser
  Node tests; use human observations for rendered UI evidence.
- Do not provision resources, connect business data, publish apps, or claim
  unsupported tenant/Studio capabilities.
- The HTML pages are local/static documentation artifacts, not app runtimes.
  No external script, telemetry, live credentials, or hidden tool integration.
- For shipped behavior changes, update version/changelog, regenerate downloads,
  and run npm run check. Preserve license attribution.
- The owner has granted standing approval to commit, push, and deploy the
  existing Wingmate website after each requested skill update, unless they
  explicitly ask to hold it. Run the checks, include rebuilt downloads, preserve
  concurrent work, and verify the live download matches the committed version.
  Use the existing Pages configuration; never force-push or bypass protections.
- This standing approval does not authorize GitHub Releases, new external
  resources, or publishing generated apps. Those still need separate owner
  approval. No parent repository or upstream sync exists.
