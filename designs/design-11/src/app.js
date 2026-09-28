/* Kiku / Crosswire: shared helpers */
const K = window.KIKU;
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const MARK = `<svg class="mark" viewBox="0 0 26 22" aria-hidden="true">
  <rect x="0" y="4" width="19" height="5" rx="1.5" fill="#BD55E6"/>
  <rect x="7" y="13" width="19" height="5" rx="1.5" fill="#F4A92A"/>
  <rect x="7" y="9" width="12" height="4" fill="#fff" opacity=".18"/></svg>`;

const SHAPES = {
  completed: `<svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="6.5" fill="currentColor"/><path d="M4 7.2l2 2 4-4.2" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  in_progress: `<svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.6" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="7" cy="7" r="2.4" fill="currentColor"/></svg>`,
  escalated: `<svg viewBox="0 0 14 14"><path d="M7 .8L13.4 12.6H.6z" fill="#F4A92A" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/><path d="M7 5v3.6" stroke="#221832" stroke-width="1.6" stroke-linecap="round"/><circle cx="7" cy="10.5" r=".9" fill="#221832"/></svg>`,
  failed: `<svg viewBox="0 0 14 14"><rect x=".7" y=".7" width="12.6" height="12.6" rx="2" fill="currentColor"/><path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>`,
};
const LABEL = { completed: "Completed", in_progress: "In progress", escalated: "Escalated", failed: "Failed" };
const status = s => `<span class="st ${s}">${SHAPES[s]}${LABEL[s]}</span>`;
const dirTag = d => d === "inbound"
  ? `<span class="tag"><i data-lucide="phone-incoming"></i>Inbound</span>`
  : `<span class="tag"><i data-lucide="phone-outgoing"></i>Outbound</span>`;

function rail(role, active) {
  const me = role === "admin" ? K.people.admin : K.people.specialist;
  const esc2 = K.calls.filter(c => c.status === "escalated" && !c.specialist).length;
  const a = (id, icon, label, extra = "", cls = "") =>
    `<a href="#" class="${cls} ${active === id ? "on" : ""}"><i data-lucide="${icon}"></i>${label}${extra}</a>`;
  const sub = (id, label) => `<a href="#" class="sub ${active === id ? "on" : ""}">${label}</a>`;
  let nav = "";
  if (role === "specialist") nav += a("live", "radio-tower", "Live board", `<span class="count" title="Waiting for a specialist">${esc2}</span>`);
  nav += a("logs", "list", "Call logs");
  nav += `<div class="nav-group">Outbound</div>`;
  nav += sub("campaign", "Campaign") + sub("upsell", "Upsell") + sub("make", "Make a call");
  if (role === "admin") nav += `<div class="nav-group">Team</div>` + a("users", "users", "Users");
  document.getElementById("rail").innerHTML = `
    <div class="brand">${MARK}<span class="word">Kiku</span></div>
    <div class="brand-sub">${esc(K.hotel.name)}, ${esc(K.hotel.city)}</div>
    <nav class="nav">${nav}</nav>
    <div class="rail-foot">
      <div class="me"><span class="av">${me.initials}</span><div><b>${esc(me.name)}</b><span>${me.role}</span></div></div>
      <div class="demo">${esc(K.synthetic)}</div>
    </div>`;
}

function topbar(crumbs) {
  return `<div class="top"><div class="crumb">${crumbs}</div>
    <div class="right">
      <span class="line-pill"><span class="pulse"></span>Hotel line ${esc(K.hotel.line)}</span><span class="sep"></span>
      <span>${esc(K.hotel.today)}</span><span class="sep"></span><b style="color:var(--ink)">${K.hotel.now} ${K.hotel.tz}</b>
    </div></div>`;
}

