#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { mkdir, readFile, realpath, rmdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

export async function exportPack(output, packageDirectory = root) {
  const dist = path.join(packageDirectory, 'downloads');
  const manifestBytes = await readFile(path.join(dist, 'pack.json'));
  const manifest = JSON.parse(manifestBytes);
  if (!Array.isArray(manifest.artifacts) || manifest.artifacts.length === 0) {
    throw new Error('Invalid pack manifest: missing artifacts');
  }
  const files = new Map();
  for (const artifact of manifest.artifacts) {
    if (!/^(?:[a-z0-9]+(?:-[a-z0-9]+)*\.zip|App-Workbook\.md|App-Journey\.html)$/.test(artifact.file)
      || files.has(artifact.file)) {
      throw new Error(`Invalid or duplicate artifact name: ${artifact.file}`);
    }
    const bytes = await readFile(path.join(dist, artifact.file));
    if (bytes.length !== artifact.bytes
      || createHash('sha256').update(bytes).digest('hex') !== artifact.sha256) {
      throw new Error(`Artifact integrity mismatch: ${artifact.file}`);
    }
    files.set(artifact.file, bytes);
  }
  files.set('pack.json', manifestBytes);
  await mkdir(output);
  const written = [];
  try {
    for (const [name, bytes] of files) {
      const destination = path.join(output, name);
      await writeFile(destination, bytes, { flag: 'wx' });
      written.push(destination);
    }
  } catch (error) {
    const cleanup = await Promise.allSettled(written.map(file => unlink(file)));
    const failures = cleanup.filter(result => result.status === 'rejected').map(result => result.reason);
    try {
      await rmdir(output);
    } catch (cleanupError) {
      failures.push(cleanupError);
    }
    if (failures.length) {
      throw new AggregateError([error, ...failures], `Export failed; incomplete output remains at ${output}`);
    }
    throw error;
  }
  return manifest;
}

export async function main(args) {
  if (args.length === 0 || (args.length === 1 && ['--help', '-h'].includes(args[0]))) {
    console.log('Usage: wingmate export [--output <new-directory>]\nExports five uploadable skill ZIPs, App Workbook and Journey templates, and pack metadata.\nThe output directory must not already exist. This command does not upload or publish.');
    return;
  }
  if (args.length === 1 && args[0] === '--version') {
    console.log(JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8')).version);
    return;
  }
  if (args[0] !== 'export' || !(args.length === 1 || (args.length === 3 && args[1] === '--output'))) {
    throw new Error('Invalid arguments. Use --help for usage.');
  }
  const output = path.resolve(args[2] ?? 'wingmate-skills');
  const manifest = await exportPack(output);
  console.log(`Exported ${manifest.package}@${manifest.version} to ${output}\nUpload each ZIP separately in Cowork: Customize > Skills > Upload skill.`);
}

if (process.argv[1] && await realpath(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    await main(process.argv.slice(2));
  } catch (error) {
    console.error(`Wingmate export failed: ${error.message}`);
    process.exitCode = 1;
  }
}
