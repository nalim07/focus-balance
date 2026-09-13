import assert from 'node:assert/strict';
import test from 'node:test';
import { notifyTimerTransition } from './alerts.ts';

const enabled = { soundEnabled: true, notificationsEnabled: true };

test('break transition plays sound and sends a break notification when enabled', () => {
  const notifications:string[]=[];
  let sounds=0;
  notifyTimerTransition('break', enabled, { notify: message => notifications.push(message), playSound: () => { sounds += 1; } });
  assert.deepEqual(notifications, ['Focus session complete|Time to take a break.']);
  assert.equal(sounds, 1);
});

test('next focus transition plays sound and sends a focus notification when enabled', () => {
  const notifications:string[]=[];
  let sounds=0;
  notifyTimerTransition('focus', enabled, { notify: message => notifications.push(message), playSound: () => { sounds += 1; } });
  assert.deepEqual(notifications, ['Break complete|Ready for your next focus session.']);
  assert.equal(sounds, 1);
});

test('disabled notification and sound settings suppress their respective alerts', () => {
  const notifications:string[]=[];
  let sounds=0;
  notifyTimerTransition('break', { soundEnabled: false, notificationsEnabled: false }, { notify: message => notifications.push(message), playSound: () => { sounds += 1; } });
  assert.deepEqual(notifications, []);
  assert.equal(sounds, 0);
});
