# Create your Wingmate repository

This is a point-in-time standalone distribution, not a fork, submodule, package
reference, or synchronization link. All source, notices, tests, and ready-to-use
downloads are included. No Git history, tokens, tenant data, or installed
dependencies are included.

## 1. Create and populate the repository

Create an empty GitHub repository named **wingmate** under your chosen account
or organization. Choose public if you want a broadly accessible community site;
check your GitHub plan if using Pages from a private repository.

Extract the source ZIP, then use its **wingmate folder as the repository root**.
The root should contain `index.html`, `package.json`, `skills/`, and `.github/`,
not an extra nested `wingmate/` directory.

Using a local terminal in that extracted folder:

```bash
git init -b main
git add .
git commit -m "Introduce Wingmate"
git remote add origin <YOUR-NEW-REPOSITORY-GIT-URL>
git push -u origin main
```

Replace the angle-bracket placeholder with the actual clone URL of your new
repository. These are instructions for you; this snapshot has not created,
committed, pushed, or published anything remotely.

Use git rather than browser drag-and-drop so hidden files such as `.github/`
and `.gitignore` are included. The source ZIP intentionally has no `.git/`
directory or remote configuration.

## 2. Run the standalone checks

With Node.js 22+ and npm:

```bash
npm ci
npm run check
```

`downloads/` already contains the five uploadable skills, the templates, version
metadata, and `Wingmate-Skills.zip`. The check command rebuilds these from local
source and stages the public site in `_site/`. Only fflate is needed as a
development dependency. No tenant tools, global CLI, or parent workspace is used.

Public registry access may require your organization's approved npm mirror.
The committed lockfile uses the public npm tarball URL for portability; no
private feed, proxy credentials, or machine-specific paths are embedded.

## 3. Enable GitHub Pages

The website is static documentation for Wingmate, not hosting for generated apps.

**Recommended: GitHub Actions deployment**

1. In the new repository, open **Settings > Pages**.
2. Set **Source** to **GitHub Actions**.
3. Open **Actions > Deploy Wingmate site > Run workflow** on `main`.
4. Approve any GitHub environment protection required by your repository.
5. Open the URL reported by the deployment job.

The workflow builds from your repository and publishes only `_site/`. It is
manual by design: pushing a change runs CI but does not publish the site.
Run the deployment workflow again when you want a site update.

**Alternative: deploy from a branch**

Choose `main` and `/ (root)` in **Settings > Pages**. `index.html`, `assets/`,
and generated `downloads/` work directly. Required documentation aliases are
committed too. Do not use both deployment modes simultaneously.

All site URLs are relative, so a typical project path such as
`https://<owner>.github.io/wingmate/` works without changing a base URL.
No domain, analytics service, external font service, or application registration
is required.

## 4. Make an optional GitHub Release

The manual **Release Wingmate** workflow checks out `main`, validates source
and committed downloads, and attaches the five skill ZIPs, combined bundle,
workbook, journey template, and pack metadata to a GitHub Release. It derives
the tag from the committed package version and refuses an existing release.

Update `package.json`, `package-lock.json`, `CHANGELOG.md`, and generated
`downloads/` before each new release. Run the workflow only when ready to publish.
This repository is private as an npm package to prevent accidental npm publishing;
that setting does not control GitHub repository visibility.

## 5. Before announcing it

- Import all five skills into your Cowork tenant and run the behavioral pilot.
- Confirm that the guide is really saved and updated, not only described in chat.
- Check the landing page, downloads, and manual-copy fallback on your target surface.
- Preserve license attribution; do not imply Microsoft endorsement.
- Describe Copilot Studio as a validation target until its behavior is tested.
- Add your actual GitHub repository URL to your announcement. No owner URL is
  guessed or hardcoded in this snapshot.
