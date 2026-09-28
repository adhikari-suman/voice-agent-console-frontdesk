/* Kiku · Twin Track shared helpers */
const K = window.KIKU;
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const STATUS = {
  completed: { label: "Completed", svg: '<svg viewBox="0 0 14 14" class="i"><circle cx="7" cy="7" r="6" fill="currentColor"/><path d="M4.2 7.2l1.9 1.9 3.8-4" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
  in_progress: { label: "In progress", svg: '<svg viewBox="0 0 14 14" class="i"><circle cx="7" cy="7" r="5.6" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="7" cy="7" r="2.4" fill="currentColor"/></svg>' },
  escalated: { label: "Escalated", svg: '<svg viewBox="0 0 14 14" class="i"><path d="M7 1.2L13.2 12.4H.8z" fill="currentColor"/><path d="M7 5.2v3.3M7 10.2v.1" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>' },
  failed: { label: "Failed", svg: '<svg viewBox="0 0 14 14" class="i"><rect x="1.2" y="1.2" width="11.6" height="11.6" rx="1" fill="currentColor"/><path d="M4.6 4.6l4.8 4.8M9.4 4.6l-4.8 4.8" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>' },
};
const statusKey = s => ({ "Completed": "completed", "In progress": "in_progress", "Escalated": "escalated", "Failed": "failed" }[s] || s);
function status(s, pill = false) {
  const k = statusKey(s), d = STATUS[k];
  return `<span class="st ${k}${pill ? " pill" : ""}">${d.svg}${d.label}</span>`;
}
function dir(d) {
  return d === "inbound"
    ? `<span class="dir"><i data-lucide="phone-incoming"></i>Inbound</span>`
    : `<span class="dir"><i data-lucide="phone-outgoing"></i>Outbound</span>`;
}
const icon = n => `<i data-lucide="${n}"></i>`;

/* Top bar. role: specialist | admin, active: nav key */
function shell(role, active) {
  const spec = role === "specialist";
  const p = spec ? K.people.specialist : K.people.admin;
  const items = spec
    ? [["live", "Live board", "radio", "02-live-overview.html"], ["logs", "Call logs", "list", "03-call-logs.html"], ["out", "Outbound", "phone-outgoing", "07-outbound-campaign.html"]]
    : [["logs", "Call logs", "list", "03-call-logs.html"], ["out", "Outbound", "phone-outgoing", "07-outbound-campaign.html"], ["users", "Users", "users", "10-users.html"]];
  const live = K.calls.filter(c => c.status === "in_progress" || c.status === "escalated");
  const lamps = live.map(c => {
    const cls = c.status === "escalated" ? "esc" : "";
    const me = c.specialist && c.specialist.startsWith("Priya") && spec ? " me" : "";
    return `<span class="lamp ${cls}${me}" title="${esc(c.guest)}">${STATUS[c.status].svg}${esc(c.guest.split(" ")[0])}</span>`;
  }).join("");
  const esCount = live.filter(c => c.status === "escalated").length;
  document.getElementById("top").innerHTML = `
    <a class="brand" href="${items[0][3]}"><span class="mark"><i></i><i></i></span><b>Kiku</b><small>The Brenlow<br>Edinburgh</small></a>
    <nav class="nav">${items.map(([k, l, ic, h]) => `<a href="${h}" class="${k === active ? "on" : ""}">${icon(ic)}${l}${k === "live" ? `<span class="n">${esCount}</span>` : ""}</a>`).join("")}</nav>
    <div class="lamps"><span class="lbl">On the line</span>${lamps}</div>
    <div class="clock"><span>${K.hotel.today.replace(" 2026", "")}</span><b>${K.hotel.now}</b><span>${K.hotel.tz}</span></div>
    <div class="who"><span class="av">${p.initials}</span><span>${esc(p.name)}<em>${p.role}</em></span></div>`;
}

/* Interlinear karaoke: returns cells. same words split, del/ins paired */
function interlinear(diff) {
  const cells = [];
  for (let i = 0; i < diff.length; i++) {
    const d = diff[i];
    if (d.op === "same") {
      d.text.split(" ").forEach(w => cells.push(`<span class="cell same"><b class="w">${esc(w)}</b><span class="seam"></span><b class="s">${esc(w)}</b></span>`));
    } else if (d.op === "del" && diff[i + 1] && diff[i + 1].op === "ins") {
      cells.push(`<span class="cell rep"><b class="w del">${esc(d.text)}</b><span class="seam"></span><b class="s ins">${esc(diff[i + 1].text)}</b></span>`);
      i++;
    } else if (d.op === "del") {
      cells.push(`<span class="cell"><b class="w del">${esc(d.text)}</b><span class="seam"></span><b class="s gap">${esc(d.text)}</b></span>`);
    } else {
      cells.push(`<span class="cell"><b class="w gap">${esc(d.text)}</b><span class="seam"></span><b class="s ins">${esc(d.text)}</b></span>`);
    }
  }
  return `<div class="il">${cells.join("")}</div>`;
}
function matchBar(m) {
  return `<span class="match"><span class="bar"><i style="width:${m}%"></i></span>${m}% as written</span>`;
}

window.addEventListener("DOMContentLoaded", () => { if (window.lucide) lucide.createIcons(); });

function outboundTabs(active) {
  const t = [["campaign", "Campaign", "megaphone", "07-outbound-campaign.html"], ["upsell", "Upsell", "concierge-bell", "08-outbound-upsell.html"], ["make", "Make a call", "phone-forwarded", "09-outbound-make-a-call.html"]];
  return `<div class="seg">${t.map(([k, l, ic, h]) => `<a href="${h}" class="${k === active ? "on" : ""}">${icon(ic)}${l}</a>`).join("")}</div>`;
}
