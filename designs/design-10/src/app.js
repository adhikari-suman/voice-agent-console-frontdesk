/* Kiku / Twin Track — shared helpers */
(function () {
  const K = window.KIKU;
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const STATUS = {
    completed: { label: "Completed", svg: '<svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="6.2" fill="currentColor"/><path d="M4 7.2l2 2 4-4.3" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
    in_progress: { label: "In progress", svg: '<svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.8" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="7" cy="7" r="2.6" fill="currentColor"/></svg>' },
    escalated: { label: "Escalated", svg: '<svg viewBox="0 0 14 14"><path d="M7 1.2L13.2 12.4H.8z" fill="currentColor"/><path d="M7 5.2v3.4" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/><circle cx="7" cy="10.4" r=".9" fill="#fff"/></svg>' },
    failed: { label: "Failed", svg: '<svg viewBox="0 0 14 14"><rect x="1" y="1" width="12" height="12" rx="1.5" fill="currentColor"/><path d="M4.6 4.6l4.8 4.8M9.4 4.6L4.6 9.4" stroke="#fff" stroke-width="1.7" stroke-linecap="round"/></svg>' },
  };
  const norm = s => String(s).toLowerCase().replace(/\s+/g, "_");
  function status(s, pill) {
    const k = norm(s), d = STATUS[k];
    return `<span class="st st-${k}${pill ? " pill" : ""}">${d.svg}${d.label}</span>`;
  }

  const dirIcon = d => d === "inbound" ? "phone-incoming" : "phone-outgoing";

  function shell(opts) {
    const role = opts.role; // "specialist" | "admin"
    const p = role === "admin" ? K.people.admin : K.people.specialist;
    const escN = K.calls.filter(c => c.status === "escalated").length;
    const live = K.calls.filter(c => c.status === "in_progress").length;
    const key = (id, label, icon, badge) =>
      `<a class="key${opts.active === id ? " active" : ""}" href="${id}"><i data-lucide="${icon}"></i>${label}${badge ? `<span class="badge">${badge}</span>` : ""}</a>`;
    let keys = "";
    if (role === "specialist") keys += key("02-live-overview.html", "Live board", "radio", escN);
    keys += key("03-call-logs.html", "Call logs", "list");
    keys += `<div class="keygroup"><span class="keygroup-label">Outbound</span>` +
      key("07-outbound-campaign.html", "Campaign", "megaphone") +
      key("08-outbound-upsell.html", "Upsell", "concierge-bell") +
      key("09-outbound-make-a-call.html", "Make a call", "phone-forwarded") + `</div>`;
    if (role === "admin") keys += `<div class="keygroup" style="margin-left:6px">` + key("10-users.html", "Users", "users") + `</div>`;
    const liveHtml = role === "specialist"
      ? `<div class="dock-live">${status("escalated")}<span class="num" style="margin-left:-8px">${escN}</span>${status("in_progress")}<span class="num" style="margin-left:-8px">${live}</span></div>`
      : `<div class="dock-live"><span style="color:#9AA79D">Hotel line</span><b class="num" style="color:#fff;font-weight:500">${K.hotel.line}</b></div>`;
    document.getElementById("shell").innerHTML = `
      <nav class="dock" aria-label="Main">
        <span class="wordmark"><b>kiku</b><span>${K.hotel.name}, ${K.hotel.city}</span></span>
        <div class="keys">${keys}</div>
        <span class="spacer"></span>
        ${liveHtml}
        <div class="dock-meta"><b>${K.hotel.now} ${K.hotel.tz}</b><span>${K.hotel.today}</span></div>
        <span class="me"><span class="avatar ${role}">${p.initials}</span><span><b>${p.name}</b><span class="role">${p.role}</span></span></span>
      </nav>`;
  }

  /* Stitchline: Kiku's script on the left, the specialist's words on the right,
     identical phrases stitched across the gutter. */
  let sid = 0;
  function stitch(diff, saidBy, o) {
    o = o || {};
    const id = "st" + (++sid);
    let lastSame = -1; diff.forEach((d, i) => { if (d.op === "same") lastSame = i; });
    let k = 0;
    const W = [], S = [];
    diff.forEach((d, i) => {
      const t = esc(d.text);
      if (d.op === "same") { W.push(`<span class="kept" data-k="${k}">${t}</span>`); S.push(`<span class="kept" data-k="${k}">${t}</span>`); k++; }
      else if (d.op === "del") W.push(o.live && i > lastSame ? `<span class="ahead">${t}</span>` : `<span class="dl">${t}</span>`);
      else S.push(`<span class="in">${t}</span>`);
    });
    const wcap = o.wroteCap || "Kiku wrote", scap = o.saidCap || `${saidBy} said`;
    return `<div class="stitch${o.compact ? " compact" : ""}${o.cls ? " " + o.cls : ""}" id="${id}">
      <div class="col w"><span class="cap"><i data-lucide="pen-line" style="width:12px;height:12px"></i>${wcap}</span><p class="txt">${W.join(" ")}</p></div>
      <span class="gap"></span><svg class="gut" aria-hidden="true"></svg>
      <div class="col s"><span class="cap"><i data-lucide="mic" style="width:12px;height:12px"></i>${scap}</span><p class="txt">${S.join(" ")}${o.caret ? '<span class="caret"></span>' : ""}</p></div>
    </div>`;
  }
  function drawThreads(root) {
    (root || document).querySelectorAll(".stitch:not(.compact)").forEach(st => {
      const svg = st.querySelector(".gut"), box = st.getBoundingClientRect();
      const L = st.querySelector(".col.w").getBoundingClientRect(), R = st.querySelector(".col.s").getBoundingClientRect();
      if (!box.width) return;
      const color = getComputedStyle(st).getPropertyValue("--thread").trim() || "#47554C";
      const x1 = L.right - box.left + 6, x2 = R.left - box.left - 6, w = x2 - x1;
      let out = "";
      const n = st.querySelectorAll(".col.w .kept").length;
      for (let i = 0; i < n; i++) {
        const a = st.querySelector(`.col.w .kept[data-k="${i}"]`).getClientRects()[0];
        const b = st.querySelector(`.col.s .kept[data-k="${i}"]`).getClientRects()[0];
        if (!a || !b) continue;
        const y1 = a.top + a.height / 2 - box.top, y2 = b.top + b.height / 2 - box.top;
        out += `<path d="M${x1} ${y1} C ${x1 + w * .55} ${y1}, ${x2 - w * .55} ${y2}, ${x2} ${y2}" fill="none" stroke="${color}" stroke-width="1.3" stroke-dasharray="3 3"/>`;
        out += `<circle cx="${x1}" cy="${y1}" r="2.6" fill="${color}"/><circle cx="${x2}" cy="${y2}" r="2.6" fill="${color}"/>`;
      }
      svg.innerHTML = out;
    });
  }
  function matchMeter(m) {
    return `<span class="match"><span class="bar"><i style="width:${m}%"></i></span>${m}% as written</span>`;
  }
  function laneKey(name) {
    return `<div class="lanekey"><span><span class="dl">struck</span>Kiku wrote, not said</span><span><span class="in">marked</span>${esc(name)} added</span><span><span class="kept">stitched</span>Said as written</span></div>`;
  }
  function stitchWhenReady(root) {
    const go = () => drawThreads(root);
    go(); requestAnimationFrame(go);
    if (document.fonts) document.fonts.ready.then(() => { go(); setTimeout(go, 300); });
  }

  function icons() { if (window.lucide) window.lucide.createIcons(); }

  window.TT = { K, esc, status, shell, stitch, drawThreads, stitchWhenReady, matchMeter, laneKey, icons, dirIcon, STATUS };
})();
