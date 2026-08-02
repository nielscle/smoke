'use strict';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const healthData = {
  brain: { icon:'🧠', title:'Hersenen en nicotine', intro:'Je brein past zich aan een leven zonder nicotine aan. Ontwenningsklachten kunnen eerst pieken, terwijl vaste rookprikkels daarna geleidelijk minder krachtig worden.', timeline:[['1–3 dagen','Nicotine verdwijnt uit je lichaam. Onrust en concentratieproblemen kunnen tijdelijk sterker zijn.'],['2–4 weken','Vaste situaties roepen vaak minder automatisch een rookreactie op.'],['1–3 maanden','Cravings worden doorgaans minder frequent en minder intens.'],['6–12 maanden','Veel automatische rookgedachten verliezen verder hun kracht.']] },
  lungs: { icon:'🫁', title:'Longen en luchtwegen', intro:'Zonder nieuwe rookblootstelling krijgen je luchtwegen rust. Hoesten kan tijdelijk toenemen wanneer slijm beter wordt afgevoerd.', timeline:[['Na enkele dagen','De luchtwegen kunnen zich ontspannen, waardoor ademhalen makkelijker kan voelen.'],['1–12 maanden','Hoesten en kortademigheid nemen bij veel mensen af.'],['Maanden','Trilhaartjes in de luchtwegen herstellen en voeren slijm beter af.'],['Lange termijn','De kans op verdere rookschade en luchtweginfecties neemt af.']] },
  heart: { icon:'❤️', title:'Hart en bloedvaten', intro:'Stoppen verlaagt de belasting door nicotine en koolmonoxide. De winst begint snel en loopt jarenlang door.', timeline:[['20 minuten','Je hartslag begint te dalen.'],['Enkele dagen','Koolmonoxide in het bloed daalt richting het niveau van iemand die niet rookt.'],['1–2 jaar','Het risico op een hartaanval daalt sterk.'],['15 jaar','Het risico op coronaire hartziekte komt in de buurt van dat van een niet-roker.']] },
  blood: { icon:'🩸', title:'Bloed en zuurstof', intro:'Koolmonoxide uit tabaksrook bindt zich aan hemoglobine. Na stoppen ontstaat snel meer ruimte voor normaal zuurstoftransport.', timeline:[['Uren tot dagen','Het koolmonoxideniveau daalt sterk.'],['Enkele dagen','Het niveau kan weer vergelijkbaar zijn met dat van een niet-roker.'],['Weken tot maanden','Doorbloeding en inspanning kunnen geleidelijk verbeteren.'],['Lange termijn','Hart en bloedvaten blijven profiteren van de afwezigheid van rook.']] },
  skin: { icon:'✨', title:'Huid en herstel', intro:'Een betere doorbloeding ondersteunt huidcellen en wondgenezing. Verdere versnelde huidveroudering door tabaksrook wordt voorkomen.', timeline:[['Weken','De doorbloeding van huid en weefsels kan verbeteren.'],['Maanden','Huidconditie en wondherstel kunnen verder verbeteren.'],['Lange termijn','Je voorkomt extra blootstelling aan stoffen die huidveroudering versnellen.']] },
  senses: { icon:'👃', title:'Reuk en smaak', intro:'Rook irriteert slijmvliezen en dempt geur- en smaakbeleving. Zonder nieuwe rookblootstelling krijgen deze zintuigen herstelruimte.', timeline:[['2–3 dagen','Veel mensen merken dat geuren en smaken sterker worden.'],['2–4 weken','Eten kan voller en duidelijker smaken.'],['Maanden','De zintuigen blijven profiteren van minder irritatie.']] },
  fitness: { icon:'🏃', title:'Conditie en beweging', intro:'Zonder voortdurende rookbelasting kunnen zuurstoftransport, doorbloeding en ademhaling geleidelijk efficiënter aanvoelen.', timeline:[['2–12 weken','Wandelen, fietsen of traplopen kan makkelijker worden.'],['3–9 maanden','Hoesten en kortademigheid nemen bij veel mensen af.'],['Lange termijn','Regelmatig bewegen versterkt de gezondheidswinst van stoppen.']] },
  sleep: { icon:'😴', title:'Slaap en energie', intro:'Nicotine is stimulerend en kan slaap verstoren. In de eerste fase kan ontwennen juist tijdelijk onrust geven.', timeline:[['Eerste week','Slaap kan tijdelijk onrustiger zijn door ontwenningsklachten.'],['2–6 weken','Een stabieler ritme kan ontstaan wanneer nicotineprikkels wegblijven.'],['Maanden','Meer regelmaat en beweging kunnen energie en slaap verder ondersteunen.']] },
  mouth: { icon:'😁', title:'Mond en tandvlees', intro:'Stoppen voorkomt nieuwe blootstelling aan rook die tanden, slijmvliezen en tandvlees belast.', timeline:[['Dagen tot weken','Adem en smaakbeleving kunnen verbeteren.'],['Maanden','Tandvlees en mondweefsel profiteren van betere doorbloeding.'],['Lange termijn','Het risico op mond- en keelaandoeningen neemt af ten opzichte van doorroken.']] },
  immunity: { icon:'🛡️', title:'Afweer en herstel', intro:'Rook veroorzaakt irritatie en ontstekingsreacties. Stoppen geeft afweer en weefselherstel meer ruimte.', timeline:[['Weken','De voortdurende blootstelling aan rookstoffen is gestopt.'],['Maanden','Luchtwegen kunnen slijm en vuil beter afvoeren.'],['Lange termijn','De kans op verdere rookgerelateerde schade blijft dalen.']] }
};

