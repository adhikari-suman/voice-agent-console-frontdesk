/* Kiku / Split Reel: shared helpers */
(function () {
  const K = window.KIKU;
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const icon = (n, cls = '') => `<i data-lucide="${n}" class="${cls}"></i>`;

  const SHAPES = {
    completed: '<svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="6.5" fill="currentColor"/><path d="M4 7.2l2 2 4-4.4" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    in_progress: '<svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.6" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="7" cy="7" r="2.4" fill="currentColor"/></svg>',
    escalated: '<svg viewBox="0 0 14 14"><path d="M7 .8l6.4 11.6H.6z" fill="currentColor"/><path d="M7 5v3.4" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/><circle cx="7" cy="10.3" r=".9" fill="#fff"/></svg>',
    failed: '<svg viewBox="0 0 14 14"><rect x=".8" y=".8" width="12.4" height="12.4" rx="1.5" fill="currentColor"/><path d="M4.6 4.6l4.8 4.8M9.4 4.6l-4.8 4.8" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>'
  };
  const LABEL = { completed: 'Completed', in_progress: 'In progress', escalated: 'Escalated', failed: 'Failed' };
  const status = (k, label) => `<span class="st ${k}">${SHAPES[k]}${esc(label || LABEL[k])}</span>`;
  const shape = k => `<span class="st ${k}">${SHAPES[k]}</span>`;
  const dir = c => c.direction === 'inbound'
    ? `<span class="dir">${icon('phone-incoming')}Inbound</span>`
    : `<span class="dir">${icon('phone-outgoing')}Outbound</span>`;

  const NAV = {
    specialist: [['live', 'Live', 'radio-tower', '02-live-overview.html', 2], ['logs', 'Call logs', 'scroll-text', '03-call-logs.html'], ['out', 'Outbound', 'phone-outgoing', '07-outbound-campaign.html']],
    admin: [['logs', 'Call logs', 'scroll-text', '03-call-logs.html'], ['out', 'Outbound', 'phone-outgoing', '07-outbound-campaign.html'], ['users', 'Users', 'users', '10-users.html']]
  };

  function shell(o) {
    const me = o.role === 'admin' ? K.people.admin : K.people.specialist;
    const nav = NAV[o.role].map(([k, l, ic, href, b]) =>
      `<a href="${href}" class="${k === o.active ? 'on' : ''}">${icon(ic)}${l}${b ? `<span class="badge">${b}</span>` : ''}</a>`).join('');
    document.getElementById('spine').innerHTML =
      `<div class="mark"><span class="tt"><i></i><i></i></span></div>${nav}<div class="grow"></div><div class="word">KIKU</div><div class="me" title="${esc(me.name)}">${me.initials}</div>`;
    const top = document.getElementById('top');
    if (top) top.innerHTML = `
      ${o.crumb ? `<div class="crumb">${o.crumb}</div>` : ''}
      <h1>${o.title}</h1>${o.after || ''}
      <div class="sp"></div>
      <div class="line"><i class="dot"></i>Hotel line ${esc(K.hotel.line)}</div>
      <div class="clock">Sun 27 Sep <b>${K.hotel.now}</b>${K.hotel.tz}</div>
      <div class="who"><span class="av">${me.initials}</span><span>${esc(me.name)}<small>${me.role}</small></span></div>`;
  }

  /* twin-track diff: top lane = Kiku wrote, bottom lane = specialist said, shared words bridge both */
  function lanes(diff, o = {}) {
    let out = '';
    diff.forEach(d => {
      const words = d.text.split(/\s+/).filter(Boolean);
      words.forEach((w, i) => {
        const cls = `seg ${d.op}${i === 0 ? ' f' : ''}${i === words.length - 1 ? ' l' : ''}`, t = esc(w);
        if (d.op === 'same') out += `<span class="${cls}"><span>${t}</span></span>`;
        else if (d.op === 'del') out += `<span class="${cls}"><span class="w">${t}</span><span class="gap"></span></span>`;
        else out += `<span class="${cls}"><span class="gap"></span><span class="s">${t}</span></span>`;
      });
    });
    if (o.live) out += '<span class="seg ins f l"><span class="gap"></span><span class="s"><i class="caret"></i></span></span>';
    return `<div class="lanes"${o.style ? ` style="${o.style}"` : ''}>${out}</div>`;
  }
  /* split reel: the same diff read as two texts. matched words carry a twin underline in both */
  function sides(diff) {
    let w = '', said = '';
    diff.forEach(d => {
      const t = esc(d.text);
      if (d.op === 'same') { w += `<span class="k">${t}</span> `; said += `<span class="k">${t}</span> `; }
      else if (d.op === 'del') w += `<span class="x">${t}</span> `;
      else said += `<span class="n">${t}</span> `;
    });
    return { wrote: w.trim(), said: said.trim() };
  }
  const meter = m => `<span class="meter" title="Share of Kiku's words kept">Kept <b>${m}%</b><span class="bar"><i style="width:${m}%"></i></span></span>`;

  function kturn(e, name, o = {}) {
    const first = name.split(' ')[0];
    return `<div class="kturn ${e.asWritten ? 'exact' : ''}">
      <div class="khead"><span class="t tc" style="font:600 14px/1 var(--f-count);color:var(--faint);letter-spacing:.04em">${e.t}</span>
        <span class="who"><span class="doth"></span>${esc(first)} spoke, Kiku prompted</span><span class="sp"></span>
        ${e.asWritten ? `<span class="exact-tag">${icon('check')}Spoken as written</span>` : `<span class="h3" style="font-weight:500">Improvised</span>`}
        ${meter(e.match)}</div>
            ${o.compact ? '' : `<div style="display:flex">
        <div class="lanekey"><span class="kw">Kiku wrote</span><span class="hs">${esc(first)} said</span></div>
        ${lanes(e.diff, { live: o.live })}
      </div>`}
      ${o.readback || o.compact ? `<dl class="readback"><dt>Kiku wrote</dt><dd class="w">${sides(e.diff).wrote}</dd><dt>${esc(first)} said</dt><dd class="s">${sides(e.diff).said}</dd></dl>` : ''}
    </div>`;
  }

  function turn(e, names, o = {}) {
    if (e.speaker === 'system') {
      const ic = { escalation: 'triangle-alert', join: 'headphones', takeover: 'mic', end: 'phone-off' }[e.kind] || 'dot';
      return `<div class="turn sys ${e.kind}"><div class="t tc">${e.t}</div><div class="body">${icon(ic)}${esc(e.text)}</div></div>`;
    }
    if (e.karaoke) return `<div class="turn"><div class="t tc">${e.t}</div><div>${kturn(e, names.specialist, { live: e.live, compact: o.compact })}</div></div>`;
    const who = e.speaker === 'agent' ? '<span class="dotk"></span>Kiku' : `<span class="dotg"></span>${esc(names.guest)}`;
    return `<div class="turn ${e.speaker}"><div class="t tc">${e.t}</div><div><div class="who">${who}</div><div class="body">${esc(e.text)}</div></div></div>`;
  }

  function level(n, seed, h) {
    let out = '', x = seed || 7;
    for (let i = 0; i < n; i++) { x = (x * 9301 + 49297) % 233280; const v = 4 + Math.round((x / 233280) * 20 * (0.45 + 0.55 * Math.sin(i / 3.1) ** 2)); out += `<i style="height:${v}px"></i>`; }
    return `<div class="level ${h ? 'h' : ''}">${out}</div>`;
  }

  function outTabs(on) {
    const t = [['campaign', 'Campaign', 'megaphone', '07-outbound-campaign.html'], ['upsell', 'Upsell', 'badge-plus', '08-outbound-upsell.html'], ['make', 'Make a call', 'phone-forwarded', '09-outbound-make-a-call.html']];
    return `<nav class="tabs">${t.map(([k, l, ic, h]) => `<a href="${h}" class="${k === on ? 'on' : ''}">${icon(ic)}${l}</a>`).join('')}</nav>`;
  }
  window.TT = { outTabs, sides, K, esc, icon, status, shape, dir, shell, lanes, meter, kturn, turn, level, LABEL,
    draw() { if (window.lucide) lucide.createIcons({ attrs: { 'stroke-width': 1.75 } }); } };
})();
