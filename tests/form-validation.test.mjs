import test from 'node:test';
import assert from 'node:assert/strict';
import { moduleUrl } from './helpers/typescript-module.mjs';
const { localizedValidityMessage } = await import(moduleUrl('src/lib/form-validation.ts'));
const field = (validity, extra = {}) => ({ type: 'text', validity, ...extra });

test('native form errors follow the selected language including email and required consent', () => {
  assert.equal(localizedValidityMessage(field({ valueMissing: true }), 'en'), 'Please fill in this field.');
  assert.equal(localizedValidityMessage(field({ valueMissing: true }), 'fr'), 'Veuillez remplir ce champ.');
  assert.equal(localizedValidityMessage(field({ typeMismatch: true }, { type: 'email' }), 'en'), 'Enter a valid email address.');
  assert.equal(localizedValidityMessage(field({ valueMissing: true }, { type: 'checkbox' }), 'en'), 'Your consent is required to handle the request.');
});

test('length constraints keep their actual limits and corrected fields have no error', () => {
  assert.equal(localizedValidityMessage(field({ tooShort: true }, { minLength: 5 }), 'en'), 'Please enter at least 5 characters.');
  assert.equal(localizedValidityMessage(field({ tooLong: true }, { maxLength: 100 }), 'en'), 'Please enter no more than 100 characters.');
  assert.equal(localizedValidityMessage(field({ rangeOverflow: true }), 'en'), 'Please check the value in this field.');
  assert.equal(localizedValidityMessage(field({ valid: true }), 'en'), '');
});