const milestones = [
  {h:0.33,time:'20 minuten',category:'heart',icon:'❤️',title:'Je hartslag begint te dalen',text:'De directe nicotinebelasting neemt af. Je hartslag begint terug te bewegen richting je persoonlijke uitgangsniveau.'},
  {h:8,time:'8 uur',category:'blood',icon:'🩸',title:'Koolmonoxide in je bloed daalt',text:'Doordat je geen nieuwe rook inademt, neemt de hoeveelheid koolmonoxide in je bloed geleidelijk af.'},
  {h:12,time:'12 uur',category:'blood',icon:'🌬️',title:'Zuurstof krijgt meer ruimte',text:'Minder koolmonoxide betekent dat hemoglobine weer meer zuurstof kan vervoeren.'},
  {h:24,time:'1 dag',category:'brain',icon:'🧠',title:'Nicotine in je bloed daalt naar nul',text:'Na ongeveer een dag is nicotine niet meer aantoonbaar in het bloed. Ontwenningsklachten kunnen nu juist duidelijk voelbaar zijn.'},
  {h:48,time:'2 dagen',category:'senses',icon:'👃',title:'Reuk en smaak krijgen herstelruimte',text:'Zonder nieuwe rookblootstelling kunnen geuren en smaken geleidelijk sterker worden.'},
  {h:72,time:'3 dagen',category:'lungs',icon:'🫁',title:'Je luchtwegen krijgen rust',text:'De voortdurende prikkeling door rook stopt. Hoesten kan tijdelijk veranderen wanneer slijm wordt afgevoerd.'},
  {h:96,time:'4 dagen',category:'brain',icon:'⚡',title:'Je doorstaat de vroege ontwenningsfase',text:'Voor veel mensen ligt de lichamelijke piek in de eerste dagen. Elke rookvrije dag maakt ruimte voor nieuwe gewoontes.'},
  {h:120,time:'5 dagen',category:'sleep',icon:'😴',title:'Je lichaam zoekt een nieuw ritme',text:'Slaap, concentratie en stemming kunnen nog schommelen terwijl je lichaam zich zonder nicotine herstelt.'},
  {h:144,time:'6 dagen',category:'fitness',icon:'🚶',title:'Bewegen zonder nieuwe rookbelasting',text:'Je hart, bloed en longen worden al bijna een week niet meer door nieuwe tabaksrook belast.'},
  {h:168,time:'1 week',category:'brain',icon:'🏅',title:'Je eerste rookvrije week',text:'Je hebt meerdere vaste rookmomenten zonder sigaret doorstaan. Dat is zowel lichamelijk als gedragsmatig een belangrijke stap.'},
  {h:192,time:'8 dagen',category:'mouth',icon:'😁',title:'Je mond blijft rookvrij herstellen',text:'Je adem, smaakbeleving en mondweefsel krijgen geen nieuwe blootstelling aan tabaksrook.'},
  {h:216,time:'9 dagen',category:'immunity',icon:'🛡️',title:'Minder dagelijkse irritatie',text:'Je luchtwegen en slijmvliezen zijn al meer dan een week niet meer aan rook blootgesteld.'},
  {h:240,time:'10 dagen',category:'fitness',icon:'🏃',title:'Je bouwt rookvrije conditie op',text:'Elke wandeling, training of trap zonder sigaret ondersteunt je nieuwe rookvrije basis.'},
  {h:264,time:'11 dagen',category:'skin',icon:'✨',title:'Je huid krijgt betere omstandigheden',text:'Geen nieuwe rook betekent minder blootstelling aan stoffen die doorbloeding en huidveroudering negatief beïnvloeden.'},
  {h:288,time:'12 dagen',category:'brain',icon:'🔁',title:'Nieuwe routines worden sterker',text:'Je hebt al veel dagelijkse triggers zonder sigaret meegemaakt. Herhaling helpt de automatische koppeling met roken verzwakken.'},
  {h:312,time:'13 dagen',category:'senses',icon:'🍽️',title:'Je zintuigen blijven zich aanpassen',text:'Geur en smaak kunnen duidelijker aanvoelen doordat rook je slijmvliezen niet meer dagelijks irriteert.'},
  {h:336,time:'2 weken',category:'heart',icon:'❤️',title:'Twee weken zonder rookbelasting',text:'Je bloedsomloop profiteert verder en bewegen kan geleidelijk prettiger gaan voelen.'},
  {h:504,time:'3 weken',category:'brain',icon:'🧠',title:'Cravings worden vaak voorspelbaarder',text:'Veel trek komt nu vooral door situaties, emoties en gewoontes. Dat maakt het makkelijker om een gerichte strategie te kiezen.'},
  {h:672,time:'4 weken',category:'lungs',icon:'🌬️',title:'Bijna een maand herstel',text:'Je luchtwegen hebben wekenlang geen nieuwe rook hoeven verwerken. De precieze verandering verschilt per persoon.'},
  {h:840,time:'5 weken',category:'fitness',icon:'🏃',title:'Inspanning kan makkelijker voelen',text:'Doorbloeding en ademhaling kunnen geleidelijk verbeteren, vooral wanneer je regelmatig beweegt.'},
  {h:1008,time:'6 weken',category:'sleep',icon:'😴',title:'Je ritme kan stabieler worden',text:'Het lichaam hoeft niet meer te reageren op dagelijkse nicotinepieken en dalen.'},
  {h:1176,time:'7 weken',category:'mouth',icon:'😁',title:'Zeven weken rookvrije mondzorg',text:'Tanden, tandvlees en mondslijmvlies blijven gevrijwaard van nieuwe tabaksrook.'},
  {h:1344,time:'8 weken',category:'heart',icon:'🫀',title:'Je circulatie blijft profiteren',text:'De afwezigheid van nicotine en koolmonoxide verlaagt de voortdurende belasting op hart en bloedvaten.'},
  {h:1512,time:'9 weken',category:'immunity',icon:'🛡️',title:'Je herstelmechanismen krijgen ruimte',text:'Zonder dagelijkse rookirritatie kunnen slijmvliezen en luchtwegen zich beter richten op normaal onderhoud.'},
  {h:1680,time:'10 weken',category:'brain',icon:'🎯',title:'Je rookvrije identiteit groeit',text:'Tien weken herhaling helpt om oude rookmomenten te vervangen door nieuwe automatische keuzes.'},
  {h:1848,time:'11 weken',category:'skin',icon:'✨',title:'Minder versnelde huidveroudering',text:'Je voorkomt verdere dagelijkse blootstelling aan rookstoffen die huid en bindweefsel belasten.'},
  {h:2016,time:'12 weken',category:'fitness',icon:'💪',title:'Drie maanden komen in zicht',text:'Veel mensen merken in deze periode meer vertrouwen in bewegen en in hun vermogen om rookvrij te blijven.'},
  {h:2160,time:'3 maanden',category:'heart',icon:'🏃',title:'Doorbloeding en inspanning kunnen verbeteren',text:'Bewegen kan geleidelijk makkelijker voelen doordat je lichaam niet meer voortdurend wordt belast door tabaksrook.'},
  {h:2880,time:'4 maanden',category:'lungs',icon:'🫁',title:'Je luchtwegen blijven herstellen',text:'Hoesten en kortademigheid kunnen verder afnemen. Het tempo verschilt per persoon en rookverleden.'},
  {h:3600,time:'5 maanden',category:'brain',icon:'🧠',title:'Veel triggers verliezen kracht',text:'Je hebt seizoenen, sociale momenten en stresssituaties steeds vaker zonder sigaret meegemaakt.'},
  {h:4320,time:'6 maanden',category:'immunity',icon:'🛡️',title:'Een half jaar rookvrij',text:'Je lichaam is zes maanden vrij van nieuwe tabaksrook. Luchtwegen en afweer profiteren van die blijvende afwezigheid.'},
  {h:5040,time:'7 maanden',category:'fitness',icon:'🚴',title:'Je basisconditie kan verder groeien',text:'Regelmatige beweging kan nu merkbaar beter aansluiten bij je rookvrije herstel.'},
  {h:5760,time:'8 maanden',category:'mouth',icon:'😁',title:'Mond en adem blijven profiteren',text:'Je voorkomt verdere rookverkleuring en irritatie van mond en keel.'},
  {h:6480,time:'9 maanden',category:'lungs',icon:'🌬️',title:'Hoesten kan duidelijk minder zijn',text:'Bij veel mensen nemen hoesten en kortademigheid binnen één tot twaalf maanden af.'},
  {h:7200,time:'10 maanden',category:'skin',icon:'✨',title:'Tien maanden zonder nieuwe rookschade',text:'Doorbloeding en weefselherstel blijven profiteren van het uitblijven van tabaksrook.'},
  {h:7920,time:'11 maanden',category:'brain',icon:'🏅',title:'Bijna een volledig jaar',text:'Je hebt vrijwel alle terugkerende momenten van een jaar minstens één keer rookvrij doorlopen.'},
  {h:8760,time:'1 jaar',category:'heart',icon:'❤️',title:'Een volledig jaar rookvrij',text:'Je cardiovasculaire risico is duidelijk lager dan wanneer je was blijven roken. Hoesten en kortademigheid zijn bij veel mensen afgenomen.'},
  {h:17520,time:'2 jaar',category:'risk',icon:'🫀',title:'Risico op een hartaanval daalt sterk',text:'Binnen één tot twee jaar neemt het risico op een hartaanval sterk af ten opzichte van doorroken.'},
  {h:26280,time:'3 jaar',category:'risk',icon:'❤️',title:'Je hart blijft langdurig profiteren',text:'Het extra risico op coronaire hartziekte daalt verder naarmate je langer rookvrij blijft.'},
  {h:35040,time:'4 jaar',category:'risk',icon:'🩸',title:'Vier jaar minder vaatbelasting',text:'Bloedvaten worden niet meer dagelijks blootgesteld aan nicotine, koolmonoxide en andere rookstoffen.'},
  {h:43800,time:'5 jaar',category:'risk',icon:'🧠',title:'Risico op een beroerte blijft dalen',text:'Het cardiovasculaire risico blijft afnemen. Andere persoonlijke risicofactoren blijven daarbij ook belangrijk.'},
  {h:52560,time:'6 jaar',category:'risk',icon:'🛡️',title:'Zes jaar opgebouwde gezondheidswinst',text:'De winst ten opzichte van doorroken groeit verder doordat nieuwe rookschade uitblijft.'},
  {h:61320,time:'7 jaar',category:'risk',icon:'🫁',title:'Je longen blijven beschermd tegen nieuwe rook',text:'Bestaande schade herstelt niet altijd volledig, maar je voorkomt wel zeven jaar extra rookblootstelling.'},
  {h:70080,time:'8 jaar',category:'risk',icon:'❤️',title:'Langdurige winst voor hart en vaten',text:'Je cardiovasculaire risico beweegt verder richting dat van iemand die niet rookt.'},
  {h:78840,time:'9 jaar',category:'risk',icon:'🏅',title:'Negen jaar rookvrij',text:'Je hebt duizenden rookmomenten vervangen door een leven zonder tabaksrook.'},
  {h:87600,time:'10 jaar',category:'risk',icon:'🫁',title:'Meerdere kankerrisico’s zijn duidelijk lager',text:'Na langdurig stoppen dalen onder andere risico’s op kanker van longen, blaas, slokdarm en nieren.'},
  {h:96360,time:'11 jaar',category:'risk',icon:'🧬',title:'De langetermijnwinst loopt door',text:'Ook na tien jaar blijven verschillende rookgerelateerde risico’s verder afnemen.'},
  {h:105120,time:'12 jaar',category:'risk',icon:'🫀',title:'Twaalf jaar cardiovasculair herstel',text:'Je hart en bloedvaten hebben meer dan een decennium geen nieuwe rookbelasting gekregen.'},
  {h:113880,time:'13 jaar',category:'risk',icon:'🛡️',title:'Dertien jaar zonder nieuwe tabaksschade',text:'De cumulatieve gezondheidswinst wordt groter naarmate de rookvrije periode langer duurt.'},
  {h:122640,time:'14 jaar',category:'risk',icon:'❤️',title:'Je nadert een belangrijke langetermijngrens',text:'Het risico op coronaire hartziekte komt steeds dichter in de buurt van dat van iemand die niet rookt.'},
  {h:131400,time:'15 jaar',category:'risk',icon:'🏆',title:'Risico op coronaire hartziekte nadert dat van een niet-roker',text:'Na vijftien jaar komt het risico op coronaire hartziekte dicht in de buurt van dat van iemand die niet rookt.'}
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
  if(id==='finance') renderFinance();
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
    ['Hart',milestones.filter(m=>m.category==='heart')],['Longen',milestones.filter(m=>m.category==='lungs')],['Brein',milestones.filter(m=>m.category==='brain')],['Bloed',milestones.filter(m=>m.category==='blood')],['Zintuigen',milestones.filter(m=>m.category==='senses')],['Conditie',milestones.filter(m=>m.category==='fitness')],['Slaap',milestones.filter(m=>m.category==='sleep')],['Mond',milestones.filter(m=>m.category==='mouth')],['Huid',milestones.filter(m=>m.category==='skin')],['Afweer',milestones.filter(m=>m.category==='immunity')],['Langetermijnrisico',milestones.filter(m=>m.category==='risk')]
  ];
  $('#healthBars').innerHTML = categories.map(([name,list])=>{
    const achieved = list.filter(m=>hours>=m.h).length;
    const pct = list.length ? achieved/list.length*100 : 0;
    return `<div class="health-row"><span>${name}</span><div class="bar"><i style="width:${pct}%"></i></div><strong>${achieved}/${list.length}</strong></div>`;
  }).join('');
}


