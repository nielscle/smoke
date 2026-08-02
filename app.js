'use strict';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const healthData = {
  brain: { icon:'🧠', title:'Hersenen en nicotine', intro:'Je brein past zich aan een leven zonder nicotine aan. Ontwenningsklachten kunnen eerst pieken, terwijl vaste rookprikkels daarna geleidelijk minder krachtig worden.', timeline:[['1–3 dagen','Nicotine verdwijnt uit je lichaam. Onrust en concentratieproblemen kunnen tijdelijk sterker zijn.'],['2–4 weken','Vaste situaties roepen vaak minder automatisch een rookreactie op.'],['1–3 maanden','Cravings worden doorgaans minder frequent en minder intens.'],['6–12 maanden','Veel automatische rookgedachten verliezen verder hun kracht.']] },
  lungs: { icon:'🫁', title:'Longen en luchtwegen', intro:'Zonder nieuwe rookblootstelling krijgen je luchtwegen rust. Hoesten kan tijdelijk toenemen wanneer slijm beter wordt afgevoerd.', timeline:[['Na enkele dagen','De luchtwegen kunnen zich ontspannen, waardoor ademhalen makkelijker kan voelen.'],['1–12 maanden','Hoesten en kortademigheid nemen bij veel mensen af.'],['Maanden','Trilhaartjes in de luchtwegen herstellen en voeren slijm beter af.'],['Lange termijn','De kans op verdere rookschade en luchtweginfecties neemt af.']] },
  heart: { icon:'❤️', title:'Hart en bloedvaten', intro:'Stoppen verlaagt de belasting door nicotine en koolmonoxide. De winst begint snel en loopt jarenlang door.', timeline:[['Minuten','Je hartslag begint te dalen.'],['Enkele dagen','Koolmonoxide in het bloed daalt naar het niveau van iemand die niet rookt.'],['1–2 jaar','Het risico op een hartaanval daalt sterk.'],['15 jaar','Het risico op coronaire hartziekte komt in de buurt van dat van een niet-roker.']] },
  blood: { icon:'🩸', title:'Bloed en zuurstof', intro:'Koolmonoxide uit tabaksrook bindt zich aan hemoglobine. Na stoppen ontstaat snel meer ruimte voor normaal zuurstoftransport.', timeline:[['Uren tot dagen','Het koolmonoxideniveau daalt sterk.'],['Enkele dagen','Het niveau kan weer vergelijkbaar zijn met dat van een niet-roker.'],['Weken tot maanden','Doorbloeding en inspanning kunnen geleidelijk verbeteren.'],['Lange termijn','Hart en bloedvaten blijven profiteren van de afwezigheid van rook.']] },
  skin: { icon:'✨', title:'Huid en herstel', intro:'Een betere doorbloeding ondersteunt huidcellen en wondgenezing. Verdere versnelde huidveroudering door tabaksrook wordt voorkomen.', timeline:[['Weken','De doorbloeding van huid en weefsels kan verbeteren.'],['Maanden','Huidconditie en wondherstel kunnen verder verbeteren.'],['Lange termijn','Je voorkomt extra blootstelling aan stoffen die huidveroudering versnellen.']] }
};

