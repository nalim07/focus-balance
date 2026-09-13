type Invoke = (command: string) => Promise<unknown>;

export function syncBreakWindow(isBreak: boolean, invoke: Invoke) {
  return invoke(isBreak ? 'show_break_window' : 'hide_break_window');
}
