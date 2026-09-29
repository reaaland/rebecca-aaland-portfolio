import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
function load(file, imports) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(code, { exports, require: (name) => imports[name], Response,
    process: { env: { RESEND_API_KEY: 'mock-only' } }, console });
  return exports;
}
const config = load('lib/contact.ts', {});
function setup(fail = false) {
  const sent = [];
  const { POST } = load('app/api/contact/route.ts', {
    '@/lib/contact': config,
    resend: { Resend: class { emails = { send: async (mail) => { sent.push(mail); return { error: fail ? { name: 'mock-failure' } : null }; } }; } },
  });
  return { sent, post: (body) => POST(new Request('https://example.test/api/contact', {
    method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' },
  })) };
}
const basic = { name: 'Test Person', email: 'test@example.test', message: 'Please help with this project.' };
for (const [type, label] of Object.entries(config.inquiryLabels)) {
  test(`${type}: sends correct category, optional answers and link label`, async () => {
    const { post, sent } = setup();
    const answers = Object.fromEntries(config.inquiryFields[type].map(f => [f.name, f.options?.[0] || 'A useful answer']));
    answers.unrecognized = 'Must not be included';
    const result = await post({ ...basic, inquiryType: type, website: 'https://example.test', answers });
    assert.equal(result.status, 200);
    assert.equal(sent.length, 1);
    assert.equal(sent[0].subject, `${label} from Test Person`);
    assert.ok(sent[0].text.includes(`${config.linkLabels[type]}: https://example.test`));
    for (const field of config.inquiryFields[type]) assert.ok(sent[0].text.includes(`${field.label}: ${answers[field.name]}`));
    assert.ok(!sent[0].text.includes('Must not be included'));
    assert.equal(sent[0].replyTo, basic.email);
  });
  test(`${type}: optional answers are not required`, async () => {
    assert.equal((await setup().post({ ...basic, inquiryType: type })).status, 200);
  });
}
test('rejects malformed bodies and unsupported inquiry types without sending', async () => {
  const { post, sent } = setup();
  for (const body of [null, [], 'text', {}, ...['constructor', 'toString', '__proto__', 'unknown'].map(inquiryType => ({ ...basic, inquiryType }))]) {
    assert.equal((await post(body)).status, 400);
  }
  assert.equal(sent.length, 0);
});
test('honeypot succeeds without sending', async () => {
  const { post, sent } = setup();
  assert.equal((await post({ ...basic, inquiryType: 'general', companySite: 'bot' })).status, 200);
  assert.equal(sent.length, 0);
});
test('delivery failure is not reported as success', async () => {
  assert.equal((await setup(true).post({ ...basic, inquiryType: 'general' })).status, 502);
});