const milestones = [
  {h:0.33,time:'20 minuten',category:'heart',icon:'❤️',title:'Je hartslag begint te dalen',text:'De directe nicotinebelasting neemt af. Je hartslag begint terug te bewegen richting je persoonlijke uitgangsniveau.'},
  {h:24,time:'24 uur',category:'brain',icon:'🧠',title:'Nicotine in je bloed daalt naar nul',text:'Volgens de CDC is nicotine na ongeveer een dag niet meer aantoonbaar in het bloed. Ontwenningsklachten kunnen rond deze fase juist duidelijk voelbaar zijn.'},
  {h:72,time:'Enkele dagen',category:'heart',icon:'🩸',title:'Koolmonoxide daalt naar normaal',text:'Het koolmonoxideniveau in je bloed daalt binnen enkele dagen naar het niveau van iemand die niet rookt, waardoor zuurstoftransport niet meer door nieuwe rook wordt verstoord.'},
  {h:72,time:'Enkele dagen',category:'senses',icon:'👃',title:'Smaak en reuk kunnen scherper worden',text:'Zonder nieuwe rookblootstelling krijgen slijmvliezen en zintuigen herstelruimte. Veel mensen merken dat eten en geuren sterker worden.'},
  {h:168,time:'1 week',category:'brain',icon:'⚡',title:'De eerste zware ontwenningsfase zakt vaak',text:'De lichamelijke piek ligt voor veel mensen in de eerste dagen. Triggers en gewoontes blijven daarna belangrijk.'},
  {h:720,time:'1 maand',category:'lungs',icon:'🌬️',title:'Je luchtwegen krijgen herstelruimte',text:'Hoesten kan veranderen wanneer slijm beter wordt afgevoerd. De precieze snelheid verschilt sterk per persoon.'},
  {h:2160,time:'3 maanden',category:'heart',icon:'🏃',title:'Doorbloeding en inspanning kunnen verbeteren',text:'Bewegen kan geleidelijk makkelijker voelen doordat je lichaam niet meer voortdurend wordt belast door tabaksrook.'},
  {h:8760,time:'1 jaar',category:'lungs',icon:'🫁',title:'Hoesten en kortademigheid zijn vaak afgenomen',text:'De CDC beschrijft een afname van hoesten en kortademigheid binnen één tot twaalf maanden.'},
  {h:13140,time:'1,5 jaar',category:'risk',icon:'🫀',title:'Risico op een hartaanval daalt sterk',text:'Binnen één tot twee jaar neemt het risico op een hartaanval volgens de CDC sterk af.'},
  {h:26280,time:'3 jaar',category:'risk',icon:'❤️',title:'Extra risico op coronaire hartziekte daalt verder',text:'Tussen drie en zes jaar is het extra risico op coronaire hartziekte ongeveer gehalveerd ten opzichte van doorroken.'},
  {h:43800,time:'5 jaar',category:'risk',icon:'🧠',title:'Risico op een beroerte blijft dalen',text:'Het cardiovasculaire risico blijft afnemen. De uiteindelijke daling hangt ook af van andere persoonlijke risicofactoren.'},
  {h:87600,time:'10 jaar',category:'risk',icon:'🫁',title:'Meerdere kankerrisico’s zijn duidelijk lager',text:'Na langdurig stoppen dalen onder andere de risico’s op kanker van longen, blaas, slokdarm en nieren.'},
  {h:109500,time:'12,5 jaar',category:'risk',icon:'🫁',title:'Risico op longkanker is ongeveer gehalveerd',text:'Na ongeveer tien tot vijftien jaar is het risico op longkanker circa de helft van dat van iemand die blijft roken.'},
  {h:131400,time:'15 jaar',category:'risk',icon:'❤️',title:'Risico op coronaire hartziekte nadert dat van een niet-roker',text:'Na vijftien jaar komt het risico op coronaire hartziekte dicht in de buurt van dat van iemand die niet rookt.'}
];

const phases = [
  {max:24,label:'Eerste dag',icon:'🩸',title:'Je lichaam schakelt direct om',text:'Je hartslag begint te dalen en de directe toevoer van nicotine en koolmonoxide is gestopt.'},
  {max:72,label:'Ontwenning',icon:'🧠',title:'Je brein past zich aan',text:'Nicotine verdwijnt snel. Onrust, trek en concentratieproblemen kunnen nu tijdelijk sterker zijn.'},
  {max:168,label:'Eerste week',icon:'👃',title:'Je zintuigen en routines veranderen',text:'Smaak en reuk kunnen scherper worden. Tegelijk leer je rookmomenten zonder sigaret doorstaan.'},
  {max:720,label:'Eerste maand',icon:'🫁',title:'Je luchtwegen krijgen rust',text:'Zonder nieuwe rookblootstelling neemt voortdurende irritatie af. Hoesten kan tijdelijk veranderen.'},
  {max:2160,label:'Herstelfase',icon:'🏃',title:'Inspanning kan prettiger worden',text:'Doorbloeding en conditie kunnen geleidelijk verbeteren. Houd je eigen training en herstel bij.'},
  {max:8760,label:'Eerste jaar',icon:'❤️',title:'De langetermijnwinst bouwt op',text:'Hoesten en kortademigheid nemen bij veel mensen af en cardiovasculaire risico’s blijven dalen.'},
  {max:Infinity,label:'Lange termijn',icon:'🛡️',title:'Je gezondheidsrisico’s blijven afnemen',text:'De winst loopt jarenlang door. Hoe langer je rookvrij blijft, hoe groter het verschil met doorroken.'}
];

let activeJourneyFilter = 'all';
let timerInterval = null;
let timerTotal = 300;
let toastTimer = null;

