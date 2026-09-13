type Transition='break'|'focus';
type AlertSettings={soundEnabled:boolean;notificationsEnabled:boolean};
type AlertPorts={notify:(message:string)=>void;playSound:()=>void};

const messages:Record<Transition,string>={
 break:'Focus session complete|Time to take a break.',
 focus:'Break complete|Ready for your next focus session.',
};

export function notifyTimerTransition(transition:Transition,settings:AlertSettings,ports:AlertPorts){
 if(settings.notificationsEnabled)ports.notify(messages[transition]);
 if(settings.soundEnabled)ports.playSound();
}

export function browserAlertPorts():AlertPorts{
 return {
  notify(message){
   const [title,body]=message.split('|');
   void import('@tauri-apps/plugin-notification').then(async notification=>{
    const permission=await notification.isPermissionGranted();
    const granted=permission||await notification.requestPermission()==='granted';
    if(granted)notification.sendNotification({title,body});
   }).catch(()=>{
    if('Notification'in window&&Notification.permission==='granted')new Notification(title,{body});
   });
  },
  playSound(){
   try{
    const contextCtor=window.AudioContext||(window as Window & {webkitAudioContext?:new()=>AudioContext}).webkitAudioContext;
    if(!contextCtor)return;
    const context=new contextCtor();
    const oscillator=context.createOscillator();
    const gain=context.createGain();
    const now=context.currentTime;
    oscillator.type='sine';
    oscillator.frequency.setValueAtTime(880,now);
    oscillator.frequency.setValueAtTime(1175,now+.14);
    gain.gain.setValueAtTime(.0001,now);
    gain.gain.exponentialRampToValueAtTime(.18,now+.015);
    gain.gain.exponentialRampToValueAtTime(.0001,now+.34);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(now);oscillator.stop(now+.36);
    oscillator.addEventListener('ended',()=>void context.close());
   }catch{ /* alerts must never interrupt the timer */ }
  },
 };
}
