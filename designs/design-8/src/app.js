(function () {
  const D = window.KIKU;
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const icon = (n, c = "") => `<span class="ms ${c}" aria-hidden="true">${n}</span>`;

  const STATUS = {
    completed: { label: "Completed", icon: "check_box", cls: "done" },
    in_progress: { label: "In progress", icon: "graphic_eq", cls: "prog" },
    escalated: { label: "Escalated", icon: "warning", cls: "esc" },
    failed: { label: "Failed", icon: "block", cls: "fail" },
  };
  const status = (s, extra = "") => {
    const m = STATUS[s];
    return `<span class="st st-${m.cls} ${extra}">${icon(m.icon)}<span>${m.label}</span></span>`;
  };
  const kind = (c) => (c.status === "escalated" ? "pri" : c.status === "failed" ? "fail" : c.direction === "inbound" ? "arr" : "dep");
  const dirTab = (c) => (c.direction === "inbound" ? `${icon("call_received")}<span>IN</span>` : `${icon("call_made")}<span>OUT</span>`);
  const route = (c) => (c.direction === "inbound" ? "Inbound" : `Outbound · ${c.type}`);
  const initials = (name) => name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const specParse = (c) => {
    if (!c.specialist) return null;
    const m = c.specialist.match(/^(.*?)(?: \((.*)\))?$/);
    return { name: m[1], note: m[2] || null };
  };
  const hand = (t, cls = "") => `<span class="hand ${cls}">${esc(t)}</span>`;
  const sig = (c, { short = false } = {}) => {
    const s = specParse(c);
    if (!s) return `<span class="kiku-only">${glyph(14)}Kiku only</span>`;
    return `<span class="sig">${hand(initials(s.name))}<span class="nm">${esc(short ? s.name.split(" ")[0] : s.name)}${s.note ? ` · ${esc(s.note)}` : ""}</span></span>`;
  };

  const glyph = (w = 24) =>
    `<svg width="${w}" height="${Math.round(w * 0.62)}" viewBox="0 0 26 16" aria-hidden="true"><rect x=".5" y="2.5" width="25" height="11" rx="1" fill="#F7D34A" stroke="#121513"/><rect x=".5" y="2.5" width="6" height="11" fill="#A88A12" stroke="#121513"/><path d="M10 6.5h6M10 9.5h11" stroke="#121513" stroke-width="1.2"/></svg>`;
  const tick = (cls = "") =>
    `<svg class="${cls}" viewBox="0 0 34 30" aria-hidden="true"><path d="M3 17c3 1.5 5.5 4.5 8 9.5C15 16 22 8 31 3" fill="none" stroke="#1D3FA8" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const caret = () =>
    `<span class="cw" aria-hidden="true"><svg class="caret" viewBox="0 0 12 10"><path d="M1 9.2 6 1.2l5 8" fill="none" stroke="#1D3FA8" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
  const ring = (cls = "", style = "") =>
    `<svg class="penmark ${cls}" style="${style}" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path d="M14 6C38-1 82 1 94 14c8 9-10 21-44 22C20 37 3 29 5 18 7 10 20 5 34 4" fill="none" stroke="#C62828" stroke-width="2.4" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>`;

  function tower({ role = "specialist", active = "" } = {}) {
    const u = role === "admin" ? D.people.admin : D.people.specialist;
    const waiting = D.calls.filter((c) => c.status === "escalated" && !c.specialist).length;
    const items =
      role === "admin"
        ? [["logs", "Call logs", "03-call-logs.html", "list"], ["outbound", "Outbound", "07-outbound-campaign.html", "call_made"], ["users", "Users", "10-users.html", "group"]]
        : [["live", "Live board", "02-live-overview.html", "view_week"], ["logs", "Call logs", "03-call-logs.html", "list"], ["outbound", "Outbound", "07-outbound-campaign.html", "call_made"]];
    const nav = items
      .map(([k, label, href, ic]) => {
        const cnt = k === "live" && waiting ? `<span class="cnt" title="${waiting} waiting for a specialist">${icon("warning")}${waiting}</span>` : "";
        return `<a href="${href}" class="${k === active ? "on" : ""}"${k === active ? ' aria-current="page"' : ""}>${icon(ic)}${label}${cnt}</a>`;
      })
      .join("");
    const h = D.hotel;
    const day = h.today.split(" ");
    return `
      <a class="brand" href="${role === "admin" ? "03-call-logs.html" : "02-live-overview.html"}" aria-label="Kiku">${glyph(26)}<b>KIKU</b></a>
      <div class="hotel"><b>${esc(h.name)}, ${esc(h.city)}</b><span>LINE ${esc(h.line)}</span></div>
      <nav class="nav" aria-label="Main">${nav}</nav>
      <div class="gap"></div>
      <div class="clock" aria-label="Local time ${h.now} ${h.tz}"><span class="t">${h.now}</span><span class="z"><b>${h.tz}</b>${day[0].slice(0, 3).toUpperCase()} ${day[1]} ${day[2].slice(0, 3).toUpperCase()}</span></div>
      <div class="who"><span class="av">${u.initials}</span><span class="n"><b>${esc(u.name)}</b><span>${u.role}</span></span></div>`;
  }

  function mountTower(opts) {
    const el = document.getElementById("tower");
    if (el) el.innerHTML = tower(opts);
  }

  function amended(diff, { live = false } = {}) {
    let segs = diff.slice();
    let aheadIdx = -1;
    if (live && segs.length > 1 && segs[segs.length - 1].op === "ins" && segs[segs.length - 2].op === "del") {
      const a = segs[segs.length - 2];
      segs[segs.length - 2] = segs[segs.length - 1];
      segs[segs.length - 1] = a;
      aheadIdx = segs.length - 1;
    }
    return segs
      .map((s, i) => {
        if (s.op === "same") return `<span class="ty">${esc(s.text)}</span>`;
        if (s.op === "del") return i === aheadIdx ? `<span class="ahead">${esc(s.text)}</span>` : `<span class="del">${esc(s.text)}</span>`;
        const nib = live && i === aheadIdx - 1 ? `<span class="nib">${icon("edit", "fill")}</span>` : "";
        return `<span class="hw">${caret()}${esc(s.text)}${nib}</span>`;
      })
      .join(" ");
  }

  function meter(total, on, cls = "") {
    let s = "";
    for (let i = 0; i < total; i++) s += `<i class="${i < on ? "on" : ""}"></i>`;
    return `<span class="meter ${cls}" aria-hidden="true">${s}</span>`;
  }

  function spk(item, ctx) {
    if (item.speaker === "agent") return `<span class="spk">${glyph(15)}Kiku</span>`;
    if (item.speaker === "guest") return `<span class="spk guest">${esc(ctx.guest)}</span>`;
    return `<span class="spk">${esc(ctx.specialist)}</span>`;
  }

  const SYS = {
    escalation: { tag: "Escalated", ic: "warning", cls: "esc" },
    join: { tag: "Joined", ic: "headphones", cls: "" },
    takeover: { tag: "Took over", ic: "record_voice_over", cls: "" },
    end: { tag: "Ended", ic: "call_end", cls: "" },
  };

  function txRow(item, ctx, extra = "") {
    if (item.speaker === "system") {
      const m = SYS[item.kind] || SYS.end;
      const txt = item.text.replace(/^Escalated: /, "");
      return `<div class="txr sys ${extra}"><span class="t">${item.t}</span><div class="sysline"><span class="tag ${m.cls}">${icon(m.ic)}${m.tag}</span><span class="txt">${esc(txt)}</span></div></div>`;
    }
    if (item.karaoke) return ctx.karaoke(item);
    return `<div class="txr ${extra}"><span class="t">${item.t}</span>${spk(item, ctx)}<p class="x">${esc(item.text)}</p></div>`;
  }

  function finish(root = document.body) {
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const hits = [];
    while (w.nextNode()) if (/\w[:,.]\w/.test(w.currentNode.nodeValue)) hits.push(w.currentNode);
    hits.forEach((n) => {
      const el = n.parentElement;
      if (!el || !/B612 Mono/.test(getComputedStyle(el).fontFamily)) return;
      const wrap = Object.assign(document.createElement("span"), { className: "cnw" });
      n.nodeValue.split(/(?<=\w)([:,.])(?=\w)/).forEach((part, i) => {
        if (i % 2) wrap.appendChild(Object.assign(document.createElement("span"), { className: "cn", textContent: part }));
        else wrap.appendChild(document.createTextNode(part));
      });
      n.replaceWith(wrap);
    });
  }

  function outTabs(active) {
    const t = [["campaign", "Campaign", "07-outbound-campaign.html", "campaign"], ["upsell", "Upsell", "08-outbound-upsell.html", "room_service"], ["call", "Make a call", "09-outbound-make-a-call.html", "call_made"]];
    return t.map(([k, l, h, ic]) => `<a class="btab ${k === active ? "on" : ""}" href="${h}"${k === active ? ' aria-current="page"' : ""}>${icon(ic)}${l}</a>`).join("");
  }

  window.KK = { finish, outTabs, D, esc, icon, status, kind, dirTab, route, initials, specParse, hand, sig, glyph, tick, caret, ring, tower, mountTower, amended, meter, txRow, STATUS };
})();
