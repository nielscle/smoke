const healthData = {
  brain: { icon:'🧠', title:'Hersenen & nicotine', intro:'Je brein past zich stap voor stap aan aan een leven zonder nicotine. Receptoren worden minder gevoelig en cravings nemen af.', timeline:[['1–3 dagen','Nicotine verdwijnt uit je lichaam. Prikkelbaarheid en concentratieproblemen kunnen tijdelijk pieken.'],['2–4 weken','Je brein begint minder sterk te reageren op vaste rookprikkels.'],['1–3 maanden','Cravings worden doorgaans minder vaak en minder intens.'],['6–12 maanden','Veel automatische rookgedachten verliezen hun kracht.']] },
  lungs: { icon:'🫁', title:'Longen & luchtwegen', intro:'Je luchtwegen herstellen geleidelijk. Slijmtransport en ademhaling kunnen verbeteren, al verschilt het tempo per persoon.', timeline:[['72 uur','De luchtwegen kunnen zich ontspannen, waardoor ademhalen makkelijker kan voelen.'],['2–12 weken','Longfunctie en doorbloeding verbeteren geleidelijk.'],['1–9 maanden','Trilhaartjes in de luchtwegen herstellen en voeren slijm beter af.'],['1 jaar+','De kans op luchtweginfecties en verdere schade neemt verder af.']] },
  heart: { icon:'❤️', title:'Hart & bloedvaten', intro:'Stoppen verlaagt de belasting op hart en bloedvaten. De winst begint vrijwel direct en loopt jarenlang door.', timeline:[['20 minuten','Hartslag en bloeddruk beginnen richting je normale niveau te bewegen.'],['24 uur','De belasting door koolmonoxide neemt sterk af.'],['2–12 weken','Doorbloeding en vaatfunctie verbeteren.'],['1 jaar','Het risico op hart- en vaatziekten is duidelijk lager dan bij doorroken.']] },
  blood: { icon:'🩸', title:'Bloed & zuurstof', intro:'Koolmonoxide uit tabaksrook bindt zich aan hemoglobine. Na stoppen krijgt zuurstoftransport snel meer ruimte.', timeline:[['8–12 uur','Koolmonoxide in het bloed daalt sterk.'],['24–48 uur','Zuurstoftransport is niet langer continu verstoord door nieuwe rook.'],['2–12 weken','Spieren en organen profiteren van een betere doorbloeding.'],['3 maanden+','Conditie en herstel kunnen merkbaar verbeteren.']] },
  skin: { icon:'✨', title:'Huid & uitstraling', intro:'Een betere doorbloeding ondersteunt huidcellen en wondherstel. Veroudering door rookblootstelling wordt niet verder versneld.', timeline:[['1–2 weken','Doorbloeding van de huid verbetert.'],['1–3 maanden','De huid kan minder grauw ogen en beter herstellen.'],['6 maanden','Wondgenezing en huidconditie kunnen verder verbeteren.'],['Lange termijn','Je voorkomt extra versnelde huidveroudering door tabaksrook.']] }
};

const dailyStories = [
  ['🩸','Je bloed vervoert meer zuurstof','Koolmonoxide uit rook wordt snel afgebroken. Hierdoor kan hemoglobine weer efficiënter zuurstof naar spieren en organen vervoeren.'],
  ['🧠','Je brein protesteert, maar herstelt','De eerste dagen zijn vaak het lastigst. Je brein mist nicotine, maar begint zich tegelijk aan te passen aan een nieuw evenwicht.'],
  ['🫁','Je luchtwegen krijgen rust','Zonder nieuwe rookblootstelling neemt voortdurende irritatie af. Hoesten kan tijdelijk toenemen doordat slijm beter wordt afgevoerd.'],
  ['❤️','Je hart hoeft minder hard te werken','Hartslag, bloeddruk en vaatspanning krijgen ruimte om te normaliseren. Dat verlaagt de dagelijkse belasting op je hart.'],
  ['👃','Smaak en reuk worden scherper','Zenuwuiteinden en slijmvliezen herstellen. Veel mensen merken dat eten en geuren intenser worden.'],
  ['🏃','Bewegen kan lichter gaan voelen','Door betere zuurstofbeschikbaarheid en doorbloeding kan inspanning geleidelijk prettiger aanvoelen.'],
  ['😴','Je energieniveau stabiliseert','Nicotinepieken en ontwenningsdalen vallen weg. Slaap kan eerst onrustig zijn, maar stabiliseert vaak daarna.']
];

