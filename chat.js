"use strict";

function twitchLogin(value) {
  const name = String(value || "").trim().replace(/^[@#]/, "").toLowerCase();
  return /^[a-z0-9_]{1,25}$/.test(name) ? name : "";
}

function parseChatLine(line) {
  const match = line.match(/^(?:@([^ ]+) )?(?::([^ ]+) )?(\w+)(?: ([^:]*?))?(?: :([\s\S]*))?$/);
  if (!match) return null;
  const tags = Object.create(null);
  for (const pair of (match[1] || "").split(";")) {
    const eq = pair.indexOf("=");
    if (eq > 0) tags[pair.slice(0, eq)] = pair.slice(eq + 1);
  }
  return {tags, login: (match[2] || "").split("!")[0], command: match[3], args: (match[4] || "").trim(), text: match[5] || ""};
}

// One read-only connection. Never sends viewer messages or requests a password.
function listenToChat(channel, onAnswer, onState) {
  let socket, retry, watchdog, stopped = false, delay = 1000;
  function connect() {
    if (stopped) return;
    onState("Connecting to chat…");
    socket = new WebSocket("wss://irc-ws.chat.twitch.tv:443");
    const current = socket;
    const arm = ms => {
      clearTimeout(watchdog);
      watchdog = setTimeout(() => current.close(), ms);
    };
    arm(15000);
    current.onopen = () => {
      current.send("CAP REQ :twitch.tv/tags twitch.tv/commands");
      current.send("NICK justinfan" + Math.floor(10000000 + Math.random() * 90000000));
    };
    current.onmessage = ({data}) => {
      if (stopped || socket !== current) return;
      for (const line of String(data).split("\r\n")) {
        if (!line) continue;
        const m = parseChatLine(line);
        if (!m) continue;
        if (m.command === "PING") current.send("PONG :" + m.text);
        if (m.command === "001") current.send("JOIN #" + channel);
        if (m.command === "RECONNECT") current.close();
        if (m.command === "ROOMSTATE" && m.args === "#" + channel) {
          delay = 1000;
          onState("Chat connected");
        }
        if (m.command === "PRIVMSG" && m.args === "#" + channel) {
          const letter = m.text.trim().toUpperCase();
          const login = twitchLogin(m.login);
          if (login && /^[ABCD]$/.test(letter)) {
            const name = (m.tags["display-name"] || login).replace(/\\s/g, " ").slice(0,50);
            onAnswer({user: m.tags["user-id"] || login, name, letter, sent: Number(m.tags["tmi-sent-ts"]) || Date.now()});
          }
        }
        if (m.command === "NOTICE" && /suspend|unavailable|denied/i.test(m.text)) {
          onState("Channel unavailable");
        }
        // Twitch periodically sends PING even in an empty room.
        if (m.command === "ROOMSTATE" || m.command === "PING" || m.command === "PRIVMSG") arm(360000);
      }
    };
    current.onclose = () => {
      clearTimeout(watchdog);
      if (stopped) return;
      onState("Chat disconnected · retrying");
      retry = setTimeout(connect, delay + Math.random()*400);
      delay = Math.min(delay*2, 30000);
    };
    current.onerror = () => current.close();
  }
  connect();
  return () => {
    stopped = true;
    clearTimeout(retry);
    clearTimeout(watchdog);
    socket?.close();
  };
}

function openScorebook(channel) {
  return new Promise((resolve,reject) => {
    const request = indexedDB.open("zebes.scorebook." + channel, 1);
    request.onerror = () => reject(request.error);
    request.onupgradeneeded = () => {
      const answers = request.result.createObjectStore("answers", {keyPath:["round","user"]});
      answers.createIndex("time","time");
      const players = request.result.createObjectStore("players", {keyPath:"user"});
      players.createIndex("points","points");
    };
    request.onsuccess = () => resolve(request.result);
  });
}

// The unique answer and the player's new total commit together, including on reload.
function recordAnswer(db, row) {
  return new Promise((resolve,reject) => {
    const tx = db.transaction(["answers","players"],"readwrite");
    const answers = tx.objectStore("answers"), players = tx.objectStore("players");
    let added = false;
    tx.oncomplete = () => resolve(added);
    tx.onabort = () => reject(tx.error);
    const key = [row.round,row.user];
    answers.getKey(key).onsuccess = e => {
      if (e.target.result !== undefined) return;
      answers.add(row);
      players.get(row.user).onsuccess = e => {
        const player = e.target.result || {user:row.user, points:0, attempts:0};
        player.name = row.name;
        player.attempts++;
        player.points += Number(row.choice === row.correct);
        players.put(player);
        added = true;
      };
    };
  });
}

function readScores(db, limit = Infinity) {
  return new Promise((resolve,reject) => {
    const rows = [];
    const req = db.transaction("players").objectStore("players").index("points").openCursor(null,"prev");
    req.onerror = () => reject(req.error);
    req.onsuccess = () => {
      const c = req.result;
      if (!c || rows.length >= limit) return resolve(rows);
      rows.push(c.value);
      c.continue();
    };
  });
}

function readAnswers(db, limit = Infinity, viewer = "") {
  return new Promise((resolve,reject) => {
    const rows = [];
    const req = db.transaction("answers").objectStore("answers").index("time").openCursor(null,"prev");
    req.onerror = () => reject(req.error);
    req.onsuccess = () => {
      const c = req.result;
      if (!c || rows.length >= limit) return resolve(rows);
      if (c.value.name.toLowerCase().includes(viewer)) rows.push(c.value);
      c.continue();
    };
  });
}

function answersCSV(rows, cards) {
  const encode = value => {
    let s = String(value);
    if (/^[=+@\-\t\r]/.test(s)) s = "'" + s;
    return '"' + s.replaceAll('"','""') + '"';
  };
  const out = [["Time (UTC)","Viewer","Round","Question","Guess","Correct answer","Points"]];
  for (const a of rows) {
    out.push([new Date(a.time).toISOString(),a.name,a.round,cards[a.card]?.question || "Q"+(a.card+1),a.choice,a.correct,Number(a.choice===a.correct)]);
  }
  return out.map(r=>r.map(encode).join(",")).join("\r\n");
}
