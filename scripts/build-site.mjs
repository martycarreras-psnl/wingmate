import { cp, lstat, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const marker = 'Wingmate generated public site\n';
const publicFiles = [
  'index.html', '.nojekyll', 'README.md', 'INSTALL.md', 'CONTRIBUTING.md',
  'CHANGELOG.md', 'LICENSE', 'THIRD-PARTY-NOTICES.md',
];
const publicDirectories = ['assets', 'downloads', 'docs', 'references', 'evaluations', 'licenses'];

async function checkTree(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await checkTree(file);
    else if (!entry.isFile()) throw new Error(`Refusing non-regular public content: ${file}`);
  }
}

function fromDocs(markdown) {
  return markdown.replace(/(\[[^\]]*\]\()([^) \n]+)(\))/g, (match, start, href, end) =>
    /^(?:https?:|#)/.test(href) ? match : `${start}../${href}${end}`);
}

export async function buildSite(directory = root) {
  const output = path.join(directory, '_site');
  let existing;
  try {
    existing = await lstat(output);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  if (existing) {
    if (!existing.isDirectory() || await readFile(path.join(output, '.wingmate-site'), 'utf8') !== marker) {
      throw new Error('Refusing to replace an unrecognized _site directory');
    }
    const allowed = new Set([...publicFiles, ...publicDirectories, '.wingmate-site']);
    for (const entry of await readdir(output)) {
      if (!allowed.has(entry)) throw new Error(`Unexpected _site entry: ${entry}`);
    }
    await checkTree(output);
  }
  for (const file of publicFiles) {
    if (!(await lstat(path.join(directory, file))).isFile()) {
      throw new Error(`Expected a regular public file: ${file}`);
    }
  }
  for (const name of publicDirectories) {
    if (!(await lstat(path.join(directory, name))).isDirectory()) {
      throw new Error(`Expected a public directory: ${name}`);
    }
    await checkTree(path.join(directory, name));
  }
  await writeFile(path.join(directory, 'docs/README.md'), fromDocs(await readFile(path.join(directory, 'README.md'), 'utf8')));
  await writeFile(path.join(directory, 'docs/THIRD-PARTY-NOTICES.md'),
    fromDocs(await readFile(path.join(directory, 'THIRD-PARTY-NOTICES.md'), 'utf8')));
  await cp(path.join(directory, 'LICENSE'), path.join(directory, 'docs/LICENSE.txt'));
  if (existing) await rm(output, { recursive: true });
  await mkdir(output);
  await writeFile(path.join(output, '.wingmate-site'), marker);
  for (const entry of [...publicFiles, ...publicDirectories]) {
    await cp(path.join(directory, entry), path.join(output, entry), { recursive: true });
  }
  return output;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    console.log(`Staged Wingmate site: ${await buildSite()}`);
  } catch (error) {
    console.error(`Wingmate site build failed: ${error.message}`);
    process.exitCode = 1;
  }
}
