/* Kiku — Duet direction. Shared helpers. */
const K = window.KIKU;

const STATUS = {
  completed: 'Completed', in_progress: 'In progress', escalated: 'Escalated', failed: 'Failed'
};
const SHAPE = {
  completed: '<svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="6.5" fill="currentColor"/><path d="M4 7.2l2 2 4-4.2" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  in_progress: '<svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M7 1.2a5.8 5.8 0 0 1 0 11.6z" fill="currentColor"/></svg>',
  escalated: '<svg viewBox="0 0 14 14"><path d="M7 .8l6.4 11.8H.6z" fill="currentColor"/><path d="M7 5v3.4" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/><circle cx="7" cy="10.4" r=".9" fill="#fff"/></svg>',
  failed: '<svg viewBox="0 0 14 14"><rect x=".8" y=".8" width="12.4" height="12.4" rx="1.5" fill="currentColor"/><path d="M4.6 4.6l4.8 4.8M9.4 4.6l-4.8 4.8" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>'
};
function status(s, pill) { return `<span class="st ${s}${pill ? ' pill' : ''}">${SHAPE[s]}${STATUS[s]}</span>`; }
function ic(n) { return `<svg class="lucide" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${(window.ICONS || {})[n] || ''}</svg>`; }
function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

/* The logo: two voices, one overlap. */
function mark(size = 26, onDark = true) {
  const id = 'm' + Math.random().toString(36).slice(2, 7);
  const r = size * 0.33, cy = size / 2, c1 = size * 0.36, c2 = size * 0.64;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true">
    <defs><clipPath id="${id}"><circle cx="${c1}" cy="${cy}" r="${r}"/></clipPath></defs>
    <circle cx="${c1}" cy="${cy}" r="${r}" fill="#7AB86E"/>
    <circle cx="${c2}" cy="${cy}" r="${r}" fill="#8A77CA"/>
    <circle cx="${c2}" cy="${cy}" r="${r}" fill="${onDark ? '#ECEEE9' : '#1E2421'}" clip-path="url(#${id})"/></svg>`;
}

/* Overlap glyph: how much of Kiku's line the human kept. 100 = fully overlapping discs. */
function overlap(match, size = 22) {
  const id = 'o' + Math.random().toString(36).slice(2, 7);
  const r = size * 0.3, cy = size / 2, d = 2 * r * (1 - match / 100);
  const w = size + 2 * r;
  const c1 = w / 2 - d / 2, c2 = w / 2 + d / 2;
  return `<svg width="${w}" height="${size}" viewBox="0 0 ${w} ${size}" aria-hidden="true">
    <defs><clipPath id="${id}"><circle cx="${c1}" cy="${cy}" r="${r}"/></clipPath></defs>
    <circle cx="${c1}" cy="${cy}" r="${r}" fill="none" stroke="#7AB86E" stroke-width="1.6"/>
    <circle cx="${c2}" cy="${cy}" r="${r}" fill="none" stroke="#8A77CA" stroke-width="1.6"/>
    <circle cx="${c2}" cy="${cy}" r="${r}" fill="#1E2421" clip-path="url(#${id})"/></svg>`;
}

/* Gloss flow: one reading line of what the human said. Where they dropped Kiku's words,
   those words ride above the line as small struck glosses; their own words are set in violet italic. */
function flow(diff, liveTail) {
  const lastSame = diff.map(d => d.op).lastIndexOf('same');
  return `<p class="flow">${diff.map((d, i) => {
    if (d.op === 'same') return `<span class="f-same">${esc(d.text)}</span>`;
    if (d.op === 'ins') return `<span class="f-ins">${esc(d.text)}</span>`;
    if (liveTail && i > lastSame) return `<span class="f-ahead">${esc(d.text)}</span>`;
    return `<span class="f-del" title="Kiku wrote this; it was not said"><s>${esc(d.text)}</s></span>`;
  }).join(' ')}</p>`;
}
function kept(m, size = 18) {
  return m.asWritten
    ? `<span class="asw">${overlap(100, size).replace(/#1E2421/g, '#fff').replace(/#7AB86E|#8A77CA/g, '#fff')}Spoken as written</span>`
    : `<span class="ovl">${overlap(m.match, size)}${m.match}% of Kiku's words kept</span>`;
}

function shell(role, active, opts = {}) {
  const spec = role === 'specialist';
  const p = spec ? K.people.specialist : K.people.admin;
  const items = spec
    ? [['live', 'Live', 'radio', '02-live-overview.html'], ['logs', 'Call logs', 'list', '03-call-logs.html'], ['out', 'Outbound', 'phone-outgoing', '07-outbound-campaign.html']]
    : [['logs', 'Call logs', 'list', '03-call-logs.html'], ['out', 'Outbound', 'phone-outgoing', '07-outbound-campaign.html'], ['users', 'Users', 'users', '10-users.html']];
  const rail = document.createElement('aside');
  rail.className = 'rail' + (opts.onair ? ' onair' : '');
  rail.innerHTML = `
    <a class="r-brand" href="#">${mark(30, !!opts.onair)}<span>Kiku</span></a>
    ${opts.onair ? `<div class="r-air">${ic('mic')}<span>You're on air</span></div>` : ''}
    <nav class="r-nav">${items.map(([k, l, i, h]) => `<a href="${h}" class="${k === active ? 'on' : ''}">${ic(i)}<span>${l}</span>${k === 'live' ? '<b class="count">1</b>' : ''}</a>`).join('')}</nav>
    <div class="r-time"><b>${K.hotel.now}</b><span>${K.hotel.tz}</span><span style="white-space:nowrap">Sun 27 Sep</span></div>
    <div class="r-me" title="${p.name}, ${p.role}"><div class="av ${spec ? '' : 'admin'}">${p.initials}</div><span>${p.role}</span></div>`;
  document.body.classList.add('app');
  document.body.prepend(rail);
}

function outboundTabs(active) {
  const t = [['campaign', 'Campaign', 'megaphone', '07-outbound-campaign.html'], ['upsell', 'Upsell', 'badge-plus', '08-outbound-upsell.html'], ['make', 'Make a call', 'phone-call', '09-outbound-make-a-call.html']];
  return `<div class="tabs">${t.map(([k, l, i, h]) => `<a href="${h}" class="${k === active ? 'on' : ''}">${ic(i)}${l}</a>`).join('')}</div>`;
}

function icons() {}
