export interface TimerSnapshot {startedAt:number;pausedAt:number|null;totalDuration:number;accumulatedPausedTime:number}
export function remaining(s:TimerSnapshot, now=Date.now()){const paused=s.pausedAt?Math.max(0,now-s.pausedAt):0;return Math.max(0,s.totalDuration-Math.floor((now-s.startedAt-s.accumulatedPausedTime-paused)/1000))}
export function fmt(sec:number){const m=Math.floor(Math.max(0,sec)/60);const s=Math.max(0,sec)%60;return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`}
export function durationLabel(sec:number){const safe=Math.max(0,sec);return `${Math.floor(safe/3600)}h ${Math.floor(safe%3600/60)}m`}
export function selectedFocusDuration(defaultDuration:number, templateDuration?:number){return templateDuration??defaultDuration}
