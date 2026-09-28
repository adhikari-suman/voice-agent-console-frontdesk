/* Kiku "Switchboard" shared helpers */
const K = window.KIKU;
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const ic = (n, cls = "") => `<i data-lucide="${n}" class="${cls}"></i>`;

/* Status: shape + label, colour is a third cue only */
const STATUS = {
  completed: { label: "Completed", svg: '<svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="6.2" fill="currentColor"/><path d="M4.2 7.2l1.9 1.9 3.7-4" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
  in_progress: { label: "In progress", svg: '<svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 1.4a5.6 5.6 0 0 1 0 11.2z" fill="currentColor"/></svg>' },
  escalated: { label: "Escalated", svg: '<svg viewBox="0 0 14 14"><path d="M7 .9l6.3 11.6H.7z" fill="currentColor"/><path d="M7 5v3.6" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/><circle cx="7" cy="10.6" r=".95" fill="#fff"/></svg>' },
  failed: { label: "Failed", svg: '<svg viewBox="0 0 14 14"><rect x="1" y="1" width="12" height="12" rx="2" fill="currentColor"/><path d="M4.6 4.6l4.8 4.8M9.4 4.6l-4.8 4.8" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>' },
};
const status = s => `<span class="status ${s}">${STATUS[s].svg}${STATUS[s].label}</span>`;

const dirIcon = d => d === "inbound" ? ic("phone-incoming") : ic("phone-outgoing");

const PLUG = '<svg class="plug" viewBox="0 0 30 18" aria-hidden="true"><path d="M5 13C12 13 18 5 25 5" stroke="#1C1C1A" stroke-width="2" fill="none"/><circle cx="5" cy="13" r="4" fill="#1C1C1A"/><circle cx="25" cy="5" r="4" fill="#C8372A"/></svg>';

function shell({ role, active, title, crumb = "", right = "", body, deskClass = "" }) {
  const spec = role === "specialist";
  const me = spec ? K.people.specialist : K.people.admin;
  const key = (id, label, icon, extra = "") =>
    `<a href="#" class="key ${active === id ? "on" : ""}"><span class="lamp"></span>${ic(icon)}${label}${extra}</a>`;
  const keys = [
    spec ? key("live", "Live board", "radio-tower", '<span class="cnt">2</span>') : "",
    key("logs", "Call logs", "list"),
    '<span class="key-sep"></span>',
    key("campaign", "Campaign", "megaphone"),
    key("upsell", "Upsell", "concierge-bell"),
    key("make", "Make a call", "phone-outgoing"),
    spec ? "" : '<span class="key-sep"></span>' + key("users", "Users", "users"),
  ].join("");
  document.body.innerHTML = `
  <div class="app">
    <main class="main">
      <header class="topbar">
        <h1>${title}</h1>${crumb ? `<span class="crumb">${crumb}</span>` : ""}
        <div class="right">${right}</div>
      </header>
      <section class="content">${body}</section>
    </main>
    <footer class="desk ${deskClass}">
      <div class="brand">${PLUG}<div><div class="wordmark">Kiku</div><small>${K.hotel.name}, ${K.hotel.city}</small></div></div>
      <nav class="keys" aria-label="Main">${keys}</nav>
      <div class="meta"><span>${ic("phone")}${esc(K.hotel.line)}</span><span>${ic("clock-3")}Sun 27 Sep, ${K.hotel.now}</span></div>
      <div class="me"><span class="avatar ${spec ? "h" : ""}">${me.initials}</span><div><b>${esc(me.name)}</b><small>${me.role}</small></div></div>
    </footer>
  </div>`;
}

/* Patch bay: Kiku's written line on the left, the spoken line on the right, cords join the words that were kept */
function patch(turn, who = "Specialist", opts = {}) {
  let k = 0, k2 = 0;
  const left = turn.diff.filter(d => d.op !== "ins").map(d => d.op === "same" ? `<span class="same" data-k="${k++}">${esc(d.text)}</span>` : `<del>${esc(d.text)}</del>`).join(" ");
  const insOnly = turn.diff.filter(d => d.op !== "del");
  const right = insOnly.map((d, i) => {
    if (d.op === "same") return `<span class="same" data-k="${k2++}">${esc(d.text)}</span>`;
    return `<ins>${esc(d.text)}</ins>`;
  }).join(" ") + (opts.live ? '<span class="caret"></span>' : "");
  const foot = opts.noFoot ? "" : turn.asWritten
    ? `<div class="pf"><span class="badge-aw">${ic("check-check")}Spoken as written</span><span>Every word patched straight through</span></div>`
    : `<div class="pf"><span>${turn.match}% of Kiku's words kept</span><span class="meter"><i style="width:${turn.match}%"></i></span></div>`;
  return `<div class="patch${turn.asWritten ? " aw" : ""}">
    <div class="pc wrote"><div class="ph">${ic("pen-line")}Kiku wrote</div><p>${left}</p></div>
    <span></span>
    <div class="pc said"><div class="ph">${ic("mic")}${who === "You" ? (opts.live ? "You're saying" : "You said") : esc(who) + (opts.live ? " is saying" : " said")}</div><p>${right}</p></div>
    ${foot}</div>`;
}

function drawCords() {
  document.querySelectorAll(".patch").forEach(p => {
    p.querySelectorAll("svg.cords").forEach(n => n.remove());
    const pr = p.getBoundingClientRect();
    const x1 = p.querySelector(".wrote").getBoundingClientRect().right - pr.left;
    const x2 = p.querySelector(".said").getBoundingClientRect().left - pr.left;
    // centre y of each kept phrase on both sides, then fan out phrases that share a line
    const ends = side => [...p.querySelectorAll(`.${side} .same`)].map(el => { const r = el.getClientRects()[0]; return { k: +el.dataset.k, y: r.top + r.height / 2 - pr.top }; });
    const fan = list => {
      const groups = {};
      list.forEach(e => { const key = Math.round(e.y); (groups[key] = groups[key] || []).push(e); });
      Object.values(groups).forEach(g => g.forEach((e, i) => { e.y += (i - (g.length - 1) / 2) * 15; }));
      return Object.fromEntries(list.map(e => [e.k, e.y]));
    };
    const L = fan(ends("wrote")), R = fan(ends("said"));
    let paths = "", jacks = "";
    Object.keys(L).forEach(k => {
      if (R[k] === undefined) return;
      const y1 = L[k], y2 = R[k], m = (x2 - x1) / 2, n = +k + 1;
      paths += `<path d="M${x1} ${y1}C${x1 + m} ${y1} ${x2 - m} ${y2} ${x2} ${y2}" fill="none" stroke="#1C1C1A" stroke-width="2"/>`;
      jacks += `<circle cx="${x1}" cy="${y1}" r="7" fill="#1C1C1A"/><text x="${x1}" y="${y1 + 3.5}" text-anchor="middle" font-size="9.5" font-weight="700" fill="#F2CD2B" font-family="Familjen Grotesk, sans-serif">${n}</text>
        <circle cx="${x2}" cy="${y2}" r="7" fill="#C8372A"/><text x="${x2}" y="${y2 + 3.5}" text-anchor="middle" font-size="9.5" font-weight="700" fill="#fff" font-family="Familjen Grotesk, sans-serif">${n}</text>`;
    });
    p.querySelectorAll(".same").forEach(el => el.dataset.n = +el.dataset.k + 1);
    p.insertAdjacentHTML("beforeend", `<svg class="cords" aria-hidden="true">${paths}${jacks}</svg>`);
  });
}

function wave(n, cls = "", seed = 3) {
  let out = "";
  for (let i = 0; i < n; i++) {
    const h = 4 + Math.round(Math.abs(Math.sin(i * 1.7 + seed) * Math.cos(i * 0.37 + seed * 2)) * 22);
    out += `<i style="height:${h}px"></i>`;
  }
  return `<span class="wave ${cls}">${out}</span>`;
}

function done() {
  if (window.lucide) lucide.createIcons();
  drawCords();
  if (document.fonts) document.fonts.ready.then(drawCords);
  window.addEventListener("resize", drawCords);
}
