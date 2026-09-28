(function () {
  const K = window.KIKU;

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const ic = (name, cls = "") => `<i data-lucide="${name}" class="${cls}" aria-hidden="true"></i>`;

  const STATUS = { completed: "Completed", in_progress: "In progress", escalated: "Escalated", failed: "Failed" };
  const SHAPES = {
    completed: '<rect class="s-completed" x="0.5" y="0.5" width="9" height="9"/>',
    in_progress: '<circle class="s-in_progress" cx="5" cy="5" r="4.5"/>',
    escalated: '<path class="s-escalated" d="M5 0 L10 9.5 H0 Z"/>',
    failed: '<path class="s-failed" d="M1 1 L9 9 M9 1 L1 9"/>',
  };
  const shape = (s) => `<svg viewBox="0 0 10 10" aria-hidden="true">${SHAPES[s]}</svg>`;
  const status = (s, opts = {}) => {
    const inner = `${shape(s)}<span>${opts.label || STATUS[s]}</span>`;
    return opts.chip ? `<span class="chip st">${inner}</span>` : `<span class="st">${inner}</span>`;
  };
  const xmark = () => '<svg class="xmark" viewBox="0 0 10 10" aria-hidden="true"><path d="M1 1 L9 9 M9 1 L1 9"/></svg>';

  const NAV = {
    specialist: [["Live", "02-live-overview.html"], ["Call logs", "03-call-logs.html"], ["Outbound", "07-outbound-campaign.html"]],
    admin: [["Call logs", "03-call-logs.html"], ["Outbound", "07-outbound-campaign.html"], ["Users", "10-users.html"]],
  };

  function topbar(role, current, opts = {}) {
    const p = K.people[role];
    const tabs = NAV[role]
      .map(([label, href]) => {
        const cls = ["tab"];
        if (label === current) cls.push("is-current");
        if (label === opts.hover) cls.push("is-hover");
        const dot = opts.liveDot && label === "Live" ? '<span class="dot" aria-label="You are on a call"></span>' : "";
        return `<a class="${cls.join(" ")}" href="${href}"${label === current ? ' aria-current="page"' : ""}>${label}${dot}</a>`;
      })
      .join("");
    const day = K.hotel.today.split(" ");
    return `<header class="topbar">
      <a class="wordmark" href="${role === "admin" ? "03-call-logs.html" : "02-live-overview.html"}">${esc(K.product.name)}</a>
      <nav class="nav" aria-label="Main">${tabs}</nav>
      <div class="who">
        <span class="clock mono">${day[0].slice(0, 3)} ${day[1]} ${day[2].slice(0, 3)} · ${K.hotel.now} ${K.hotel.tz}</span>
        <span class="vr"></span>
        <div class="id"><span class="role">${p.role}</span><span class="name">${esc(p.name)}</span></div>
        <span class="avatar ink">${p.initials}</span>
        <button class="icon-btn" aria-label="Sign out">${ic("log-out")}</button>
      </div>
    </header>`;
  }

  const join = (parts) => parts.filter(Boolean).join(" ");

  function diffWrote(diff, opts = {}) {
    const lastDel = opts.live ? diff.map((d) => d.op).lastIndexOf("del") : -1;
    const lastIsTail = lastDel === diff.length - 1 || (lastDel > -1 && diff.slice(lastDel + 1).every((d) => d.op === "ins"));
    return join(
      diff.map((d, i) => {
        if (d.op === "same") return esc(d.text);
        if (d.op === "del") {
          if (opts.live && lastIsTail && i === lastDel) return `<span class="w-ahead">${esc(d.text)}</span>`;
          return `<s class="w-del">${esc(d.text)}</s>`;
        }
        return "";
      })
    );
  }
  function diffSaid(diff) {
    return join(
      diff.map((d) => {
        if (d.op === "same") return esc(d.text);
        if (d.op === "ins") return `<mark class="w-ins">${esc(d.text)}</mark>`;
        return "";
      })
    );
  }

  const SYS_ICON = {
    escalation: '<svg class="tri" viewBox="0 0 10 10" aria-hidden="true"><path d="M5 0 L10 9.5 H0 Z" fill="#FF6A13"/></svg>',
    join: ic("headphones"),
    takeover: ic("mic"),
    end: ic("phone-off"),
  };

  function spineEntry(e, ctx) {
    if (e.speaker === "guest") {
      return `<div class="sp-guest${e._latest ? " latest" : ""}">
        <div class="g-meta"><span class="tc">${e.t}</span><span class="who-lbl">${esc(ctx.guest)}${e._latest ? " · latest" : ""}</span></div>
        <p class="sp-text">${esc(e.text)}</p></div>`;
    }
    if (e.speaker === "system") {
      return `<div class="sp-sys ${e.kind}"><span class="lbl">${SYS_ICON[e.kind] || ""}<span class="mono">${e.t}</span><span>${esc(e.text)}</span></span></div>`;
    }
    if (e.speaker === "agent") {
      return `<div class="sp-row">
        <div class="sp-l"><span class="who-lbl">${esc(K.product.name)}</span><p class="sp-text">${esc(e.text)}</p></div>
        <div class="sp-c"><span class="tc">${e.t}</span></div>
        <div class="sp-r"></div></div>`;
    }
    if (e.karaoke) {
      const aw = e.asWritten;
      const cur = ctx.current === e.t;
      return `<div class="sp-row kara${aw ? " aw" : ""}">
        <div class="sp-l"><span class="who-lbl">${esc(K.product.name)} wrote</span><p class="sp-text">${diffWrote(e.diff)}</p></div>
        <div class="sp-c"><span class="tc${cur ? " now" : ""}">${e.t}</span>${
          aw ? `<span class="chip ink">${ic("check", "i12")}As written</span>` : `<span class="match">${e.match}%</span>`
        }</div>
        <div class="sp-r"><span class="who-lbl">${esc(ctx.specialistFirst)} said</span><p class="sp-text">${diffSaid(e.diff)}</p></div></div>`;
    }
    return "";
  }

  function legend() {
    return `<div class="legend">
      <span class="sw">Matched</span>
      <s class="w-del">Dropped</s>
      <mark class="w-ins">Improvised</mark>
    </div>`;
  }

  function meter(level, total = 24, peak = -1) {
    let out = "";
    for (let i = 0; i < total; i++) out += `<i class="${i < level ? (i === peak ? "pk" : "on") : ""}"></i>`;
    return `<span class="meter" aria-hidden="true">${out}</span>`;
  }

  function outboundHead(current) {
    const tabs = [["Campaign", "07-outbound-campaign.html"], ["Upsell", "08-outbound-upsell.html"], ["Make a call", "09-outbound-make-a-call.html"]];
    return `<header class="ph"><h1 class="h52" style="min-width:${4 * 90 + 3 * 24}px">Outbound</h1>
      <nav class="subtabs" aria-label="Outbound call types">${tabs
        .map(([l, h]) => `<a class="subtab${l === current ? " on" : ""}" href="${h}"${l === current ? ' aria-current="page"' : ""}>${l}</a>`)
        .join("")}</nav></header>`;
  }

  function fileBlock(f, opts = {}) {
    const okPct = ((f.ready / f.rows) * 100).toFixed(2);
    return `<div class="drop">
      <div class="file-line">${ic("file-spreadsheet", "i20")}<span class="fname">${esc(f.file)}</span>
        <span class="meta">${f.size ? esc(f.size) + " · " : ""}${f.rows} rows${f.columns ? " · columns " + f.columns.map((c) => `<span class="mono t12">${esc(c)}</span>`).join(", ") : ""}</span>
        <span class="end"><a class="link" href="#">Replace file</a></span></div>
      <div class="ratio" aria-hidden="true"><span class="ok" style="width:${okPct}%"></span><span class="bad" style="flex:1"></span></div>
      <div class="tally"><span><b>${f.ready}</b> ready</span><span>${xmark()}<b>${f.errors}</b> ${f.errors === 1 ? "error" : "errors"}</span>
        <span class="help" style="margin-left:auto">${opts.note || ""}</span></div>
    </div>`;
  }

  function fitTail(tx, headH = 0) {
    const spine = tx.querySelector(".spine");
    const avail = tx.clientHeight - headH;
    const kids = [...spine.children];
    let h = 0, i = kids.length;
    while (i > 0 && h + kids[i - 1].offsetHeight <= avail) h += kids[--i].offsetHeight;
    return { spine, avail, h };
  }

  function mount(html, after) {
    document.getElementById("app").innerHTML = html;
    if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.5 } });
    if (!after) return;
    void document.body.offsetHeight;
    const f = document.fonts;
    const loads = f ? ["400 16px Geist", "500 16px Geist", "700 16px Geist", "500 12px 'Geist Mono'"].map((d) => f.load(d)) : [];
    Promise.all(loads).then(() => (f ? f.ready : null)).then(() => requestAnimationFrame(after));
  }

  const firstName = (n) => String(n || "").split(" ")[0];
  const toSec = (t) => { const [m, s] = t.split(":").map(Number); return m * 60 + s; };
  const fmt = (sec) => `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;

  window.UI = { fitTail, outboundHead, fileBlock, K, esc, ic, status, shape, xmark, topbar, diffWrote, diffSaid, spineEntry, legend, meter, mount, firstName, toSec, fmt, STATUS };
})();
