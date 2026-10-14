import 'fake-indexeddb/auto';
import test from 'node:test';
import assert from 'node:assert/strict';
import { saveDraft, loadDraft, removeDraft, clearUserDrafts } from '../lib/portal/drafts.ts';

const draft = (userId,type='website_update') => ({id:'request-'+userId,userId,clientId:'client-'+userId,type,fields:{description:'Update gallery'},websiteId:'site-a',files:[new File(['picture'],'image.png',{type:'image/png'})],savedAt:Date.now()});

test('saved request survives closing and reopening database connections',async()=>{
 const original=draft('a');await saveDraft(original);
 const restored=await loadDraft('a','website_update');
 assert.equal(restored.id,original.id);assert.equal(restored.fields.description,'Update gallery');
 assert.equal(await restored.files[0].text(),'picture');
 await removeDraft('a','website_update');assert.equal(await loadDraft('a','website_update'),null);
});
test('drafts are scoped to account and request type',async()=>{
 await saveDraft(draft('a'));await saveDraft(draft('b','upload_photos'));
 assert.equal(await loadDraft('b','website_update'),null);
 assert.equal(await loadDraft('a','upload_photos'),null);
 assert.equal((await loadDraft('b','upload_photos')).userId,'b');
});
test('sign-out clears only the signed-in account drafts',async()=>{
 await saveDraft(draft('a','something_else'));await clearUserDrafts('a');
 assert.equal(await loadDraft('a','website_update'),null);
 assert.equal(await loadDraft('a','something_else'),null);
 assert.equal((await loadDraft('b','upload_photos')).userId,'b');
});
test('expired drafts are deleted instead of resumed',async()=>{
 const expired={...draft('expired'),savedAt:Date.now()-8*24*60*60*1000};await saveDraft(expired);
 assert.equal(await loadDraft('expired','website_update'),null);
 assert.equal(await loadDraft('expired','website_update'),null);
});
