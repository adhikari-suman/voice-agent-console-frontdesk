/* Kiku / Duet Stave shared helpers */
(function () {
  const K = window.KIKU;
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const MARK = `<svg class="mark" viewBox="0 0 26 18" aria-hidden="true">
    <rect x="0" y="0" width="26" height="18" rx="5" fill="#2B3452"/>
    <line x1="4" y1="10" x2="22" y2="10" stroke="#A5B0BF" stroke-width="1.4" stroke-linecap="round"/>
    <circle cx="9.5" cy="5.6" r="2.4" fill="#8FA6D6"/>
    <circle cx="16.5" cy="13.6" r="2.4" fill="#E5608E"/>
  </svg>`;

  const STATUS = {
    completed: { label: "Completed", svg: `<svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="6.5" fill="currentColor"/><path d="M4 7.2l2 2 4-4.4" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
    in_progress: { label: "In progress", svg: `<svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M7 1.2A5.8 5.8 0 0 1 7 12.8Z" fill="currentColor"/></svg>` },
    escalated: { label: "Escalated", svg: `<svg viewBox="0 0 14 14"><path d="M7 .8L13.4 12.6H.6Z" fill="currentColor"/><path d="M7 5v3.6" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/><circle cx="7" cy="10.6" r=".95" fill="#fff"/></svg>` },
    failed: { label: "Failed", svg: `<svg viewBox="0 0 14 14"><rect x=".8" y=".8" width="12.4" height="12.4" rx="2" fill="currentColor"/><path d="M4.6 4.6l4.8 4.8M9.4 4.6l-4.8 4.8" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>` },
  };
  const status = (s, label) => `<span class="status ${s}">${STATUS[s].svg}${label || STATUS[s].label}</span>`;

  function shell(opts) {
    const role = opts.role || "specialist";
    const me = role === "admin" ? K.people.admin : K.people.specialist;
    const a = opts.active;
    const item = (id, icon, label, href, extra = "") =>
      `<a class="deck-item ${a === id ? "on" : ""}" href="${href}"${a === id ? ' aria-current="page"' : ""}><i data-lucide="${icon}"></i><span>${label}</span>${extra}</a>`;
    const owen = K.calls.find(c => c.status === "escalated" && !c.specialist);
    const nav = [
      role === "specialist" ? item("live", "radio", "Live board", "02-live-overview.html") : "",
      item("logs", "list", "Call logs", "03-call-logs.html"),
      `<span class="deck-sep" aria-hidden="true"></span><span class="deck-glabel">Outbound</span>`,
      item("campaign", "megaphone", "Campaign", "07-outbound-campaign.html"),
      item("upsell", "concierge-bell", "Upsell", "08-outbound-upsell.html"),
      item("make", "phone-outgoing", "Make a call", "09-outbound-make-a-call.html"),
      role === "admin" ? `<span class="deck-sep" aria-hidden="true"></span>` + item("users", "users", "Users", "10-users.html") : "",
    ].join("");
    const live = role === "specialist"
      ? `<a class="deck-wait" href="02-live-overview.html"><svg width="12" height="12" viewBox="0 0 14 14"><path d="M7 .8L13.4 12.6H.6Z" fill="currentColor"/></svg>${esc(owen.guest.split(" ")[0])} waiting <span class="num">${owen.waiting}</span></a>
         <span class="deck-live"><span class="pulse"></span><span class="num">${K.stats.inProgress + K.stats.escalated}</span> on the line</span>`
      : "";
    return `
      <footer class="deck">
        <a class="deck-brand" href="02-live-overview.html">${MARK}<b>Kiku</b><span>${esc(K.hotel.name)}, ${esc(K.hotel.city)}</span></a>
        <nav class="deck-nav" aria-label="Main">${nav}</nav>
        <div class="deck-right">
          ${live}
          <span class="deck-clock"><span class="num">${K.hotel.now}</span> ${K.hotel.tz}</span>
          <span class="deck-me"><span class="avatar ${role === "admin" ? "ad" : ""}">${me.initials}</span><span class="who"><b>${esc(me.name)}</b><span>${esc(me.role)}</span></span></span>
        </div>
      </footer>`;
  }

  /* Stave: split each diff op into words so lines wrap naturally.
     same = on the line, del = above (Kiku wrote, not said), ins = below (person said, not written). */
  function stave(diff, o = {}) {
    // A substitution (del next to ins) is stacked: Kiku's words above the rule, the spoken words below it.
    // Long substitutions are cut into matching chunks so each column still fits on a line.
    const chunk = (words, k) => { const out = [], n = Math.ceil(words.length / k); for (let i = 0; i < k; i++) out.push(words.slice(i * n, (i + 1) * n).join(" ")); return out; };
    let out = "";
    for (let i = 0; i < diff.length; i++) {
      const seg = diff[i], nx = diff[i + 1];
      const isLast = i === diff.length - 1;
      if (nx && seg.op !== "same" && nx.op !== "same" && seg.op !== nx.op) {
        const del = seg.op === "del" ? seg : nx, ins = seg.op === "ins" ? seg : nx;
        const dw = del.text.split(/\s+/), iw = ins.text.split(/\s+/);
        const k = Math.max(1, Math.ceil(Math.max(del.text.length, ins.text.length) / 34));
        const dc = chunk(dw, Math.min(k, dw.length)), ic = chunk(iw, Math.min(k, iw.length));
        const cols = Math.max(dc.length, ic.length);
        for (let c = 0; c < cols; c++) {
          const caret = o.caret && i + 1 === diff.length - 1 && c === cols - 1;
          out += `<span class="w swap ${c === 0 ? "first" : ""} ${caret ? "caret" : ""}"><span class="d">${esc(dc[c] || "")}</span><span class="i">${esc(ic[c] || "")}</span></span>`;
        }
        i++;
        continue;
      }
      const words = seg.text.split(/\s+/).filter(Boolean);
      words.forEach((w, wi) => {
        let cls = seg.op;
        if (wi === 0 && seg.op !== "same") cls += " first";
        if (o.caret && seg.op === "ins" && isLast && wi === words.length - 1) cls += " caret";
        out += `<span class="w ${cls}"><span>${esc(w)}</span></span>`;
      });
    }
    return `<div class="stave">${out}</div>`;
  }

  const matchMeter = m => `<span class="match" title="${m}% of the written line was said"><span class="bar"><b style="width:${m}%"></b></span><span class="num">${m}%</span> as written</span>`;

  function staveKey(name) {
    return `<span class="stave-key"><i><span class="k-same">on the line</span> both</i><i><span class="k-del">above</span> Kiku wrote, not said</i><i><span class="k-ins">below</span> ${esc(name)} said instead</i></span>`;
  }

  /* deterministic level bars (not data, just visual texture of audio) */
  function levels(n, seed, maxH, cls = "") {
    let x = seed, s = "";
    for (let i = 0; i < n; i++) {
      x = (x * 9301 + 49297) % 233280;
      const h = 4 + Math.round((x / 233280) * (maxH - 4));
      s += `<i style="height:${h}px"></i>`;
    }
    return `<span class="lvl ${cls}">${s}</span>`;
  }

  function mount(html, sel = "#shell") {
    document.querySelector(sel).innerHTML = html;
  }
  function icons() { if (window.lucide) window.lucide.createIcons(); }

  window.D = { K, esc, status, STATUS, shell, stave, matchMeter, staveKey, levels, mount, icons, MARK };
})();
