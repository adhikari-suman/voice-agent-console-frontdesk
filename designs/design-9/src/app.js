(() => {
  const K = window.KIKU;
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const icon = (n, cls = "") => `<i class="ph-light ph-${n} ${cls}" aria-hidden="true"></i>`;

  const STATUS = {
    completed: { label: "Completed", mark: () => icon("check") },
    in_progress: { label: "In progress", mark: () => '<span class="st-dot"></span>' },
    escalated: { label: "Escalated", mark: () => icon("bell") },
    failed: { label: "Failed", mark: () => icon("x") },
  };
  const status = (key) => {
    const s = STATUS[key];
    return `<span class="st st-${key === "in_progress" ? "progress" : key}">${s.mark()}${s.label}</span>`;
  };
  const statusMark = (key) => STATUS[key].mark();

  const dir = (d) =>
    d === "inbound"
      ? `<span class="dir">${icon("arrow-down-left")}Inbound</span>`
      : `<span class="dir">${icon("arrow-up-right")}Outbound</span>`;

  const fob = (text) =>
    `<span class="fob" title="${esc(text)}"><svg width="19" height="22" viewBox="0 0 19 22" aria-hidden="true"><path d="M19 .5h-8.2c-1.6 0-2.8.7-3.7 1.9L1.3 9.6a2.4 2.4 0 0 0 0 2.8l5.8 7.2c.9 1.2 2.1 1.9 3.7 1.9H19"/><circle cx="8.2" cy="11" r="2"/></svg><b>${esc(text)}</b><svg width="9" height="22" viewBox="0 0 9 22" aria-hidden="true"><path d="M0 .5h1.6c1.4 0 2.4.6 3.1 1.6l3.2 7.5a3.2 3.2 0 0 1 0 2.8l-3.2 7.5c-.7 1-1.7 1.6-3.1 1.6H0"/></svg></span>`;

  const avatar = (initials, cls = "") => `<span class="av ${cls}">${esc(initials)}</span>`;
  const monogram = (cls = "") => `<span class="mono ${cls}" aria-hidden="true"><span>K</span></span>`;

  const sealPts = (() => {
    const pts = [];
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      const r = i % 2 ? 8.6 : 9.6;
      pts.push(`${(10 + r * Math.cos(a)).toFixed(2)},${(10 + r * Math.sin(a)).toFixed(2)}`);
    }
    return pts.join(" ");
  })();
  const seal = () =>
    `<svg class="seal" viewBox="0 0 20 20" aria-hidden="true"><polygon points="${sealPts}" fill="none" stroke="#C9A55B" stroke-width="1"/><circle class="fill" cx="10" cy="10" r="6.2"/><path d="M7.2 10.2l1.9 1.9 3.8-3.9"/></svg>`;

  const meter = (levels) =>
    `<span class="meter" aria-hidden="true">${levels
      .map((l) => `<span class="${l > 0 ? "on" : ""}" style="height:${Math.max(3, Math.abs(l))}px"></span>`)
      .join("")}</span>`;

  const diffSide = (diff, side) =>
    diff
      .filter((d) => d.op === "same" || (side === "wrote" ? d.op === "del" : d.op === "ins"))
      .map((d) => (d.op === "same" ? esc(d.text) : d.op === "del" ? `<del>${esc(d.text)}</del>` : `<ins>${esc(d.text)}</ins>`))
      .join(" ");

  const SYS_ICON = { escalation: "bell", join: "headphones", takeover: "hand", end: "phone-x" };

  function ledger(transcript, o) {
    const first = (n) => n.split(" ")[0];
    const names = { agent: "Kiku", guest: first(o.guest), specialist: first(o.specialist) };
    const head = `<div class="lg-head"><div></div><div>As written <span>Kiku</span></div><div>As spoken <span>${esc(o.specialist)}</span></div><div class="dbl"></div></div>`;
    let html = "";
    let inKaraoke = false;
    for (const e of transcript) {
      if (o.skipLive && e.live) continue;
      if (e.speaker === "system") {
        html += `<div class="lg-row lg-sys k-${e.kind}"><div class="lg-m"><span class="lg-t">${e.t}</span></div><div class="lg-body">${icon(SYS_ICON[e.kind] || "info")}<span>${esc(e.text)}</span></div></div>`;
        if (e.kind === "takeover" && !inKaraoke) {
          html += `<div class="lg-karaoke">${head}`;
          inKaraoke = true;
        }
        continue;
      }
      if (e.karaoke) {
        const foot = e.asWritten
          ? `<span class="lg-seal">${seal()}As written</span>`
          : `<span class="lg-match">${e.match}% as written</span>`;
        html += `<div class="lg-row lg-k${e.asWritten ? " is-sealed" : ""}"><div class="lg-m"><span class="lg-t">${e.t}</span>${foot}</div><div class="lg-w">${diffSide(e.diff, "wrote")}</div><div class="lg-s">${diffSide(e.diff, "said")}</div></div>`;
        continue;
      }
      html += `<div class="lg-row lg-line who-${e.speaker}"><div class="lg-m"><span class="lg-t">${e.t}</span></div><div class="lg-text"><span class="lg-who">${names[e.speaker]}</span><span class="lg-said">${esc(e.text)}</span></div></div>`;
    }
    if (inKaraoke) html += "</div>";
    return `<div class="ledger">${html}</div>`;
  }

  const legend = () =>
    `<div class="legend"><span><ins>improvised</ins></span><span><del>dropped</del></span><span>${seal()}spoken as written</span></div>`;

  const NAV = {
    specialist: [
      { id: "live", label: "Live board", icon: "broadcast", href: "02-live-overview.html", count: true },
      { id: "logs", label: "Call logs", icon: "book-open-text", href: "03-call-logs.html" },
    ],
    admin: [{ id: "logs", label: "Call logs", icon: "book-open-text", href: "03-call-logs.html" }],
  };
  const OUT = [
    { id: "campaign", label: "Campaign", icon: "megaphone", href: "07-outbound-campaign.html" },
    { id: "upsell", label: "Upsell", icon: "sparkle", href: "08-outbound-upsell.html" },
    { id: "make", label: "Make a call", icon: "phone-call", href: "09-outbound-make-a-call.html" },
  ];

  function rail(role, active, dutyNote) {
    const p = role === "admin" ? K.people.admin : K.people.specialist;
    const waiting = K.calls.filter((c) => c.status === "escalated" && !c.specialist).length;
    const item = (n, sub) =>
      `<a class="nav-i${sub ? " nav-sub" : ""}${n.id === active ? " is-active" : ""}" href="${n.href}">${icon(n.icon)}<span>${n.label}</span>${
        n.count ? `<span class="nav-n" title="Waiting for a specialist">${icon("bell")}${waiting}</span>` : ""
      }</a>`;
    const nav =
      NAV[role].map((n) => item(n)).join("") +
      `<div class="nav-group">Outbound</div>` +
      OUT.map((n) => item(n, true)).join("") +
      (role === "admin"
        ? `<div class="nav-group">Team</div>` + item({ id: "users", label: "Users", icon: "users-three", href: "10-users.html" })
        : "");
    return `<aside class="rail">
      <div class="brand">${monogram()}<div><div class="wordmark">${K.product.name}</div><div class="brand-sub">${K.hotel.name}, ${K.hotel.city}</div></div></div>
      <div class="dbl"></div>
      <nav class="nav">${nav}</nav>
      <div class="duty">
        <div class="dbl dim"></div>
        <div class="duty-h" style="padding-top:0">On duty</div>
        <div class="duty-who">${avatar(p.initials, "lg")}<div><div class="duty-name">${p.name}</div><div class="duty-role">${p.role} · ${p.title}</div></div></div>
        <div class="duty-meta">
          ${dutyNote ? `<div>${icon(dutyNote[0])}<b>${dutyNote[1]}</b></div>` : ""}
          <div>${icon("phone")}Hotel line <b>${K.hotel.line}</b></div>
          <div>${icon("clock")}<b>${K.hotel.now} ${K.hotel.tz}</b> · Sun 27 Sep</div>
        </div>
        <a class="duty-out" href="01-sign-in.html">${icon("sign-out")}Sign out</a>
      </div>
    </aside>`;
  }

  function mount(role, active, mainHtml, dutyNote) {
    document.body.innerHTML = rail(role, active, dutyNote) + `<main class="main">${mainHtml}</main>`;
  }

  const callById = (id) => K.calls.find((c) => c.id === id);

  function csvTable(cols, preview, total) {
    const span = cols.length + 1;
    const gap = (a, b) => (b < a ? "" : `<tr class="gap"><td></td><td colspan="${cols.length}">${a === b ? `Row ${a}` : `Rows ${a}–${b}`} ready</td></tr>`);
    let html = "", prev = 0;
    for (const r of preview) {
      html += gap(prev + 1, r.row - 1);
      const badKey = r.ok ? null : /confirmation/i.test(r.error) ? "confirmation" : "phone";
      html += `<tr class="${r.ok ? "" : "bad"}"><td class="rn">${r.ok ? r.row : `${icon("x")} ${r.row}`}</td>${cols
        .map((c) => {
          const v = r[c.key];
          if (!v) return `<td><span class="empty${c.key === badKey ? " cell-bad" : ""}">${c.key === badKey ? "missing" : c.emptyText || "—"}</span></td>`;
          return `<td${c.key === badKey ? ' class="cell-bad-td"' : ""}><span class="${c.key === badKey ? "cell-bad" : ""}">${esc(v)}</span></td>`;
        })
        .join("")}</tr>`;
      if (!r.ok) html += `<tr class="bad-note"><td></td><td colspan="${cols.length}">${icon("warning")}Row ${r.row}: ${esc(r.error)}. This row is skipped until you fix it in the file.</td></tr>`;
      prev = r.row;
    }
    html += gap(prev + 1, total);
    return `<table class="tbl csv"><thead><tr><th>Row</th>${cols.map((c) => `<th>${c.label}</th>`).join("")}</tr></thead><tbody>${html}</tbody></table>`;
  }

  window.KK = { csvTable, K, esc, icon, status, statusMark, dir, fob, avatar, monogram, seal, meter, diffSide, ledger, legend, mount, callById };
})();