function investmentProjection(weeklyContribution, annualRate, weeks){
  const rate = Math.max(0, annualRate) / 100 / 52;
  const contribution = Math.max(0, weeklyContribution);
  const periods = Math.max(0, weeks);
  const invested = contribution * periods;
  const value = rate === 0 ? invested : contribution * ((Math.pow(1 + rate, periods) - 1) / rate);
  return { invested, value, profit: Math.max(0, value - invested) };
}

function compactEuro(value){
  if(value >= 1000000) return `€${(value/1000000).toFixed(1).replace('.',',')} mln`;
  if(value >= 1000) return `€${Math.round(value/1000)}k`;
  return euro(value);
}

function renderFinance(){
  const profile = getProfile(); if(!profile) return;
  const rate = Number($('#returnRate').value || 0);
  const extraMonthly = Math.max(0, Number($('#extraMonthly').value || 0));
  const packsWeek = profile.cigsPerDay * 7 / profile.packSize;
  const cigaretteWeekly = packsWeek * profile.packPrice;
  const weeklyContribution = cigaretteWeekly + extraMonthly * 12 / 52;
  const elapsedWeeks = elapsed(profile).days / 7;
  const current = investmentProjection(weeklyContribution, rate, elapsedWeeks);

  $('#weeklyInvestment').textContent = euro(weeklyContribution);
  $('#packsPerWeek').textContent = packsWeek.toFixed(1).replace('.',',');
  $('#financePackPrice').textContent = euro(profile.packPrice);
  $('#investedSinceQuit').textContent = euro(current.invested);
  $('#valueSinceQuit').textContent = euro(current.value);
  $('#returnOut').textContent = `${rate.toFixed(1).replace('.',',')}%`;
  $('#chartScenario').textContent = `${rate.toFixed(1).replace('.',',')}% per jaar`;

  const horizons = [
    ['1 week',1],['1 maand',4.345],['3 maanden',13.035],['6 maanden',26.07],
    ['1 jaar',52],['3 jaar',156],['5 jaar',260],['10 jaar',520],['15 jaar',780],['20 jaar',1040]
  ];
  const projections = horizons.map(([label,weeks])=>({label,weeks,...investmentProjection(weeklyContribution,rate,weeks)}));
  $('#investmentTimeline').innerHTML = projections.map(item=>`<article class="investment-card"><div class="investment-period">${item.label}</div><div class="investment-details"><span>Geschatte waarde</span><strong>${euro(item.value)}</strong><span>Eigen inleg ${euro(item.invested)}</span></div><div class="investment-profit"><span>Mogelijke groei</span><strong>+ ${euro(item.profit)}</strong></div></article>`).join('');

  const chartItems = projections.filter(x=>['1 jaar','3 jaar','5 jaar','10 jaar','15 jaar','20 jaar'].includes(x.label));
  const maxValue = Math.max(...chartItems.map(x=>x.value),1);
  $('#financeChart').innerHTML = chartItems.map(item=>{
    const totalHeight = Math.max(5,item.value/maxValue*150);
    const contributionHeight = item.value ? totalHeight * item.invested/item.value : 0;
    const growthHeight = Math.max(0,totalHeight-contributionHeight);
    return `<div class="finance-bar-wrap"><span class="finance-bar-value" style="bottom:${totalHeight+5}px">${compactEuro(item.value)}</span><div class="finance-bar" style="height:${totalHeight}px"><i class="contribution" style="height:${contributionHeight}px"></i><i class="growth" style="height:${growthHeight}px"></i></div><span class="finance-bar-label">${item.label.replace(' jaar',' jr')}</span></div>`;
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
$('#financeShortcut').addEventListener('click',()=>setScreen('finance'));
$$('.scenario-btn').forEach(btn=>btn.addEventListener('click',()=>{
  $('#returnRate').value=btn.dataset.return;
  $$('.scenario-btn').forEach(x=>x.classList.toggle('active',x===btn));
  renderFinance();
}));
$('#returnRate').addEventListener('input',()=>{
  const value=Number($('#returnRate').value);
  $$('.scenario-btn').forEach(x=>x.classList.toggle('active',Number(x.dataset.return)===value));
  renderFinance();
});
$('#extraMonthly').addEventListener('input',renderFinance);
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
