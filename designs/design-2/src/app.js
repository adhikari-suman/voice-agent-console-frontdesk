(function () {
  const K = window.KIKU;
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const ic = (name, cls = "") => `<i class="ph-bold ph-${name} ${cls}" aria-hidden="true"></i>`;
  const initials = (name) => name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  const mark = (w = 34, h = 24) =>
    `<svg class="brand-mark" viewBox="0 0 34 24" width="${w}" height="${h}" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#FF3EA5"/><circle cx="22" cy="12" r="11" fill="#0078BF" style="mix-blend-mode:multiply"/></svg>`;

  const NAV = {
    specialist: [
      { id: "live", label: "live", icon: "broadcast", href: "02-live-overview.html", counts: [["5", ""], ["1", "pink"]] },
      { id: "logs", label: "call logs", icon: "list-bullets", href: "03-call-logs.html" },
      { group: "outbound" },
      { id: "campaign", label: "campaign", icon: "megaphone", href: "07-outbound-campaign.html", counts: [["3", ""]] },
      { id: "upsell", label: "upsell", icon: "coffee", href: "08-outbound-upsell.html" },
      { id: "make", label: "make a call", icon: "phone-outgoing", href: "09-outbound-make-a-call.html" },
    ],
    admin: [
      { id: "logs", label: "call logs", icon: "list-bullets", href: "03-call-logs.html" },
      { group: "outbound" },
      { id: "campaign", label: "campaign", icon: "megaphone", href: "07-outbound-campaign.html", counts: [["3", ""]] },
      { id: "upsell", label: "upsell", icon: "coffee", href: "08-outbound-upsell.html" },
      { id: "make", label: "make a call", icon: "phone-outgoing", href: "09-outbound-make-a-call.html" },
      { group: "team" },
      { id: "users", label: "users", icon: "users-three", href: "10-users.html", counts: [[String(K.users.length), ""]] },
    ],
  };

  function shell({ role, active, html }) {
    const me = role === "admin" ? K.people.admin : K.people.specialist;
    const items = NAV[role]
      .map((n) => {
        if (n.group) return `<div class="nav-label">${n.group}</div>`;
        const counts = n.counts ? `<span class="counts">${n.counts.map(([v, c]) => `<span class="stamp ${c}">${v}</span>`).join("")}</span>` : "";
        return `<a href="${n.href}" class="${n.id === active ? "on" : ""}">${ic(n.icon)}<span>${n.label}</span>${counts}</a>`;
      })
      .join("");
    document.getElementById("app").innerHTML = `
      <div class="app">
        <aside class="side">
          <div class="brand">${mark()}<span class="brand-name">kiku</span></div>
          <div class="brand-sub">${esc(K.hotel.name)}, ${esc(K.hotel.city)}<br><span class="mono">${esc(K.hotel.line)}</span></div>
          <nav class="nav">${items}</nav>
          <div class="me">
            <span class="av ${role === "admin" ? "admin" : "spec"}">${me.initials}</span>
            <div><div class="me-name">${esc(me.name)}</div><div class="me-role">${esc(me.role)}</div></div>
            <button class="icon-btn bare" aria-label="Sign out">${ic("sign-out")}</button>
          </div>
          <div class="demo-note">Demo data. All names are fictional.</div>
        </aside>
        <main class="main">${html}</main>
      </div>
      <div class="grain"></div>`;
  }

  const STATUS = {
    completed: ["Completed", "st-done", ic("check")],
    in_progress: ["In progress", "st-live", `<span class="pulse"></span>`],
    escalated: ["Escalated", "st-esc", ic("exclamation-mark")],
    failed: ["Failed", "st-fail", ic("x")],
  };
  const status = (s, extra = "") => {
    const [label, cls, m] = STATUS[s];
    return `<span class="st ${cls} ${extra}"><span class="st-mark">${m}</span><span>${label}</span></span>`;
  };

  const dir = (c, withType = true) => {
    const inbound = c.direction === "inbound";
    const t = inbound ? "Inbound" : withType ? `Outbound · ${c.type}` : "Outbound";
    return `<span class="dir">${ic(inbound ? "phone-incoming" : "phone-outgoing")}<span>${t}</span></span>`;
  };

  const av = (who, kind = "guest", size = "") => {
    if (kind === "kiku") return `<span class="av kiku ${size}" title="Kiku">k</span>`;
    return `<span class="av ${kind} ${size}">${esc(initials(who))}</span>`;
  };

  const mis = (text, { tag = "h1", cls = "h1", proper = false } = {}) =>
    `<${tag} class="${cls} mis ${proper ? "proper" : ""}" data-t="${esc(text)}">${esc(text)}</${tag}>`;

  const clock = () => `<span class="clock">${esc(K.hotel.today.replace(/^(\w+)day/, "$1"))} · <b>${esc(K.hotel.now)}</b> ${esc(K.hotel.tz)}</span>`;

  const ovWords = (text) =>
    text.split(/\s+/).filter(Boolean).map((w) => `<span class="ov" data-t="${esc(w)}">${esc(w)}</span>`).join(" ");

  function wrote(diff, { live = false } = {}) {
    let lastSaid = -1;
    diff.forEach((s, i) => { if (s.op === "same") lastSaid = i; });
    return diff
      .map((s, i) => {
        if (s.op === "same") return ovWords(s.text);
        if (s.op === "del") return live && i > lastSaid ? `<span class="ahead">${esc(s.text)}</span>` : `<span class="del">${esc(s.text)}</span>`;
        return null;
      })
      .filter(Boolean)
      .join(" ");
  }
  function said(diff) {
    return diff
      .map((s) => (s.op === "same" ? ovWords(s.text) : s.op === "ins" ? `<span class="ins">${esc(s.text)}</span>` : null))
      .filter(Boolean)
      .join(" ");
  }
  const match = (pct) => `<span class="match"><span class="mbar"><i style="width:${pct}%"></i></span>${pct}%</span>`;

  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const level = (n, seed, { cls = "", h = 28, off = 0, floor = 0.15 } = {}) => {
    const r = rng(seed);
    let bars = "";
    for (let i = 0; i < n; i++) {
      const v = floor + r() * (1 - floor) * (0.55 + 0.45 * Math.sin((i / n) * Math.PI));
      bars += `<i class="${i >= n - off ? "off" : ""}" style="height:${Math.round(v * h)}px"></i>`;
    }
    return `<span class="level ${cls}" style="height:${h}px">${bars}</span>`;
  };

  const toSec = (t) => { const [m, s] = t.split(":").map(Number); return m * 60 + s; };

  const specialistOf = (c) => {
    if (!c.specialist) return `<span class="moss">Kiku only</span>`;
    const name = c.specialist.replace(/\s*\(.*\)$/, "");
    const note = /\((.*)\)/.exec(c.specialist);
    return `<span style="display:inline-flex;gap:7px;align-items:center">${av(name, "spec", "sm")}<span>${esc(name)}${note ? ` <span class="moss">${esc(note[1])}</span>` : ""}</span></span>`;
  };

  window.Kiku = { K, esc, ic, initials, mark, shell, status, dir, av, mis, clock, wrote, said, ovWords, match, level, rng, toSec, specialistOf };
})();
