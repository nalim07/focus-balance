import assert from 'node:assert/strict';
import test from 'node:test';
import { durationLabel, selectedFocusDuration } from './timer.ts';

test('durationLabel shows completed focus or break time in hours and minutes', () => {
  assert.equal(durationLabel(0), '0h 0m');
  assert.equal(durationLabel(3_660), '1h 1m');
});

test('selectedFocusDuration prioritizes the clicked quick template', () => {
  assert.equal(selectedFocusDuration(1_500, 3_000), 3_000);
});
