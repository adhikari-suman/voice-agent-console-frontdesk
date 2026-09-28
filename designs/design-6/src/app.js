window.Kiku = (() => {
  const K = window.KIKU;
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ic = (n, c = '') => `<span class="ms ${c}" aria-hidden="true">${n}</span>`;
  const sec = t => { const [m, s] = t.split(':').map(Number); return m * 60 + s; };
  const first = n => n.split(' ')[0];
  const initials = n => n.split(' ').map(w => w[0]).join('').slice(0, 2);
  const pad = n => String(n).padStart(2, '0');

  const ST = {
    completed: ['Completed', 'check', 'ok'],
    in_progress: ['In progress', 'graphic_eq', 'prog'],
    escalated: ['Escalated', 'back_hand', 'esc'],
    failed: ['Failed', 'close', 'fail'],
  };
  const key = (icon, cls, label = '') => `<span class="st-k k-${cls}"${label ? ` role="img" aria-label="${esc(label)}"` : ''}>${ic(icon)}</span>`;
  const stKey = s => key(ST[s][1], ST[s][2], ST[s][0]);
  const st = (s, x = '') => { const [l, i, c] = ST[s]; return `<span class="st ${x}">${key(i, c)}<span class="st-l">${l}</span></span>`; };

  const dirLabel = c => (c.direction === 'inbound' ? 'Inbound' : 'Outbound');
  const dirIcon = c => (c.direction === 'inbound' ? 'call_received' : 'call_made');
  const typeTag = (c, x = '') => c.direction === 'inbound'
    ? `<span class="tag ${x}">${ic('call_received')}Inbound</span>`
    : `<span class="tag ${x}">${ic('call_made')}Outbound · ${esc(c.type)}</span>`;
  const av = (n, x = '') => `<span class="av ${x}" aria-hidden="true">${esc(initials(n))}</span>`;

  const live = K.calls.filter(c => c.status === 'in_progress' || c.status === 'escalated');
  const chNum = id => { const i = live.findIndex(c => c.id === id); return i < 0 ? '' : pad(i + 1); };
  const specName = c => (c.specialist || '').replace(/\s*\(.*\)/, '');
  const holder = c => {
    if (c.status === 'escalated' && !c.specialist) return 'waiting';
    if (K.takeover && K.takeover.id === c.id) return 'taken';
    if (/listening/.test(c.specialist || '')) return 'listening';
    return 'kiku';
  };
  const callPage = c => ({ taken: '06-takeover-karaoke.html', listening: '05-live-call-listening.html' }[holder(c)] || '02-live-overview.html');

  const PAT = [.42, .78, .55, .95, .62, .35, .84, .5, .7, .3, .66, .9];
  const bars = (seed, tone = 'floor', n = 7, x = '') =>
    `<span class="lv lv-${tone} ${x}" aria-hidden="true">${Array.from({ length: n }, (_, i) => `<i style="--h:${PAT[(i * 5 + seed * 3) % PAT.length]}"></i>`).join('')}</span>`;

  const [dw, dd, dm] = K.hotel.today.split(' ');
  const shortDate = `${dw.slice(0, 3)} ${dd} ${dm.slice(0, 3)}`;

  const mark = `<svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><rect width="30" height="30" rx="6" fill="#1B3F8F"/><rect x="6" y="9" width="18" height="4" rx="1.5" fill="#3D7BFF"/><rect x="6" y="17" width="12" height="4" rx="1.5" fill="#F2A900"/></svg>`;
  const brand = `<a class="brand" href="02-live-overview.html">${mark}<span><span class="brand-name">Kiku</span><span class="brand-sub" style="display:block">${esc(K.hotel.name)}, ${esc(K.hotel.city)}</span></span></a>`;

  const NAV = {
    live: ['Live board', 'sensors', '02-live-overview.html'],
    logs: ['Call logs', 'list_alt', '03-call-logs.html'],
    campaign: ['Campaign', 'campaign', '07-outbound-campaign.html'],
    upsell: ['Upsell', 'room_service', '08-outbound-upsell.html'],
    make: ['Make a call', 'add_call', '09-outbound-make-a-call.html'],
    users: ['Users', 'group', '10-users.html'],
  };
  const MENU = {
    Specialist: ['live', 'logs', '|', 'campaign', 'upsell', 'make'],
    Admin: ['logs', '|', 'campaign', 'upsell', 'make', '', 'users'],
  };

  function rail(role, active, activeCh, micLive) {
    const person = role === 'Admin' ? K.people.admin : K.people.specialist;
    const waiting = live.filter(c => holder(c) === 'waiting').length;
    const nav = MENU[role].map(id => {
      if (id === '|') return `<div class="nav-g">Outbound calls</div>`;
      if (id === '') return `<div style="height:8px"></div>`;
      const [l, i, h] = NAV[id];
      const badge = id === 'live' && waiting ? `<span class="badge" aria-label="${waiting} waiting">${waiting}</span>` : '';
      return `<a href="${h}" class="${id === active ? 'is-on' : ''}"${id === active ? ' aria-current="page"' : ''}>${ic(i)}<span>${l}</span>${badge}</a>`;
    }).join('');
    const you = role === 'Specialist';
    const chs = live.map((c, i) => {
      const h = holder(c);
      const nm = first(specName(c) || 'Priya Raman');
      let sub = ic('smart_toy') + 'Kiku alone', tone = 'floor', cls = '';
      if (h === 'waiting') sub = ic('hourglass_top') + `Waiting <span class="mono">${c.waiting}</span>`;
      if (h === 'listening') sub = ic('headphones') + (you ? 'You’re listening' : `${nm} listening`);
      if (h === 'taken') {
        tone = 'interp';
        sub = micLive && you ? ic('mic', 'fill is-mic') + 'You · mic on' : ic('record_voice_over') + (you ? 'You took over' : `${nm} took over`);
        if (micLive) cls = 'is-mic';
      }
      const sel = c.id === activeCh ? ' is-sel' : '';
      return `<a class="ch${sel} ${cls}" href="${you ? callPage(c) : '03-call-logs.html'}"><span class="ch-n">CH ${pad(i + 1)}</span><span style="min-width:0"><span class="ch-g">${esc(c.guest)}</span><span class="ch-s">${sub}</span></span>${bars(i + 1, tone, 6, h === 'waiting' ? 'lv-low' : '')}${stKey(c.status)}</a>`;
    }).join('');
    return `<aside class="rail" aria-label="Kiku">
      ${brand}
      <nav class="nav" aria-label="Main">${nav}</nav>
      ${you ? `<section class="chs" aria-label="Live channels">
        <div class="chs-h"><h2>Channels</h2><span><i></i>${live.length} live</span></div>
        ${chs}
      </section>` : `<div class="chs chs-ro"><span class="ro-l">${ic('call')}Hotel line</span><span class="ro-v"><span class="mono">${esc(K.hotel.line)}</span><span class="ro-n"><i></i>${live.length} live</span></span></div>`}
      <div class="me">${av(person.name, 'av-lg av-dk')}<span class="me-t"><span class="me-n">${esc(person.name)}</span><span class="me-r">${esc(person.role)} · ${esc(person.title)}</span></span><a class="icb" href="01-sign-in.html" aria-label="Sign out">${ic('logout')}</a></div>
    </aside>`;
  }

  const clock = (extra = '') => `<div class="strip-r">${extra}<span class="sr">${ic('call')}<span class="mono">${esc(K.hotel.line)}</span></span><span class="sep"></span><span class="sr mono">${shortDate} · ${K.hotel.now} ${K.hotel.tz}</span></div>`;

  function shell(o) {
    document.body.innerHTML = `<div class="app">${rail(o.role, o.nav, o.ch, o.micLive)}<div class="work${o.console ? ' has-con' : ''}"><header class="strip">${o.lead || ''}<h1>${o.title}</h1>${o.after || ''}${clock(o.right || '')}</header><main class="desk ${o.deskClass || ''}" id="desk"></main>${o.console || ''}</div></div>`;
    return document.getElementById('desk');
  }

  const vu = (label, tone, lit, n = 14) =>
    `<span>${label}</span><span class="vu-m t-${tone}" aria-hidden="true">${Array.from({ length: n }, (_, i) => `<i class="${i < lit ? 'on' : ''}${i === lit ? ' pk' : ''}"></i>`).join('')}</span>`;

  function consoleBar(o) {
    const keys = live.map((c, i) => {
      const on = c.id === o.ch;
      const led = c.status === 'escalated' ? 'led-esc' : 'led-prog';
      return `<button class="ckey${on ? ' is-on' : ''}${on && o.live ? ' is-live' : ''}" aria-pressed="${on}" aria-label="Channel ${pad(i + 1)}, ${esc(c.guest)}"><span class="ckey-n">CH ${pad(i + 1)}</span><span class="led ${led}"></span></button>`;
    }).join('');
    return `<footer class="con" aria-label="Booth console">
      <div class="con-sec"><span class="con-lb">Channel</span><div class="ckeys">${keys}</div></div>
      <div class="con-sec" style="min-width:196px"><span class="con-lb">${o.monitorLabel}</span><div class="vu">${o.monitor}</div></div>
      <div class="con-sec" style="flex:1"><span class="con-lb">Relay</span>${o.relay}</div>
      <div class="con-sec con-mic">${o.mic}</div>
      <div class="con-sec"><div class="hand">${o.hand}</div></div>
    </footer>`;
  }

  const wrote = (diff, isLive) => {
    let lastSame = -1;
    diff.forEach((d, i) => { if (d.op === 'same') lastSame = i; });
    let cursorDone = false;
    return diff.map((d, i) => {
      if (d.op === 'ins') return '';
      if (d.op === 'same') return `<span>${esc(d.text)}</span>`;
      if (isLive && i > lastSame) {
        const cur = cursorDone ? '' : '<span class="rd" aria-hidden="true"></span>';
        cursorDone = true;
        return `${cur}<span class="w-ahead">${esc(d.text)}</span>`;
      }
      return `<s class="w-del">${esc(d.text)}</s>`;
    }).filter(Boolean).join(' ');
  };
  const said = (diff, isLive) => diff.map(d => d.op === 'del' ? '' : d.op === 'same' ? `<span>${esc(d.text)}</span>` : `<span class="w-ins">${esc(d.text)}</span>`).filter(Boolean).join(' ') + (isLive ? '<span class="caret" aria-hidden="true"></span>' : '');

  const lane = (kind, ch, who, body, meta = '') =>
    `<div class="ln ${kind}"><div class="ln-lb"><span class="ln-ch"><i></i>${ch}</span><span class="ln-who">${who}</span></div><div class="ln-tx">${body}</div>${meta ? `<div class="ln-mt">${meta}</div>` : ''}</div>`;

  const EV = { escalation: ['back_hand', 'esc'], join: ['headphones', 'booth'], takeover: ['mic', 'esc'], end: ['call_end', 'quiet'] };
  const event = e => { const [i, c] = EV[e.kind] || ['info', 'quiet']; return `<div class="ev" data-t="${e.t}"><span class="tr-t" style="padding-top:0">${e.t}</span><div class="ev-b"><span class="ev-p">${key(i, c)}${esc(e.text)}</span></div></div>`; };

  function turn(e, ctx) {
    if (e.speaker === 'system') return event(e);
    const play = ctx.play === e.t ? ' is-play' : '';
    if (e.speaker === 'agent') return `<div class="tr${play}" data-t="${e.t}"><span class="tr-t">${e.t}</span><div class="tr-b">${lane('ln-floor', 'Floor', 'Kiku', esc(e.text))}</div></div>`;
    if (e.speaker === 'guest') return `<div class="tr${play}" data-t="${e.t}"><span class="tr-t">${e.t}</span><div class="tr-b">${lane('ln-guest', 'Guest', esc(ctx.guest), esc(e.text))}</div></div>`;
    const meta = e.asWritten ? `<span class="aw">${ic('check')}Spoken as written</span>` : `<b>${e.match}%</b> match`;
    return `<div class="tr tr-k${play}${e.asWritten ? ' is-aw' : ''}" data-t="${e.t}"><span class="tr-t">${e.t}</span><div class="tr-b">${lane('ln-floor ln-wrote', 'Floor', 'Kiku wrote', wrote(e.diff))}${lane('ln-interp', ctx.interpLabel || 'Interpretation', `${esc(ctx.spec)} said`, said(e.diff), meta)}</div></div>`;
  }
  const transcript = (list, ctx) => `<div class="tx">${list.map(e => turn(e, ctx)).join('')}</div>`;

  const legend = spec => `<div class="legend"><span><i style="width:8px;height:8px;border-radius:2px;background:var(--floor);display:inline-block"></i>Floor: Kiku</span><span><i style="width:8px;height:8px;border-radius:2px;background:var(--amber);display:inline-block"></i>Interpretation: ${esc(spec)}</span><span><s>struck</s> dropped from script</span><span><u>underlined</u> improvised</span></div>`;

  const fileChip = (name, meta, actions = '') => `<div class="file">${ic('description')}<span class="file-t"><span class="file-n">${esc(name)}</span><span class="file-m">${meta}</span></span>${actions}</div>`;
  const meter = (ready, errors) => {
    const tot = ready + errors;
    return `<div class="meter"><div class="meter-bar" role="img" aria-label="${ready} ready, ${errors} with errors"><span class="m-ok" style="flex:${ready}"></span><span class="m-err" style="flex:${Math.max(errors, tot * 0.012)}"></span></div><div class="meter-l"><span>${key('check', 'ok')}<b>${ready}</b> ready</span><span>${key('close', 'fail')}<b>${errors}</b> ${errors === 1 ? 'error' : 'errors'}, will be skipped</span></div></div>`;
  };
  const toggle = (on, label) => `<button class="tgl${on ? ' is-on' : ''}" role="switch" aria-checked="${on}" aria-label="${esc(label)}"><i></i></button>`;
  const select = (opts, lead = '', label = '') => `<span class="select${lead ? ' has-lead' : ''}">${lead ? ic(lead, 'lead') : ''}<select aria-label="${esc(label)}">${opts.map(o => `<option>${esc(o)}</option>`).join('')}</select>${ic('expand_more')}</span>`;

  const FACES = ['400 14px "Atkinson Hyperlegible Next"', '600 14px "Atkinson Hyperlegible Next"', '700 14px "Atkinson Hyperlegible Next"', '500 12px "Atkinson Hyperlegible Mono"', '20px "Material Symbols Rounded"'];
  const afterFonts = run => {
    run();
    Promise.all(FACES.map(f => document.fonts.load(f).catch(() => null))).then(() => requestAnimationFrame(run));
    setTimeout(run, 1500);
    const desk = document.getElementById('desk');
    if (desk && window.ResizeObserver) new ResizeObserver(() => requestAnimationFrame(run)).observe(desk);
  };
  const alignScroll = (pane, edge) => afterFonts(() => alignNow(pane, edge));
  const alignNow = (pane, edge) => {
    const rows = [...pane.querySelectorAll('.tx > *')];
    pane.style.paddingBottom = '';
    if (edge === 'bottom') {
      const max = pane.scrollHeight - pane.clientHeight;
      const r = rows.find(el => el.offsetTop - 6 >= max);
      if (!r) { pane.scrollTop = max; return; }
      const extra = r.offsetTop - 6 - max;
      pane.style.paddingBottom = (parseFloat(getComputedStyle(pane).paddingBottom) + extra) + 'px';
      pane.scrollTop = r.offsetTop - 6;
    } else {
      const r = pane.querySelector(`[data-t="${edge}"]`);
      if (r) pane.scrollTop = r.offsetTop - 6;
    }
  };

  return { afterFonts, alignScroll, K, esc, ic, sec, first, pad, initials, ST, st, stKey, key, typeTag, dirLabel, dirIcon, av, live, chNum, holder, specName, callPage, bars, shell, consoleBar, vu, wrote, said, lane, event, turn, transcript, legend, fileChip, meter, toggle, select, shortDate };
})();
