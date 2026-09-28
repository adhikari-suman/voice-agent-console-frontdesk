/* Indigo Braid: shared helpers for every screen. */
(function () {
  const K = window.KIKU;
  const P = {
    live: '<circle cx="12" cy="12" r="2"/><path d="M16.2 7.8a6 6 0 0 1 0 8.4M7.8 16.2a6 6 0 0 1 0-8.4M19.1 4.9a10 10 0 0 1 0 14.2M4.9 19.1a10 10 0 0 1 0-14.2"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    campaign: '<path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    upsell: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><path d="M7 7h.01"/>',
    call: '<path d="M16 2h6v6M22 2l-7 7"/><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    headphones: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
    mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"/>',
    micoff: '<path d="m2 2 20 20M18.9 13.4A7 7 0 0 0 19 12v-2M5 10v2a7 7 0 0 0 12 5M15 9.3V5a3 3 0 0 0-5.7-1.3M9 9v3a3 3 0 0 0 5.1 2.1M12 19v3"/>',
    hangup: '<path d="M10.7 13.3a16 16 0 0 0 3.4 2.6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-3.3-2.7M5.2 13.4A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8"/><path d="M22 2 2 22"/>',
    hand: '<path d="M18 11V6a2 2 0 0 0-4 0M14 10V4a2 2 0 0 0-4 0v2M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-5.9-2.4l-3.6-3.6a2 2 0 0 1 2.8-2.8L7 15"/>',
    back: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    file: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="M14 2v6h6M8 13h2M14 13h2M8 17h2M14 17h2"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    alert: '<path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3z"/><path d="M12 9v4M12 17h.01"/>',
    in: '<path d="M17 7 7 17M17 17H7V7"/>',
    out: '<path d="M7 17 17 7M7 7h10v10"/>',
    play: '<path d="M6 3l14 9-14 9V3z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    chevdown: '<path d="m6 9 6 6 6-6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    userplus: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    note: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
    bed: '<path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/>',
    booking: '<path d="M4 2h16v20l-4-2-4 2-4-2-4 2z"/><path d="M8 7h8M8 11h8M8 15h5"/>',
    pause: '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',
    signout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    wave: '<path d="M2 12h2M6 8v8M10 5v14M14 9v6M18 7v10M22 12h-2"/>',
  };
  const icon = (n, cls = "") => `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n] || ""}</svg>`;

  /* status shapes: filled square (done), half ring (running), triangle (needs a person), crossed diamond (failed) */
  const SHAPE = {
    completed: '<svg viewBox="0 0 12 12"><rect x="1" y="1" width="10" height="10" fill="currentColor"/><path d="M3.3 6.2 5.1 8 8.8 4.2" stroke="#fff" stroke-width="1.6" fill="none"/></svg>',
    in_progress: '<svg viewBox="0 0 12 12"><circle cx="6" cy="6" r="4.7" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M6 1.3A4.7 4.7 0 0 1 6 10.7Z" fill="currentColor"/></svg>',
    escalated: '<svg viewBox="0 0 12 12"><path d="M6 .8 11.4 10.8H.6Z" fill="currentColor"/><path d="M6 4.3v3.2" stroke="#fff" stroke-width="1.4"/><circle cx="6" cy="9.1" r=".8" fill="#fff"/></svg>',
    failed: '<svg viewBox="0 0 12 12"><path d="M6 .5 11.5 6 6 11.5.5 6Z" fill="currentColor"/><path d="m4.2 4.2 3.6 3.6m0-3.6L4.2 7.8" stroke="#fff" stroke-width="1.4"/></svg>',
  };
  const LABEL = { completed: "Completed", in_progress: "In progress", escalated: "Escalated", failed: "Failed" };
  const status = (s, extra = "") => `<span class="status ${s} ${extra}">${SHAPE[s]}${LABEL[s]}</span>`;
  const dir = (d) => d === "inbound" ? `<span class="dir">${icon("in")}Inbound</span>` : `<span class="dir">${icon("out")}Outbound</span>`;

  const brandMark = (size = 30) => `<svg class="brand-mark" width="${size}" height="${size}" viewBox="0 0 30 30" aria-hidden="true">
      <rect x="0" y="0" width="30" height="30" fill="#5B47C4"/>
      <path d="M0 11h9c5 0 7 8 12 8h9" stroke="#CC3066" stroke-width="3.2" fill="none"/>
      <path d="M0 19h9c5 0 7-8 12-8h9" stroke="#fff" stroke-width="3.2" fill="none"/>
    </svg>`;

  function shell({ role, active, title, crumb = "", badge = "" }) {
    const isAdmin = role === "admin";
    const me = isAdmin ? K.people.admin : K.people.specialist;
    const esc = K.calls.filter(c => c.status === "escalated" && !c.specialist).length;
    const item = (id, ic, label, extra = "") => `<a href="#" class="${active === id ? "on" : ""}">${icon(ic)}<span>${label}</span>${extra}</a>`;
    const nav = `
      <nav class="nav">
        ${isAdmin ? "" : item("live", "live", "Live board", `<span class="count num" title="Needs a specialist">${esc}</span>`)}
        ${item("logs", "list", "Call logs")}
        <div class="nav-label">Outbound calls</div>
        ${item("campaign", "campaign", "Campaign")}
        ${item("upsell", "upsell", "Upsell")}
        ${item("make", "call", "Make a call")}
        ${isAdmin ? `<div class="nav-label">Team</div>${item("users", "users", "Users")}` : ""}
      </nav>`;
    const rail = `
      <aside class="rail">
        <div class="brand">${brandMark()}<div><div class="brand-name">Kiku</div><div class="brand-sub">${K.hotel.name}, ${K.hotel.city}</div></div></div>
        ${nav}
        <div class="rail-foot">
          <div class="avatar">${me.initials}</div>
          <div style="min-width:0"><div class="who">${me.name}</div><div class="role">${me.role}</div></div>
        </div>
      </aside>`;
    const top = `
      <header class="topbar">
        <h1>${crumb ? `<span class="crumb">${crumb} /</span> ` : ""}${title}</h1>${badge}
        <div class="sp"></div>
        <div class="clock">${icon("call")}<span>Hotel line <b class="num">${K.hotel.line}</b></span></div>
        <div class="clock">${icon("clock")}<span>${K.hotel.today.replace(" 2026", "")}, <b class="num">${K.hotel.now}</b> ${K.hotel.tz}</span></div>
        <span class="demo" title="${K.synthetic}">Demo data</span>
      </header>`;
    return { rail, top };
  }

  function mount(opts, contentHTML) {
    const { rail, top } = shell(opts);
    document.body.innerHTML = `<div class="app">${rail}<main class="main">${top}<section class="content ${opts.contentClass || ""}">${contentHTML}</section></main></div>`;
  }

  /* karaoke braid: explode each diff segment into word columns */
  function braid(diff, { who = "Specialist", big = false, live = false, solo = false } = {}) {
    let words = "";
    const perWord = (seg) => seg.text.split(/\s+/).filter(Boolean).forEach((w) => {
      if (seg.op === "same") return;
      else words += `<span class="w ${seg.op}"><span class="t">${w}</span><span class="b">${w}</span></span>`;
    });
    for (let i = 0; i < diff.length; i++) {
      const seg = diff[i], nx = diff[i + 1];
      if (seg.op === "del" && nx && nx.op === "ins") {
        /* a substitution: what Kiku wrote and what was said, in parallel */
        words += `<span class="w sub"><span class="t">${seg.text}</span><span class="b">${nx.text}${live && i + 2 === diff.length ? '<i class="caret-bar"></i>' : ""}</span></span>`;
        i++;
      } else if (seg.op === "same") words += `<span class="w same"><span>${seg.text}</span></span>`;
      else perWord(seg);
    }
    return `<div class="braid-wrap ${big ? "big" : ""}">
      <div class="braid-keys"><span class="kw"><i class="key-sq"></i>Kiku wrote</span><span class="hs"><i class="key-ci"></i>${who} said</span></div>
      <div class="braid ${big ? "big" : ""} ${solo ? "solo" : ""}">${words}</div>
    </div>`;
  }
  const meter = (pct, n = 10) => `<span class="meter" aria-label="${pct}% word match">${Array.from({ length: n }, (_, i) => `<i class="${i < Math.round(pct / (100 / n)) ? "on" : ""}"></i>`).join("")}</span>`;

  window.UI = { K, icon, status, dir, mount, braid, meter, brandMark, LABEL, SHAPE };
})();
