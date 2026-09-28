/* Kiku / Proof Desk: shared rendering helpers */
const K = window.KIKU;
const ic = (name, extra = "") => `<i data-lucide="${name}" ${extra}></i>`;
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const GLYPH = {
  completed: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="currentColor"/><path d="M4.8 8.2l2.1 2.1 4.3-4.5" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  in_progress: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 1.8a6.2 6.2 0 0 1 0 12.4z" fill="currentColor"/></svg>`,
  escalated: `<svg viewBox="0 0 16 16"><path d="M8 1.2l7 13.2H1z" fill="currentColor"/><path d="M8 6v4" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><circle cx="8" cy="12.2" r="1" fill="#fff"/></svg>`,
  failed: `<svg viewBox="0 0 16 16"><rect x="1.5" y="1.5" width="13" height="13" rx="2" fill="currentColor"/><path d="M5.3 5.3l5.4 5.4M10.7 5.3l-5.4 5.4" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/></svg>`,
};
const LABEL = { completed: "Completed", in_progress: "In progress", escalated: "Escalated", failed: "Failed" };
const status = (s, label) => `<span class="st ${s}">${GLYPH[s]}${label ?? LABEL[s]}</span>`;
const dirChip = c => c.direction === "inbound" ? `<span class="chip">${ic("phone-incoming")}Inbound</span>` : `<span class="chip">${ic("phone-outgoing")}Outbound</span>`;
const TYPE_IC = { Inbound: "phone-incoming", Campaign: "megaphone", Upsell: "badge-plus", "Make a call": "phone-forwarded" };
const typeChip = c => `<span class="chip">${ic(TYPE_IC[c.type])}${c.type}</span>`;

/* 4x4 mark: sixteen modules, Kiku cells, human cells, shared cells */
const MARK = "kkss hssk kshs shkk".replace(/ /g, "").split("").map(c => `<i class="${c}"></i>`).join("");

function shell(role, active, body, dockOverride) {
  const me = role === "admin" ? K.people.admin : K.people.specialist;
  const L = (href, label, icon, key, badge) => `<a href="${href}" class="${key === active ? "on" : ""}">${ic(icon)}${label}${badge ? `<span class="badge" aria-label="${badge} needs a specialist">${badge}</span>` : ""}</a>`;
  const nav = (role === "admin" ? "" : L("02-live-overview.html", "Live", "radio", "live", 1))
    + L("03-call-logs.html", "Call logs", "list", "logs")
    + `<span class="sep"></span><span class="grp">Outbound</span>`
    + L("07-outbound-campaign.html", "Campaign", "megaphone", "campaign")
    + L("08-outbound-upsell.html", "Upsell", "badge-plus", "upsell")
    + L("09-outbound-make-a-call.html", "Make a call", "phone-forwarded", "make")
    + (role === "admin" ? `<span class="sep"></span>` + L("10-users.html", "Users", "users", "users") : "");
  const dock = dockOverride || `
    <footer class="dock">
      <a class="brand" href="${role === "admin" ? "03-call-logs.html" : "02-live-overview.html"}"><span class="glyph" aria-hidden="true">${MARK}</span><span><b>Kiku</b><br><span>${K.hotel.name}, ${K.hotel.city}</span></span></a>
      <nav aria-label="Main">${nav}</nav>
      <div class="right">
        <span class="cmd">${ic("search")}Go to a call or guest<kbd>/</kbd></span>
        <span class="clock"><b>${K.hotel.now}</b> ${K.hotel.tz}<span>Sun 27 Sep</span></span>
        <span class="me"><span class="av">${me.initials}</span><span><b>${me.name}</b><span>${me.role}</span></span></span>
      </div>
    </footer>`;
  document.body.innerHTML = `<div class="app"><div class="work">${body}</div>${dock}</div>`;
}

/* Inline redline: one line of text. Same words plain, Kiku's unspoken words struck (violet), improvised words underlined (teal). */
const redline = (diff, tail = "") => diff.map((s, i) => {
  const t = esc(s.text) + (i === diff.length - 1 && s.op !== "del" ? tail : "");
  return s.op === "same" ? `<span>${t}</span>` : s.op === "del" ? `<del>${t}</del>` : `<ins>${t}</ins>`;
}).join(" ") + (diff[diff.length - 1].op === "del" ? tail : "");

/* Word heatmap: one cell per word */
const heat = diff => `<span class="heat" aria-hidden="true">${diff.map(s => s.text.split(/\s+/).map(() => `<i class="${s.op === "del" ? "d" : s.op === "ins" ? "n" : ""}"></i>`).join("")).join("")}</span>`;

function finish() { if (window.lucide) lucide.createIcons({ attrs: { "aria-hidden": "true" } }); }
