/* Kiku design 8: shared helpers. Relies on window.KIKU from data.js */
(function () {
  const K = window.KIKU;
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const ic = (n, cls = "") => `<i data-lucide="${n}" class="${cls}"></i>`;

  // Status shapes: circle+check, half-filled ring, triangle, square+x
  const SHAPES = {
    completed: `<svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="6.2" fill="currentColor"/><path d="M4.2 7.2l1.9 1.9 3.8-4" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    in_progress: `<svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 2.6a4.4 4.4 0 0 1 0 8.8z" fill="currentColor"/></svg>`,
    escalated: `<svg viewBox="0 0 14 14"><path class="f" d="M7 1.4L13 12.3H1z" fill="currentColor" stroke-linejoin="round"/><path d="M7 5.2v3.3" stroke="#1B1C1E" stroke-width="1.6" stroke-linecap="round"/><circle cx="7" cy="10.2" r=".9" fill="#1B1C1E"/></svg>`,
    failed: `<svg viewBox="0 0 14 14"><rect x="1" y="1" width="12" height="12" rx="2" fill="currentColor"/><path d="M4.6 4.6l4.8 4.8M9.4 4.6l-4.8 4.8" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  };
  const LABEL = { completed: "Completed", in_progress: "In progress", escalated: "Escalated", failed: "Failed" };
  const status = (s, chip = false) => `<span class="status ${s}${chip ? " chip" : ""}">${SHAPES[s]}${LABEL[s]}</span>`;

  const dir = c => c.direction === "inbound"
    ? `<span class="dir">${ic("phone-incoming")}Inbound</span>`
    : `<span class="dir">${ic("phone-outgoing")}Outbound</span>`;

  const initials = n => n.split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();

  // Duet: Kiku's script (left) and what the person said (right), from one diff.
  function scriptHtml(diff) {
    return diff.map(d => d.op === "same" ? esc(d.text) : d.op === "del" ? `<del>${esc(d.text)}</del>` : `<span class="ins-at" title="Specialist added words here">&#8248;</span>`).join(" ");
  }
  function spokenHtml(diff, caret) {
    return diff.filter(d => d.op !== "del").map(d => d.op === "same" ? esc(d.text) : `<mark>${esc(d.text)}</mark>`).join(" ") + (caret ? `<span class="caret"></span>` : "");
  }
  const megg = m => `<span class="megg" title="${m}% of Kiku's words kept"><b style="height:${m}%"></b></span><span class="pct">${m}%</span>`;
  const match = m => `<span class="match"><span class="bar"><b style="width:${m}%"></b></span><span class="num">${m}%</span> of Kiku's words kept</span>`;
  const verdict = asW => asW
    ? `<span class="verdict asw">${ic("check")}Spoken as written</span>`
    : `<span class="verdict imp">${ic("pencil-line")}Improvised</span>`;

  // rows for a duet grid. who: {guestInitials, guestName, spec, specInitials}
  function duetRows(list, o) {
    let post = false;
    return list.map(x => {
      if (x.speaker === "system") {
        if (x.kind === "takeover") post = true;
        const icn = { escalation: "triangle-alert", join: "headphones", takeover: "mic", end: "phone-off" }[x.kind];
        return `<div class="sysrow ${x.kind}"><span class="pill"><span class="ico">${ic(icn)}</span><span class="num" style="font-size:12px">${x.t}</span>${esc(x.text)}</span></div>`;
      }
      const sp = cls => `<div class="sp${post ? " post" : ""}">${cls}</div>`;
      if (x.karaoke && x.asWritten) {
        return `<div class="rowspan"><div class="say asw"><div class="who"><span class="num" style="color:var(--ink)">${x.t}</span>${verdict(true)}<span>Kiku wrote it and ${o.specFirst} said it word for word</span></div>${esc(x.said)}</div></div>`;
      }
      if (x.karaoke) {
        return `<div class="c left"><div class="say script"><div class="who">${ic("pencil")}Kiku wrote</div>${scriptHtml(x.diff)}</div></div>
          ${sp(`<span class="tm">${x.t}</span>${megg(x.match)}`)}
          <div class="c"><div class="say spoken"><div class="who"><span class="egg sm human" style="width:18px;height:21px;font-size:8.5px">${o.specInitials}</span>${o.specLabel} said</div>${spokenHtml(x.diff, x.live)}</div></div>`;
      }
      if (x.speaker === "agent") {
        return `<div class="c left"><div class="say kiku"><div class="who"><span class="egg sm kiku" style="width:18px;height:21px;font-size:8.5px">Ki</span>Kiku said</div>${esc(x.text)}</div></div>${sp(`<span class="tm">${x.t}</span><span class="node"></span>`)}<div class="c"></div>`;
      }
      return `<div class="c left"></div>${sp(`<span class="tm">${x.t}</span><span class="node"></span>`)}<div class="c"><div class="say guest"><div class="who">${esc(o.guest)}</div>${esc(x.text)}</div></div>`;
    }).join("");
  }

  // Deterministic level bars
  function level(n, seed = 3, maxH = 20, anim = false) {
    let x = seed, out = "";
    for (let i = 0; i < n; i++) {
      x = (x * 9301 + 49297) % 233280;
      const h = 4 + Math.round((x / 233280) * (maxH - 4));
      out += `<i style="height:${h}px;${anim ? `animation-delay:-${(i * 0.13) % 1.1}s` : ""}"></i>`;
    }
    return `<span class="level${anim ? " anim" : ""}">${out}</span>`;
  }

  const NAV = {
    specialist: [
      { g: "Calls" },
      { id: "live", label: "Live board", icon: "radio", href: "02-live-overview.html", count: 2 },
      { id: "logs", label: "Call logs", icon: "list", href: "03-call-logs.html" },
      { g: "Outbound" },
      { id: "campaign", label: "Campaign", icon: "megaphone", href: "07-outbound-campaign.html" },
      { id: "upsell", label: "Upsell", icon: "concierge-bell", href: "08-outbound-upsell.html" },
      { id: "make", label: "Make a call", icon: "phone-outgoing", href: "09-outbound-make-a-call.html" },
    ],
    admin: [
      { g: "Calls" },
      { id: "logs", label: "Call logs", icon: "list", href: "03-call-logs.html" },
      { g: "Outbound" },
      { id: "campaign", label: "Campaign", icon: "megaphone", href: "07-outbound-campaign.html" },
      { id: "upsell", label: "Upsell", icon: "concierge-bell", href: "08-outbound-upsell.html" },
      { id: "make", label: "Make a call", icon: "phone-outgoing", href: "09-outbound-make-a-call.html" },
      { g: "Team" },
      { id: "users", label: "Users", icon: "users", href: "10-users.html" },
    ],
  };

  function rail(role, active) {
    const p = K.people[role];
    const items = NAV[role].map((it, i) => it.g
      ? (i ? `<hr>` : "")
      : `<a href="${it.href}" class="${it.id === active ? "on" : ""}"><span class="ico">${ic(it.icon)}</span>${it.label}${it.count ? `<span class="count">${it.count}</span>` : ""}</a>`).join("");
    return `
      <div class="wordmark">Kiku<span class="tick"></span></div>
      <div class="rail-hotel"><b>The Brenlow</b>${K.hotel.city}</div>
      <nav class="nav">${items}</nav>
      <div class="rail-foot"><div class="egg ${role === "specialist" ? "me" : "admin"}">${p.initials}</div>${p.name.split(" ")[0]}<br>${p.role}</div>`;
  }

  function clock() {
    const live = K.calls.filter(c => c.status === "in_progress" || c.status === "escalated").length;
    return `<div class="hotelstrip"><span>Hotel line <span class="num" style="font-size:14px;color:var(--ink)">${K.hotel.line}</span></span><span class="live"><i></i>${live} live</span><span class="sep"></span><div class="clock">${K.hotel.today}<span class="num">${K.hotel.now}</span>${K.hotel.tz}</div></div>`;
  }

  window.UI = { K, esc, ic, status, dir, duetRows, scriptHtml, spokenHtml, megg, match, verdict, level, rail, clock, initials, LABEL, SHAPES };

  document.addEventListener("DOMContentLoaded", () => {
    const r = document.querySelector(".rail[data-role]");
    if (r) r.innerHTML = rail(r.dataset.role, r.dataset.active);
    document.querySelectorAll("[data-clock]").forEach(el => (el.innerHTML = clock()));
    if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.9 } });
  });
})();