/* Pair diff segments into aligned columns: same | substitution | wrote-only | said-only */
function columns(diff) {
  const out = [];
  for (let i = 0; i < diff.length; i++) {
    const d = diff[i], n = diff[i + 1];
    if (d.op === "same") out.push({ t: "same", w: d.text, s: d.text });
    else if (d.op === "del" && n && n.op === "ins") { out.push({ t: "sub", w: d.text, s: n.text }); i++; }
    else if (d.op === "del") out.push({ t: "del", w: d.text, s: null });
    else out.push({ t: "ins", w: null, s: d.text });
  }
  return out;
}
/* deterministic pseudo-random for waveforms and meters */
function rng(seed) { let x = seed; return () => (x = (x * 16807) % 2147483647) / 2147483647; }
function meter(n, seed, color, h = 28) {
  const r = rng(seed); let s = "";
  for (let i = 0; i < n; i++) { const v = .18 + r() * .82 * Math.sin((i / n) * Math.PI * .9 + .3); s += `<i style="height:${Math.max(3, v * h)}px;background:${color}"></i>`; }
  return `<span class="meter" style="height:${h}px">${s}</span>`;
}
const icons = () => window.lucide && lucide.createIcons();

/* Karaoke "crossing" view: Kiku's line on the left, the spoken line on the right,
   matched phrases joined by curves across a gutter; unmatched words stay loose. */
function ribbon(turn, opts = {}) {
  let k = 0;
  const L = [], R = [];
  turn.diff.forEach((d, i) => {
    const last = i === turn.diff.length - 1 && opts.live ? `<span class="caret"></span>` : "";
    if (d.op === "same") { k++; L.push(`<span class="m" data-k="${k}">${esc(d.text)}</span>`); R.push(`<span class="m" data-k="${k}">${esc(d.text)}</span>${last}`); }
    else if (d.op === "del") L.push(`<span class="x">${esc(d.text)}</span>`);
    else R.push(`<span class="n">${esc(d.text)}</span>${last}`);
  });
  return `<div class="rb" data-ribbon>
    <div class="rb-l"><span class="rb-h"><i class="kd"></i>Kiku wrote</span><p>${L.join(" ")}</p></div>
    <svg class="rb-svg" aria-hidden="true"></svg>
    <div class="rb-r"><span class="rb-h"><i class="hd"></i>${esc(opts.name || "Said")}</span><p>${R.join(" ")}</p></div>
  </div>`;
}
function drawRibbons(root = document) {
  root.querySelectorAll("[data-ribbon]").forEach(rb => {
    const svg = rb.querySelector(".rb-svg"), box = rb.getBoundingClientRect();
    const gl = rb.querySelector(".rb-l").getBoundingClientRect().right - box.left + 4;
    const gr = rb.querySelector(".rb-r").getBoundingClientRect().left - box.left - 4;
    svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
    let p = "";
    rb.querySelectorAll(".rb-l .m").forEach(a => {
      const b = rb.querySelector(`.rb-r .m[data-k="${a.dataset.k}"]`); if (!b) return;
      const ra = [...a.getClientRects()].pop(), rbx = b.getClientRects()[0];
      const y1 = ra.top + ra.height / 2 - box.top, y2 = rbx.top + rbx.height / 2 - box.top;
      const x1 = ra.right - box.left + 2, x2 = rbx.left - box.left - 2, mx = (gl + gr) / 2;
      p += `<path d="M${gl} ${y1} C${mx} ${y1} ${mx} ${y2} ${gr} ${y2}" />`;
      p += `<circle cx="${gl}" cy="${y1}" r="2.2"/><circle cx="${gr}" cy="${y2}" r="2.2"/>`;
    });
    svg.innerHTML = p;
  });
}
const ribbonLegend = () => `<div class="legend">
  <span class="k"><svg width="26" height="10"><path d="M1 5 C9 5 13 1 25 1" stroke="#877E96" fill="none" stroke-width="1.2"/></svg>Linked: said as written</span>
  <span class="k"><span class="sw del">struck</span>Kiku wrote, not said</span>
  <span class="k"><span class="sw ins">marked</span>Improvised</span></div>`;
