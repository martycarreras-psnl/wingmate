import assert from 'node:assert/strict';
import { cp, lstat, mkdir, mkdtemp, readdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { unzipSync } from 'fflate';
import { assemblePack, buildPack } from '../scripts/build.mjs';
import { buildSite } from '../scripts/build-site.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const inputs = [
  'package.json', 'catalog.json', 'LICENSE', 'INSTALL.md', 'README.md',
  'CONTRIBUTING.md', 'CHANGELOG.md', 'THIRD-PARTY-NOTICES.md', '.nojekyll',
  'index.html', 'assets', 'docs', 'licenses', 'references', 'skills', 'evaluations',
];

async function fixture(t) {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'wingmate-site-test-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  for (const entry of inputs) await cp(path.join(root, entry), path.join(directory, entry), { recursive: true });
  await buildPack(directory);
  return directory;
}

async function filesUnder(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesUnder(file));
    else files.push(file);
  }
  return files;
}

test('bundle has exactly the five individually uploadable archives and portable companion files', async () => {
  const artifacts = await assemblePack();
  const bundle = unzipSync(artifacts['Wingmate-Skills.zip']);
  assert.equal(Object.keys(bundle).length, 10);
  for (const [name, bytes] of Object.entries(artifacts)) {
    if (name === 'Wingmate-Skills.zip') continue;
    assert.deepEqual(bundle[name], new Uint8Array(bytes), name);
  }
  assert.match(Buffer.from(bundle['READ-ME-FIRST.md']).toString(), /Upload each of these five inner ZIPs separately/);
  assert.match(Buffer.from(bundle.LICENSE).toString(), /MIT License/);
});

test('standalone package has a portable lockfile and no parent workspace requirement', async () => {
  const pkg = JSON.parse(await readFile(path.join(root, 'package.json')));
  const lock = JSON.parse(await readFile(path.join(root, 'package-lock.json')));
  assert.equal(pkg.name, 'wingmate');
  assert.equal(pkg.private, true);
  assert.equal(pkg.version, lock.version);
  assert.equal(lock.packages[''].version, pkg.version);
  assert.equal(pkg.repository, undefined);
  assert.equal(pkg.workspaces, undefined);
  assert.deepEqual(pkg.devDependencies, { fflate: '0.8.3' });
  assert.match(lock.packages['node_modules/fflate'].resolved, /^https:\/\/registry\.npmjs\.org\//);
  assert.match(lock.packages['node_modules/fflate'].integrity, /^sha512-/);
});

test('public site builds repeatably with resolved relative HTML and Markdown links', async t => {
  const directory = await fixture(t);
  const output = await buildSite(directory);
  const first = new Map(await Promise.all((await filesUnder(output)).map(async file =>
    [path.relative(output, file), await readFile(file)])));
  await buildSite(directory);
  for (const [file, bytes] of first) assert.deepEqual(await readFile(path.join(output, file)), bytes);
  for (const privateEntry of ['node_modules', '.github', 'scripts', 'tests', 'bin', 'package-lock.json']) {
    await assert.rejects(lstat(path.join(output, privateEntry)), { code: 'ENOENT' });
  }
  for (const file of await filesUnder(output)) {
    if (!/\.(html|md|css)$/.test(file)) continue;
    const text = await readFile(file, 'utf8');
    let references;
    if (file.endsWith('.html')) {
      references = [...text.matchAll(/(?:href|src)="([^"]+)"/g)].map(match => match[1]);
      assert.doesNotMatch(text, /<(?:script|link|img)[^>]+(?:src|href)="https?:\/\//i);
    } else if (file.endsWith('.css')) {
      references = [...text.matchAll(/url\(["']?([^)'"]+)["']?\)/g)].map(match => match[1]);
      assert.doesNotMatch(text, /@import|url\(["']?https?:\/\//i);
    } else {
      references = [...text.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)].map(match => match[1]);
    }
    for (const href of references) {
      if (/^https?:\/\//.test(href)) continue;
      assert.ok(!href.startsWith('/') && !/^[a-z]+:/i.test(href), `Non-portable link: ${file}: ${href}`);
      const [target, fragment] = href.split('#');
      const destination = target ? path.resolve(path.dirname(file), target) : file;
      assert.ok(destination.startsWith(output + path.sep), `Escaping site link: ${href}`);
      assert.ok((await lstat(destination)).isFile(), `Missing target: ${file}: ${href}`);
      if (fragment && destination.endsWith('.html')) {
        const content = await readFile(destination, 'utf8');
        assert.ok(content.includes(`id="${fragment}"`), `Missing fragment: ${href}`);
      }
    }
  }
});

test('site builder refuses unrelated outputs and symlinked public content', async t => {
  const directory = await fixture(t);
  await mkdir(path.join(directory, '_site'));
  await writeFile(path.join(directory, '_site', 'my-notes.txt'), 'keep');
  await assert.rejects(buildSite(directory));
  assert.equal(await readFile(path.join(directory, '_site', 'my-notes.txt'), 'utf8'), 'keep');
  await rm(path.join(directory, '_site', 'my-notes.txt'));
  await rm(path.join(directory, '_site'), { recursive: true });
  await symlink(path.join(directory, 'package.json'), path.join(directory, 'assets', 'private.json'));
  await assert.rejects(buildSite(directory), /Refusing non-regular/);
});
