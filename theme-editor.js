"use strict";

const setupBase = location.protocol === "file:" || location.hostname.endsWith(".chatgpt.site")
  ? "https://intelligent-decisions-interactive.github.io/zebes-trivia/" : location.href;

const ThemeEditor = (() => {
  const byId = id => document.getElementById(id);
  const list = byId("theme-list"), preview = byId("theme-preview");
  const details = byId("custom-fields"), customize = byId("customize");
  const frame = byId("theme-frame"), banner = byId("theme-banner"), shade = byId("theme-shade");
  const labels = {page:"Background", panel:"Panels", accent:"Accent", secondary:"Timing", text:"Text", tint:"Header tint"};
  let current = BroadcastTheme.read(new URLSearchParams(location.search));

  for (const [id, palette] of Object.entries(BroadcastTheme.presets)) {
    const option = document.createElement("label");
    option.className = "theme-option";
    option.innerHTML = '<input type="radio" name="preset"><span class="theme-tile"><span class="swatch-strip" aria-hidden="true"></span><strong></strong><small></small></span>';
    const radio = option.querySelector("input");
    radio.value = id;
    for (const color of [palette.panel,palette.accent,palette.secondary]) {
      const swatch = document.createElement("i");
      swatch.style.setProperty("--swatch",color);
      option.querySelector(".swatch-strip").append(swatch);
    }
    option.querySelector("strong").textContent = palette.name;
    option.querySelector("small").textContent = palette.description;
    radio.addEventListener("change", () => {
      current = BroadcastTheme.preset(id);
      sync();
    });
    list.append(option);
    frame.add(new Option(palette.name,id));
  }
  for (const key of BroadcastTheme.colors) {
    const label = document.createElement("label");
    label.textContent = labels[key];
    const input = document.createElement("input");
    input.type = "color";
    input.id = "color-" + key;
    input.addEventListener("input", () => { current[key] = input.value; render(); });
    label.append(input);
    byId("color-controls").append(label);
  }
  function updateShareLink() {
    const url = new URL("setup.html",setupBase);
    BroadcastTheme.write(url.searchParams,current);
    try {
      const font = overlayFontURL(byId("font-url").value);
      if (font) url.searchParams.set("font",font);
    } catch {}
    byId("share-palette").href = url.href;
  }
  function render() {
    updateShareLink();
    BroadcastTheme.apply(preview,current);
    byId("shade-value").textContent = current.shade + "%";
    const note = byId("contrast-note");
    const faint = [["Text",current.text],["Accent",current.accent],["Timing",current.secondary]]
      .filter(([,color]) => BroadcastTheme.contrast(color,current.panel) < 4.5).map(([label]) => label);
    note.hidden = !faint.length;
    note.textContent = faint.length ? faint.join(" / ") + " may be hard to read against your panel color." : "";
  }
  function sync() {
    for (const radio of list.querySelectorAll("input")) radio.checked = current.id === radio.value;
    const custom = current.id === "custom";
    details.hidden = !custom;
    customize.setAttribute("aria-expanded",String(custom));
    customize.textContent = custom ? "Reset to " + BroadcastTheme.presets[current.frame].name : "Customize this preset";
    for (const key of BroadcastTheme.colors) byId("color-" + key).value = current[key];
    frame.value = current.frame;
    shade.value = current.shade;
    banner.value = current.banner;
    banner.setCustomValidity("");
    render();
  }
  customize.addEventListener("click", () => {
    current = current.id === "custom" ? BroadcastTheme.preset(current.frame) : {...current,id:"custom"};
    sync();
    customize.dispatchEvent(new Event("input",{bubbles:true}));
  });
  frame.addEventListener("change", () => {
    current.frame = frame.value;
    customize.textContent = "Reset to " + BroadcastTheme.presets[current.frame].name;
    render();
  });
  shade.addEventListener("input", () => { current.shade = Number(shade.value); render(); });
  banner.addEventListener("input", () => {
    current.banner = BroadcastTheme.bannerURL(banner.value);
    banner.setCustomValidity(banner.value.trim() && !current.banner ? "Use a public HTTPS image URL." : "");
    render();
  });
  sync();
  return {write: params => BroadcastTheme.write(params,current), updateShareLink};
})();
