"use strict";

const BroadcastTheme = (() => {
  const presets = {
    terminal: {name:"Zebes Terminal", description:"Moss green · original", page:"#0a0d0b", panel:"#111612", accent:"#b2f46c", secondary:"#b2f46c", text:"#eff2e8", tint:"#0c1814"},
    signal: {name:"Violet Signal", description:"Violet · cyan frames", page:"#0a0912", panel:"#141122", accent:"#c298ff", secondary:"#73e3ff", text:"#f4efff", tint:"#110a20"},
    splits: {name:"Split Clock", description:"Charcoal · teal splits", page:"#090b0c", panel:"#171b1e", accent:"#72ead0", secondary:"#a9eff0", text:"#f4f5f6", tint:"#10171b"},
    orbit: {name:"Plum Orbit", description:"Plum · lavender bands", page:"#170f22", panel:"#291c37", accent:"#d9baff", secondary:"#c2e580", text:"#f9efff", tint:"#281732"}
  };
  const colors = ["page","panel","accent","secondary","text","tint"];
  const validPreset = value => Object.hasOwn(presets, value);
  function preset(id) {
    if (!validPreset(id)) id = "terminal";
    return {...presets[id], id, frame:id, shade:60, banner:""};
  }
  function bannerURL(value) {
    if (!value?.trim()) return "";
    try {
      const url = new URL(value.trim());
      if (url.protocol === "https:" && !url.username && !url.password) return url.href;
    } catch {}
    return "";
  }
  function read(params) {
    const id = params.get("theme");
    if (id !== "custom") return preset(id);
    const theme = {...preset(params.get("frame")), id};
    for (const key of colors) {
      const value = params.get(key);
      if (/^#?[\da-f]{6}$/i.test(value || "")) theme[key] = "#" + value.replace("#","").toLowerCase();
    }
    const shade = params.get("shade");
    if (/^\d{1,3}$/.test(shade || "") && Number(shade) <= 100) theme.shade = Number(shade);
    theme.banner = bannerURL(params.get("banner"));
    return theme;
  }
  function write(params, theme) {
    for (const key of ["theme","frame",...colors,"shade","banner"]) params.delete(key);
    if (theme.id !== "terminal") params.set("theme", theme.id);
    if (theme.id !== "custom") return;
    params.set("frame", theme.frame);
    for (const key of colors) params.set(key, theme[key].slice(1));
    params.set("shade", theme.shade);
    if (theme.banner) params.set("banner", theme.banner);
  }
  function luminance(color) {
    const rgb = [1,3,5].map(i => parseInt(color.slice(i,i+2),16) / 255)
      .map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
    return .2126 * rgb[0] + .7152 * rgb[1] + .0722 * rgb[2];
  }
  function contrast(a,b) {
    const x = luminance(a), y = luminance(b);
    return (Math.max(x,y) + .05) / (Math.min(x,y) + .05);
  }
  function apply(node, theme) {
    node.classList.toggle("broadcast-palette", theme.id !== "terminal");
    node.dataset.frame = theme.frame;
    node.dataset.theme = theme.id;
    const tokens = {page:theme.page, panel:theme.panel, lime:theme.accent, white:theme.text,
      secondary:theme.secondary, "banner-tint":theme.tint, "tint-amount":theme.shade + "%",
      "accent-ink":contrast(theme.accent,"#ffffff") > contrast(theme.accent,"#000000") ? "#ffffff" : "#000000"};
    for (const [key,value] of Object.entries(tokens)) node.style.setProperty("--" + key, value);
    // The second layer keeps the bundled artwork visible if a channel image goes offline.
    const art = theme.banner ? 'url(' + JSON.stringify(theme.banner) + '), url(assets/zebes.png)' : 'url(assets/zebes.png)';
    node.style.setProperty("--banner-art", art);
  }
  return {presets, colors, preset, read, write, apply, bannerURL, contrast};
})();

if (!document.getElementById("channel-form")) {
  const parameters = new URLSearchParams(location.search);
  BroadcastTheme.apply(document.documentElement, BroadcastTheme.read(parameters));
  for (const link of document.querySelectorAll('a[href="setup.html"]')) {
    const edit = new URL(link.href);
    for (const key of ["channel","font"]) if (parameters.get(key)) edit.searchParams.set(key, parameters.get(key));
    BroadcastTheme.write(edit.searchParams, BroadcastTheme.read(parameters));
    link.href = edit.href;
  }
}
