import type {Template} from '../types';

type TimerSettings=Pick<Template,'focusDuration'|'shortBreakDuration'|'longBreakDuration'|'sessionsBeforeLongBreak'>;

export function applyTemplate(_:TimerSettings,template:Template):TimerSettings{
 return {focusDuration:template.focusDuration,shortBreakDuration:template.shortBreakDuration,longBreakDuration:template.longBreakDuration,sessionsBeforeLongBreak:template.sessionsBeforeLongBreak};
}

export function clearSelectedTemplateOnTimerChange(_:Template|null):null{return null}
