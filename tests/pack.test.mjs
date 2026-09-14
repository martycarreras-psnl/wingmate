import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { cp, mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { unzipSync } from 'fflate';
import { assemblePack, buildPack, validateSkill } from '../scripts/build.mjs';
import { exportPack } from '../bin/wingmate.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const names = [
  'shape-my-app',
  'design-my-data',
  'pressure-test-my-prototype',
  'prove-my-app-works',
  'release-my-app-responsibly',
];

async function temporary(t) {
  const directory = await mkdtemp(path.join(tmpdir(), 'wingmate-test-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  return directory;
}

async function fixture(t) {
  const directory = await temporary(t);
  for (const entry of ['package.json', 'catalog.json', 'LICENSE', 'INSTALL.md', 'skills', 'references']) {
    await cp(path.join(root, entry), path.join(directory, entry), { recursive: true });
  }
  return directory;
}

test('five independent root-layout skill ZIPs include every local reference and license', async () => {
  const artifacts = await assemblePack();
  assert.deepEqual(Object.keys(artifacts).filter(name => name.endsWith('.zip') && name !== 'Wingmate-Skills.zip'),
    names.map(name => `${name}.zip`));
  const pkg = JSON.parse(await readFile(path.join(root, 'package.json')));
  const sharedReferences = await Promise.all((await readdir(path.join(root, 'references')))
    .map(async file => [file, await readFile(path.join(root, 'references', file))]));
  for (const name of names) {
    const files = unzipSync(artifacts[`${name}.zip`]);
    assert.equal(validateSkill(name, files).name, name);
    assert.equal(Object.keys(files).length, 11);
    assert.deepEqual(Buffer.from(files['SKILL.md']),
      await readFile(path.join(root, 'skills', name, 'SKILL.md')), `${name}: canonical skill body`);
    for (const [file, bytes] of sharedReferences) {
      assert.deepEqual(Buffer.from(files[`references/${file}`]), bytes, `${name}: ${file}`);
    }
    const version = JSON.parse(Buffer.from(files['references/pack-version.json']).toString());
    assert.equal(version.version, pkg.version);
    assert.equal(version.package, pkg.name);
    const body = Buffer.from(files['SKILL.md']).toString();
    for (const heading of ['## Phase contract', '**Inputs:**', '**Outputs:**', '**Stop conditions:**']) {
      assert.ok(body.includes(heading), `${name} needs ${heading}`);
    }
    assert.match(body, /references\/methodology\.md/);
    assert.match(body, /references\/app-workbook\.md/);
    assert.match(body, /references\/platform-boundaries\.md/);
    assert.doesNotMatch(body, /```(?:bash|powershell|javascript)/);
    assert.match(Buffer.from(files.LICENSE).toString(), /Microsoft Corporation/);
    assert.match(Buffer.from(files.LICENSE).toString(), /Matt Pocock/);
  }
});

test('optimized skills retain explicit routing, output formats, and guardrails', async () => {
  const artifacts = await assemblePack();
  const outputMarkers = {
    'shape-my-app': ['Business objective', 'Visual Direction', 'Non-goals & deferred'],
    'design-my-data': ['Sources', 'Operations', 'Sensitivity', 'Blockers'],
    'pressure-test-my-prototype': ['Findings', 'Paths walked', 'Visual check', 'Executed tests'],
    'prove-my-app-works': ['Coverage table', 'Counts', 'Defects', 'Limitations', 'Human steps'],
    'release-my-app-responsibly': ['Release scope', 'Readiness', 'Evidence', 'Data exposure'],
  };
  for (const name of names) {
    const files = unzipSync(artifacts[`${name}.zip`]);
    const { description } = validateSkill(name, files);
    assert.match(description, /Use when the user says "/, name);
    assert.match(description, /Do NOT use/, name);
    const body = Buffer.from(files['SKILL.md']).toString();
    const output = body.match(/## Output format\n([\s\S]*?)\n## Guardrails\n/);
    assert.ok(output, `${name}: output format followed by guardrails`);
    assert.match(body, /## When NOT to Use\n/);
    assert.match(body, /after every workbook update during this skill/);
    for (const marker of outputMarkers[name]) {
      assert.ok(output[1].includes(marker), `${name}: missing output ${marker}`);
    }
  }
});

test('visual direction is bundled and connected from discovery through acceptance', async () => {
  const artifacts = await assemblePack();
  const reference = await readFile(path.join(root, 'references/visual-direction.md'));
  const bodies = {};
  for (const name of names) {
    const files = unzipSync(artifacts[`${name}.zip`]);
    assert.deepEqual(Buffer.from(files['references/visual-direction.md']), reference);
    assert.match(Buffer.from(files['references/app-workbook.md']).toString(),
      /## 1a\. Visual Direction/);
    bodies[name] = Buffer.from(files['SKILL.md']).toString();
  }
  assert.match(bodies['shape-my-app'], /do not wait for the user to request design help/);
  assert.match(bodies['shape-my-app'], /Reference material is optional/);
  assert.match(bodies['design-my-data'], /> Follow section 1a \(Visual Direction\)/);
  assert.match(bodies['design-my-data'], /one decision[\s\S]*not the full intake/);
  assert.match(bodies['pressure-test-my-prototype'], /Compare with section 1a/);
  assert.match(bodies['pressure-test-my-prototype'], /record the comparison as unreviewed/);
  assert.match(bodies['prove-my-app-works'], /required observable criteria from section 1a/);
  const text = reference.toString();
  for (const required of [
    'What should guide how this app looks and feels?',
    'No reference material is',
    'inaccessible',
    'crop/redact confidential data',
    'not pixel-for-pixel copying',
    'text or icons as well as color',
    'cannot prove keyboard behavior or measured contrast',
  ]) assert.ok(text.includes(required), `Missing visual-direction rule: ${required}`);
});

test('same-conversation transitions are explicit in every bundled skill', async () => {
  const artifacts = await assemblePack();
  for (const name of names) {
    const files = unzipSync(artifacts[`${name}.zip`]);
    const method = Buffer.from(files['references/methodology.md']).toString();
    assert.match(method, /## One conversation by default/);
    assert.match(method, /A phase handoff changes the active task, not the/);
    assert.match(method, /must not veto the human's approved invocation/);
    assert.match(method, /do not require a download\/re-upload between phases/);
    assert.match(Buffer.from(files['SKILL.md']).toString(), /this same conversation/);
  }
  const scenarios = JSON.parse(await readFile(path.join(root, 'evaluations/scenarios.json')));
  for (const id of ['EVAL-022', 'EVAL-023', 'EVAL-024']) {
    assert.ok(scenarios.cases.some(scenario => scenario.id === id), `Missing continuity case: ${id}`);
  }
});

test('functional execution protocol ships with both testing skills and evidence template', async () => {
  const artifacts = await assemblePack();
  const protocol = await readFile(path.join(root, 'references/functional-testing.md'));
  for (const name of names) {
    const files = unzipSync(artifacts[`${name}.zip`]);
    assert.deepEqual(Buffer.from(files['references/functional-testing.md']), protocol);
    if (['pressure-test-my-prototype', 'prove-my-app-works'].includes(name)) {
      const body = Buffer.from(files['SKILL.md']).toString();
      assert.match(body, /references\/functional-testing\.md/);
      assert.match(body, /Never invoke or troubleshoot browser\/computer use|Never\s+invoke or troubleshoot browser\/computer use/);
      assert.doesNotMatch(body, /Do not mutate data or rebuild|Review skills do not perform submissions/);
    }
    const workbook = Buffer.from(files['references/app-workbook.md']).toString();
    assert.match(workbook, /Available and attempted execution surfaces/);
    assert.match(workbook, /cleanup authorization/);
    assert.match(workbook, /Static review is a separate finding/);
  }
  for (const rule of ['Actual app-code tests first', 'No browser or computer use',
    'Supported service-level checks', 'Static review and human fallback',
    'user-approved test scope', 'Fallbacks must never evade',
    're-observe current state', 'verify cleanup', 'rerun failed cases']) {
    assert.ok(protocol.toString().includes(rule), `Missing execution rule: ${rule}`);
  }
  const cases = JSON.parse(await readFile(path.join(root, 'evaluations/scenarios.json'))).cases;
  for (const id of ['EVAL-025', 'EVAL-026', 'EVAL-027', 'EVAL-028', 'EVAL-029', 'EVAL-030', 'EVAL-031']) {
    assert.ok(cases.some(item => item.id === id), `Missing functional case: ${id}`);
  }
});

test('all skill archives exclude browser-first guidance and browser setup references', async () => {
  const artifacts = await assemblePack();
  for (const name of names) {
    const files = unzipSync(artifacts[`${name}.zip`]);
    const method = Buffer.from(files['references/methodology.md']).toString();
    assert.match(method, /Browser\/computer-use automation is excluded across this pack/);
    for (const [file, bytes] of Object.entries(files)) {
      if (!file.endsWith('.md')) continue;
      const text = Buffer.from(bytes).toString();
      assert.doesNotMatch(text, /browser[- ]first|Cowork's browser first|cowork-local-browser/i,
        `${name}/${file} retains superseded browser guidance`);
    }
  }
});

test('archives and metadata are deterministic and checksums match exported bytes', async () => {
  const first = await assemblePack();
  const second = await assemblePack();
  for (const name of Object.keys(first)) assert.deepEqual(first[name], second[name], name);
  const manifest = JSON.parse(first['pack.json']);
  assert.equal(manifest.skills.length, 5);
  assert.equal(manifest.artifacts.length, 7);
  for (const artifact of manifest.artifacts) {
    assert.equal(first[artifact.file].length, artifact.bytes);
    assert.equal(createHash('sha256').update(first[artifact.file]).digest('hex'), artifact.sha256);
  }
});

test('archive bytes are stable across time zones', () => {
  const code = `
    import { assemblePack } from './scripts/build.mjs';
    import { createHash } from 'node:crypto';
    const files = await assemblePack();
    console.log(createHash('sha256').update(Buffer.concat(Object.values(files))).digest('hex'));
  `;
  const hashes = ['UTC', 'America/New_York', 'Asia/Tokyo'].map(TZ => {
    const result = spawnSync(process.execPath, ['--input-type=module', '-e', code], {
      cwd: root, encoding: 'utf8', env: { ...process.env, TZ },
    });
    assert.equal(result.status, 0, result.stderr);
    return result.stdout.trim();
  });
  assert.equal(new Set(hashes).size, 1);
});

test('rejects invalid layout, metadata, unsafe paths, missing references, and size limits', async t => {
  const files = unzipSync((await assemblePack())['shape-my-app.zip']);
  const mutations = [
    ['missing root', altered => { delete altered['SKILL.md']; }, /missing root/],
    ['wrong name', altered => {
      altered['SKILL.md'] = Buffer.from(Buffer.from(altered['SKILL.md']).toString()
        .replace('name: shape-my-app', 'name: wrong-name'));
    }, /must match/],
    ['long description', altered => {
      altered['SKILL.md'] = Buffer.from(Buffer.from(altered['SKILL.md']).toString()
        .replace(/description: "[^\n]+"/, `description: "${'a'.repeat(1025)}"`));
    }, /1-1024/],
    ['large skill', altered => {
      altered['SKILL.md'] = Buffer.concat([Buffer.from(altered['SKILL.md']), Buffer.alloc(1024 * 1024)]);
    }, /SKILL.md exceeds/],
    ['traversal', altered => { altered['../escape.md'] = Buffer.from('bad'); }, /unsafe companion/],
    ['hidden file', altered => { altered['references/.hidden'] = Buffer.from('bad'); }, /unsafe companion/],
    ['windows reserved', altered => { altered['references/CON.md'] = Buffer.from('bad'); }, /unsafe companion/],
    ['backslash', altered => { altered['references\\bad.md'] = Buffer.from('bad'); }, /unsafe companion/],
    ['absolute path', altered => { altered['/bad.md'] = Buffer.from('bad'); }, /unsafe companion/],
    ['missing reference', altered => { delete altered['references/methodology.md']; }, /missing local/],
    ['escaping link', altered => {
      altered['SKILL.md'] = Buffer.concat([Buffer.from(altered['SKILL.md']), Buffer.from('\n[bad](../other/SKILL.md)')]);
    }, /unsafe reference/],
    ['companion count', altered => {
      for (let i = 0; i < 21; i++) altered[`references/extra-${i}.txt`] = Buffer.from('test');
    }, /too many/],
    ['companion size', altered => { altered['references/large.txt'] = Buffer.alloc(5 * 1024 * 1024 + 1); }, /exceeds 5 MB/],
    ['total size', altered => {
      altered['references/large-a.txt'] = Buffer.alloc(5 * 1024 * 1024);
      altered['references/large-b.txt'] = Buffer.alloc(5 * 1024 * 1024);
    }, /exceed 10 MB/],
  ];
  for (const [name, mutate, expected] of mutations) {
    await t.test(name, () => {
      const altered = { ...files };
      mutate(altered);
      assert.throws(() => validateSkill('shape-my-app', altered), expected);
    });
  }
  for (const invalid of ['Bad', 'bad--name', '-bad', '../bad', 'a'.repeat(65)]) {
    assert.throws(() => validateSkill(invalid, files), /Invalid skill name/);
  }
});

test('catalog and source directories must match; symlink companions are refused', async t => {
  const directory = await fixture(t);
  const catalogPath = path.join(directory, 'catalog.json');
  const catalog = JSON.parse(await readFile(catalogPath));
  await writeFile(catalogPath, JSON.stringify({ skills: [...catalog.skills, catalog.skills[0]] }));
  await assert.rejects(assemblePack(directory), /Duplicate skill/);
  await writeFile(catalogPath, JSON.stringify({ skills: catalog.skills.slice(1) }));
  await assert.rejects(assemblePack(directory), /exactly match/);
  await writeFile(catalogPath, JSON.stringify(catalog));
  await symlink(path.join(directory, 'LICENSE'), path.join(directory, 'references', 'linked.md'));
  await assert.rejects(assemblePack(directory), /Unexpected reference/);
});

test('build replaces known outputs but refuses unrelated output files', async t => {
  const directory = await temporary(t);
  const output = path.join(directory, 'dist');
  await buildPack(root, output);
  await buildPack(root, output);
  assert.equal((await readdir(output)).length, 9);
  await writeFile(path.join(output, 'keep.txt'), 'user data');
  await assert.rejects(buildPack(root, output), /Unexpected output entry/);
  assert.equal(await readFile(path.join(output, 'keep.txt'), 'utf8'), 'user data');
});

test('export verifies integrity and refuses to overwrite an existing destination', async t => {
  const directory = await temporary(t);
  await buildPack(root, path.join(directory, 'downloads'));
  const output = path.join(directory, 'upload');
  const manifest = await exportPack(output, directory);
  assert.equal(manifest.skills.length, 5);
  for (const file of await readdir(output)) {
    assert.deepEqual(await readFile(path.join(output, file)), await readFile(path.join(directory, 'downloads', file)));
  }
  await assert.rejects(exportPack(output, directory), { code: 'EEXIST' });
  await writeFile(path.join(directory, 'downloads', 'shape-my-app.zip'), 'corrupt');
  await assert.rejects(exportPack(path.join(directory, 'new-export'), directory), /integrity mismatch/);
  assert.ok(!(await readdir(directory)).includes('new-export'));
});

test('export rejects path traversal in the pack manifest', async t => {
  const directory = await temporary(t);
  await mkdir(path.join(directory, 'downloads'));
  await writeFile(path.join(directory, 'downloads', 'pack.json'), JSON.stringify({
    artifacts: [{ file: '../outside.zip' }],
  }));
  await assert.rejects(exportPack(path.join(directory, 'upload'), directory), /Invalid or duplicate/);
  assert.ok(!(await readdir(directory)).includes('upload'));
});

test('CLI help works without build artifacts and invalid arguments fail explicitly', () => {
  const cli = path.join(root, 'bin/wingmate.mjs');
  const help = spawnSync(process.execPath, [cli, '--help'], { encoding: 'utf8' });
  assert.equal(help.status, 0, help.stderr);
  assert.match(help.stdout, /output directory must not already exist/);
  const invalid = spawnSync(process.execPath, [cli, 'publish'], { encoding: 'utf8' });
  assert.equal(invalid.status, 1);
  assert.match(invalid.stderr, /Invalid arguments/);
});

test('CLI runs through the symlink used by installed npm bins', async t => {
  const directory = await temporary(t);
  const link = path.join(directory, 'wingmate');
  await symlink(path.join(root, 'bin/wingmate.mjs'), link);
  const help = spawnSync(process.execPath, [link, '--help'], { encoding: 'utf8' });
  assert.equal(help.status, 0, help.stderr);
  assert.match(help.stdout, /Usage: wingmate export/);
});

test('evaluation catalog covers every skill with observable and prohibited behavior', async () => {
  const scenarios = JSON.parse(await readFile(path.join(root, 'evaluations/scenarios.json')));
  assert.equal(scenarios.schemaVersion, 1);
  assert.equal(new Set(scenarios.cases.map(item => item.id)).size, scenarios.cases.length);
  assert.deepEqual([...new Set(scenarios.cases.map(item => item.skill))].sort(), [...names].sort());
  for (const scenario of scenarios.cases) {
    assert.match(scenario.id, /^EVAL-\d{3}$/);
    assert.ok(scenario.prompt.length > 0 && scenario.context.length > 0);
    assert.ok(scenario.mustObserve.length > 0 && scenario.mustNotObserve.length > 0);
  }
  for (const id of ['EVAL-015', 'EVAL-016', 'EVAL-017', 'EVAL-018', 'EVAL-019', 'EVAL-020', 'EVAL-021']) {
    assert.ok(scenarios.cases.some(scenario => scenario.id === id), `Missing visual pilot case: ${id}`);
  }
});

test('shared method retains approval, evidence, persistence, and interview guardrails', async () => {
  const method = await readFile(path.join(root, 'references/methodology.md'), 'utf8');
  for (const required of [
    'exactly one atomic question', 'recommended answer', '**A)**', 'depth-first',
    'invalidate affected approvals', 'never a pass', 'say it is unsaved',
  ]) {
    assert.ok(method.includes(required), `Missing method guardrail: ${required}`);
  }
  const boundary = await readFile(path.join(root, 'references/platform-boundaries.md'), 'utf8');
  assert.match(boundary, /not a guaranteed policy engine/);
  assert.match(boundary, /Unresolved sensitive-data exposure blocks release/);
  const workbook = await readFile(path.join(root, 'references/app-workbook.md'), 'utf8');
  assert.match(workbook, /not run, passed, failed, blocked, stale, N\/A/);
  assert.match(workbook, /Publication result is separate from approval/);
});
