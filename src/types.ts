export type SessionType='focus'|'short_break'|'long_break';
export type SessionStatus='running'|'paused'|'completed'|'stopped'|'interrupted'|'emergency_unlocked';
export type TimerState='IDLE'|'FOCUS'|'FOCUS_PAUSED'|'BREAK'|'EMERGENCY_CONFIRMATION'|'COMPLETED';
export interface Session {id:string;type:SessionType;status:SessionStatus;startedAt:string;endedAt?:string;plannedDuration:number;actualDuration?:number;task?:string;templateId?:string;createdAt:string}
export interface Settings {focusDuration:number;shortBreakDuration:number;longBreakDuration:number;sessionsBeforeLongBreak:number;autoStartBreak:boolean;autoStartFocus:boolean;soundEnabled:boolean;notificationsEnabled:boolean;theme:'system'|'light'|'dark';breakEnforcement:'guided'|'strict';launchAtStartup:boolean;startMinimized:boolean}
export interface Template {id:string;name:string;focusDuration:number;shortBreakDuration:number;longBreakDuration:number;sessionsBeforeLongBreak:number}
