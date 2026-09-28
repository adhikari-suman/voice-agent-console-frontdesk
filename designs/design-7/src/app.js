(function () {
  const K = window.KIKU;

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const icon = (n, cls) => `<i class="bi bi-${n}${cls ? " " + cls : ""}" aria-hidden="true"></i>`;

  const STATUS = {
    completed: { label: "Completed", cls: "ok", icon: "check-lg" },
    in_progress: { label: "In progress", cls: "run", icon: "play-fill" },
    escalated: { label: "Escalated", cls: "esc", icon: "arrow-up" },
    failed: { label: "Failed", cls: "fail", icon: "x-lg" },
  };
  const status = (s) => {
    const m = STATUS[s];
    return `<span class="st st-${m.cls}"><span class="st-i">${icon(m.icon)}</span>${m.label}</span>`;
  };
  const tile = (s) => {
    const m = STATUS[s];
    return `<span class="tile ${m.cls}">${icon(m.icon)}</span>`;
  };

  const live = K.calls.filter((c) => c.status === "in_progress" || c.status === "escalated");
  const NAV = {
    specialist: [
      { id: "live", t: "Live", n: `<span class="live-dot"></span>${live.length} calls on air`, href: "02-live-overview.html" },
      { id: "logs", t: "Call logs", n: `${K.stats.callsToday} calls today`, href: "03-call-logs.html" },
      { id: "out", t: "Outbound", n: "Campaign · Upsell · Call", href: "07-outbound-campaign.html" },
    ],
    admin: [
      { id: "logs", t: "Call logs", n: `${K.stats.callsToday} calls today`, href: "03-call-logs.html" },
      { id: "out", t: "Outbound", n: "Campaign · Upsell · Call", href: "07-outbound-campaign.html" },
      { id: "users", t: "Users", n: `${K.users.length} people`, href: "10-users.html" },
    ],
  };
  const LETTERS = "ABCD";

  function band(role, active, hover) {
    const p = role === "admin" ? K.people.admin : K.people.specialist;
    const keys = NAV[role]
      .map((k, i) => `<a class="key${k.id === active ? " is-on" : ""}${k.id === hover ? " is-hover" : ""}" href="${k.href}"${k.id === active ? ' aria-current="page"' : ""}>
        <span class="key-l">${LETTERS[i]}</span><span class="key-t">${k.t}</span><span class="key-n">${k.n}</span></a>`)
      .join("");
    const day = K.hotel.today.split(" ").slice(0, 3).join(" ").replace("Sunday", "Sun").replace("September", "Sep");
    return `<div class="brand"><a class="wordmark" href="02-live-overview.html">${K.product.name}</a><div class="brand-sub">${K.hotel.name}, ${K.hotel.city}</div></div>
      <nav class="keys" aria-label="Main">${keys}</nav>
      <div class="me"><div class="me-meta"><div class="me-name">${p.name}</div><div class="me-role">${p.role} · ${p.title}</div><div class="me-clock num">${day} · ${K.hotel.now} ${K.hotel.tz}</div></div>
      <span class="av">${p.initials}</span></div>`;
  }

  function mountBand(role, active, hover) {
    const el = document.querySelector(".band");
    if (el) el.innerHTML = band(role, active, hover);
  }

  function record({ size = 160, top = "", main = "", cap = "", play = false, labelFill = "#DC45FE", disc = "#2A0B38", ring = "" } = {}) {
    let g = "";
    for (let i = 0; i < 14; i++) {
      const r = 95 - i * 3.3;
      g += `<circle cx="100" cy="100" r="${r.toFixed(1)}" fill="none" stroke="#FFFFFF" stroke-opacity="${i % 4 === 0 ? 0.16 : 0.07}" stroke-width="${i % 4 === 0 ? 1.1 : 0.8}"/>`;
    }
    const center = play
      ? `<path d="M92 112 L92 136 L113 124 Z" fill="#2A0B38"/>`
      : `<text x="100" y="137" text-anchor="middle" class="r-main">${esc(main)}</text>`;
    return `<svg class="rec" width="${size}" height="${size}" viewBox="0 0 200 200" aria-hidden="true">
      <circle cx="100" cy="100" r="99" fill="${disc}"/>${ring ? `<circle cx="100" cy="100" r="98.2" fill="none" stroke="${ring}" stroke-width="1.6"/>` : ""}${g}
      <path d="M 38 64 A 72 72 0 0 1 66 36" stroke="#FFFFFF" stroke-opacity=".28" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <path d="M 162 136 A 72 72 0 0 1 134 164" stroke="#FFFFFF" stroke-opacity=".18" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <circle cx="100" cy="100" r="50" fill="${labelFill}"/>
      <line x1="58" y1="91" x2="142" y2="91" stroke="#E8313B" stroke-width="2"/>
      <line x1="58" y1="109" x2="142" y2="109" stroke="#2457F5" stroke-width="2"/>
      <line x1="64" y1="100" x2="94" y2="100" stroke="#2A0B38" stroke-width="1.2" stroke-dasharray="1.2 2.6" stroke-linecap="round"/>
      <line x1="106" y1="100" x2="136" y2="100" stroke="#2A0B38" stroke-width="1.2" stroke-dasharray="1.2 2.6" stroke-linecap="round"/>
      <circle cx="100" cy="100" r="3.6" fill="#F6F0FA"/>
      <text x="100" y="80" text-anchor="middle" class="r-top">${esc(top)}</text>
      ${center}
      ${cap ? `<text x="100" y="66" text-anchor="middle" class="r-bot">${esc(cap)}</text>` : ""}
    </svg>`;
  }

  function diffSide(diff, side, live) {
    const keep = diff.filter((s) => s.op === "same" || (side === "a" ? s.op === "del" : s.op === "ins"));
    return keep
      .map((s, i) => {
        if (s.op === "same") return esc(s.text);
        if (side === "a") {
          if (live && i === keep.length - 1) return `<span class="ahead">${esc(s.text)}</span>`;
          return `<del>${esc(s.text)}</del>`;
        }
        return `<ins>${esc(s.text)}</ins>`;
      })
      .join(" ");
  }

  function karaoke(turn, who, opts = {}) {
    const tag = turn.asWritten
      ? `<span class="tile ok">${icon("check-lg")}</span>Spoken as written · <span class="match">${turn.match}%</span> match`
      : `Improvised · <span class="match">${turn.match}%</span> match`;
    return `<article class="strip kst${turn.asWritten ? " as-written" : ""}">
      <div class="half a"><span class="t num">${turn.t}</span><span class="k-lab"><span class="k-key a">A</span>Kiku wrote</span><p class="k-txt">${diffSide(turn.diff, "a", opts.live)}</p></div>
      <div class="tear"><span class="tear-tag">${tag}</span></div>
      <div class="half b"><span class="t"></span><span class="k-lab"><span class="k-key b">B</span>${esc(who)} said</span><p class="k-txt">${diffSide(turn.diff, "b")}</p></div>
    </article>`;
  }

  const WHO = {
    agent: { label: "Kiku", icon: "robot" },
    guest: { label: "", icon: "person-fill" },
  };
  function line(item, guestName, cls = "") {
    const w = item.speaker === "agent" ? WHO.agent : { label: guestName, icon: "person-fill" };
    return `<div class="ln ${item.speaker}${cls ? " " + cls : ""}"><span class="t num">${item.t}</span><span class="who">${icon(w.icon)}${esc(w.label)}</span><p>${esc(item.text)}</p></div>`;
  }

  const EVT = {
    escalation: { tile: "esc", icon: "arrow-up", label: "Escalated" },
    join: { tile: "plum", icon: "headphones", label: "Joined" },
    takeover: { tile: "run", icon: "mic-fill", label: "Took over" },
    end: { tile: "plum", icon: "telephone-x-fill", label: "Ended" },
  };
  function event(item) {
    const e = EVT[item.kind];
    return `<div class="evt"><span class="evt-tag"><span class="tile ${e.tile}">${icon(e.icon)}</span><span class="lbl">${e.label} · <span class="num">${item.t}</span></span><span>${esc(item.text)}</span></span></div>`;
  }

  function transcript(items, guestName, specialistFirst, opts = {}) {
    return items
      .map((it) => {
        if (it.speaker === "system") return event(it);
        if (it.karaoke) return karaoke(it, specialistFirst, { live: it.live });
        return line(it, guestName, opts.latest === it ? "is-latest" : "");
      })
      .join("");
  }

  function meter(n, lit, hot = 0) {
    let s = "";
    for (let i = 0; i < n; i++) s += `<i class="${i < lit - hot ? "on" : i < lit ? "hot" : ""}"></i>`;
    return `<div class="meter">${s}</div>`;
  }

  const first = (name) => String(name).split(" ")[0];

  const SUB = [["B1", "Campaign", "07-outbound-campaign.html"], ["B2", "Upsell", "08-outbound-upsell.html"], ["B3", "Make a call", "09-outbound-make-a-call.html"]];
  const outSub = (on) => SUB.map(([k, t, h]) => `<a class="sel${t === on ? " is-on" : ""}" href="${h}"${t === on ? ' aria-current="page"' : ""}><b>${k}</b>${t}</a>`).join("");

  function fileRow(f, extra) {
    return `<div class="filerow"><span class="fileico">CSV</span>
      <div class="grow"><div class="fn">${esc(f.file)}</div><div class="fm num">${f.size ? f.size + " · " : ""}${f.rows} rows</div></div>
      ${extra || ""}</div>`;
  }

  function alignEnd(pane) {
    const list = pane.firstElementChild;
    if (!list) return;
    if (list.dataset.pb == null) list.dataset.pb = parseFloat(getComputedStyle(list).paddingBottom) || 0;
    list.style.paddingBottom = list.dataset.pb + "px";
    const max = pane.scrollHeight - pane.clientHeight;
    if (max <= 0) return;
    const top0 = pane.getBoundingClientRect().top - pane.scrollTop;
    const t = [...list.children].map((k) => k.getBoundingClientRect().top - top0).find((v) => v >= max - 1);
    if (t == null) { pane.scrollTop = max; return; }
    list.style.paddingBottom = Number(list.dataset.pb) + (t - max) + "px";
    pane.scrollTop = t - 4;
  }
  function pinEnd(pane) {
    afterFonts(() => {
      alignEnd(pane);
      let h = pane.clientHeight;
      new ResizeObserver(() => { if (pane.clientHeight !== h) { h = pane.clientHeight; alignEnd(pane); } }).observe(pane);
    });
  }

  function afterFonts(fn) {
    const go = () => Promise.all([document.fonts.load('16px "bootstrap-icons"'), document.fonts.load('800 16px "Archivo"'), document.fonts.ready])
      .then(() => setTimeout(fn, 250));
    if (document.readyState === "complete") go(); else window.addEventListener("load", go);
  }

  window.UI = { pinEnd, afterFonts, alignEnd, outSub, fileRow, K, esc, icon, status, tile, STATUS, band, mountBand, record, diffSide, karaoke, line, event, transcript, meter, first };
})();
