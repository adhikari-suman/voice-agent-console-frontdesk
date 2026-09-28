/* Shared helpers for design 7 */
(function () {
  const K = window.KIKU;
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const STATUS = {
    completed: { label: "Completed", cls: "st-done" },
    in_progress: { label: "In progress", cls: "st-prog" },
    escalated: { label: "Escalated", cls: "st-esc" },
    failed: { label: "Failed", cls: "st-fail" },
  };
  const SHAPE = {
    completed: '<svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="6.2" fill="currentColor"/><path d="M4.2 7.2l1.9 1.9 3.8-4" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    in_progress: '<svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 1.4a5.6 5.6 0 0 1 0 11.2z" fill="currentColor"/></svg>',
    escalated: '<svg viewBox="0 0 14 14"><path d="M7 .9l6.3 11.4H.7z" fill="currentColor"/><path d="M7 5v3.4" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/><circle cx="7" cy="10.3" r=".9" fill="#fff"/></svg>',
    failed: '<svg viewBox="0 0 14 14"><rect x="1" y="1" width="12" height="12" rx="1.5" fill="currentColor"/><path d="M4.6 4.6l4.8 4.8M9.4 4.6l-4.8 4.8" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>',
  };
  const status = (key, bare) => {
    const s = STATUS[key];
    return `<span class="status ${s.cls}${bare ? " bare" : ""}">${SHAPE[key]}${s.label}</span>`;
  };

  // The mark: three lanes of a stave, the middle one full length
  const mark = (size = 34, light = true) => `<svg width="${size}" height="${size}" viewBox="0 0 34 34" aria-hidden="true">
    <path d="M9 6h19l-3 5H9z" fill="#FF9966"/>
    <path d="M4 14.5h26l-3 5H4z" fill="${light ? "#fff" : "#2B1E27"}"/>
    <path d="M9 23h15l-3 5H9z" fill="#846E77"/></svg>`;

  const ic = n => `<i data-lucide="${n}"></i>`;

  const live = K.calls.filter(c => c.status === "in_progress" || c.status === "escalated");

  function rail(role, active) {
    const person = role === "admin" ? K.people.admin : K.people.specialist;
    const item = (id, icon, label, extra = "") =>
      `<a class="${active === id ? "on" : ""}" href="#"><span class="ri">${ic(icon)}</span>${extra}<span class="rl">${label}</span></a>`;
    const waiting = live.filter(c => c.status === "escalated" && !c.specialist).length;
    let nav = "";
    if (role !== "admin") nav += item("live", "radio-tower", "Live", `<span class="count">${waiting}</span>`);
    nav += item("logs", "list", "Call logs");
    nav += `<span class="rsep" title="Outbound calls"></span>`;
    nav += item("campaign", "megaphone", "Campaign");
    nav += item("upsell", "concierge-bell", "Upsell");
    nav += item("make", "phone-outgoing", "Make a call");
    if (role === "admin") { nav += `<span class="rsep"></span>`; nav += item("users", "users", "Users"); }
    const dots = live.map(c => `<i class="${c.status === "escalated" ? (c.specialist ? "h" : "w") : ""}" title="${esc_(c.guest)}"></i>`).join("");
    return `
      <div class="rbrand">${mark(32)}</div>
      <nav class="nav">${nav}</nav>
      <div class="rail-foot">
        <div class="livedots" title="Calls on the line now"><span class="ld">${dots}</span><span class="rl">${live.length} live</span></div>
        <span class="avatar me-av" title="${esc_(person.name)}, ${person.role}">${person.initials}</span>
      </div>`;
  }
  const esc_ = esc;

  // Interlinear gloss: the spoken line is the main text; what Kiku wrote sits above
  // each improvised span in small struck type. Dropped words stay inline, struck.
  function gloss(diff, opts = {}) {
    const words = t => t.split(/\s+/).filter(Boolean);
    const out = [];
    for (let i = 0; i < diff.length; i++) {
      const seg = diff[i], nx = diff[i + 1];
      if (seg.op === "same") { words(seg.text).forEach(w => out.push(`<span class="u">${esc(w)}</span>`)); continue; }
      if (nx && nx.op !== "same" && nx.op !== seg.op) {
        const ins = seg.op === "ins" ? seg : nx, del = seg.op === "del" ? seg : nx;
        out.push(`<span class="u pair"><span class="g">${esc(del.text)}</span><span class="m">${esc(ins.text)}</span></span>`);
        i++; continue;
      }
      if (seg.op === "ins") words(seg.text).forEach(w => out.push(`<span class="u add">${esc(w)}</span>`));
      else words(seg.text).forEach(w => out.push(`<span class="u drop">${esc(w)}</span>`));
    }
    if (opts.caret) out.push(`<span class="u"><span class="livecaret"></span></span>`);
    const verbatim = diff.every(s => s.op === "same");
    return `<div class="il${verbatim ? " verbatim" : ""}${opts.lg ? " lg" : ""}">${out.join(" ")}</div>`;
  }

  const ring = (m, size = 30) => {
    const r = 12, c = 2 * Math.PI * r;
    return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 30 30" aria-hidden="true"><circle cx="15" cy="15" r="${r}" fill="none" stroke="var(--apricot-t)" stroke-width="4"/><circle cx="15" cy="15" r="${r}" fill="none" stroke="${m === 100 ? "var(--done)" : "var(--mauve)"}" stroke-width="4" stroke-dasharray="${(m / 100 * c).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 15 15)"/></svg>`;
  };
  const matchGauge = m => `<span class="match">${ring(m, 22)}<span><b>${m}%</b> of Kiku's words kept</span></span>`;

  const sysIcon = { escalation: "triangle-alert", join: "headphones", takeover: "hand", end: "phone-off" };

  function transcript(list, specialistName) {
    const first = (specialistName || "").split(" ")[0];
    return list.map(r => {
      if (r.speaker === "system") {
        return `<div class="turn sys"><div class="t num">${r.t}</div><div class="sysline ${r.kind}">${ic(sysIcon[r.kind] || "info")}${esc(r.text)}</div></div>`;
      }
      if (r.karaoke) {
        return `<div class="turn karaoke${r.asWritten ? " aswritten" : ""}"><div class="t num">${r.t}</div><div class="kbox">
          <div class="k-head"><span class="spk h">${esc(first)} said</span>
          ${r.asWritten ? `<span class="seal">${ic("badge-check")}Spoken as written</span>` : `<span class="impro">${ic("pen-line")}Improvised</span>`}
          <span style="margin-left:auto">${matchGauge(r.match)}</span></div>
          ${gloss(r.diff, { caret: r.live })}
          ${r.asWritten ? "" : `<div class="kline"><span>Kiku wrote</span>${esc(r.wrote)}</div>`}</div></div>`;
      }
      const cls = r.speaker === "agent" ? "agent" : "guest";
      const label = r.speaker === "agent" ? `<div class="spk k">Kiku</div>` : `<div class="spk g">Guest</div>`;
      return `<div class="turn ${cls}"><div class="t num">${r.t}</div><div>${label}<div class="tx">${esc(r.text)}</div></div></div>`;
    }).join("");
  }

  function topbar(title, extra = "") {
    return `<header class="top">${title}<div class="right">${extra}<span class="clock">${ic("clock")}${K.hotel.today}, ${K.hotel.now} ${K.hotel.tz}</span></div></header>`;
  }

  function meter(n = 16, human = false, seed = 1) {
    let h = "";
    for (let i = 0; i < n; i++) {
      const v = 6 + ((i * 7 + seed * 5) % 13) * 1.2;
      h += `<i style="height:${v}px;animation-delay:${((i * 3 + seed) % 7) * 0.12}s"></i>`;
    }
    return `<span class="meter${human ? " h" : ""}">${h}</span>`;
  }

  function mount(role, active, html) {
    document.body.innerHTML = `<div class="app"><aside class="rail">${rail(role, active)}</aside><main class="main">${html}</main></div>`;
    if (window.lucide) window.lucide.createIcons();
  }

  window.UI = { K, esc, status, STATUS, mark, ic, gloss, ring, matchGauge, transcript, topbar, meter, mount, live };
})();
