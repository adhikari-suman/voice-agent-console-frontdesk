/* Kiku "Interlinear" shared helpers */
const K = window.KIKU;
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const ic = (n, cls = "") => `<i data-lucide="${n}" class="${cls}"></i>`;

const STATUS = {
  completed: ["Completed", '<svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="6.2" fill="currentColor"/><path d="M4.2 7.2l1.9 1.9 3.8-4" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'],
  in_progress: ["In progress", '<svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 1.4A5.6 5.6 0 0 1 7 12.6Z" fill="currentColor"/></svg>'],
  escalated: ["Escalated", '<svg viewBox="0 0 14 14"><path d="M7 1.2L13.2 12.4H.8Z" fill="currentColor"/><path d="M7 5.2v3.2" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/><circle cx="7" cy="10.3" r=".9" fill="#fff"/></svg>'],
  failed: ["Failed", '<svg viewBox="0 0 14 14"><rect x="1" y="1" width="12" height="12" rx="2" fill="currentColor"/><path d="M4.6 4.6l4.8 4.8M9.4 4.6l-4.8 4.8" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>'],
};
const statusTag = (s) => `<span class="st st-${s}">${STATUS[s][1]}${STATUS[s][0]}</span>`;
const dirTag = (d) => d === "inbound"
  ? `<span class="dir">${ic("phone-incoming")}Inbound</span>`
  : `<span class="dir">${ic("phone-outgoing")}Outbound</span>`;

function rail(role, active) {
  const spec = role === "specialist";
  const me = spec ? K.people.specialist : K.people.admin;
  const live = K.calls.filter((c) => c.status === "in_progress" || c.status === "escalated").length;
  const waiting = K.calls.filter((c) => c.status === "escalated" && !c.specialist).length;
  const a = (id, href, icon, label, extra = "", cls = "") =>
    `<a href="${href}" class="${cls} ${active === id ? "on" : ""}">${icon ? ic(icon) : ""}${label}${extra}</a>`;
  return `
  <div class="mark"><span class="glyph"><i></i><i></i></span><div><b>Kiku</b><small>${esc(K.hotel.name)}</small></div></div>
  <nav class="nav">
    ${spec ? a("live", "02-live-overview.html", "radio", "Live board", `<span class="n hot" title="${waiting} waiting for a specialist">${waiting}</span>`) : ""}
    ${a("logs", "03-call-logs.html", "list", "Call logs", `<span class="n">${K.stats.callsToday}</span>`)}
    <div class="nav-group">Outbound</div>
    ${a("campaign", "07-outbound-campaign.html", "megaphone", "Campaign")}
    ${a("upsell", "08-outbound-upsell.html", "badge-plus", "Upsell")}
    ${a("make", "09-outbound-make-a-call.html", "phone-outgoing", "Make a call")}
    ${!spec ? `<div class="nav-group">Team</div>${a("users", "10-users.html", "users", "Users")}` : ""}
  </nav>
  <div class="rail-foot">
    <div class="line-state"><span class="pulse"></span><b>${live} calls live</b><span></span><span>Hotel line ${esc(K.hotel.line)}</span></div>
    <div class="me"><span class="av">${me.initials}</span><div><b>${esc(me.name)}</b><span>${me.role}</span></div></div>
  </div>`;
}

function topbar(title, crumb = "") {
  return `${crumb ? `<div class="crumb">${crumb}</div>` : ""}<h1>${title}</h1>
  <div class="right"><span>${esc(K.hotel.today)}</span><span class="clock">${K.hotel.now} ${K.hotel.tz}</span></div>`;
}

/* The interlinear: Kiku's written line on the upper register, the specialist's spoken line on the lower.
   Shared words bridge both registers. */
function interlinear(diff, who, opts = {}) {
  let out = opts.key === false ? "" : `<span class="key"><span>${opts.wroteLabel || "Kiku wrote"}</span><span>${opts.saidLabel || esc(who) + " said"}</span></span>`;
  diff.forEach((seg, si) => {
    let op = seg.op;
    if (opts.live && si === diff.length - 1 && op === "del") op = "ahead";
    const words = seg.text.split(" ");
    words.forEach((w, wi) => {
      const cls = `w ${op}${wi === 0 ? " s0" : ""}${wi === words.length - 1 ? " s1" : ""}`;
      if (op === "same") out += `<span class="${cls}"><span>${esc(w)}</span></span>`;
      else if (op === "del" || op === "ahead") out += `<span class="${cls}"><span class="a">${esc(w)}</span><span class="b"></span></span>`;
      else out += `<span class="${cls}"><span class="a"></span><span class="b">${esc(w)}</span></span>`;
    });
    if (opts.live && op === "ins" && (si === diff.length - 1 || diff[si + 1].op === "del" && si + 1 === diff.length - 1)) {
      out += `<span class="w ins"><span class="a"></span><span class="b" style="background:none;padding:0"><span class="caret"></span></span></span>`;
    }
  });
  return `<div class="il ${opts.cls || ""}" ${opts.style ? `style="${opts.style}"` : ""}>${out}</div>`;
}

function matchTag(turn) {
  if (turn.asWritten) return `<span class="asw">${ic("check")}Spoken as written</span>`;
  return `<span class="match"><span class="mb" style="--m:${turn.match}%"><i></i></span>${turn.match}% as written</span>`;
}

function transcript(list, specialistName) {
  const first = specialistName.split(" ")[0];
  return list.map((t) => {
    if (t.speaker === "system") {
      const icon = { escalation: "triangle-alert", join: "headphones", takeover: "mic", end: "phone-off" }[t.kind] || "dot";
      return `<div class="sys ${t.kind}"><span class="t">${t.t}</span><div class="ev"><span class="pill">${ic(icon)}${esc(t.text)}</span></div></div>`;
    }
    if (t.karaoke) {
      return `<div class="kturn ${t.asWritten ? "as-written" : ""}"><span class="t">${t.t}</span><span class="who"><span>Kiku wrote</span><span>${esc(first)} said</span></span>
        <div class="body">${interlinear(t.diff, first, { live: t.live, key: false })}<div class="kmeta">${matchTag(t)}</div></div></div>`;
    }
    const who = t.speaker === "agent" ? "Kiku" : t.speaker === "guest" ? "Guest" : first;
    return `<div class="turn ${t.speaker}"><span class="t">${t.t}</span><span class="who">${who}</span><p class="say">${esc(t.text)}</p></div>`;
  }).join("");
}

function boot() { if (window.lucide) lucide.createIcons({ attrs: { "stroke-width": 1.8 } }); }
