"use strict";

const BroadcastTheme = (() => {
  const presets = {
    terminal: {family:"Zebes Relay", name:"Zebes Terminal", description:"Moss green · original", page:"#0a0d0b", panel:"#111612", accent:"#b2f46c", secondary:"#b2f46c", text:"#eff2e8", tint:"#0c1814"},
    signal: {family:"Neon Trace", name:"Violet Signal", description:"Neon vaporwave", page:"#030106", panel:"#080511", accent:"#fe4fff", secondary:"#4aecef", railViolet:"#734cf7", railBlue:"#496ddb", text:"#f6f2ff", tint:"#200d36"},
    splits: {family:"Split Counter", name:"Split Clock", description:"Charcoal · teal splits", page:"#090b0c", panel:"#171b1e", accent:"#72ead0", secondary:"#a9eff0", text:"#f4f5f6", tint:"#10171b"},
    orbit: {family:"Orbit Arc", name:"Plum Orbit", description:"Plum · lavender bands", page:"#170f22", panel:"#291c37", accent:"#d9baff", secondary:"#c2e580", text:"#f9efff", tint:"#281732"}
  };
  const colors = ["page","panel","accent","secondary","text","tint"];
  const validPreset = value => Object.hasOwn(presets, value);
  function preset(id) {
    if (!validPreset(id)) id = "terminal";
    return {...presets[id], id, frame:id, face:"", shade:60, banner:""};
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
    const theme = preset(id === "custom" ? params.get("frame") : id);
    if (validPreset(params.get("face"))) theme.face = params.get("face");
    if (id !== "custom") return theme;
    theme.id = id;
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
    for (const key of ["theme","frame","face",...colors,"shade","banner"]) params.delete(key);
    if (validPreset(theme.face)) params.set("face", theme.face);
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
  function family(theme) {
    return presets[theme.face || theme.frame].family;
  }
  function apply(node, theme) {
    node.classList.toggle("broadcast-palette", theme.id !== "terminal");
    node.dataset.frame = theme.frame;
    node.dataset.theme = theme.id;
    const tokens = {"theme-face":JSON.stringify(family(theme)), page:theme.page, panel:theme.panel, lime:theme.accent, white:theme.text,
      secondary:theme.secondary, "banner-tint":theme.tint, "tint-amount":theme.shade + "%",
      "accent-ink":contrast(theme.accent,"#ffffff") > contrast(theme.accent,"#000000") ? "#ffffff" : "#000000"};
    if (theme.frame === "signal") {
      const signal = presets.signal;
      const originalRails = theme.accent === signal.accent && theme.secondary === signal.secondary;
      tokens["rail-violet"] = originalRails ? signal.railViolet : "color-mix(in hsl,var(--lime) 65%,var(--secondary))";
      tokens["rail-blue"] = originalRails ? signal.railBlue : "color-mix(in hsl,var(--lime) 35%,var(--secondary))";
    }
    for (const [key,value] of Object.entries(tokens)) node.style.setProperty("--" + key, value);
    // The second layer keeps the bundled artwork visible if a channel image goes offline.
    const art = theme.banner ? 'url(' + JSON.stringify(theme.banner) + '), url(assets/zebes.png)' : 'url(assets/zebes.png)';
    node.style.setProperty("--banner-art", art);
  }
  return {presets, colors, preset, read, write, apply, family, bannerURL, contrast};
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
