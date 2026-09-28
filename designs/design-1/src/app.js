/* Kiku, direction "Midline". Shared shell, icons, status marks and the midline karaoke renderer. */
(function () {
  const K = window.KIKU;

  const P = {
    live: '<circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14"/>',
    logs: '<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
    campaign: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    upsell: '<path d="M12.59 2.59A2 2 0 0 0 11.17 2H4a2 2 0 0 0-2 2v7.17a2 2 0 0 0 .59 1.42l8.7 8.7a2.43 2.43 0 0 0 3.42 0l6.58-6.58a2.43 2.43 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".8"/>',
    makecall: '<path d="M16 2h6v6M22 2l-6 6"/><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    phoneoff: '<path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.4 19.4 0 0 1-3.33-2.67m-2.67-3.34A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91"/><path d="M22 2 2 22"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    userplus: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>',
    headphones: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
    mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"/>',
    micoff: '<path d="M2 2l20 20M18.89 13.23A7 7 0 0 0 19 12v-2M5 10v2a7 7 0 0 0 12 5M15 9.34V5a3 3 0 0 0-5.68-1.33M9 9v3a3 3 0 0 0 5.12 2.12M12 19v3"/>',
    handback: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
    search: '<circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.3-4.3"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    chevdown: '<path d="m6 9 6 6 6-6"/>',
    chevright: '<path d="m9 18 6-6-6-6"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    play: '<path d="M7 4.5v15l12.5-7.5z" fill="currentColor" stroke="none"/>',
    inbound: '<path d="M17 7 7 17M17 17H7V7"/>',
    outbound: '<path d="M7 17 17 7M7 7h10v10"/>',
    clock: '<circle cx="12" cy="12" r="9.5"/><path d="M12 7v5l3 2"/>',
    alert: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    volume: '<path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/>',
    note: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
    bed: '<path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/>',
    car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-3.6A2 2 0 0 0 13.7 6H8.3a2 2 0 0 0-1.6.9L4 10l-1.6.4C1.7 10.6 1 11.4 1 12.3V16c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M9 17h6"/>',
    cup: '<path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M6 2v2M10 2v2M14 2v2"/>',
    dinner: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    filter: '<path d="M22 3H2l8 9.46V19l4 2v-8.54z"/>',
  };
  function icon(n, cls) {
    return `<svg class="i ${cls || ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ''}</svg>`;
  }

  // The brand glyph: a ring with the midline running through it.
  function glyph(size) {
    const s = size || 22;
    return `<svg class="glyph" width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M0.5 12h23" stroke="var(--glyph-line, #FF6B3D)" stroke-width="2.2" stroke-linecap="round"/></svg>`;
  }

  const STATUS = {
    completed: { label: 'Completed', mark: '<circle cx="8" cy="8" r="7" fill="currentColor"/><path d="M4.9 8.2 7 10.2l4.2-4.4" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>' },
    in_progress: { label: 'In progress', mark: '<circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 1.8a6.2 6.2 0 0 1 0 12.4z" fill="currentColor"/>' },
    escalated: { label: 'Escalated', mark: '<path d="M8 .8 15.2 8 8 15.2.8 8z" fill="currentColor"/><path d="M8 4.4v4.3" stroke="#fff" stroke-width="1.7" stroke-linecap="round"/><circle cx="8" cy="11.2" r="1" fill="#fff"/>' },
    failed: { label: 'Failed', mark: '<circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.8 12.2 12.2 3.8" stroke="currentColor" stroke-width="1.6"/>' },
  };
  function statusKey(s) {
    const m = { 'Completed': 'completed', 'In progress': 'in_progress', 'Escalated': 'escalated', 'Failed': 'failed' };
    return m[s] || s;
  }
  function mark(s) { const d = STATUS[statusKey(s)]; return `<svg class="mark" viewBox="0 0 16 16" aria-hidden="true">${d.mark}</svg>`; }
  function status(s, extra) {
    const k = statusKey(s);
    return `<span class="st st-${k}">${mark(k)}<span>${STATUS[k].label}</span>${extra ? `<em>${extra}</em>` : ''}</span>`;
  }
  function dir(d) {
    return d === 'inbound'
      ? `<span class="dir">${icon('inbound')}Inbound</span>`
      : `<span class="dir">${icon('outbound')}Outbound</span>`;
  }
  function avatar(ini, cls) { return `<span class="av ${cls || ''}">${ini}</span>`; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  // ---------- Shell ----------
  const NAV = {
    specialist: [
      { id: 'live', label: 'Live board', icon: 'live', href: '02-live-overview.html', badge: 5 },
      { id: 'logs', label: 'Call logs', icon: 'logs', href: '03-call-logs.html' },
      { group: 'Outbound' },
      { id: 'campaign', label: 'Campaign', icon: 'campaign', href: '07-outbound-campaign.html' },
      { id: 'upsell', label: 'Upsell', icon: 'upsell', href: '08-outbound-upsell.html' },
      { id: 'makecall', label: 'Make a call', icon: 'makecall', href: '09-outbound-make-a-call.html' },
    ],
    admin: [
      { id: 'logs', label: 'Call logs', icon: 'logs', href: '03-call-logs.html' },
      { group: 'Outbound' },
      { id: 'campaign', label: 'Campaign', icon: 'campaign', href: '07-outbound-campaign.html' },
      { id: 'upsell', label: 'Upsell', icon: 'upsell', href: '08-outbound-upsell.html' },
      { id: 'makecall', label: 'Make a call', icon: 'makecall', href: '09-outbound-make-a-call.html' },
      { group: 'Team' },
      { id: 'users', label: 'Users', icon: 'users', href: '10-users.html' },
    ],
  };

  function rail(role, active) {
    const who = role === 'admin' ? K.people.admin : K.people.specialist;
    const items = NAV[role].map(it => it.group
      ? `<span class="nav-group">${it.group}</span>`
      : `<a class="nav-item ${it.id === active ? 'is-active' : ''}" href="${it.href}">${icon(it.icon)}<span>${it.label}</span>${it.badge ? `<b class="nav-badge" title="5 live, 1 needs a specialist">${it.badge}</b>` : ''}</a>`).join('');
    return `<header class="wire-nav">
      <div class="brand">${glyph(24)}<span class="wordmark">Kiku</span><span class="hotel">${K.hotel.name}<br>${K.hotel.city}</span></div>
      <nav class="nav" aria-label="Main">${items}</nav>
      <div class="wire-end">
        <span class="line-state"><span class="pulse"></span><b>Line open</b></span>
        <span class="me">${avatar(who.initials, 'av-me')}<b>${who.name.split(' ')[0]}</b><span class="muted">${who.role}</span><a class="icon-btn" title="Sign out" href="01-sign-in.html">${icon('logout')}</a></span>
      </div>
    </header>`;
  }

  function mount(opts, html) {
    const top = `<header class="top">
      <div class="top-l">${opts.crumb ? `<span class="crumb">${opts.crumb}</span>` : ''}<h1>${opts.title}</h1>${opts.sub ? `<span class="top-sub">${opts.sub}</span>` : ''}</div>
      <div class="top-r">${opts.topRight || ''}<span class="clock">${icon('clock')}${K.hotel.today.replace('Sunday ', 'Sun ')}, <b>${K.hotel.now}</b> ${K.hotel.tz}</span></div>
    </header>`;
    document.body.innerHTML = `<div class="app ${opts.cls || ''}">${rail(opts.role, opts.active)}<main class="main">${top}<div class="content">${html}</div></main></div>`;
    afterRender();
  }

  // ---------- Midline karaoke ----------
  // Kiku's script sits above the line, what the person said sits below it,
  // and words that were kept travel along the line as beads.
  function units(diff) {
    const out = [];
    for (let i = 0; i < diff.length; i++) {
      const d = diff[i];
      if (d.op === 'same') out.push({ same: d.text });
      else if (d.op === 'del' && diff[i + 1] && diff[i + 1].op === 'ins') { out.push({ del: d.text, ins: diff[i + 1].text }); i++; }
      else if (d.op === 'del') out.push({ del: d.text });
      else out.push({ ins: d.text });
    }
    return out;
  }
  function zipper(turn, opts) {
    opts = opts || {};
    const u = units(turn.diff);
    const cells = u.map((x, i) => {
      if (x.same !== undefined) return `<span class="u u-same"><span class="u-top"><span class="bead">${esc(x.same)}</span></span><span class="u-bot"></span></span>`;
      const last = opts.live && i === u.length - 1;
      return `<span class="u"><span class="u-top">${x.del ? `<del>${esc(x.del)}</del>` : ''}</span><span class="u-bot">${x.ins ? `<ins>${esc(x.ins)}${last ? '<i class="caret"></i>' : ''}</ins>` : ''}</span></span>`;
    }).join('');
    const who = opts.who || 'Specialist';
    return `<div class="kz ${opts.big ? 'kz-big' : ''} ${turn.asWritten ? 'kz-exact' : ''}">
      <div class="kz-lanes"><span class="kz-l kz-l-top">Kiku wrote</span><span class="kz-l kz-l-bot">${who} said</span></div>
      <div class="kz-track">${cells}</div>
    </div>`;
  }

  function alignZips() {
    document.querySelectorAll('.kz').forEach(kz => {
      const us = [...kz.querySelectorAll('.u')];
      us.forEach(u => { u.querySelector('.u-top').style.height = ''; u.querySelector('.u-bot').style.height = ''; });
      const rows = new Map();
      us.forEach(u => {
        const top = u.querySelector('.u-top'), bot = u.querySelector('.u-bot');
        let nt, nb;
        if (u.classList.contains('u-same')) {
          const h = u.querySelector('.bead').getBoundingClientRect().height;
          nt = h / 2 + 3; nb = h / 2 + 3;
        } else {
          nt = top.firstElementChild ? top.firstElementChild.getBoundingClientRect().height + 6 : 0;
          nb = bot.firstElementChild ? bot.firstElementChild.getBoundingClientRect().height + 6 : 0;
        }
        const y = Math.round(u.offsetTop);
        if (!rows.has(y)) rows.set(y, { us: [], t: 0, b: 0 });
        const r = rows.get(y); r.us.push(u); r.t = Math.max(r.t, nt); r.b = Math.max(r.b, nb);
      });
      const min = kz.classList.contains('kz-big') ? 30 : 20;
      let first = true;
      rows.forEach(r => {
        const t = Math.max(r.t, min), b = Math.max(r.b, min);
        r.us.forEach(u => { u.querySelector('.u-top').style.height = t + 'px'; u.querySelector('.u-bot').style.height = b + 'px'; });
        if (first) { kz.style.setProperty('--mid', t + 'px'); kz.style.setProperty('--midb', b + 'px'); first = false; }
      });
    });
  }

  function afterRender() {
    alignZips();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { alignZips(); requestAnimationFrame(alignZips); });
    window.addEventListener('resize', alignZips);
  }

  // Deterministic waveform heights for the recording player and level meters.
  function wave(n, seed) {
    let s = seed || 7; const out = [];
    for (let i = 0; i < n; i++) { s = (s * 9301 + 49297) % 233280; const r = s / 233280; out.push(0.18 + 0.82 * Math.abs(Math.sin(i * 0.37 + r * 2.2)) * (0.55 + 0.45 * r)); }
    return out;
  }
  function toSec(t) { const [m, s] = t.split(':').map(Number); return m * 60 + s; }

  window.Kiku = { K, icon, glyph, status, mark, dir, avatar, esc, mount, zipper, alignZips, afterRender, wave, toSec, rail };
})();
