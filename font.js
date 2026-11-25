"use strict";

// A channel-supplied face is registered only after the browser has decoded it.
function overlayFontURL(value) {
  if (!value?.trim()) return null;
  const url = new URL(value.trim());
  if (url.protocol !== "https:" || url.username || url.password) {
    throw new Error("Use a direct HTTPS font URL.");
  }
  return url.href;
}

async function loadOverlayFont(url) {
  const response = await fetch(url, {
    mode: "cors", credentials: "omit", referrerPolicy: "no-referrer",
    signal: AbortSignal.timeout(12000)
  });
  if (!response.ok) throw new Error("Font download failed.");
  const face = new FontFace("Channel Overlay", await response.arrayBuffer());
  await face.load();
  return face;
}

if (!document.getElementById("channel-form")) {
  (async () => {
    try {
      const url = overlayFontURL(new URLSearchParams(location.search).get("font"));
      if (url) {
        document.fonts.add(await loadOverlayFont(url));
        document.documentElement.classList.add("has-channel-font");
      }
    } catch {
      // Keep the bundled face when a font host is unavailable.
    }
  })();
}
