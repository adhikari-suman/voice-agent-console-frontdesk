/* Shared shell and helpers for the Anaglyph direction. */
const K = window.KIKU;
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const ic = (n, cls = "") => `<i data-lucide="${n}" class="${cls}"></i>`;

const STATUS = {
  completed: { label: "Completed", svg: `<svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="6.5" fill="currentColor"/><path d="M4 7.2l2 2 4-4.2" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
  in_progress: { label: "In progress", svg: `<svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M7 1.2a5.8 5.8 0 0 1 0 11.6z" fill="currentColor"/></svg>` },
  escalated: { label: "Escalated", svg: `<svg viewBox="0 0 14 14"><path d="M7 .8l6.4 12H.6z" fill="currentColor"/><path d="M7 5v3.6" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/><circle cx="7" cy="10.6" r=".9" fill="#fff"/></svg>` },
  failed: { label: "Failed", svg: `<svg viewBox="0 0 14 14"><rect x=".8" y=".8" width="12.4" height="12.4" rx="1.5" fill="currentColor"/><path d="M4.6 4.6l4.8 4.8M9.4 4.6l-4.8 4.8" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>` },
};
const st = s => `<span class="st ${s}">${STATUS[s].svg}${STATUS[s].label}</span>`;

/* Two-ink Venn: cyan = what Kiku wrote, magenta = what the person said. Overlap grows with match %. */
function venn(match, size = 28) {
  const r = size * 0.32, cy = size / 2;
  const d = (2 * r) * (1 - match / 100);
  const cx = size / 2;
  return `<svg class="venn" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true">
    <circle class="k" cx="${cx - d / 2}" cy="${cy}" r="${r}"/><circle class="h" cx="${cx + d / 2}" cy="${cy}" r="${r}"/></svg>`;
}

function diffLines(diff) {
  const wrote = [], said = [];
  diff.forEach(s => {
    const t = esc(s.text);
    if (s.op === "same") { wrote.push(`<span class="seg-same">${t}</span>`); said.push(`<span class="seg-same">${t}</span>`); }
    if (s.op === "del") wrote.push(`<span class="seg-del">${t}</span>`);
    if (s.op === "ins") said.push(`<span class="seg-ins">${t}</span>`);
  });
  return { wrote: wrote.join(" "), said: said.join(" ") };
}

/* Overprint: one reading line. Shared words print in overprint blue, Kiku-only words print cyan (raised, struck),
   the person's own words print magenta (lowered, underlined). Pass liveTail to push a trailing unspoken script span after the caret. */
function overprint(diff, opts = {}) {
  const segs = diff.slice();
  let tail = "";
  if (opts.live) {
    const lastDel = segs.map(x => x.op).lastIndexOf("del");
    const lastIns = segs.map(x => x.op).lastIndexOf("ins");
    if (lastDel > -1 && lastDel < lastIns) { tail = segs[lastDel].text; segs.splice(lastDel, 1); }
  }
  const html = segs.map(x => `<span class="op-${x.op}">${esc(x.text)}</span>`).join(" ");
  return opts.live ? `${html}<span class="caret"></span> <span class="op-ahead">${esc(tail)}</span>` : html;
}

function karaokeTurn(turn, who) {
  const first = who.split(" ")[0];
  const badge = turn.asWritten
    ? `<span class="asw">${venn(100, 20)}Spoken as written</span>`
    : `<span class="match">${venn(turn.match, 22)}${turn.match}% shared</span>`;
  return `<div class="kturn ${turn.asWritten ? "as" : ""}" data-t="${turn.t}">
    <div class="t">${turn.t}</div>
    <div>
      <div class="khead"><b>${esc(who)}</b><span class="muted">reading from Kiku's script</span><span class="r">${badge}</span></div>
      <p class="op">${turn.asWritten ? `<span class="op-same">${esc(turn.said)}</span>` : overprint(turn.diff)}</p>
    </div></div>`;
}

const SYS_ICON = { escalation: "triangle-alert", join: "headphones", takeover: "mic", end: "phone-off" };
/* Legend for the overprint: sample words in each ink */
function opLegend(name) {
  return `<span class="oplegend"><span><span class="op-same">word</span>written and said</span><span><span class="op-del">word</span>Kiku wrote, not said</span><span><span class="op-ins">word</span>${name} said, not written</span></span>`;
}

function transcript(list, opts = {}) {
  return list.map(x => {
    if (x.speaker === "system") return `<div class="sys ${x.kind}" data-t="${x.t}"><span class="ic">${ic(SYS_ICON[x.kind])}</span>${esc(x.text)}<span class="t">${x.t}</span></div>`;
    if (x.karaoke) return karaokeTurn(x, opts.specialist || "Specialist");
    const name = x.speaker === "agent" ? "Kiku" : (opts.guest || "Guest");
    return `<div class="turn ${x.speaker}" data-t="${x.t}"><div class="t">${x.t}</div><div><div class="txt"><div class="spk">${esc(name)}</div>${esc(x.text)}</div></div></div>`;
  }).join("");
}

function meter(kind, n, level, seed = 1) {
  let out = "", v = seed;
  for (let i = 0; i < n; i++) {
    v = (v * 9301 + 49297) % 233280;
    const h = 5 + Math.round((v / 233280) * 21 * (0.4 + 0.6 * Math.sin((i / n) * Math.PI)));
    out += `<i class="${i / n < level ? "on" : ""}" style="height:${Math.min(26, h)}px"></i>`;
  }
  return `<div class="meter ${kind}">${out}</div>`;
}

function shell({ role, page, title, sub, right = "" }) {
  const spec = role === "specialist";
  const who = spec ? K.people.specialist : K.people.admin;
  const link = (id, icon, label, extra = "") => `<a href="#" class="${page === id ? "on" : ""}">${ic(icon)}${label}${extra}</a>`;
  const nav = spec
    ? link("live", "radio-tower", "Live board", `<span class="n">1</span>`) + link("logs", "list", "Call logs")
    : link("logs", "list", "Call logs");
  const out = `<h6>Outbound calls</h6>` + link("campaign", "megaphone", "Campaign") + link("upsell", "gift", "Upsell") + link("make", "phone-outgoing", "Make a call");
  const admin = spec ? "" : `<h6>Team</h6>` + link("users", "users", "Users");
  document.body.insertAdjacentHTML("afterbegin", `<div class="app">
    <aside class="rail">
      <div class="brand"><div class="mark">Kiku</div><small>${K.hotel.name}, ${K.hotel.city}</small></div>
      <nav class="nav">${nav}${out}${admin}</nav>
      <div class="rail-foot">
        <div class="me"><span class="av">${who.initials}</span><div><b>${who.name}</b><span>${who.role}</span></div></div>
        <div class="demo">${K.synthetic}</div>
      </div>
    </aside>
    <div class="main">
      <header class="top"><div><h1>${title}</h1>${sub ? `<div class="sub">${sub}</div>` : ""}</div>
        <div class="right">${right || `<span class="line-chip">${ic("phone")}${K.hotel.line}</span><span class="clock">${ic("clock")}${K.hotel.today.replace("Sunday ", "Sun ")}, ${K.hotel.now} ${K.hotel.tz}</span>`}</div>
      </header>
      <div class="body" id="body"></div>
    </div></div>`);
  return document.getElementById("body");
}

function done() { if (window.lucide) lucide.createIcons(); }
