(function () {
  const K = window.KIKU;

  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ico = (n, cls = '') => `<i class="iconoir-${n} ico ${cls}" aria-hidden="true"></i>`;
  const $ = (sel) => document.querySelector(sel);

  const STATUS = {
    completed: ['Completed', null],
    in_progress: ['In progress', 'green'],
    escalated: ['Escalated', 'amber'],
    failed: ['Failed', 'red'],
  };
  const lamp = (c, extra = '') => `<span class="lamp ${c ? `lamp--${c} is-on` : ''} ${extra}"></span>`;
  const status = (s) => {
    const [label, c] = STATUS[s];
    return `<span class="status">${lamp(c)}${label}</span>`;
  };

  const secs = (t) => { const [m, s] = t.split(':').map(Number); return m * 60 + s; };
  const mmss = (n) => `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;
  const first = (name) => name.split(' ')[0];
  const initials = (name) => name.split(' ').map((p) => p[0]).join('').slice(0, 2);
  const knob = (ini, cls = '') => `<span class="knob ${cls}">${esc(ini)}</span>`;

  function shell({ role, active }) {
    const person = K.people[role];
    const liveCount = K.calls.filter((c) => c.status === 'in_progress' || c.status === 'escalated').length;
    const items = role === 'specialist'
      ? [
        ['live', 'live board', 'antenna-signal', '02-live-overview.html', `${liveCount} live`],
        ['logs', 'call logs', 'list', '03-call-logs.html'],
        ['out', 'outbound calls', 'phone-outcome', '07-outbound-campaign.html'],
      ]
      : [
        ['logs', 'call logs', 'list', '03-call-logs.html'],
        ['out', 'outbound calls', 'phone-outcome', '07-outbound-campaign.html'],
        ['users', 'users', 'group', '10-users.html'],
      ];
    const keys = items.map(([id, label, icon, href, count]) => `
      <a class="navkey ${id === active ? 'is-down' : ''}" href="${href}" ${id === active ? 'aria-current="page"' : ''}>
        ${lamp(id === active ? 'green' : null)}${ico(icon)}<span>${label}</span>
        ${count ? `<span class="navkey-count">${count}</span>` : ''}
      </a>`).join('');
    const [day, dd, mon] = K.hotel.today.split(' ');
    $('#column').innerHTML = `
      <div class="brand"><span class="badge">kiku</span>
        <div class="brand-txt"><b>${esc(K.hotel.name)}</b>${esc(K.hotel.city)}</div></div>
      <div class="readout">
        <div class="readout-time">${K.hotel.now}</div>
        <div class="lbl">${K.hotel.tz.toLowerCase()} · ${day.slice(0, 3).toLowerCase()} ${dd} ${mon.slice(0, 3).toLowerCase()}</div>
        <div class="lbl">hotel line ${esc(K.hotel.line)}</div>
      </div>
      <nav class="nav" aria-label="Main">${keys}</nav>
      <div class="user-plate">
        ${knob(person.initials)}
        <div class="who grow"><b>${esc(person.name)}</b><span>${esc(person.role)}</span></div>
        <a class="key key--icon key--sm" href="01-sign-in.html" aria-label="Sign out">${ico('log-out')}</a>
      </div>`;
  }

  function outboundTabs(active) {
    const tabs = [['campaign', 'campaign', '07-outbound-campaign.html', 'megaphone'], ['upsell', 'upsell', '08-outbound-upsell.html', 'cart'], ['make', 'make a call', '09-outbound-make-a-call.html', 'phone-outcome']];
    return `<div class="bank" role="tablist" aria-label="Outbound call type">${tabs.map(([id, l, href, i]) =>
      `<a role="tab" aria-selected="${id === active}" class="key ${id === active ? 'is-down' : ''}" href="${href}">${lamp(id === active ? 'green' : null)}${ico(i)}${l}</a>`).join('')}</div>`;
  }

  /* karaoke diff */
  function diffSide(diff, side, { live = false } = {}) {
    let lastSame = -1;
    diff.forEach((d, i) => { if (d.op === 'same') lastSame = i; });
    return diff.map((d, i) => {
      if (d.op === 'same') return esc(d.text);
      if (side === 'a' && d.op === 'del') return live && i > lastSame ? `<span class="k-pend">${esc(d.text)}</span>` : `<span class="k-del">${esc(d.text)}</span>`;
      if (side === 'b' && d.op === 'ins') return `<span class="k-ins">${esc(d.text)}</span>`;
      return null;
    }).filter((x) => x !== null).join(' ');
  }

  const matchBar = (pct) => `<span class="match"><span>${pct}% match</span><span class="match-bar"><i style="width:${pct}%"></i></span></span>`;

  function karaokeBlock(turn, who) {
    if (turn.asWritten) {
      return `<div class="kt kt--same"><div><div class="kt-lbl"><span class="trk">A</span><span class="trk trk--b">B</span>${ico('check')}spoken as written</div>
        <p class="kt-text">${esc(turn.said)}</p></div></div>`;
    }
    return `<div class="kt">
      <div class="kt-col kt-col--a"><div class="kt-lbl"><span class="trk">A</span>Kiku wrote</div><p class="kt-text">${diffSide(turn.diff, 'a')}</p></div>
      <div class="kt-col"><div class="kt-lbl"><span class="trk trk--b">B</span>${esc(who)} said</div><p class="kt-text">${diffSide(turn.diff, 'b')}</p></div>
    </div>`;
  }

  const SYS_ICON = { escalation: 'warning-triangle', join: 'headset', takeover: 'microphone', end: 'phone-xmark' };

  function transcript(entries, { guest, specialist, latestIndex = -1, playing = -1 } = {}) {
    return entries.map((e, i) => {
      if (e.speaker === 'system') {
        return `<div class="msg msg--sys is-${e.kind}"><div class="msg-t">${e.t}</div>
          <div class="msg-body" style="grid-column: 2 / 4">${ico(SYS_ICON[e.kind] || 'info-circle')}${esc(e.text)}</div></div>`;
      }
      if (e.karaoke) {
        return `<div class="msg msg--k ${i === playing ? 'is-playing' : ''}"><div class="msg-t">${e.t}${i === playing ? '<span class="playing-lbl">playing</span>' : ''}</div>
          <div class="msg-who">${esc(first(specialist))}${matchBar(e.match)}</div>${karaokeBlock(e, first(specialist))}</div>`;
      }
      const who = e.speaker === 'agent' ? 'Kiku' : first(guest);
      return `<div class="msg msg--${e.speaker} ${i === latestIndex ? 'is-latest' : ''}"><div class="msg-t">${e.t}</div>
        <div class="msg-who">${esc(who)}</div><p class="msg-text">${esc(e.text)}</p></div>`;
    }).join('');
  }

  /* needle VU meter */
  function vu({ label, db = -20, width = 150 }) {
    const W = 150, H = 96, cx = 75, cy = 112, r = 82;
    const pos = (d) => (Math.pow(10, d / 20) - 0.1) / (Math.pow(10, 3 / 20) - 0.1);
    const ang = (p) => (-40 + 80 * p) * Math.PI / 180;
    const pt = (p, rr) => [cx + rr * Math.sin(ang(p)), cy - rr * Math.cos(ang(p))];
    const arc = (p0, p1, rr) => { const [x0, y0] = pt(p0, rr); const [x1, y1] = pt(p1, rr); return `M${x0.toFixed(2)} ${y0.toFixed(2)} A${rr} ${rr} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`; };
    const ticks = [-20, -10, -7, -5, -3, -2, -1, 0, 1, 2, 3];
    const labels = { '-20': '20', '-10': '10', '-7': '7', '-5': '5', '-3': '3', '0': '0', '3': '+3' };
    let s = '';
    s += `<path d="${arc(0, pos(0), r)}" fill="none" stroke="#2B2B2A" stroke-width="1"/>`;
    s += `<path d="${arc(pos(0), 1, r + 1.6)}" fill="none" stroke="#C8412E" stroke-width="4"/>`;
    ticks.forEach((d) => {
      const p = pos(d); const major = labels[d] !== undefined;
      const [x0, y0] = pt(p, r); const [x1, y1] = pt(p, r + (major ? 7 : 4.5));
      s += `<line x1="${x0.toFixed(2)}" y1="${y0.toFixed(2)}" x2="${x1.toFixed(2)}" y2="${y1.toFixed(2)}" stroke="${d > 0 ? '#C8412E' : '#2B2B2A'}" stroke-width="${major ? 1.2 : 0.9}"/>`;
      if (major) { const [lx, ly] = pt(p, r + 13.5); s += `<text x="${lx.toFixed(2)}" y="${(ly + 3).toFixed(2)}" font-size="8" text-anchor="middle" fill="${d > 0 ? '#A8321F' : '#2B2B2A'}" font-family="Hanken Grotesk" font-weight="600">${labels[d]}</text>`; }
    });
    s += `<text x="${W - 16}" y="69" font-size="9.5" text-anchor="middle" fill="#2B2B2A" font-family="Hanken Grotesk" font-weight="700" letter-spacing="1">VU</text>`;
    const p = Math.max(0, Math.min(1.04, pos(db)));
    const [nx, ny] = pt(p, r + 8);
    const [bx, by] = pt(p, 40);
    s += `<line x1="${bx.toFixed(2)}" y1="${by.toFixed(2)}" x2="${nx.toFixed(2)}" y2="${ny.toFixed(2)}" stroke="#2B2B2A" stroke-width="1.4" stroke-linecap="round"/>`;
    s += `<rect x="0" y="76" width="${W}" height="20" fill="#2B2B2A"/>`;
    s += `<text x="10" y="90" font-size="10.5" fill="#FAFAF8" font-family="Hanken Grotesk" font-weight="600" letter-spacing=".3">${esc(label)}</text>`;
    s += `<text x="${W - 10}" y="90" font-size="10" fill="#D8D7D2" text-anchor="end" font-family="Hanken Grotesk" font-weight="500">${db <= -20 ? 'quiet' : 'speaking'}</text>`;
    return `<figure class="vu"><svg width="${width}" height="${width * H / W}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)} level meter"><rect width="${W}" height="${H}" fill="#FAFAF8"/>${s}</svg></figure>`;
  }

  /* rotary selector */
  function rotary({ value, min = 1, max = 5, size = 104, label }) {
    const c = size / 2, rk = size * 0.24;
    const n = max - min + 1;
    const angFor = (v) => (-120 + (240 * (v - min)) / (n - 1)) * Math.PI / 180;
    let s = '';
    for (let v = min; v <= max; v++) {
      const a = angFor(v); const rt = size * 0.42;
      const x = c + rt * Math.sin(a), y = c - rt * Math.cos(a);
      const [t0x, t0y] = [c + (rk + 3) * Math.sin(a), c - (rk + 3) * Math.cos(a)];
      const [t1x, t1y] = [c + (rk + 7) * Math.sin(a), c - (rk + 7) * Math.cos(a)];
      s += `<line x1="${t0x.toFixed(2)}" y1="${t0y.toFixed(2)}" x2="${t1x.toFixed(2)}" y2="${t1y.toFixed(2)}" stroke="#55554F" stroke-width="1.2"/>`;
      s += `<text x="${x.toFixed(2)}" y="${(y + 4).toFixed(2)}" text-anchor="middle" font-size="11" font-family="Hanken Grotesk" font-weight="${v === value ? 700 : 500}" fill="${v === value ? '#2B2B2A' : '#55554F'}">${v}</text>`;
    }
    const a = angFor(value);
    const px = c + (rk - 4) * Math.sin(a), py = c - (rk - 4) * Math.cos(a);
    const qx = c + (rk * 0.35) * Math.sin(a), qy = c - (rk * 0.35) * Math.cos(a);
    s += `<defs><filter id="kb" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.3"/></filter></defs><circle cx="${c}" cy="${c + 1.5}" r="${rk}" fill="rgba(43,43,42,.3)" filter="url(#kb)"/>`;
    s += `<circle cx="${c}" cy="${c}" r="${rk}" fill="#F3F3F0" stroke="#B9B8B1" stroke-width="1"/>`;
    s += `<circle cx="${c}" cy="${c}" r="${rk - 5}" fill="none" stroke="#E0DFDA" stroke-width="1"/>`;
    s += `<line x1="${qx.toFixed(2)}" y1="${qy.toFixed(2)}" x2="${px.toFixed(2)}" y2="${py.toFixed(2)}" stroke="#2B2B2A" stroke-width="3" stroke-linecap="round"/>`;
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(label)}: ${value}">${s}</svg>`;
  }

  window.Kiku = { K, esc, ico, lamp, status, STATUS, secs, mmss, first, initials, knob, shell, outboundTabs, diffSide, karaokeBlock, transcript, vu, rotary, matchBar, $ };
})();
