"use strict";

const input=document.getElementById("channel-name"), result=document.getElementById("link-result");
const error=document.getElementById("setup-error"), field=document.getElementById("source-url");
input.value=twitchLogin(new URLSearchParams(location.search).get("channel"));
input.oninput=()=>{result.hidden=true; error.hidden=true;};
document.getElementById("channel-form").onsubmit=e=>{
  e.preventDefault();
  let value=input.value.trim();
  if (/^https?:\/\/(?:www\.)?twitch\.tv\//i.test(value)) {
    try { value=new URL(value).pathname.replace(/^\/|\/$/g,""); } catch { value=""; }
  }
  const login=twitchLogin(value);
  if (!login) {error.textContent="Enter your Twitch channel name, such as speedrunner_42.";error.hidden=false;result.hidden=true;return;}
  const base=location.protocol==="file:" || location.hostname.endsWith(".chatgpt.site")
    ? "https://intelligent-decisions-interactive.github.io/zebes-trivia/" : location.href;
  const url=new URL("stream.html",base);
  url.searchParams.set("channel",login);
  field.value=url.href;
  document.getElementById("copy-result").textContent="";
  error.hidden=true; result.hidden=false;
};
document.getElementById("copy-url").onclick=async ()=>{
  try { await navigator.clipboard.writeText(field.value);document.getElementById("copy-result").textContent="Link copied."; }
  catch {field.select();document.getElementById("copy-result").textContent="Copy the selected link."; }
};
