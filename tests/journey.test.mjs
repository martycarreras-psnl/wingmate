import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import { unzipSync } from 'fflate';
import { assemblePack } from '../scripts/build.mjs';

const html = await readFile(new URL('../references/app-journey.html', import.meta.url), 'utf8');
const guide = await readFile(new URL('../references/app-journey.md', import.meta.url), 'utf8');
const stages = ['shape', 'data', 'build', 'prototype', 'acceptance', 'release'];

test('all five archives include the journey template and per-turn maintenance contract', async () => {
  const artifacts = await assemblePack();
  assert.equal(Buffer.from(artifacts['App-Journey.html']).toString(), html);
  for (const [name, bytes] of Object.entries(artifacts)) {
    if (!name.endsWith('.zip') || name === 'Wingmate-Skills.zip') continue;
    const files = unzipSync(bytes);
    assert.equal(Buffer.from(files['references/app-journey.html']).toString(), html);
    assert.equal(Buffer.from(files['references/app-journey.md']).toString(), guide);
    assert.match(Buffer.from(files['SKILL.md']).toString(),
      /references\/app-journey\.md[\s\S]*after every workbook update during this skill/);
  }
  for (const rule of [
    'After every workbook update, refresh the journey in the same turn',
    'Read\n   before replacing', 'unsaved or stale', 'source revision',
    'workbook update timestamp', 'Needs re-review', 'HTML-escape',
    'next pack-skill turn', 'never edit progress or approve gates here',
    'No browser/computer-use automation',
  ]) assert.ok(guide.includes(rule), `Missing journey rule: ${rule}`);
});

test('journey is a readable script-free six-stage map with safe prompt defaults', () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'IDs must remain unambiguous for skill updates');
  for (const stage of stages) {
    assert.ok(ids.includes(stage));
    for (const prefix of ['status-', 'note-', 'prompt-']) assert.ok(ids.includes(prefix + stage));
    assert.match(html, new RegExp(`<details id="${stage}"[\\s>]`));
  }
  for (const id of ['app-name', 'workbook-revision', 'workbook-updated', 'journey-updated',
    'workbook-location', 'build-identity', 'current-stage', 'current-task', 'next-action',
    'blockers', 'recent-progress', 'prompt-next']) assert.ok(ids.includes(id), id);
  const prompts = [...html.matchAll(/<textarea id="([^"]+)" readonly>([\s\S]*?)<\/textarea>/g)];
  assert.equal(prompts.length, 7);
  for (const [, id, text] of prompts) {
    assert.match(html, new RegExp(`<label for="${id}">`));
    assert.ok(text.trim().length > 0);
    assert.doesNotMatch(text, /\/(?:shape-my-app|design-my-data|prove-my-app-works)/);
  }
  assert.match(prompts.find(([, id]) => id === 'prompt-build')[2], /before giving me.*\/app/);
  assert.equal([...html.matchAll(/<button type="button" hidden>/g)].length, 7);
  assert.doesNotMatch(html, /(?:src|href)="(?:https?:|\/\/|javascript:)|\bfetch\(|localStorage|<form\b/i);
  assert.match(html, /connect-src 'none'/);
  assert.match(html, /not a live connection/);
});

for (const mode of ['success', 'denied', 'unavailable']) {
  test(`copy interaction reports ${mode} honestly without invoking anything`, async () => {
    const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
    const handlers = [];
    const fields = [];
    const statuses = [];
    const buttons = [];
    const copied = [];
    const groups = [...html.matchAll(/<textarea id="([^"]+)" readonly>([\s\S]*?)<\/textarea>/g)]
      .map(([, , value]) => {
        const field = {
          value, focused: false, selected: false,
          focus() { this.focused = true; },
          select() { this.selected = true; },
        };
        const status = { textContent: '' };
        const button = {
          hidden: true,
          addEventListener(event, handler) { assert.equal(event, 'click'); handlers.push(handler); },
        };
        fields.push(field);
        statuses.push(status);
        buttons.push(button);
        return { querySelector: selector => ({ button, textarea: field, '.copy-status': status })[selector] };
      });
    const navigator = mode === 'unavailable' ? {} : {
      clipboard: {
        async writeText(value) {
          if (mode === 'denied') throw new Error('Permission denied');
          copied.push(value);
        },
      },
    };
    runInNewContext(script, {
      document: { querySelectorAll: selector => {
        assert.equal(selector, '.prompt');
        return groups;
      } },
      navigator,
    });
    assert.equal(handlers.length, 7);
    assert.ok(buttons.every(button => !button.hidden));
    for (const handler of handlers) await handler();
    if (mode === 'success') {
      assert.deepEqual(copied, fields.map(field => field.value));
      assert.ok(statuses.every(status => status.textContent.includes('nothing has been invoked')));
    } else {
      assert.equal(copied.length, 0);
      assert.ok(fields.every(field => field.focused && field.selected));
      assert.ok(statuses.every(status => status.textContent.includes('Copy the selected text manually')));
    }
  });
}

test('pilot cases cover persistence, mid-phase updates, stale evidence, and file/viewer limits', async () => {
  const catalog = JSON.parse(await readFile(new URL('../evaluations/scenarios.json', import.meta.url)));
  for (const id of ['EVAL-032', 'EVAL-033', 'EVAL-034', 'EVAL-035', 'EVAL-036', 'EVAL-037']) {
    assert.ok(catalog.cases.some(item => item.id === id), id);
  }
});