const milestones = [
  {h:.33,label:'20 minuten',text:'Hartslag en bloeddruk beginnen te dalen.'},
  {h:8,label:'8 uur',text:'Koolmonoxide in je bloed is sterk afgenomen.'},
  {h:24,label:'24 uur',text:'Je lichaam heeft vrijwel alle koolmonoxide verwerkt.'},
  {h:48,label:'48 uur',text:'Nicotine is grotendeels uit je lichaam.'},
  {h:72,label:'72 uur',text:'Je luchtwegen kunnen zich ontspannen.'},
  {h:336,label:'2 weken',text:'Doorbloeding en conditie verbeteren geleidelijk.'},
  {h:2160,label:'3 maanden',text:'Longfunctie en herstel kunnen merkbaar beter zijn.'},
  {h:8760,label:'1 jaar',text:'Je risico op hart- en vaatziekten is sterk gedaald.'}
];

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
let timerInterval;

function defaultQuitDate(){ const d=new Date(); d.setMinutes(d.getMinutes()-d.getTimezoneOffset()); $('#quitDate').value=d.toISOString().slice(0,16); }
function getProfile(){ return JSON.parse(localStorage.getItem('reclaimProfile')||'null'); }
function saveProfile(p){ localStorage.setItem('reclaimProfile',JSON.stringify(p)); }
function elapsed(profile){ const ms=Math.max(0,Date.now()-new Date(profile.quitDate).getTime()); return {ms,hours:ms/36e5,days:ms/864e5}; }
function euro(v){ return new Intl.NumberFormat('nl-NL',{style:'currency',currency:'EUR',maximumFractionDigits:2}).format(v); }
function setScreen(id){ $$('.screen').forEach(s=>s.classList.toggle('active',s.id===id)); $$('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.screen===id)); window.scrollTo({top:0,behavior:'smooth'}); }

function renderApp(){
  const p=getProfile();
  if(!p){ $('#onboarding').classList.add('active'); $('#bottomNav').classList.add('hidden'); return; }
  $('#onboarding').classList.remove('active'); $('#today').classList.add('active'); $('#bottomNav').classList.remove('hidden');
  $('#greeting').textContent=`Welkom terug, ${p.name}`;
  updateDashboard(); renderOrgan('brain');
}

function updateDashboard(){
  const p=getProfile(); if(!p)return;
  const e=elapsed(p), wholeDays=Math.floor(e.days), hours=Math.floor(e.hours%24), mins=Math.floor((e.hours*60)%60);
  $('#smokeFreeTime').textContent= wholeDays>0 ? `${wholeDays} dagen, ${hours} uur` : `${Math.floor(e.hours)} uur, ${mins} min`;
  $('#streakDays').textContent=wholeDays; $('#progressDays').textContent=wholeDays; $('#currentStreak').textContent=`${wholeDays} d`;
  const notSmoked=Math.floor(e.days*p.cigsPerDay), money=notSmoked*(p.packPrice/p.packSize), lifeMins=notSmoked*11;
  $('#notSmoked').textContent=notSmoked.toLocaleString('nl-NL'); $('#moneySaved').textContent=euro(money); $('#lifeSaved').textContent=lifeMins<60?`${lifeMins} min`:`${Math.floor(lifeMins/60)} uur`;
  const next=milestones.find(m=>e.hours<m.h)||milestones[milestones.length-1];
  $('#nextMilestone').textContent=next.label; $('#nextMilestoneText').textContent=next.text;
  $('#overallProgress').style.width=`${Math.min(100,(e.hours/8760)*100)}%`;
  const story=dailyStories[wholeDays%dailyStories.length]; $('#dayTitle').textContent=`Dag ${wholeDays+1}`;
  $('#dailyStory').innerHTML=`<div class="story-icon">${story[0]}</div><span class="eyebrow">HERSTEL VAN VANDAAG</span><h3>${story[1]}</h3><p>${story[2]}</p>`;
  $('#goalSaved').textContent=euro(money); const target=Number(localStorage.getItem('goalTarget')||180); $('#goalTarget').textContent=euro(target); $('#goalName').textContent=localStorage.getItem('goalName')||'Nieuwe hardloopschoenen'; $('#goalProgress').style.width=`${Math.min(100,money/target*100)}%`;
  renderHealthBars(e.days); $('#cravingsBeaten').textContent=localStorage.getItem('cravingsBeaten')||0;
}

function renderHealthBars(days){
  const items=[['Bloed & zuurstof',Math.min(100,days/2*100)],['Hart & vaten',Math.min(100,18+days/365*82)],['Longen',Math.min(100,8+days/270*92)],['Hersenen',Math.min(100,days/90*100)],['Huid',Math.min(100,days/180*100)]];
  $('#healthBars').innerHTML=items.map(([n,v])=>`<div class="health-row"><span>${n}</span><div class="bar"><i style="width:${v}%"></i></div><strong>${Math.round(v)}%</strong></div>`).join('');
}
function renderOrgan(key){ const d=healthData[key]; $('#organPanel').innerHTML=`<div class="story-icon">${d.icon}</div><span class="eyebrow">HERSTELGEBIED</span><h3>${d.title}</h3><p>${d.intro}</p>${d.timeline.map(t=>`<div class="timeline-item"><strong>${t[0]}</strong><span>${t[1]}</span></div>`).join('')}`; $$('.organ-dot').forEach(x=>x.classList.toggle('active',x.dataset.organ===key)); }

$('#onboardingForm').addEventListener('submit',e=>{e.preventDefault(); saveProfile({name:$('#name').value.trim(),cigsPerDay:+$('#cigsPerDay').value,packPrice:+$('#packPrice').value,packSize:+$('#packSize').value,startYear:+$('#startYear').value,quitDate:$('#quitDate').value,mainReason:$('#mainReason').value}); location.reload();});
$$('.nav-item').forEach(b=>b.addEventListener('click',()=>setScreen(b.dataset.screen)));
$('#cravingShortcut').addEventListener('click',()=>setScreen('craving'));
$$('.organ-dot').forEach(b=>b.addEventListener('click',()=>renderOrgan(b.dataset.organ)));
$('#cravingRange').addEventListener('input',e=>$('#cravingValue').textContent=e.target.value);

$('#startCravingBtn').addEventListener('click',()=>{
  $('#cravingStart').classList.add('hidden'); $('#cravingSession').classList.remove('hidden');
  let seconds=300; const instructions=[['Adem rustig in door je neus.','Vier seconden in, zes seconden uit.'],['Drink langzaam een glas water.','Neem kleine slokken en richt je aandacht op de sensatie.'],['Verplaats jezelf.','Sta op en loop twee minuten naar een andere plek.'],['Herinner jezelf aan je reden.','Je hoeft alleen deze paar minuten niet te roken.']];
  timerInterval=setInterval(()=>{ seconds--; const m=String(Math.floor(seconds/60)).padStart(2,'0'),s=String(seconds%60).padStart(2,'0'); $('#timer').textContent=`${m}:${s}`; const phase=Math.min(3,Math.floor((300-seconds)/75)); $('#cravingInstruction').textContent=instructions[phase][0]; $('#cravingSubtext').textContent=instructions[phase][1]; if(seconds<=0)finishCraving(); },1000);
});
function finishCraving(){ clearInterval(timerInterval); const n=+(localStorage.getItem('cravingsBeaten')||0)+1; localStorage.setItem('cravingsBeaten',n); $('#timer').textContent='Gelukt'; $('#cravingInstruction').textContent='Je hebt de craving doorstaan.'; $('#cravingSubtext').textContent='De piek is voorbij. Elke keer dat je dit doet, verzwak je de oude gewoonte.'; $('#finishCravingBtn').textContent='Terug naar vandaag'; updateDashboard(); }
$('#finishCravingBtn').addEventListener('click',()=>{ if($('#timer').textContent!=='Gelukt') finishCraving(); else { $('#cravingSession').classList.add('hidden'); $('#cravingStart').classList.remove('hidden'); $('#timer').textContent='05:00'; $('#finishCravingBtn').textContent='Ik voel me rustiger'; setScreen('today'); }});

$('#editGoalBtn').addEventListener('click',()=>{ $('#goalNameInput').value=localStorage.getItem('goalName')||'Nieuwe hardloopschoenen'; $('#goalTargetInput').value=localStorage.getItem('goalTarget')||180; $('#modal').classList.remove('hidden'); });
$('#closeModal').addEventListener('click',()=>$('#modal').classList.add('hidden'));
$('#saveGoalBtn').addEventListener('click',()=>{ localStorage.setItem('goalName',$('#goalNameInput').value); localStorage.setItem('goalTarget',$('#goalTargetInput').value); $('#modal').classList.add('hidden'); updateDashboard(); });
$('#saveCheckin').addEventListener('click',()=>{ const entries=JSON.parse(localStorage.getItem('checkins')||'[]'); entries.push({date:new Date().toISOString(),energy:+$('#energy').value,mood:+$('#mood').value,breathlessness:+$('#breathlessness').value}); localStorage.setItem('checkins',JSON.stringify(entries)); $('#saveCheckin').textContent='Opgeslagen ✓'; setTimeout(()=>$('#saveCheckin').textContent='Check-in opslaan',1600); });
$('#resetBtn').addEventListener('click',()=>{ if(confirm('Wil je alle lokale gegevens verwijderen en opnieuw beginnen?')){ localStorage.clear(); location.reload(); }});

defaultQuitDate(); renderApp(); setInterval(updateDashboard,60000);
