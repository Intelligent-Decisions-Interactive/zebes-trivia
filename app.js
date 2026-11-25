"use strict";

const paths = {
  radio: '<circle cx="12" cy="12" r="2"/><path d="M8.5 7a6 6 0 0 0 0 10m7-10a6 6 0 0 1 0 10M5.5 4a10 10 0 0 0 0 16m13-16a10 10 0 0 1 0 16"/>',
  library: '<path d="M3 5h4v15H3zM10 5h4v15h-4zM17 5l3-1 3 15-3 1z"/>',
  expand: '<path d="M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5"/>',
  contract: '<path d="M4 9h5V4m6 0v5h5M4 15h5v5m6 0v-5h5"/>',
  sliders: '<path d="M3 7h6m4 0h8M3 17h10m4 0h4"/><circle cx="11" cy="7" r="2"/><circle cx="15" cy="17" r="2"/>',
  timer: '<circle cx="12" cy="14" r="8"/><path d="M9 2h6m-3 0v4m6 1 2-2m-8 5v5"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  skip: '<path d="m5 5 10 7-10 7z" fill="currentColor" stroke="none"/><path d="M18 5v14"/>',
  play: '<path d="m6 4 13 8-13 8z" fill="currentColor" stroke="none"/>',
  pause: '<path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="currentColor" stroke="none"/>',
  repeat: '<path d="m16 2 3 3-3 3M4 11V9a4 4 0 0 1 4-4h11M8 22l-3-3 3-3m12-3v2a4 4 0 0 1-4 4H5"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5zm-9 9 9 5 9-5m-18 5 9 5 9-5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  bolt: '<path d="m13 2-9 12h7l-1 8 10-13h-8z"/>',
  creature: '<path d="M4 14a8 8 0 0 1 16 0v2H4zm2 2 2 4 2-4m4 0 2 4 2-4"/><circle cx="10" cy="12" r="1"/><circle cx="15" cy="12" r="1"/>',
  gamepad: '<path d="M6 6h12c3 0 6 12 2 12-2 0-3-3-5-3H9c-2 0-3 3-5 3-4 0-1-12 2-12Z"/><path d="M7 9v4m-2-2h4m7-1h.01m2 2h.01"/>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/>',
  check: '<path d="m4 12 5 5L20 6"/>',
  search: '<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>'
};
const categories = {
  "World & lore": {icon:"globe", image:"planet", ink:"#8cd7cb", tint:"#162a25"},
  "Items & abilities": {icon:"bolt", image:"orb", ink:"#efba78", tint:"#2c231a"},
  "Creatures": {icon:"creature", image:"metroid", ink:"#c4a5ef", tint:"#251e2f"},
  "Game systems": {icon:"gamepad", image:"pad", ink:"#92bddf", tint:"#1a2530"},
  "Boss mechanics": {icon:"creature", image:"metroid", ink:"#eda2ad", tint:"#302027"},
  "Speedrun tech": {icon:"bolt", image:"orb", ink:"#b4ed89", tint:"#202c1b"},
  "Routes & rules": {icon:"timer", image:"planet", ink:"#85d7ec", tint:"#182b32"},
  "Runners & races": {icon:"radio", image:"pad", ink:"#e7c78d", tint:"#30291d"},
  "Development": {icon:"gamepad", image:"pad", ink:"#a9b7f5", tint:"#1e2332"},
  "Randomizers": {icon:"layers", image:"planet", ink:"#efb7df", tint:"#2b202d"}
};
const sourceNames = {
  "wiki.supermetroid.run": "Super Metroid speedrunning wiki",
  "speeddemosarchive.com": "Runner’s notes · Speed Demos Archive",
  "tracker.gamesdonequick.com": "Games Done Quick event archive",
  "tasvideos.org": "Author’s notes · TASVideos",
  "www.nintendo.co.jp": "Nintendo",
  "www.nintendo.com": "Nintendo",
  "www.youtube.com": "Run recording",
  "www.metroid2002.com": "Metroid 2002",
  "www.dashrando.net": "DASH Randomizer",
  "github.com": "Project source",
  "maprando.com": "Super Metroid Map Rando",
  "smpractice.speedga.me": "Super Metroid Practice Hack"
};
const $ = id => document.getElementById(id);
const pad = n => String(n).padStart(2, "0");
const letters = ["A","B","C","D"];
const icon = name => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+paths[name]+'</svg>';
const glyph = name => '<i data-icon="'+name+'">'+icon(name)+'</i>';
document.querySelectorAll("i[data-icon]").forEach(el => el.innerHTML=icon(el.dataset.icon));

