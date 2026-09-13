import assert from 'node:assert/strict';
import test from 'node:test';
import { applyTemplate, clearSelectedTemplateOnTimerChange } from './template.ts';

test('applyTemplate copies every timer setting from the selected preset', () => {
  const next = applyTemplate(
    { focusDuration: 1500, shortBreakDuration: 300, longBreakDuration: 900, sessionsBeforeLongBreak: 4 },
    { id: 'custom', name: 'Custom', focusDuration: 3000, shortBreakDuration: 600, longBreakDuration: 1200, sessionsBeforeLongBreak: 3 },
  );
  assert.deepEqual(next, { focusDuration: 3000, shortBreakDuration: 600, longBreakDuration: 1200, sessionsBeforeLongBreak: 3 });
});

test('manual timer setting changes clear the selected preset', () => {
  assert.equal(
    clearSelectedTemplateOnTimerChange({ id: 'deep', name: 'Deep Work', focusDuration: 3000, shortBreakDuration: 600, longBreakDuration: 1200, sessionsBeforeLongBreak: 3 }),
    null,
  );
});
