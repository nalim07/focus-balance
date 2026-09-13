import assert from 'node:assert/strict';
import test from 'node:test';
import { syncBreakWindow } from './break-window.ts';

test('syncBreakWindow requests fullscreen when a break starts', async () => {
  const commands: string[] = [];

  await syncBreakWindow(true, async command => {
    commands.push(command);
  });

  assert.deepEqual(commands, ['show_break_window']);
});

test('syncBreakWindow restores the window when a break ends', async () => {
  const commands: string[] = [];

  await syncBreakWindow(false, async command => {
    commands.push(command);
  });

  assert.deepEqual(commands, ['hide_break_window']);
});