function stored(key) {
  try { return localStorage.getItem("zebes."+key); } catch { return null; }
}
function save(key,value) {
  try { localStorage.setItem("zebes."+key,String(value)); } catch { /* Playback works without storage. */ }
}
let questionTime = [15,30,45,60].includes(Number(stored("seconds"))) ? Number(stored("seconds")) : 30;
let loop = stored("loop") !== "false";
let position = 0;
let phase = "question";
let playing = true;
let offAir = false;
let guess = null;
let remaining = questionTime * 1000;
let deadline = performance.now() + remaining;
let stream = location.pathname.toLowerCase().endsWith("/stream.html") || new URLSearchParams(location.search).get("view")==="stream";
const sourceChannel=twitchLogin(new URLSearchParams(location.search).get("channel"));
const rotationKey = (stream ? "brbRotation.v1" : "consoleRotation.v1") + (sourceChannel ? "."+sourceChannel : "");
let rotation;
let drawing = false;
const revealTime = 8000;
$("duration").value = String(questionTime);
$("q-total").textContent = deck.length;

function setTime(ms) {
  remaining = ms;
  deadline = performance.now() + ms;
}
function renderTime() {
  const now = playing && !offAir ? Math.max(0,deadline - performance.now()) : remaining;
  const max = phase === "question" ? questionTime*1000 : revealTime;
  $("time").textContent = phase === "finished" ? deck.length+" / "+deck.length : Math.ceil(now / 1000)+"s";
  $("timer-bar").style.transform = "scaleX("+ Math.max(0,Math.min(1,now/max)) +")";
  $("timer-label").textContent = phase === "finished" ? "Feed complete" : phase === "answer" ? "Next question in" : "Answer reveal in";
}
function renderControls() {
  const action = phase === "finished" ? "Restart feed" : playing ? "Pause feed" : "Resume feed";
  $("pause").innerHTML = glyph(playing ? "pause" : "play")+action;
  $("live-label").textContent = phase === "finished" ? "TRANSMISSION COMPLETE" : playing ? "LIVE TRANSMISSION" : "TRANSMISSION PAUSED";
  $("footer-state").textContent = phase === "finished" ? "Feed complete" : playing ? "Feed online" : "Feed paused";
  document.body.classList.toggle("paused",!playing);
  $("loop").setAttribute("aria-checked",String(loop));
  $("reveal").disabled = phase!=="question";
  $("reveal").querySelector("span").textContent = phase==="question" ? "Reveal answer" : "Answer revealed";
  $("next").disabled = phase === "finished";
}
function renderChoices() {
  const q=deck[position];
  const revealed=phase!=="question";
  $("explanation").hidden=!revealed;
  $("choices").classList.toggle("revealed",revealed);
  $("answer-note").textContent=revealed ? q.explanation : "";
  if(revealed) {
    const source=$("answer-source");
    source.href=q.source;
    const host=new URL(q.source).hostname;
    source.textContent=sourceNames[host] || host.replace(/^www\./,"");
  }
  $("choices").replaceChildren(...q.choices.map((answer,i)=>{
    const button=document.createElement("button");
    button.className="choice";
    button.setAttribute("aria-pressed",String(i===guess));
    button.innerHTML="<span>"+letters[i]+"</span><span>"+answer+"</span>";
    if(i===guess) button.classList.add("picked");
    if(revealed) {
      button.disabled=true;
      if(i===q.answer) {
        button.classList.add("correct");
        button.innerHTML+=glyph("check");
        button.setAttribute("aria-label","Correct answer: "+letters[i]+", "+answer);
      } else if(i===guess) button.classList.add("missed");
    }
    button.addEventListener("click",()=>{
      guess=guess===i ? null : i;
      renderChoices();
      $("choices").children[i].focus({preventScroll:true});
    });
    return button;
  }));
}
function renderTicker() {
  const q=deck[position];
  const message=phase==="question" ? "Type A, B, C, or D in chat" : "Correct answer · "+letters[q.answer]+" — "+q.choices[q.answer];
  const line='<span class="crawl-set"><span><strong>Q'+pad(position+1)+'</strong> &nbsp;'+q.question+'</span><b>✦</b><span>'+message+'</span><b>✦</b><span>Super Metroid Trivia</span><b>✦</b></span>';
  $("crawl").innerHTML=line.repeat(4);
}
function makeCard(index, inBank) {
  const {category,title,question}=deck[index];
  const theme=categories[category];
  const button=document.createElement("button");
  button.className=inBank ? "bank-card" : "queue-card";
  button.style.setProperty("--ink",theme.ink);
  button.style.setProperty("--tint",theme.tint);
  button.innerHTML='<span class="sprite-box"><img alt="" src="assets/'+theme.image+'.png"></span><span class="card-copy"><span class="card-meta"><span>Q'+pad(index+1)+' / </span>'+category+'</span><span class="card-title">'+(inBank ? question : title)+'</span></span>';
  button.setAttribute("aria-label","Cue question "+(index+1)+". "+question);
  button.onclick=()=>{
    dealQuestion(index);
    if(inBank) location.hash="console";
  };
  return button;
}
function renderQueue() {
  const upcoming = rotation.upcoming.map(index=>makeCard(index,false));
  $("queue-list").replaceChildren(...upcoming);
  if(!upcoming.length) $("queue-list").textContent=loop ? "Next pass starts with a fresh shuffle." : "End of this pass.";
}
function renderQuestion(animate=false) {
  const {category,level,question}=deck[position];
  const theme=categories[category];
  const tag=$("q-category");
  tag.innerHTML=glyph(theme.icon)+category;
  tag.style.color=theme.ink;
  tag.style.background=theme.tint;
  tag.style.borderColor=theme.ink+"55";
  $("difficulty").textContent=level;
  $("difficulty").className="difficulty "+level.toLowerCase();
  $("q-number").textContent=rotation.drawn;
  $("question").textContent=question;
  if(animate) {
    const card=$("question-body");
    card.classList.remove("slide-in");
    void card.offsetWidth;
    card.classList.add("slide-in");
  }
  renderChoices(); renderTicker(); renderQueue(); renderControls(); renderTime();
}
async function dealQuestion(cuedIndex=null,restart=false) {
  if(drawing) return;
  drawing=true;
  let claimed=false;
  function claim() {
    claimed=true;
    let saved;
    try { saved=JSON.parse(stored(rotationKey)); } catch { /* A damaged save starts a fresh pass. */ }
    rotation=new QuestionRotation(deck,saved ?? rotation);
    if(restart || (cuedIndex!==null && phase==="finished")) rotation.restart();
    const index=cuedIndex===null ? rotation.next(loop) : rotation.cue(cuedIndex);
    save(rotationKey,JSON.stringify({order:rotation.order,drawn:rotation.drawn}));
    return index;
  }
  try {
    let index;
    try {
      // Two Browser Sources sharing an origin can open on the same frame.
      index=navigator.locks ? await navigator.locks.request("zebes."+rotationKey,claim) : claim();
    } catch(error) {
      if(claimed) throw error;
      index=claim();
    }
    if(index===null) {
      position=rotation.order[rotation.drawn-1];
      phase="finished";
      playing=false;
      setTime(0);
    } else {
      if(phase==="finished") playing=true;
      position=index;
      phase="question";
      setTime(questionTime*1000);
      if(liveChat) startScoredRound();
    }
    guess=null;
    renderQuestion(true);
  } finally {
    drawing=false;
  }
}
function reveal() {
  if(phase!=="question") return;
  phase="answer";
  if(liveChat && scoreDB) refreshLeaders();
  setTime(revealTime);
  renderChoices(); renderTicker(); renderControls(); renderTime();
}
function nextQuestion() {
  dealQuestion();
}
function togglePlay() {
  if(phase==="finished") {
    dealQuestion(null,true);
    return;
  }
  if(playing && !offAir) remaining=Math.max(0,deadline-performance.now());
  else deadline=performance.now()+remaining;
  playing=!playing;
  if(playing && liveChat) roundStart=Date.now();
  renderControls(); renderTime();
}
function tick() {
  if(!playing || offAir) return;
  if(performance.now()>=deadline) {
    if(phase==="question") reveal(); else nextQuestion();
  } else renderTime();
}
function renderBank() {
  const query=$("search").value.toLowerCase().trim();
  const filter=$("category-filter").value;
  const found=[];
  deck.forEach(({category,title,question,choices,answer,explanation},index)=>{
    const searchable=[question,title,category,choices[answer],explanation].join(" ").toLowerCase();
    if((!filter || filter===category) && searchable.includes(query)) found.push(makeCard(index,true));
  });
  $("bank-list").replaceChildren(...found);
  $("results").textContent=found.length ? found.length+" question"+(found.length===1?"":"s") : "No questions match. Try another search or category.";
}
function route() {
  const bank=location.hash==="#bank" && !stream;
  $("console").hidden=bank;
  $("bank").hidden=!bank;
  for(const [id,active] of [["bank-tab",bank],["console-tab",!bank]]) {
    $(id).classList.toggle("active",active);
    if(active) $(id).setAttribute("aria-current","page"); else $(id).removeAttribute("aria-current");
  }
  document.body.classList.toggle("streaming",stream);
  if(bank) renderBank();
  window.scrollTo(0,0);
}
function toggleStream() {
  stream=!stream;
  if(location.hash==="#bank") location.hash="console";
  route();
  if(stream) showExit();
  if(!stream) $("stream").focus({preventScroll:true});
}
let exitTimeout;
function showExit() {
  if(!stream) return;
  $("exit-stream").classList.add("visible");
  clearTimeout(exitTimeout);
  exitTimeout=setTimeout(()=>$("exit-stream").classList.remove("visible"),1800);
}
window.addEventListener("pointermove",showExit);
Object.keys(categories).forEach(name=>$("category-filter").add(new Option(name,name)));
$("pause").onclick=togglePlay;
$("next").onclick=nextQuestion;
$("reveal").onclick=reveal;
$("loop").onclick=()=>{loop=!loop;save("loop",loop);renderControls();renderQueue();};
$("duration").onchange=()=>{
  questionTime=Number($("duration").value);
  save("seconds",questionTime);
  if(phase==="question") setTime(questionTime*1000);
  renderTime();
};
$("all-questions").onclick=()=>{location.hash="bank";};
$("stream").onclick=toggleStream;
$("exit-stream").onclick=toggleStream;
$("search").oninput=renderBank;
$("category-filter").onchange=renderBank;
$("setup").onclick=()=>$("obs-dialog").showModal();
$("close-setup").onclick=()=>$("obs-dialog").close();
$("obs-dialog").addEventListener("click",e=>{if(e.target===$("obs-dialog")){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
window.addEventListener("hashchange",route);
// OBS can keep a Browser Source loaded between breaks. Count only on-air time.
window.addEventListener("obsSourceActiveChanged",event=>{
  const active=event.detail?.active;
  if(typeof active!=="boolean" || offAir===!active) return;
  if(playing && !active) remaining=Math.max(0,deadline-performance.now());
  offAir=!active;
  if(liveChat) {
    if(active) roundStart=Date.now();
    setChatActive(active);
  }
  if(playing && active) deadline=performance.now()+remaining;
  renderTime();
});
window.addEventListener("keydown",e=>{
  if(e.repeat || e.ctrlKey || e.altKey || e.metaKey || e.target.matches("input,select,textarea") || $("obs-dialog").open || $("scores-dialog").open || $("console").hidden) return;
  const key=e.key.toLowerCase();
  if(key==="p") togglePlay();
  else if(key==="n" && phase!=="finished") nextQuestion();
  else if(key==="r") reveal();
  else if(key==="v" || (e.key==="Escape" && stream)) toggleStream();
  else return;
  e.preventDefault();
});
