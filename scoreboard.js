"use strict";

const channel = sourceChannel;
const liveChat = Boolean(channel && stream);
let scoreDB, roundID, roundStart, count = 0, listening = false, connection;
let stopSocket, releaseLock, retryLock, active = true;
let scorePaint = 0, historyPaint = 0;
const scoreStatus = msg => { $("chat-status").textContent = msg; };

function startScoredRound() {
  roundID = crypto.randomUUID();
  roundStart = Date.now();
  count = 0;
  $("round-guesses").textContent = "0 answers this round";
  if (scoreDB) refreshLeaders();
}

async function acceptGuess(msg) {
  const round = roundID;
  if (!round || !scoreDB || !listening || drawing || !playing || offAir || phase !== "question"
      || performance.now() >= deadline || msg.sent < roundStart) return;
  const row = {round, user:msg.user, name:msg.name, choice:msg.letter, correct:letters[deck[position].answer], card:position, time:msg.sent};
  try {
    if (await recordAnswer(scoreDB,row) && roundID === round) {
      count++;
      $("round-guesses").textContent = count + (count === 1 ? " answer" : " answers") + " this round";
    }
  } catch { scoreStatus("Could not save answer · check browser storage"); }
}

function playerRows(players, empty) {
  if (!players.length) {
    const item=document.createElement("li");
    item.className="score-empty"; item.textContent=empty;
    return [item];
  }
  let rank=0, previous=-1;
  return players.map((p,i)=>{
    if (p.points !== previous) rank=i+1;
    previous=p.points;
    const li=document.createElement("li");
    const n=document.createElement("span"), name=document.createElement("strong"), score=document.createElement("b");
    n.textContent=String(rank).padStart(2,"0"); name.textContent=p.name;
    score.textContent=p.points+" pt"+(p.points===1?"":"s");
    li.append(n,name,score);
    return li;
  });
}

async function refreshLeaders() {
  const paint=++scorePaint;
  try {
    const players=await readScores(scoreDB,5);
    if (paint===scorePaint) $("leaders").replaceChildren(...playerRows(players,"Be first on the board. Send A, B, C or D in chat."));
  } catch { scoreStatus("Scores unavailable · check browser storage"); }
}

function setChatActive(on) {
  active=on;
  if (!scoreDB) return;
  if (!on) {
    clearTimeout(retryLock);
    connection?.abort(); connection=null;
    stopSocket?.(); stopSocket=null; listening=false;
    releaseLock?.(); releaseLock=null;
    scoreStatus("Chat paused");
    return;
  }
  if (connection) return;
  const controller=new AbortController();
  connection=controller;
  const listen=()=>{
    if (!active || controller.signal.aborted) return;
    stopSocket=listenToChat(channel,acceptGuess,msg=>{
      listening=msg==="Chat connected";
      scoreStatus(msg);
    });
  };
  if (!navigator.locks) { listen(); return; }
  navigator.locks.request("zebes.scorer."+channel,{ifAvailable:true},async lock=>{
    if (controller.signal.aborted) return;
    if (!lock) {
      connection=null;
      scoreStatus("Scoring in another source");
      retryLock=setTimeout(()=>{if(active) setChatActive(true);},2500);
      return;
    }
    await new Promise(resolve=>{releaseLock=resolve; listen();});
  }).catch(()=>{if (!controller.signal.aborted) scoreStatus("Chat unavailable · reload source");});
}

async function showScorebook() {
  if (!scoreDB) return;
  const paint=++historyPaint;
  const filter=$("viewer-filter").value.trim().toLowerCase();
  try {
    const [players,rows]=await Promise.all([readScores(scoreDB),readAnswers(scoreDB,50,filter)]);
    if (paint!==historyPaint) return;
    const filtered=players.filter(p=>p.name.toLowerCase().includes(filter));
    // Keep the actual channel rank visible even when searching for one viewer.
    const ranks=playerRows(players,"No ranked viewers yet.");
    const selected=players.length ? ranks.filter((_,i)=>players[i].name.toLowerCase().includes(filter)) : ranks;
    $("full-leaders").replaceChildren(...(filtered.length ? selected : playerRows([],"No matching viewers.")));
    $("history-list").replaceChildren(...rows.map(a=>{
      const li=document.createElement("li"), title=document.createElement("strong"), result=document.createElement("span");
      title.textContent=a.name+" · "+(deck[a.card]?.title || "Question "+(a.card+1));
      result.textContent=new Date(a.time).toLocaleString()+" · "+a.choice+" "+(a.choice===a.correct?"✓  +1":"· correct "+a.correct);
      li.append(title,result);return li;
    }));
    $("history-empty").hidden=Boolean(rows.length);
  } catch { $("history-empty").hidden=false; $("history-empty").textContent="Could not read the scorebook."; }
}

async function enableChat() {
  if (!liveChat) return;
  document.body.classList.add("chat-enabled");
  $("chat-panel").hidden=false;
  $("score-channel").textContent="#"+channel;
  scoreStatus("Opening scorebook…");
  try {
    scoreDB=await openScorebook(channel);
    $("open-scores").disabled=false;
    await refreshLeaders();
    setChatActive(!offAir);
  } catch { scoreStatus("Scoring unavailable · allow browser storage"); }
  $("open-scores").onclick=()=>{
    $("scores-dialog").showModal();
    showScorebook();
  };
  $("close-scores").onclick=()=>$("scores-dialog").close();
  $("viewer-filter").oninput=showScorebook;
  $("export-scores").onclick=async ()=>{
    try {
      const data=answersCSV(await readAnswers(scoreDB),deck);
      const url=URL.createObjectURL(new Blob([data],{type:"text/csv;charset=utf-8"}));
      const a=document.createElement("a");a.href=url;a.download=channel+"-trivia-answers.csv";a.click();
      setTimeout(()=>URL.revokeObjectURL(url),30000);
    } catch { scoreStatus("Could not export the scorebook"); }
  };
  window.addEventListener("pagehide",()=>setChatActive(false));
  window.addEventListener("pageshow",e=>{if(e.persisted) setChatActive(!offAir);});
}

dealQuestion();
route();
enableChat();
window.setInterval(tick,100);
