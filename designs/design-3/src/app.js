/* Kiku "Galley Proof": shared rendering helpers */
(function () {
  const K = window.KIKU;
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const STATUS = {
    completed: { label: "Completed", svg: '<svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="6.5" fill="currentColor"/><path d="M4 7.2l2 2 4-4.2" fill="none" stroke="#fff" stroke-width="1.7"/></svg>' },
    in_progress: { label: "In progress", svg: '<svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M7 1.2a5.8 5.8 0 0 1 0 11.6z" fill="currentColor"/></svg>' },
    escalated: { label: "Escalated", svg: '<svg viewBox="0 0 14 14"><path class="fill" d="M7 .8l6.6 12.1H.4z" fill="currentColor"/><path d="M7 5v3.6M7 10.2v.9" stroke="#fff" stroke-width="1.6"/></svg>' },
    failed: { label: "Failed", svg: '<svg viewBox="0 0 14 14"><rect x=".7" y=".7" width="12.6" height="12.6" fill="currentColor"/><path d="M4.4 4.4l5.2 5.2M9.6 4.4l-5.2 5.2" stroke="#fff" stroke-width="1.7"/></svg>' },
  };
  const status = (s, pill) => `<span class="st ${s}${pill ? " pill" : ""}">${STATUS[s].svg}${STATUS[s].label}</span>`;
  const icon = n => `<i data-lucide="${n}"></i>`;
  const dir = d => d === "inbound"
    ? `<span class="dirn">${icon("phone-incoming")}Inbound</span>`
    : `<span class="dirn">${icon("phone-outgoing")}Outbound</span>`;

  function shell({ role, active, title, ctx, right }) {
    const spec = role === "specialist";
    const me = spec ? K.people.specialist : K.people.admin;
    const esc2 = K.calls.filter(c => c.status === "escalated" && !c.specialist).length;
    const a = (key, ic, label, extra = "", cls = "") =>
      `<a class="${cls}${active === key ? " on" : ""}" href="#">${ic ? icon(ic) : ""}<span>${label}</span>${extra}</a>`;
    const nav = [
      spec ? a("live", "radio-tower", "Live board", `<span class="count">${esc2}</span>`) : "",
      a("logs", "list", "Call logs"),
      `<div class="group">Outbound</div>`,
      a("campaign", "megaphone", "Campaign"),
      a("upsell", "concierge-bell", "Upsell"),
      a("call", "phone-outgoing", "Make a call"),
      !spec ? `<div class="group">Team</div>` + a("users", "users", "Users") : "",
    ].join("");
    const html = `
      <aside class="rail">
        <div class="brand"><div class="wordmark">Kiku</div><span class="ladder"></span></div>
        <nav class="nav">${nav}</nav>
        <div class="spine-label" title="${K.hotel.line}"><span class="dot"></span><span>Line open</span></div>
        <div class="me"><span class="avatar" title="${me.name}, ${me.role}">${me.initials}</span><button title="Sign out">${icon("log-out")}</button></div>
      </aside>
      <main class="main">
        <header class="topbar"><h1>${title}</h1>${ctx ? `<div class="ctx">${ctx}</div>` : ""}
          <div class="right">${right ?? `<span class="clock">${K.hotel.today.replace(/^\w+ /, "Sun ")} <b>${K.hotel.now}</b> ${K.hotel.tz}</span><span class="signed">${me.name}, ${me.role}<br><span class="faint">${K.hotel.name}, ${K.hotel.city}</span></span>`}</div>
        </header>
        <section class="content" id="content"></section>
      </main>`;
    const app = document.createElement("div");
    app.className = "app" + (spec ? " role-spec" : " role-admin");
    app.innerHTML = html;
    document.body.prepend(app);
    return app.querySelector("#content");
  }

  /* Proof: Kiku's script is the typeset line; the specialist's changes are proof marks.
     Cut words are struck through; added words sit above the line, over a caret or over the words they replace. */
  function groups(diff) {
    const cells = [];
    for (let i = 0; i < diff.length; i++) {
      const d = diff[i], n = diff[i + 1];
      if (d.op === "same") cells.push({ same: d.text });
      else if (d.op === "del" && n && n.op === "ins") { cells.push({ w: d.text, s: n.text }); i++; }
      else if (d.op === "ins" && n && n.op === "del") { cells.push({ w: n.text, s: d.text }); i++; }
      else if (d.op === "del") cells.push({ w: d.text });
      else cells.push({ s: d.text });
    }
    return cells;
  }
  function proof(diff, opts = {}) {
    const cells = groups(diff), last = cells.length - 1;
    const parts = cells.map((c, i) => {
      const tail = opts.live && i === last;
      const caret = tail ? (opts.caret || "") : "";
      if (c.same !== undefined) return `<span class="p-same">${esc(c.same)}</span>`;
      const del = c.w ? `<span class="p-del${tail ? " ahead" : ""}">${esc(c.w)}</span>` : "";
      const ins = c.s ? `<span class="p-ins">${esc(c.s)}${caret}</span>` : "";
      return tail ? `${ins} ${del}` : [del, ins].filter(Boolean).join(" ");
    });
    return `<p class="proof${opts.cls ? " " + opts.cls : ""}">${parts.join(" ")}</p>`;
  }
  const heard = diff => diff.filter(d => d.op !== "del").map(d => d.text).join(" ");
  const written = diff => diff.filter(d => d.op !== "ins").map(d => d.text).join(" ");

  const match = pct => `<span class="match"><span class="ruler"><i style="width:${pct}%"></i></span>${pct}% match</span>`;

  window.V = { K, esc, status, icon, dir, shell, proof, heard, written, groups, match, STATUS };
  window.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) lucide.createIcons();
  });
})();
