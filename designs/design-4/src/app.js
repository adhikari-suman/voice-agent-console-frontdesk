(function () {
  const K = window.KIKU;
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const ic = (n, cls) => `<i class="ri-${n}${cls ? " " + cls : ""}" aria-hidden="true"></i>`;

  const STATUS = {
    completed: { label: "Completed", icon: "check-line", k: "done" },
    in_progress: { label: "In progress", icon: "record-circle-line", k: "live" },
    escalated: { label: "Escalated", icon: "alert-line", k: "esc" },
    failed: { label: "Failed", icon: "close-line", k: "fail" },
  };
  const LAMP_ICON = { live: "record-circle-line", esc: "alert-line", air: "mic-line", pfl: "headphone-line", done: "check-line", fail: "close-line" };
  const TYPE_ICON = { Inbound: "arrow-left-down-line", Campaign: "megaphone-line", Upsell: "price-tag-3-line", "Make a call": "phone-line" };

  const st = (s, extra) => {
    const d = STATUS[s];
    return `<span class="st st--${d.k}">${ic(d.icon)}<span>${d.label}${extra ? `<span class="muted"> ${extra}</span>` : ""}</span></span>`;
  };
  const lamp = (k, title) => `<span class="lamp lamp--${k}" title="${esc(title || "")}">${ic(LAMP_ICON[k])}</span>`;
  const dir = (d) =>
    d === "inbound"
      ? `<span class="dir dir--in">${ic("arrow-left-down-line")}Inbound</span>`
      : `<span class="dir dir--out">${ic("arrow-right-up-line")}Outbound</span>`;

  const isLive = (c) => c.status === "in_progress" || c.status === "escalated";
  const liveCalls = () => K.calls.filter(isLive);
  const tallyOf = (c) => (c.status === "escalated" ? (c.specialist ? "air" : "esc") : c.status === "in_progress" ? "live" : c.status === "failed" ? "fail" : "done");

  function meter(level, kind, n, vertical) {
    n = n || 16;
    const lit = Math.round(level * n);
    let s = "";
    for (let i = 0; i < n; i++) s += `<b class="${i < lit ? "on" : ""}"></b>`;
    return `<span class="meter meter--${kind}${vertical ? " meter--v" : ""}" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(level * 100)}">${s}</span>`;
  }
  function matchMeter(pct) {
    return `<span class="match" title="${pct}% of Kiku's words spoken">${meter(pct / 100, "mono", 10)}${pct}%</span>`;
  }

  const wroteHTML = (diff) =>
    diff.filter((d) => d.op !== "ins").map((d) => (d.op === "del" ? `<s class="skip">${esc(d.text)}</s>` : esc(d.text))).join(" ");
  const saidHTML = (diff) =>
    diff.filter((d) => d.op !== "del").map((d) => (d.op === "ins" ? `<mark class="adlib">${esc(d.text)}</mark>` : esc(d.text))).join(" ");

  const PAGES = {
    live: "02-live-overview.html",
    logs: "03-call-logs.html",
    campaign: "07-outbound-campaign.html",
    upsell: "08-outbound-upsell.html",
    call: "09-outbound-make-a-call.html",
    users: "10-users.html",
  };

  function navItem(key, icon, label, active, end) {
    return `<a class="nav__item${active === key ? " is-active" : ""}" href="${PAGES[key]}"${active === key ? ' aria-current="page"' : ""}>${ic(icon)}<span>${label}</span>${end ? `<span class="nav__end">${end}</span>` : ""}</a>`;
  }

  function rail(role, active) {
    const live = liveCalls();
    const lampsOf = (list) => `<span class="lamps">${list.map((c) => lamp(tallyOf(c), c.guest)).join("")}</span>`;
    const outOf = (t) => live.filter((c) => c.type === t);
    const waiting = live.filter((c) => c.status === "escalated" && !c.specialist).length;
    const person = role === "admin" ? K.people.admin : K.people.specialist;
    const outEnd = (t) => {
      const l = outOf(t);
      return l.length ? `${lampsOf(l)}<span class="count">${l.length}</span>` : `<span class="count">0</span>`;
    };
    const inbound = live.filter((c) => c.direction === "inbound");

    const top =
      role === "admin"
        ? navItem("logs", "file-list-3-line", "Call logs", active) + navItem("users", "team-line", "Users", active)
        : navItem("live", "layout-grid-line", "Live board", active, `${waiting ? lamp("esc", `${waiting} waiting for a specialist`) : ""}<span class="count">${live.length}</span>`) +
          navItem("logs", "file-list-3-line", "Call logs", active);

    return `<aside class="rail">
      <div class="brand">
        <span class="wordmark" aria-label="${esc(K.product.name)}">KIKU</span>
        <span class="brand__hotel"><b>${esc(K.hotel.name)}</b>${esc(K.hotel.city)}</span>
      </div>
      <nav class="nav" aria-label="Main">
        ${top}
        <div class="nav__group cap">Outbound</div>
        ${navItem("campaign", "megaphone-line", "Campaign", active, outEnd("Campaign"))}
        ${navItem("upsell", "price-tag-3-line", "Upsell", active, outEnd("Upsell"))}
        ${navItem("call", "phone-line", "Make a call", active, outEnd("Make a call"))}
      </nav>
      <section class="lines" aria-label="Lines">
        <div class="cap" style="padding:0 6px">Lines</div>
        <div class="src">
          <div class="src__head"><span class="src__name">Hotel line</span>${lampsOf(inbound)}</div>
          <div class="src__num">${esc(K.hotel.line)}</div>
          <div class="src__sub">Inbound · ${inbound.length} live now</div>
        </div>
      </section>
      <div class="me">
        <span class="av">${esc(person.initials)}</span>
        <span class="me__who"><b>${esc(person.name)}</b><span>${esc(person.role)}</span></span>
        <a class="iconkey" href="01-sign-in.html" title="Sign out" aria-label="Sign out">${ic("logout-box-r-line")}</a>
      </div>
    </aside>`;
  }

  function clock() {
    const d = K.hotel.today.split(" "); // Sunday 27 September 2026
    return `<div class="clock" aria-label="Hotel time"><span class="clock__t">${esc(K.hotel.now)}</span><span class="clock__z"><b>${esc(K.hotel.tz)}</b><span>${d[0].slice(0, 3)} ${d[1]} ${d[2].slice(0, 3)}</span></span></div>`;
  }

  function topbar(o) {
    const back = o.back ? `<a class="back" href="${o.back.href}">${ic("arrow-left-s-line")}${esc(o.back.label)}</a>` : "";
    return `<header class="top">
      <div class="top__title">
        <div class="top__row">${back}<h1>${o.title}</h1>${o.after || ""}</div>
        ${o.meta ? `<p class="top__meta">${o.meta}</p>` : ""}
      </div>
      ${o.tools ? `<div class="top__tools">${o.tools}</div>` : ""}
      ${clock()}
    </header>`;
  }

  function mount(o) {
    document.body.classList.add("app");
    document.body.innerHTML =
      rail(o.role, o.active) +
      `<main class="main">${o.strip || ""}${topbar(o)}<div class="content ${o.contentClass || ""}">${o.body}</div>${o.transport || ""}</main>`;
  }

  window.Kiku = { K, esc, ic, st, lamp, dir, meter, matchMeter, wroteHTML, saidHTML, liveCalls, tallyOf, TYPE_ICON, STATUS, mount, PAGES };
})();
