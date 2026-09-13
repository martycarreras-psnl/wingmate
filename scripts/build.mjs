import { createHash } from 'node:crypto';
import { lstat, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { zipSync } from 'fflate';

const packageRoot = fileURLToPath(new URL('../', import.meta.url));
const safeName = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const reservedName = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i;
const fixedTime = new Date(2020, 0, 1, 0, 0, 0);

function check(condition, message) {
  if (!condition) throw new Error(message);
}

export function validateSkill(name, files) {
  check(safeName.test(name) && name.length <= 64, `Invalid skill name: ${name}`);
  check(Object.hasOwn(files, 'SKILL.md'), `${name}: missing root SKILL.md`);
  const text = Buffer.from(files['SKILL.md']).toString('utf8');
  // This pack deliberately uses a flat, fixed-order YAML subset with a JSON-quoted description.
  const header = text.match(/^---\nname: ([^\n]+)\ndescription: ("[^\n]+")\nlicense: MIT\n---\n/);
  check(header, `${name}: invalid pack frontmatter format`);
  check(header[1] === name, `${name}: frontmatter name must match folder`);
  const description = JSON.parse(header[2]);
  check(typeof description === 'string' && description.length > 0 && description.length <= 1024,
    `${name}: description must contain 1-1024 characters`);
  check(files['SKILL.md'].length <= 1024 * 1024, `${name}: SKILL.md exceeds 1 MB`);

  const entries = Object.entries(files);
  check(entries.length - 1 <= 20, `${name}: too many companion files`);
  let companionBytes = 0;
  for (const [file, content] of entries) {
    const segments = file.split('/');
    check(segments.every(segment =>
      /^[A-Za-z0-9][A-Za-z0-9_. !-]*$/.test(segment) && !reservedName.test(segment)),
    `${name}: unsafe companion path: ${file}`);
    if (file !== 'SKILL.md') {
      check(content.length <= 5 * 1024 * 1024, `${name}: companion exceeds 5 MB: ${file}`);
      companionBytes += content.length;
    }
    if (!file.endsWith('.md')) continue;
    for (const match of Buffer.from(content).toString('utf8').matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
      const href = match[1];
      if (/^https:\/\//.test(href) || href.startsWith('#')) continue;
      check(!href.includes('..') && !href.includes('\\') && !href.startsWith('/'),
        `${name}: unsafe reference: ${href}`);
      const target = path.posix.join(path.posix.dirname(file), href.split('#')[0]);
      check(Object.hasOwn(files, target), `${name}: missing local reference: ${target}`);
    }
  }
  check(companionBytes <= 10 * 1024 * 1024, `${name}: companions exceed 10 MB`);
  return { name, description };
}

async function regularFile(file) {
  check((await lstat(file)).isFile(), `Expected a regular file: ${file}`);
  return readFile(file);
}

export async function assemblePack(root = packageRoot) {
  const pkg = JSON.parse(await regularFile(path.join(root, 'package.json')));
  const catalog = JSON.parse(await regularFile(path.join(root, 'catalog.json')));
  check(typeof pkg.version === 'string' && /^\d+\.\d+\.\d+(?:-[\w.-]+)?$/.test(pkg.version),
    'Package needs a semantic version');
  check(Array.isArray(catalog.skills) && catalog.skills.length > 0, 'Empty skill catalog');
  const names = catalog.skills.map(skill => skill.name);
  check(names.every(name => typeof name === 'string' && safeName.test(name) && name.length <= 64),
    'Invalid catalog skill name');
  check(new Set(names).size === names.length, 'Duplicate skill name in catalog');
  const skillEntries = await readdir(path.join(root, 'skills'), { withFileTypes: true });
  check(skillEntries.every(entry => entry.isDirectory()), 'Skills must be regular directories');
  check(JSON.stringify(skillEntries.map(entry => entry.name).sort()) === JSON.stringify([...names].sort()),
    'Skill directories must exactly match catalog');

  const shared = {};
  for (const entry of (await readdir(path.join(root, 'references'), { withFileTypes: true }))
    .sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
    check(entry.isFile() && (entry.name.endsWith('.md') || entry.name === 'app-journey.html'),
      `Unexpected reference entry: ${entry.name}`);
    shared[`references/${entry.name}`] = await regularFile(path.join(root, 'references', entry.name));
  }
  shared['references/pack-version.json'] = Buffer.from(JSON.stringify({
    package: pkg.name,
    version: pkg.version,
    platformResearchDate: '2026-09-13',
  }, null, 2) + '\n');
  shared.LICENSE = await regularFile(path.join(root, 'LICENSE'));

  const artifacts = {};
  const manifest = { package: pkg.name, version: pkg.version, skills: catalog.skills, artifacts: [] };
  for (const name of names) {
    const skillDir = path.join(root, 'skills', name);
    check(JSON.stringify(await readdir(skillDir)) === '["SKILL.md"]',
      `${name}: put companion sources in references/; unexpected skill files`);
    const files = { 'SKILL.md': await regularFile(path.join(skillDir, 'SKILL.md')), ...shared };
    validateSkill(name, files);
    const zipInput = Object.fromEntries(Object.entries(files).map(([file, bytes]) =>
      [file, [bytes, { mtime: fixedTime }]]));
    const archive = zipSync(zipInput, { level: 9 });
    check(archive.length <= 10 * 1024 * 1024, `${name}: archive exceeds 10 MB`);
    artifacts[`${name}.zip`] = archive;
  }
  artifacts['App-Workbook.md'] = Buffer.from(shared['references/app-workbook.md'].toString()
    .replace('[the journey contract](app-journey.md)', 'the journey contract bundled with each skill'));
  artifacts['App-Journey.html'] = shared['references/app-journey.html'];
  for (const [file, bytes] of Object.entries(artifacts)) {
    manifest.artifacts.push({
      file,
      bytes: bytes.length,
      sha256: createHash('sha256').update(bytes).digest('hex'),
    });
  }
  artifacts['pack.json'] = Buffer.from(JSON.stringify(manifest, null, 2) + '\n');
  const bundle = {
    ...artifacts,
    'READ-ME-FIRST.md': await regularFile(path.join(root, 'INSTALL.md')),
    LICENSE: shared.LICENSE,
  };
  artifacts['Wingmate-Skills.zip'] = zipSync(Object.fromEntries(
    Object.entries(bundle).map(([file, bytes]) => [file, [bytes, { mtime: fixedTime }]]),
  ), { level: 9 });
  return artifacts;
}

export async function buildPack(root = packageRoot, output = path.join(root, 'downloads')) {
  const artifacts = await assemblePack(root);
  await mkdir(output, { recursive: true });
  check((await lstat(output)).isDirectory(), `Expected an output directory: ${output}`);
  for (const entry of await readdir(output, { withFileTypes: true })) {
    check(entry.isFile() && Object.hasOwn(artifacts, entry.name),
      `Unexpected output entry; move it aside before building: ${path.join(output, entry.name)}`);
  }
  for (const [name, bytes] of Object.entries(artifacts)) {
    await writeFile(path.join(output, name), bytes);
  }
  return artifacts;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const artifacts = await buildPack();
    console.log(`Built ${Object.keys(artifacts).filter(file => file.endsWith('.zip') && file !== 'Wingmate-Skills.zip').length} Wingmate skill archives plus the download bundle in ${path.join(packageRoot, 'downloads')}`);
  } catch (error) {
    console.error(`Wingmate build failed: ${error.message}`);
    process.exitCode = 1;
  }
}