function defaultQuitDate(){
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  $('#quitDate').value = d.toISOString().slice(0,16);
}
function getProfile(){ try{return JSON.parse(localStorage.getItem('reclaimProfile') || 'null');}catch{return null;} }
function saveProfile(profile){ localStorage.setItem('reclaimProfile', JSON.stringify(profile)); }
function getArray(key){ try{return JSON.parse(localStorage.getItem(key) || '[]');}catch{return [];} }
function elapsed(profile){
  const quit = new Date(profile.quitDate).getTime();
  const ms = Math.max(0, Date.now() - quit);
  return {ms, hours:ms/3600000, days:ms/86400000};
}
function euro(value){ return new Intl.NumberFormat('nl-NL',{style:'currency',currency:'EUR',maximumFractionDigits:2}).format(value || 0); }
function initials(name){ return name.trim().split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase() || 'R'; }
function formatDuration(hours){
  if(hours < 1) return `${Math.floor(hours*60)} minuten`;
  if(hours < 24) return `${Math.floor(hours)} uur, ${Math.floor((hours%1)*60)} min`;
  const days = Math.floor(hours/24), rest = Math.floor(hours%24);
  if(days < 365) return `${days} ${days===1?'dag':'dagen'}, ${rest} uur`;
  const years = Math.floor(days/365), remDays = days%365;
  return `${years} ${years===1?'jaar':'jaar'}, ${remDays} dagen`;
}
function formatRemaining(hours){
  if(hours <= 0) return 'nu';
  if(hours < 1) return `over ${Math.ceil(hours*60)} min`;
  if(hours < 24) return `over ${Math.floor(hours)} u ${Math.ceil((hours%1)*60)} min`;
  const days = Math.ceil(hours/24);
  if(days < 365) return `over ${days} ${days===1?'dag':'dagen'}`;
  const years = (days/365).toFixed(days%365===0?0:1).replace('.',',');
  return `over ${years} jaar`;
}
function showToast(message){
  clearTimeout(toastTimer);
  $('#toast').textContent = message;
  $('#toast').classList.add('show');
  toastTimer = setTimeout(()=>$('#toast').classList.remove('show'),2200);
}
function setScreen(id){
  $$('.screen').forEach(s=>s.classList.toggle('active',s.id===id));
  $$('.nav-item[data-screen]').forEach(n=>n.classList.toggle('active',n.dataset.screen===id));
  closeOverlay('moreMenu');
  window.scrollTo({top:0,behavior:'smooth'});
  if(id==='progress') renderProgress();
}
function openOverlay(id){
  const el = $('#'+id); if(!el) return;
  el.classList.remove('hidden'); el.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeOverlay(id){
  const el = $('#'+id); if(!el) return;
  el.classList.add('hidden'); el.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
  if(id==='moreMenu') $('#moreMenuBtn').setAttribute('aria-expanded','false');
}

function renderApp(){
  const profile = getProfile();
  if(!profile){
    $('#onboarding').classList.add('active');
    $('#bottomNav').classList.add('hidden');
    $('#profileBtn').classList.add('hidden');
    return;
  }
  $('#onboarding').classList.remove('active');
  $('#today').classList.add('active');
  $('#bottomNav').classList.remove('hidden');
  $('#profileBtn').classList.remove('hidden');
  $('#greeting').textContent = `Welkom terug, ${profile.name}`;
  $('#profileBtn').textContent = initials(profile.name);
  renderOrgan('brain');
  updateDashboard();
}

function updateDashboard(){
  const profile = getProfile(); if(!profile) return;
  const e = elapsed(profile);
  const wholeDays = Math.floor(e.days);
  const notSmoked = Math.max(0, Math.floor(e.days * profile.cigsPerDay));
  const slips = getArray('slips').reduce((sum,x)=>sum+(Number(x.amount)||0),0);
  const adjustedNotSmoked = Math.max(0, notSmoked - slips);
  const money = adjustedNotSmoked * (profile.packPrice/profile.packSize);
  const reached = milestones.filter(m=>e.hours>=m.h).length;
  const nextIndex = milestones.findIndex(m=>m.h>e.hours);
  const next = nextIndex>=0 ? milestones[nextIndex] : null;
  const previous = nextIndex>0 ? milestones[nextIndex-1] : {h:0};
  const progress = next ? Math.max(0,Math.min(100,((e.hours-previous.h)/(next.h-previous.h))*100)) : 100;
  const phase = phases.find(p=>e.hours<p.max) || phases[phases.length-1];
  const cravings = Number(localStorage.getItem('cravingsBeaten')||0);

  $('#smokeFreeTime').textContent = formatDuration(e.hours);
  $('#streakDays').textContent = wholeDays;
  $('#reasonText').textContent = profile.mainReason ? `Jouw reden: ${profile.mainReason.toLowerCase()}.` : 'Je kiest voor je gezondheid.';
  $('#overallProgress').style.width = `${progress}%`;
  $('#nextMilestoneCountdown').textContent = next ? formatRemaining(next.h-e.hours) : 'alle kernmijlpalen behaald';
  $('#currentPhase').textContent = phase.label;
  $('#dailyStory').innerHTML = `<div class="story-icon">${phase.icon}</div><span class="eyebrow">JOUW HUIDIGE FASE</span><h3>${phase.title}</h3><p>${phase.text}</p>`;
  $('#notSmoked').textContent = adjustedNotSmoked.toLocaleString('nl-NL');
  $('#moneySaved').textContent = euro(money);
  $('#milestonesMini').textContent = `${reached} / ${milestones.length}`;
  $('#cravingsMini').textContent = cravings;

  $('#progressDays').textContent = wholeDays;
  $('#cravingsBeaten').textContent = cravings;
  $('#slipsCount').textContent = getArray('slips').length;
  $('#goalSaved').textContent = euro(money);
  const goalTarget = Math.max(1,Number(localStorage.getItem('goalTarget')||180));
  $('#goalTarget').textContent = euro(goalTarget);
  $('#goalName').textContent = localStorage.getItem('goalName') || 'Nieuwe hardloopschoenen';
  $('#goalProgress').style.width = `${Math.min(100,money/goalTarget*100)}%`;

  renderFullHealthJourney(e.hours);
  renderHealthBars(e.hours);
  renderCheckinHistory();
}

function renderFullHealthJourney(hours){
  const visible = milestones.filter(m=>activeJourneyFilter==='all'||m.category===activeJourneyFilter);
  const nextIndex = milestones.findIndex(m=>m.h>hours);
  const reached = milestones.filter(m=>m.h<=hours).length;
  $('#milestonesReached').textContent = reached;
  $('#milestonesTotal').textContent = milestones.length;
  $('#journeyNext').textContent = nextIndex>=0 ? milestones[nextIndex].time : 'Behaald';
  $('#fullHealthJourney').innerHTML = visible.map(m=>{
    const index = milestones.indexOf(m);
    const state = hours>=m.h ? 'reached' : index===nextIndex ? 'next' : 'future';
    const status = state==='reached'?'Behaald':state==='next'?'Volgende mijlpaal':'Vooruitblik';
    return `<article class="journey-card ${state}"><span class="journey-marker">${state==='reached'?'✓':m.icon}</span><span class="journey-time">${m.time}</span><h3>${m.title}</h3><p>${m.text}</p><span class="journey-status">${status}</span></article>`;
  }).join('');
}

function renderOrgan(key){
  const d = healthData[key];
  $('#organPanel').innerHTML = `<div class="story-icon">${d.icon}</div><span class="eyebrow">HERSTELGEBIED</span><h3>${d.title}</h3><p>${d.intro}</p>${d.timeline.map(t=>`<div class="timeline-item"><strong>${t[0]}</strong><span>${t[1]}</span></div>`).join('')}`;
  $$('.organ-tab').forEach(btn=>btn.classList.toggle('active',btn.dataset.organ===key));
}

function renderHealthBars(hours){
  const categories = [
    ['Hart',milestones.filter(m=>m.category==='heart')],['Longen',milestones.filter(m=>m.category==='lungs')],['Brein',milestones.filter(m=>m.category==='brain')],['Zintuigen',milestones.filter(m=>m.category==='senses')],['Langetermijnrisico',milestones.filter(m=>m.category==='risk')]
  ];
  $('#healthBars').innerHTML = categories.map(([name,list])=>{
    const achieved = list.filter(m=>hours>=m.h).length;
    const pct = list.length ? achieved/list.length*100 : 0;
    return `<div class="health-row"><span>${name}</span><div class="bar"><i style="width:${pct}%"></i></div><strong>${achieved}/${list.length}</strong></div>`;
  }).join('');
}

function renderProgress(){ updateDashboard(); }

function renderCheckinHistory(){
  const entries = getArray('checkins').slice(-7);
  if(!entries.length){
    $('#checkinHistory').innerHTML = '<div class="empty-state">Na je eerste check-in verschijnt hier je trend.</div>';
    $('#lastCheckinText').textContent = 'Nog niet ingevuld';
    return;
  }
  const last = entries[entries.length-1];
  $('#lastCheckinText').textContent = new Date(last.date).toLocaleDateString('nl-NL',{day:'numeric',month:'short'});
  $('#checkinHistory').innerHTML = entries.map(entry=>{
    const avg = (Number(entry.energy)+Number(entry.mood)+(11-Number(entry.breathlessness)))/3;
    const date = new Date(entry.date).toLocaleDateString('nl-NL',{weekday:'short'}).slice(0,2);
    return `<div class="history-bar" style="height:${Math.max(10,avg*7)}px" title="Gemiddelde welzijnsscore ${avg.toFixed(1)}"><span>${date}</span></div>`;
  }).join('');
}

function startCraving(seconds){
  clearInterval(timerInterval);
  timerTotal = seconds;
  $('#cravingStart').classList.add('hidden');
  $('#cravingSession').classList.remove('hidden');
  $('#finishCravingBtn').textContent = 'Ik voel me rustiger';
  let remaining = seconds;
  const instructions = [
    ['Adem rustig in door je neus.','Vier seconden in, zes seconden uit.'],
    ['Drink langzaam wat water.','Richt je aandacht op de temperatuur en elke slok.'],
    ['Verplaats jezelf.','Sta op en ga naar een andere ruimte of loop kort rond.'],
    ['Herinner jezelf aan je reden.','Je hoeft alleen dit moment niet te roken.']
  ];
  const tick = ()=>{
    const min = String(Math.floor(remaining/60)).padStart(2,'0');
    const sec = String(remaining%60).padStart(2,'0');
    $('#timer').textContent = `${min}:${sec}`;
    const elapsedSec = timerTotal-remaining;
    const phase = Math.min(3,Math.floor(elapsedSec/(timerTotal/4)));
    $('#cravingInstruction').textContent = instructions[phase][0];
    $('#cravingSubtext').textContent = instructions[phase][1];
    if(remaining<=0){ completeCraving(); return; }
    remaining--;
  };
  tick(); timerInterval = setInterval(tick,1000);
}
function completeCraving(){
  clearInterval(timerInterval); timerInterval=null;
  const count = Number(localStorage.getItem('cravingsBeaten')||0)+1;
  localStorage.setItem('cravingsBeaten',count);
  const log = getArray('cravingLog');
  log.push({date:new Date().toISOString(),intensity:Number($('#cravingRange').value),trigger:$('#triggerSelect').value,duration:timerTotal});
  localStorage.setItem('cravingLog',JSON.stringify(log));
  $('#timer').textContent='Gelukt';
  $('#cravingInstruction').textContent='Je hebt deze craving doorstaan.';
  $('#cravingSubtext').textContent='De piek is voorbij. Elke doorstane craving maakt de oude koppeling zwakker.';
  $('#finishCravingBtn').textContent='Terug naar vandaag';
  updateDashboard();
}
function resetCravingView(){
  clearInterval(timerInterval); timerInterval=null;
  $('#cravingSession').classList.add('hidden');
  $('#cravingStart').classList.remove('hidden');
  $('#timer').textContent='05:00';
}

$('#onboardingForm').addEventListener('submit',event=>{
  event.preventDefault();
  const quitDate = new Date($('#quitDate').value);
  if(Number.isNaN(quitDate.getTime())) return showToast('Kies een geldige stopdatum.');
  saveProfile({name:$('#name').value.trim(),cigsPerDay:Number($('#cigsPerDay').value),packPrice:Number($('#packPrice').value),packSize:Number($('#packSize').value),startYear:Number($('#startYear').value),quitDate:$('#quitDate').value,mainReason:$('#mainReason').value});
  location.reload();
});
$$('.nav-item[data-screen]').forEach(btn=>btn.addEventListener('click',()=>setScreen(btn.dataset.screen)));
$('#fullJourneyShortcut').addEventListener('click',()=>setScreen('body'));
$('#cravingShortcut').addEventListener('click',()=>setScreen('craving'));
$$('.filter-chip').forEach(btn=>btn.addEventListener('click',()=>{
  activeJourneyFilter=btn.dataset.filter;
  $$('.filter-chip').forEach(x=>x.classList.toggle('active',x===btn));
  const p=getProfile(); if(p) renderFullHealthJourney(elapsed(p).hours);
}));
$$('.organ-tab').forEach(btn=>btn.addEventListener('click',()=>renderOrgan(btn.dataset.organ)));

$('#cravingRange').addEventListener('input',event=>$('#cravingValue').textContent=event.target.value);
$('#startCravingBtn').addEventListener('click',()=>startCraving(300));
$('#quickCravingBtn').addEventListener('click',()=>startCraving(90));
$('#finishCravingBtn').addEventListener('click',()=>{
  if($('#timer').textContent==='Gelukt'){ resetCravingView(); setScreen('today'); }
  else completeCraving();
});
$('#cancelCravingBtn').addEventListener('click',()=>{ resetCravingView(); showToast('Sessie gestopt. Je kunt altijd opnieuw beginnen.'); });

['energy','mood','breathlessness'].forEach(id=>$('#'+id).addEventListener('input',event=>$('#'+id+'Out').textContent=event.target.value));
$('#saveCheckin').addEventListener('click',()=>{
  const entries=getArray('checkins');
  entries.push({date:new Date().toISOString(),energy:Number($('#energy').value),mood:Number($('#mood').value),breathlessness:Number($('#breathlessness').value)});
  localStorage.setItem('checkins',JSON.stringify(entries));
  renderCheckinHistory(); showToast('Check-in opgeslagen.');
});

$('#editGoalBtn').addEventListener('click',()=>{
  $('#goalNameInput').value=localStorage.getItem('goalName')||'Nieuwe hardloopschoenen';
  $('#goalTargetInput').value=localStorage.getItem('goalTarget')||180;
  openOverlay('goalModal');
});
$('#saveGoalBtn').addEventListener('click',()=>{
  const target=Math.max(1,Number($('#goalTargetInput').value));
  localStorage.setItem('goalName',$('#goalNameInput').value.trim()||'Mijn spaardoel');
  localStorage.setItem('goalTarget',String(target));
  closeOverlay('goalModal'); updateDashboard(); showToast('Spaardoel aangepast.');
});

function openProfile(){
  const p=getProfile(); if(!p)return;
  $('#editName').value=p.name; $('#editCigs').value=p.cigsPerDay; $('#editYear').value=p.startYear; $('#editPrice').value=p.packPrice; $('#editPack').value=p.packSize; $('#editQuitDate').value=p.quitDate;
  openOverlay('profileModal');
}
$('#profileBtn').addEventListener('click',openProfile);
$('#menuEditProfile').addEventListener('click',()=>{closeOverlay('moreMenu');openProfile();});
$('#saveProfileBtn').addEventListener('click',()=>{
  const p=getProfile();
  saveProfile({...p,name:$('#editName').value.trim()||p.name,cigsPerDay:Number($('#editCigs').value),startYear:Number($('#editYear').value),packPrice:Number($('#editPrice').value),packSize:Number($('#editPack').value),quitDate:$('#editQuitDate').value});
  closeOverlay('profileModal');
  $('#greeting').textContent=`Welkom terug, ${getProfile().name}`; $('#profileBtn').textContent=initials(getProfile().name); updateDashboard(); showToast('Profiel bijgewerkt.');
});

$('#logSlipBtn').addEventListener('click',()=>openOverlay('slipModal'));
$('#saveSlipBtn').addEventListener('click',()=>{
  const slips=getArray('slips'); slips.push({date:new Date().toISOString(),amount:Number($('#slipAmount').value),trigger:$('#slipTrigger').value}); localStorage.setItem('slips',JSON.stringify(slips));
  closeOverlay('slipModal'); updateDashboard(); showToast('Geregistreerd. Ga vanaf nu direct verder.');
});

$('#moreMenuBtn').addEventListener('click',()=>{$('#moreMenuBtn').setAttribute('aria-expanded','true');openOverlay('moreMenu');});
$('#menuSources').addEventListener('click',()=>{closeOverlay('moreMenu');setScreen('body');setTimeout(()=>$('.source-card').scrollIntoView({behavior:'smooth',block:'center'}),250);});
$('#menuReset').addEventListener('click',()=>{closeOverlay('moreMenu');if(confirm('Wil je alle lokale gegevens verwijderen en opnieuw beginnen?')){localStorage.clear();location.reload();}});
$$('[data-close]').forEach(btn=>btn.addEventListener('click',()=>closeOverlay(btn.dataset.close)));
document.addEventListener('keydown',event=>{if(event.key==='Escape')$$('.overlay:not(.hidden)').forEach(el=>closeOverlay(el.id));});

if('serviceWorker' in navigator){ window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{})); }
defaultQuitDate(); renderApp(); setInterval(updateDashboard,30000);
