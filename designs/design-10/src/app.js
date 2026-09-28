(function () {
  const K = window.KIKU;
  const GA = Math.PI * (3 - Math.sqrt(5));
  const COLORS = { gold: '#FFC23A', pink: '#FF6F9E', leaf: '#57D39B', failed: '#8B8AA8', night: '#0E1024', line: '#2E3360', surface2: '#20244A', text2: '#A5A3C4' };

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ic = (name, cls = '') => `<i data-lucide="${name}" class="ic ${cls}" aria-hidden="true"></i>`;
  const sec = (t) => { const [m, s] = String(t).split(':').map(Number); return m * 60 + s; };
  const words = (s) => String(s || '').trim().split(/\s+/).filter(Boolean);
  const first = (name) => String(name || '').split(' ')[0];

  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const STATUS = {
    completed: { label: 'Completed', icon: 'circle-check' },
    in_progress: { label: 'In progress', pulse: true },
    escalated: { label: 'Escalated', icon: 'hand' },
    failed: { label: 'Failed', icon: 'x' },
  };
  function status(s, label) {
    const d = STATUS[s];
    const mark = d.pulse ? '<span class="pulse" aria-hidden="true"></span>' : ic(d.icon);
    return `<span class="status ${s}">${mark}<span>${esc(label || d.label)}</span></span>`;
  }
  function statusIcon(s) {
    const d = STATUS[s];
    return `<span class="status ${s}">${d.pulse ? '<span class="pulse" aria-hidden="true"></span>' : ic(d.icon)}</span>`;
  }

  function direction(c) {
    const out = c.direction === 'outbound';
    return `<span class="dir">${ic(out ? 'phone-outgoing' : 'phone-incoming')}<span>${esc(out ? c.type : 'Inbound')}</span></span>`;
  }

  function avatar(p, kind = '') {
    if (kind === 'kiku') return `<span class="avatar kiku ${p || ''}" aria-label="Kiku">${kikuMark(21, 21)}</span>`;
    return `<span class="avatar ${kind}" title="${esc(p.name)}">${esc(p.initials)}</span>`;
  }

  function kikuMark(size = 34, n = 21) {
    const c = size / 2;
    const k = (size * 0.4) / Math.sqrt(n);
    let dots = '';
    for (let i = 0; i < n; i++) {
      const r = k * Math.sqrt(i + 0.6);
      const a = i * GA;
      const rr = size * (0.028 + 0.042 * (i / n));
      dots += `<circle cx="${(c + r * Math.cos(a)).toFixed(2)}" cy="${(c + r * Math.sin(a)).toFixed(2)}" r="${rr.toFixed(2)}"/>`;
    }
    return `<svg class="mark" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="${COLORS.gold}" aria-hidden="true">${dots}</svg>`;
  }

  const shortDay = (() => { const [d, n, m] = K.hotel.today.split(' '); return `${d.slice(0, 3)} ${n} ${m.slice(0, 3)}`; })();
  const clock = () => `<span class="clock">${shortDay} · <b>${K.hotel.now}</b> ${K.hotel.tz}</span>`;

  const waitingCount = K.calls.filter((c) => c.status === 'escalated' && !c.specialist).length;
  const NAV = {
    specialist: [
      { id: 'live', label: 'Live', icon: 'radio', href: '02-live-overview.html', badge: waitingCount },
      { id: 'logs', label: 'Call logs', icon: 'list', href: '03-call-logs.html' },
      { id: 'outbound', label: 'Outbound', icon: 'phone-outgoing', href: '07-outbound-campaign.html' },
    ],
    admin: [
      { id: 'logs', label: 'Call logs', icon: 'list', href: '03-call-logs.html' },
      { id: 'outbound', label: 'Outbound', icon: 'phone-outgoing', href: '07-outbound-campaign.html' },
      { id: 'users', label: 'Users', icon: 'users', href: '10-users.html' },
    ],
  };

  function shell(o) {
    const role = o.role || 'specialist';
    const me = role === 'admin' ? K.people.admin : K.people.specialist;
    const nav = NAV[role].map((n) => `<a class="nav-item ${n.id === o.active ? 'active' : ''}" href="${n.href}"${n.id === o.active ? ' aria-current="page"' : ''}>${ic(n.icon)}<span>${n.label}</span>${n.badge ? `<span class="nav-badge" aria-label="${n.badge} waiting">${n.badge}</span>` : ''}</a>`).join('');
    document.body.innerHTML = `
<div class="app">
  <aside class="rail">
    <a class="rail-top" href="${role === 'admin' ? '03-call-logs.html' : '02-live-overview.html'}" aria-label="Kiku">${kikuMark(34, 34)}<span class="wordmark">Kiku</span></a>
    <nav aria-label="Main">${nav}</nav>
    <div class="rail-foot">
      <div class="rail-user">${avatar(me, role === 'specialist' ? 'spec' : '')}<span class="who">${esc(first(me.name))}</span><span class="role">${esc(me.role)}</span></div>
      <a class="icon-btn" href="01-sign-in.html" aria-label="Sign out" title="Sign out">${ic('log-out')}</a>
    </div>
  </aside>
  <main class="main">
    <header class="head">
      <div class="head-title">${o.back ? `<a class="icon-btn" href="${o.back}" aria-label="Back">${ic('arrow-left', 'ic-21')}</a>` : ''}<div><h1>${o.title}</h1>${o.sub ? `<p class="sub">${o.sub}</p>` : ''}</div>${o.titleExtra || ''}</div>
      <div class="head-right">${o.right || ''}${o.right ? '<span class="vsep"></span>' : ''}${clock()}</div>
    </header>
    <div class="content ${o.contentClass || ''}" id="content">${o.content || ''}</div>
  </main>
</div>`;
  }

  function outboundTabs(active) {
    const t = [
      { id: 'campaign', label: 'Campaign', icon: 'megaphone', href: '07-outbound-campaign.html' },
      { id: 'upsell', label: 'Upsell', icon: 'gift', href: '08-outbound-upsell.html' },
      { id: 'make', label: 'Make a call', icon: 'phone-call', href: '09-outbound-make-a-call.html' },
    ];
    return `<nav class="seg tabs" aria-label="Outbound call type">${t.map((x) => `<a class="seg-item ${x.id === active ? 'active' : ''}" href="${x.href}"${x.id === active ? ' aria-current="page"' : ''}>${ic(x.icon)}${x.label}</a>`).join('')}</nav>`;
  }

  /* ---------- karaoke ---------- */
  function bloomTokens(turn) {
    const wroteW = words(turn.wrote);
    const saidW = words(turn.said);
    const wSeq = [];
    const sSeq = [];
    turn.diff.forEach((d) => {
      const ws = words(d.text);
      if (d.op !== 'ins') ws.forEach((w) => wSeq.push({ op: d.op, w }));
      if (d.op !== 'del') ws.forEach((w) => sSeq.push({ op: d.op, w }));
    });
    if (wSeq.length === wroteW.length) wSeq.forEach((t, i) => { t.w = wroteW[i]; });
    if (sSeq.length === saidW.length) sSeq.forEach((t, i) => { t.w = saidW[i]; });
    const kept = wSeq.filter((t) => t.op === 'same').length;
    return { wSeq, sSeq, kept, total: wSeq.length };
  }
  function runs(seq, cls) {
    let out = '';
    let cur = null;
    let buf = [];
    const flush = () => {
      if (!buf.length) return;
      const t = esc(buf.join(' '));
      out += (cls[cur] ? `<span class="${cls[cur]}">${t}</span>` : t) + ' ';
      buf = [];
    };
    seq.forEach((t) => { if (t.op !== cur) { flush(); cur = t.op; } buf.push(t.w); });
    flush();
    return out.trim();
  }
  function wroteHtml(turn, live) {
    const b = bloomTokens(turn);
    if (live) {
      let lastSame = -1;
      b.wSeq.forEach((t, i) => { if (t.op === 'same') lastSame = i; });
      b.wSeq.forEach((t, i) => { if (i > lastSame && t.op === 'del') t.op = 'ahead'; });
    }
    return runs(b.wSeq, { del: 'cut', ahead: 'ahead' });
  }
  function saidHtml(turn) { return runs(bloomTokens(turn).sSeq, { ins: 'imp' }); }
  function keptText(turn, suffix = '') { const b = bloomTokens(turn); return `${b.kept} of ${b.total} words as written${suffix}`; }

  function bloomEntry(turn, specName, extra = '') {
    const wrote = turn.asWritten
      ? `<span class="exact">${ic('check-check', 'ic-13')}Spoken exactly as written</span>`
      : wroteHtml(turn);
    return `<div class="entry bloom ${extra}" data-item data-t="${turn.t}">
      <span class="t">${turn.t}</span><span class="who-w">Kiku wrote</span><p class="wrote">${wrote}</p>
      <span></span><span class="who-s">${esc(first(specName))} said</span><p class="said">${saidHtml(turn)}</p>
      <span></span><span></span><p class="kept">${keptText(turn)}</p>
    </div>`;
  }
  function lineEntry(e, names, extra = '') {
    const who = e.speaker === 'agent' ? ['kiku', 'Kiku'] : e.speaker === 'guest' ? ['guest', names.guest] : ['spec', names.spec];
    return `<div class="entry ${extra}" data-item data-t="${e.t}"><span class="t">${e.t}</span><span class="who ${who[0]}">${esc(who[1])}</span><p class="said-plain">${esc(e.text)}</p></div>`;
  }
  const EVENT_ICON = { escalation: 'hand', join: 'headphones', takeover: 'mic', end: 'phone-off' };
  function eventEntry(e) {
    return `<div class="event ${e.kind}" data-item data-t="${e.t}"><span class="t">${e.t}</span><p class="msg">${ic(EVENT_ICON[e.kind] || 'dot')}<span>${esc(e.text)}</span></p></div>`;
  }
  function transcriptHtml(list, names, opts = {}) {
    return list.map((e) => {
      const extra = (opts.mark && opts.mark(e)) || '';
      if (e.speaker === 'system') return eventEntry(e);
      if (e.karaoke) return bloomEntry(e, names.spec, extra);
      return lineEntry(e, names, extra);
    }).join('');
  }

  /* ---------- recording timeline ---------- */
  function timeline(o) {
    const dur = o.dur;
    const pct = (s) => `${((s / dur) * 100).toFixed(3)}%`;
    const list = o.transcript.map((e) => Object.assign({}, e, { s: sec(e.t) }));
    const segs = {};
    o.lanes.forEach((l) => { segs[l.key] = []; });
    list.forEach((e, i) => {
      if (e.speaker === 'system') return;
      const next = list.slice(i + 1).find((n) => n.s > e.s);
      const end = next ? next.s - 1 : dur;
      const lane = o.lanes.find((l) => l.speakers.includes(e.speaker));
      if (lane) segs[lane.key].push({ s: e.s, e: Math.max(e.s + 1, end) });
    });
    const lanes = o.lanes.map((l) => `<div class="lane">${segs[l.key].map((g) => `<i class="seg-b ${l.cls} ${o.playhead != null && g.s > o.playhead ? 'future' : ''}" style="left:${pct(g.s)};width:calc(${pct(g.e - g.s)} - 2px)"></i>`).join('')}</div>`).join('');
    const marks = (o.marks || []).map((m) => `<div class="mark ${m.cls || ''}" style="left:${pct(sec(m.t))}"><span class="ml" style="${m.side === 'l' ? 'left:auto;right:5px' : ''}">${ic(m.icon, 'ic-13')}${m.label}</span></div>`).join('');
    const head = o.playhead != null ? `<div class="head-mark" style="left:${pct(o.playhead)}"></div>` : '';
    const axis = (o.axis || []).map((t) => `<span style="left:${pct(sec(t))}">${t}</span>`).join('');
    return `<div class="tl" style="grid-template-columns:${o.labelW || 55}px minmax(0,1fr)">
      <div class="lanes-l">${o.lanes.map((l) => `<span>${esc(l.label)}</span>`).join('')}</div>
      <div class="track">${marks}${lanes}${head}</div>
      ${axis ? `<div class="axis">${axis}</div>` : ''}
    </div>`;
  }

  /* ---------- meters ---------- */
  function meter(n, seed, cls, shape) {
    const r = rng(seed);
    let out = '';
    for (let i = 0; i < n; i++) {
      const env = shape ? shape(i / (n - 1)) : 1;
      const v = Math.max(0.08, Math.min(1, env * (0.35 + 0.65 * r())));
      out += `<i class="${env > 0.12 ? 'on' : ''}" style="height:${Math.round(v * 100)}%"></i>`;
    }
    return `<span class="meter ${cls}" aria-hidden="true">${out}</span>`;
  }

  /* ---------- phyllotaxis ---------- */
  function phyllotaxisData() {
    const r = rng(146);
    const order = K.calls.slice().sort((a, b) => b.started.localeCompare(a.started) || b.id.localeCompare(a.id));
    const known = order.map((c) => ({ status: c.status, s: sec(c.duration), call: c }));
    const needC = K.stats.completed - known.filter((k) => k.status === 'completed').length;
    const needF = K.stats.failed - known.filter((k) => k.status === 'failed').length;
    const rest = Array(needC).fill('completed').concat(Array(needF).fill('failed'));
    for (let i = rest.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [rest[i], rest[j]] = [rest[j], rest[i]]; }
    const gauss = () => { let u = 0; while (!u) u = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r()); };
    const synth = rest.map((st) => ({ status: st, s: st === 'failed' ? Math.round(r() * 40) : Math.max(45, Math.min(470, Math.round(192 * Math.exp(0.42 * gauss())))) }));
    return known.concat(synth).slice(0, K.stats.callsToday);
  }

  function liveLines(c) {
    const st = STATUS[c.status].label;
    if (c.status === 'escalated' && !c.specialist) return [`${st} · ${c.duration}`, `Waiting ${c.waiting}`];
    if (c.status === 'escalated') return [`${st} · ${c.duration}`, 'You took over'];
    if (String(c.specialist || '').includes('listening')) return [`${st} · ${c.duration}`, 'You’re listening'];
    return [`${st} · ${c.duration}`, 'Kiku alone'];
  }

  function phyllotaxis(host) {
    const W = host.clientWidth;
    const H = host.clientHeight;
    const cx = W / 2;
    const cy = H / 2;
    const all = phyllotaxisData();
    const N = all.length;
    const k0 = 2.5;
    const liveIdx = [];
    all.forEach((f, i) => { if (f.status === 'in_progress' || f.status === 'escalated') liveIdx.push(i); });

    const labelEls = liveIdx.map((i) => {
      const call = all[i].call;
      const hot = call.status === 'escalated' && !call.specialist;
      const [l2, l3] = liveLines(call);
      const el = document.createElement('div');
      el.className = `fl-label ${hot ? 'hot' : ''}`;
      el.innerHTML = `<span class="nm">${statusIcon(call.status)}<span>${esc(call.guest)}</span></span><span class="dt">${esc(l2)}</span><span class="dt ${hot ? 'pink' : ''}">${esc(l3)}</span>`;
      return el;
    });
    host.innerHTML = '';
    labelEls.forEach((el) => host.appendChild(el));
    const labelW = Math.max(...labelEls.map((el) => el.offsetWidth));
    const labelH = Math.max(...labelEls.map((el) => el.offsetHeight));

    const Rmax = Math.min(H / 2 - 5, W / 2 - labelW - 34 - 13);
    const c = Rmax / (Math.sqrt(N - 1 + k0) + 1.2);
    const plen = (s) => (6 + 1.3 * Math.sqrt(s)) * (c / 14);
    const pw = 0.64 * c;
    const Rout = c * Math.sqrt(N - 1 + k0) + plen(300) / 2;
    const pos = all.map((f, i) => {
      const a = i * GA;
      const rr = c * Math.sqrt(i + k0);
      return { x: cx + rr * Math.cos(a), y: cy + rr * Math.sin(a), a };
    });
    const f1 = (n) => n.toFixed(1);
    const petal = (f, i, fill, stroke, sw, op) => {
      const p = pos[i];
      const L = Math.max(plen(f.s), pw * 1.4);
      return `<ellipse cx="${f1(p.x)}" cy="${f1(p.y)}" rx="${f1(L / 2)}" ry="${f1(pw / 2)}" transform="rotate(${f1((p.a * 180) / Math.PI)} ${f1(p.x)} ${f1(p.y)})" fill="${fill}" fill-opacity="${op}" stroke="${stroke}" stroke-width="${sw}"/>`;
    };
    const cross = (i) => {
      const p = pos[i];
      const d = pw * 0.42;
      return `<path d="M${f1(p.x - d)} ${f1(p.y - d)}L${f1(p.x + d)} ${f1(p.y + d)}M${f1(p.x + d)} ${f1(p.y - d)}L${f1(p.x - d)} ${f1(p.y + d)}" stroke="${COLORS.failed}" stroke-width="1.5" stroke-linecap="round"/>`;
    };
    let base = '';
    let live = '';
    all.forEach((f, i) => {
      if (f.status === 'completed') base += petal(f, i, COLORS.leaf, COLORS.night, 1, (0.9 - 0.4 * (i / N)).toFixed(2));
      else if (f.status === 'failed') base += cross(i);
      else live += petal(f, i, f.status === 'escalated' ? COLORS.pink : COLORS.gold, COLORS.night, 1.5, 1);
    });

    const sides = { 1: [], '-1': [] };
    liveIdx.forEach((i, n) => {
      const a = pos[i].a;
      const dir = Math.cos(a) >= 0 ? 1 : -1;
      const ex = cx + (Rout + 5) * Math.cos(a);
      const ey = cy + (Rout + 5) * Math.sin(a);
      sides[dir].push({ i, n, dir, ex, ey, y: ey });
    });
    const minY = 11;
    const maxY = H - labelH + 8;
    Object.values(sides).forEach((side) => {
      side.sort((p, q) => p.ey - q.ey);
      side.forEach((p, j) => {
        p.y = Math.max(minY, Math.min(maxY, p.ey));
        if (j > 0) p.y = Math.max(p.y, side[j - 1].y + labelH + 8);
      });
      for (let j = side.length - 1; j >= 0; j--) {
        side[j].y = Math.min(side[j].y, maxY);
        if (j < side.length - 1) side[j].y = Math.min(side[j].y, side[j + 1].y - labelH - 8);
      }
    });
    let leaders = '';
    Object.values(sides).flat().forEach((q) => {
      const f = all[q.i];
      const col = f.status === 'escalated' ? COLORS.pink : COLORS.gold;
      const lx = cx + q.dir * (Rout + 34);
      const x0 = pos[q.i].x;
      const y0 = pos[q.i].y;
      leaders += `<polyline points="${f1(x0)},${f1(y0)} ${f1(q.ex)},${f1(q.ey)} ${f1(lx - q.dir * 13)},${f1(q.y)} ${f1(lx - q.dir * 5)},${f1(q.y)}" fill="none" stroke="${col}" stroke-opacity="0.8" stroke-width="1"/>`;
      leaders += `<circle cx="${f1(q.ex)}" cy="${f1(q.ey)}" r="2.5" fill="${col}"/>`;
      const el = labelEls[q.n];
      el.style.left = `${f1(lx)}px`;
      el.style.top = `${f1(q.y - 10.5)}px`;
      if (q.dir < 0) el.classList.add('left');
    });
    const core = `<circle cx="${cx}" cy="${cy}" r="${f1(c * 1.05)}" fill="none" stroke="${COLORS.gold}" stroke-width="1" stroke-dasharray="2 3"/><circle cx="${cx}" cy="${cy}" r="3" fill="${COLORS.gold}"/>`;
    host.insertAdjacentHTML('afterbegin', `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Today’s ${N} calls as florets, newest at the centre">${base}${leaders}${live}${core}</svg>`);
  }

  function signInBloom(host, n = 233) {
    const W = host.clientWidth;
    const H = host.clientHeight;
    const cx = W * 0.5;
    const cy = H * 0.5;
    const R = Math.min(W, H) * 0.5 - 8;
    const k0 = 1.5;
    const c = R / (Math.sqrt(n - 1 + k0) + 1.2);
    let out = '';
    for (let i = n - 1; i >= 0; i--) {
      const a = i * GA;
      const rr = c * Math.sqrt(i + k0);
      const x = cx + rr * Math.cos(a);
      const y = cy + rr * Math.sin(a);
      const t = i / n;
      const L = c * (1.25 + 1.35 * t);
      const w = c * 0.62;
      const fill = i < 8 ? COLORS.gold : i < 21 ? '#6E5A3A' : t < 0.5 ? COLORS.surface2 : '#1B1F40';
      const stroke = i < 21 ? COLORS.night : COLORS.line;
      out += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(L / 2).toFixed(1)}" ry="${(w / 2).toFixed(1)}" transform="rotate(${((a * 180) / Math.PI).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${fill}" stroke="${stroke}" stroke-width="1"/>`;
    }
    host.innerHTML = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true">${out}</svg>`;
  }

  /* ---------- pane fitting ---------- */
  function fitPane(pane, opts = {}) {
    let items = Array.from(pane.querySelectorAll('[data-item]'));
    if (!items.length) return;
    if (opts.start) {
      const k = items.indexOf(opts.start);
      if (k > 0) {
        items.slice(0, k).forEach((it) => { it.style.display = 'none'; });
        const row = document.createElement('button');
        row.className = 'earlier';
        row.type = 'button';
        row.innerHTML = opts.earlier(k);
        opts.start.parentElement.insertBefore(row, opts.start);
        items = items.slice(k);
      }
    }
    const bottom = pane.clientHeight;
    let last = null;
    let below = 0;
    items.forEach((it) => {
      const b = it.offsetTop + it.offsetHeight;
      if (b <= bottom + 0.5) last = it; else below++;
    });
    if (last && below) {
      pane.style.flex = 'none';
      pane.style.height = `${Math.floor(last.offsetTop + last.offsetHeight + (opts.padBottom || 0))}px`;
    }
    if (opts.foot) { opts.foot.innerHTML = opts.below(below); opts.foot.style.flex = '1 0 auto'; }
  }

  function pinBottom(pane, label) {
    const items = Array.from(pane.querySelectorAll('[data-item]'));
    if (!items.length) return;
    const wrap = items[0].parentElement;
    const avail = pane.clientHeight - 34 - 13;
    const last = items[items.length - 1];
    const end = last.offsetTop + last.offsetHeight;
    let k = items.length - 1;
    while (k > 0 && end - items[k - 1].offsetTop <= avail) k--;
    if (k > 0) {
      for (let i = 0; i < k; i++) items[i].style.display = 'none';
      const row = document.createElement('button');
      row.className = 'earlier';
      row.type = 'button';
      row.innerHTML = label(k);
      wrap.insertBefore(row, items[k]);
    }
  }

  function done(after, before) {
    const run = () => {
      if (before) before();
      if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 1.5 } });
      if (after) after();
    };
    if (document.fonts && document.fonts.load) {
      const faces = ['400 16px Epilogue', '500 13px Epilogue', '600 13px Epilogue', '650 34px Epilogue', '700 55px Epilogue'];
      Promise.all(faces.map((f) => document.fonts.load(f)))
        .then(() => document.fonts.ready)
        .then(() => requestAnimationFrame(() => requestAnimationFrame(run)), run);
    }
    else run();
  }

  window.Kiku = {
    K, esc, ic, sec, words, first, status, statusIcon, direction, avatar, kikuMark, shell, outboundTabs,
    bloomTokens, wroteHtml, saidHtml, keptText, bloomEntry, lineEntry, eventEntry, transcriptHtml,
    timeline, meter, phyllotaxis, signInBloom, fitPane, pinBottom, done, rng, COLORS,
  };
})();
