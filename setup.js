"use strict";

const input=document.getElementById("channel-name"), result=document.getElementById("link-result");
const error=document.getElementById("setup-error"), field=document.getElementById("source-url");
const fontInput=document.getElementById("font-url"), preview=document.getElementById("font-preview");
const form=document.getElementById("channel-form"), submit=form.querySelector('button[type="submit"]');
const params=new URLSearchParams(location.search);
input.value=twitchLogin(params.get("channel"));
fontInput.value=params.get("font") || "";
if(fontInput.value) document.getElementById("font-options").open=true;
let fontRequest, requestedURL, previewFace, revision=0;

function invalidateLink() {
  revision++;
  result.hidden=true;
  error.hidden=true;
  submit.disabled=false;
  submit.textContent="Get OBS link";
}
form.addEventListener("input",invalidateLink);
fontInput.oninput=()=>{
  preview.style.fontFamily="";
  if(previewFace) document.fonts.delete(previewFace);
  previewFace=null;
};
async function previewFont(url) {
  if(requestedURL!==url || !fontRequest) {
    requestedURL=url;
    fontRequest=loadOverlayFont(url);
  }
  const pending=fontRequest;
  try {
    const face=await pending;
    if(overlayFontURL(fontInput.value)!==url) return;
    if(previewFace && previewFace!==face) document.fonts.delete(previewFace);
    document.fonts.add(face);
    previewFace=face;
    preview.style.fontFamily='"Channel Overlay",var(--pixel)';
  } catch(error) {
    if(pending===fontRequest) fontRequest=null;
    throw error;
  }
}
function fontError() {
  document.getElementById("font-options").open=true;
  error.textContent="Use a direct HTTPS font link that allows cross-origin loading, or clear the field for Zebes Relay.";
  error.hidden=false;
}
fontInput.onchange=async ()=>{
  const value=fontInput.value;
  if(!value.trim()) return;
  try { await previewFont(overlayFontURL(value)); }
  catch { if(fontInput.value===value) fontError(); }
};
document.getElementById("channel-form").onsubmit=async e=>{
  e.preventDefault();
  const version=++revision;
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
  if(fontInput.value.trim()) {
    submit.disabled=true;
    submit.textContent="Loading font…";
    try {
      const fontURL=overlayFontURL(fontInput.value);
      await previewFont(fontURL);
      if(version!==revision) return;
      url.searchParams.set("font",fontURL);
    } catch {
      if(version===revision) fontError();
      return;
    } finally {
      if(version===revision) {submit.disabled=false;submit.textContent="Get OBS link";}
    }
  }
  field.value=url.href;
  document.getElementById("copy-result").textContent="";
  error.hidden=true; result.hidden=false;
};
document.getElementById("copy-url").onclick=async ()=>{
  try { await navigator.clipboard.writeText(field.value);document.getElementById("copy-result").textContent="Link copied."; }
  catch {field.select();document.getElementById("copy-result").textContent="Copy the selected link."; }
};
