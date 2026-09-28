(function () {
  const K = window.KIKU;

  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ic = (n, cls) => `<i class="ti ti-${n}${cls ? ' ' + cls : ''}" aria-hidden="true"></i>`;
  const secs = t => { const [m, s] = String(t).split(':').map(Number); return m * 60 + s; };
  const mmss = n => `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(Math.round(n % 60)).padStart(2, '0')}`;
  const tlab = n => `${Math.floor(n / 60)}:${String(Math.round(n % 60)).padStart(2, '0')}`;
  const $ = (s, r) => (r || document).querySelector(s);

  const G = {
    done: '<svg class="gl" viewBox="0 0 14 14" aria-hidden="true"><g opacity=".55"><rect x="0" y="2.5" width="8" height="1"/><rect x="0" y="6.5" width="8" height="1"/><rect x="0" y="10.5" width="8" height="1"/></g><rect x="7" y="2.5" width="1.3" height="9"/><rect x="9.8" y="2.5" width="3.2" height="9"/></svg>',
    live: '<svg class="gl" viewBox="0 0 14 14" aria-hidden="true"><ellipse cx="7" cy="7" rx="5" ry="3.5" transform="rotate(-22 7 7)"/></svg>',
    fail: '<svg class="gl" viewBox="0 0 14 14" aria-hidden="true"><path d="M3.2 3.2l7.6 7.6M10.8 3.2l-7.6 7.6" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>',
    fermata: '<svg class="gl" viewBox="0 0 16 14" aria-hidden="true" style="width:16px"><path d="M1.5 11.5C1.5 5.6 4.6 2.2 8 2.2s6.5 3.4 6.5 9.3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M1.5 11.5C1.9 7 4.6 3.6 8 3.6s6.1 3.4 6.5 7.9" fill="none" stroke="currentColor" stroke-width=".8"/><circle cx="8" cy="10.2" r="1.6"/></svg>',
    mark: '<svg viewBox="0 0 22 22" aria-hidden="true"><g fill="#B9BCC2"><rect x="1" y="5" width="20" height="1"/><rect x="1" y="9" width="20" height="1"/><rect x="1" y="13" width="20" height="1"/><rect x="1" y="17" width="20" height="1"/></g><rect x="14.2" y="2" width="1.4" height="12.4" fill="#16181D"/><ellipse cx="11.2" cy="14.6" rx="4.1" ry="2.9" transform="rotate(-22 11.2 14.6)" fill="#1F4FD1"/><rect x="1" y="3" width="1" height="16" fill="#16181D"/></svg>'
  };

  const REH = { escalation: ['A', 'esc'], join: ['B', 'join'], takeover: ['C', 'take'] };
  const reh = (ev, sm) => { const [L, k] = REH[ev]; return `<span class="reh reh-${k}${sm ? ' reh-sm' : ''}">${L}</span>`; };

  const STATUS = {
    completed: ['Completed', G.done, 'st-done'],
    in_progress: ['In progress', G.live, 'st-live'],
    escalated: ['Escalated', null, 'st-esc'],
    failed: ['Failed', G.fail, 'st-fail']
  };
  function status(s, label) {
    const [l, g, c] = STATUS[s];
    return `<span class="st ${c}">${g || reh('escalation', true)}${label === false ? '' : `<span>${l}</span>`}</span>`;
  }

  function avatar(p, cls) { return `<span class="av${cls ? ' ' + cls : ''}">${esc(p.initials)}</span>`; }

  function shell(opts) {
    opts = opts || {};
    const role = document.body.dataset.role;
    const me = role === 'admin' ? K.people.admin : K.people.specialist;
    const live = K.calls.filter(c => c.status === 'in_progress' || c.status === 'escalated').length;
    const items = role === 'admin'
      ? [['Call logs', '03-call-logs.html', 'logs'], ['Outbound', '07-outbound-campaign.html', 'out'], ['Users', '10-users.html', 'users']]
      : [['Live', '02-live-overview.html', 'live', live], ['Call logs', '03-call-logs.html', 'logs'], ['Outbound', '07-outbound-campaign.html', 'out']];
    const nav = items.map(([l, h, k, n], i) =>
      `${i ? '<i class="mv-dot"></i>' : ''}<a class="mv${opts.active === k ? ' is-active' : ''}" href="${h}"${opts.active === k ? ' aria-current="page"' : ''}>${l}${n ? `<span class="count">${n}</span>` : ''}</a>`).join('');
    const waiting = K.calls.find(c => c.status === 'escalated' && !c.specialist);
    const alert = opts.alert && waiting
      ? `<a class="top-alert" href="02-live-overview.html">${reh('escalation', true)}<b>${esc(waiting.guest)}</b> needs a specialist <span class="num">${waiting.waiting}</span></a>` : '';
    const top = $('#top');
    top.className = 'top';
    top.innerHTML = `
      <a class="brand" href="${role === 'admin' ? '03-call-logs.html' : '02-live-overview.html'}" aria-label="Kiku home">${G.mark}<b>Kiku</b></a>
      <nav class="movements" aria-label="Main">${nav}</nav>
      <div class="top-right">
        ${alert}
        <span>${ic('phone-incoming')}<span class="tnum">${esc(K.hotel.line)}</span></span>
        <span class="tnum">Sun 27 Sep, ${esc(K.hotel.now)} ${esc(K.hotel.tz)}</span>
        <span class="who">${avatar(me, 'me')}<span>${esc(me.name)}<small>${esc(me.role)}</small></span></span>
      </div>`;
  }

  /* ---------- diff rendering ---------- */
  function saidHTML(u, o) {
    o = o || {};
    if (!u.diff) return esc(u.said);
    const parts = u.diff.filter(d => d.op !== 'del').map(d => d.op === 'ins' ? `<span class="ins">${esc(d.text)}</span>` : esc(d.text));
    return parts.join(' ') + (o.caret ? '<i class="caret"></i>' : '');
  }
  function wroteHTML(u, o) {
    o = o || {};
    if (!u.diff) return esc(u.wrote);
    let lastSame = -1;
    u.diff.forEach((d, i) => { if (d.op === 'same') lastSame = i; });
    return u.diff.filter(d => d.op !== 'ins').map(d => {
      const i = u.diff.indexOf(d);
      if (d.op === 'del') return (o.live && i > lastSame) ? `<span class="ahead">${esc(d.text)}</span>` : `<span class="del">${esc(d.text)}</span>`;
      return esc(d.text);
    }).join(' ');
  }

  /* ---------- score engraving ---------- */
  const ctx = document.createElement('canvas').getContext('2d');
  const tw = (text, font) => { ctx.font = font; return ctx.measureText(text).width; };
  const firstName = n => String(n).split(' ')[0];

  function normalize(transcript, extra) {
    const out = [];
    transcript.forEach(u => {
      const t = secs(u.t);
      if (u.speaker === 'system') {
        if (u.kind === 'end') out.push({ kind: 'end', t, u });
        else out.push({ kind: 'mark', t, ev: u.kind, u, lane: 'mark' });
      } else if (u.karaoke) out.push({ kind: 'kar', t, u, lane: 'spec', live: !!u.live });
      else out.push({ kind: 'line', t, u, lane: u.speaker === 'agent' ? 'agent' : u.speaker === 'guest' ? 'guest' : 'spec', text: u.text });
    });
    (extra || []).forEach(e => out.push(e));
    out.sort((a, b) => a.t - b.t);
    return out;
  }

  function markLabel(it, o) {
    const who = firstName(o.specialist || '');
    if (it.ev === 'escalation') return 'Escalated';
    if (it.ev === 'join') return `${who} joined, listening`;
    if (it.ev === 'takeover') return `${who} took over`;
    return '';
  }

  function needOf(it, o) {
    const F = o.fonts;
    const fit = (w, one, lines) => { one = one || o.one; lines = lines || o.lines; return (w <= one ? w : Math.max(one, w / lines)) + 18; };
    if (it.kind === 'mark') return tw(markLabel(it, o), F.mark) + 34;
    if (it.kind === 'kar') return Math.max(fit(tw(it.u.said, F.lyric), o.karOne), fit(tw(it.u.wrote, F.ossia), o.karOne), 150);
    if (it.kind === 'queued') return fit(tw(it.text, F.queued || F.ossia), o.queuedOne, 6);
    if (it.kind === 'listen') return 170;
    return Math.max(fit(tw(it.text, it.kind === 'draft' ? F.draft : F.lyric)), 60);
  }

  function engrave(items, o) {
    const W = o.W;
    const systems = [];
    let cur = null, prev = null;
    const newSys = () => ({ items: [], last: {} });
    items.forEach(it => {
      if (it.kind === 'end') { o.end = it.t; return; }
      it.need = needOf(it, o);
      if (!cur) cur = newSys();
      const gap = prev && (it.t - prev.t) > o.gapBreak;
      const forced = o.breakAt != null && prev && prev.t < o.breakAt && it.t >= o.breakAt;
      let x = 0;
      if (prev && cur.items.length) x = prev.x + Math.max(o.minPx, (it.t - prev.t) * o.pps);
      if (it.sameX && prev) x = prev.x;
      const ls = cur.last[it.lane];
      if (ls) x = Math.max(x, ls.x + ls.need);
      if (cur.items.length && (gap || forced || x + it.need > W * 1.02)) {
        if (gap) cur.gap = { from: prev, to: it };
        systems.push(cur); cur = newSys(); x = 0;
      }
      it.x = x; cur.items.push(it); cur.last[it.lane] = it; prev = it;
    });
    systems.push(cur);

    systems.forEach((s, i) => {
      const last = i === systems.length - 1;
      s.T0 = s.items[0].t;
      if (i === 0) s.T0 = o.t0 != null ? o.t0 : 0;
      if (!last) {
        s.T1 = s.gap ? Math.ceil((s.gap.from.t + estDur(s.gap.from)) / 15) * 15 : systems[i + 1].items[0].t;
      } else s.T1 = o.liveEnd || o.end || (s.items[s.items.length - 1].t + 10);
      const R = Math.max(...s.items.map(it => it.x + it.need));
      let f = W / R;
      if (last && (o.liveEnd || (R < W * .72 && !o.open))) f = 1;
      f = Math.min(Math.max(f, .9), 2.4);
      s.items.forEach(it => { it.x *= f; it.need *= f; });
      s.width = (last && !o.liveEnd && f === 1) ? Math.min(W, R + 24) : W;
      const anchors = [{ t: s.T0, x: 0 }];
      s.items.forEach(it => { if (it.t > anchors[anchors.length - 1].t) anchors.push({ t: it.t, x: it.x }); });
      if (s.T1 > anchors[anchors.length - 1].t) anchors.push({ t: s.T1, x: s.width });
      s.xAt = T => {
        if (T <= anchors[0].t) return 0;
        for (let k = 1; k < anchors.length; k++) {
          const a = anchors[k - 1], b = anchors[k];
          if (T <= b.t) return a.x + (b.x - a.x) * (T - a.t) / (b.t - a.t);
        }
        return s.width;
      };
    });
    return systems;
  }

  function estDur(it) {
    const txt = it.text || (it.u && (it.u.said || it.u.text)) || '';
    return Math.max(2, txt.length / 15);
  }

  function renderSystems(el, transcript, o) {
    const items = normalize(transcript, o.extra);
    const width = el.clientWidth - parseFloat(getComputedStyle(el).getPropertyValue('--m') || 112) - 14;
    o = Object.assign({ one: 300, lines: 3, minPx: 22, pps: 4, gapBreak: 45 }, o, { W: width });
    const systems = engrave(items, o);
    const seen = {};
    let html = '';
    systems.forEach((s, si) => {
      html += systemHTML(s, si, systems, o, seen);
      if (s.gap) html += restHTML(s, systems[si + 1]);
    });
    el.innerHTML = html;
    el.querySelectorAll('.system').forEach(sys => {
      const staves = sys.querySelectorAll('.srow:not(.r-times):not(.r-marks) .staff, .srow .ossia-staff');
      if (!staves.length) return;
      const sr = sys.getBoundingClientRect();
      const tops = [...staves].map(s => s.getBoundingClientRect());
      const top = Math.min(...tops.map(r => r.top)) - sr.top;
      const bot = Math.max(...tops.map(r => r.bottom)) - sr.top;
      const line = document.createElement('i');
      line.className = 'sysline';
      line.style.top = top + 'px';
      line.style.height = (bot - top) + 'px';
      sys.appendChild(line);
    });
    return systems;
  }

  function restHTML(s, next) {
    const a = s.T1, b = Math.floor(next.items[0].t / 15) * 15;
    const bars = Math.max(1, Math.round((b - a) / 15));
    return `<div class="mrest"><div class="pname">Tacet</div><div class="music"><span class="rst"><em>${bars}</em><i></i></span><span class="cap tnum">${tlab(a)} to ${tlab(b)}, ${bars} bars without speech</span></div></div>`;
  }

  function systemHTML(s, si, systems, o, seen) {
    const X = n => (n + 12).toFixed(1) + 'px';
    const lanes = { guest: [], agent: [], ossia: [], spec: [] };
    const marks = [];
    s.items.forEach(it => {
      if (it.kind === 'mark') marks.push(it);
      else if (it.kind === 'kar') { lanes.ossia.push(it); lanes.spec.push(it); }
      else if (it.kind === 'queued') lanes.ossia.push(it);
      else if (it.kind === 'listen') lanes.spec.push(it);
      else lanes[it.lane].push(it);
    });
    const allTimed = s.items.filter(i => i.kind !== 'mark');
    const nextAny = it => { const n = allTimed.find(j => j.t > it.t); return n ? n.t : s.T1; };
    const bars = [];
    for (let T = Math.floor(s.T0 / 15) * 15 + 15; T < s.T1 - 1; T += 15) bars.push(T);
    const isLast = si === systems.length - 1;
    const ended = isLast && o.end && !o.liveEnd && !o.open;
    const staffW = s.width;

    const staffDeco = (ossia) => {
      if (ossia) return '';
      let h = bars.map(T => `<i class="bl" style="margin-left:${X(s.xAt(T))}"></i>`).join('');
      h += marks.map(m => `<i class="evl ${REH[m.ev][1]}" style="margin-left:${X(m.x)}"></i>`).join('');
      if (o.play != null && o.play >= s.T0 && o.play < s.T1) h += `<i class="pln" style="margin-left:${X(s.xAt(o.play))}"></i>`;
      if (isLast && o.now != null && !o.fullPlayhead) h += `<i class="pln" style="margin-left:${X(s.xAt(o.now))}"></i>`;
      if (ended) h += `<i class="fin" style="margin-left:${X(staffW)}"></i>`;
      else h += `<i class="bl" style="margin-left:${X(staffW - 1)}"></i>`;
      return h;
    };

    const lyricW = (arr, i) => { const it = arr[i]; const nx = arr[i + 1]; return Math.max(60, (nx ? nx.x - 28 : staffW - 6) - it.x); };
    const durW = it => Math.max(14, s.xAt(Math.min(nextAny(it), it.t + estDur(it))) - it.x - 4);

    const names = o.names || {};
    const pn = (lane, main, sub) => {
      const first = !seen[lane]; seen[lane] = true;
      return `<div class="pname">${main}${first && sub ? `<small>${sub}</small>` : ''}</div>`;
    };

    let rows = '';
    rows += `<div class="srow r-times"><div class="pname"></div><div class="music">${
      `<span class="tl first" style="margin-left:0">${tlab(s.T0)}</span>` +
      bars.filter(T => s.xAt(T) > 36 && !(o.play != null && Math.abs(s.xAt(T) - s.xAt(o.play)) < 44) && !(isLast && o.now != null && Math.abs(s.xAt(T) - s.xAt(o.now)) < 44)).map(T => `<span class="tl" style="margin-left:${X(s.xAt(T))}">${tlab(T)}</span>`).join('') +
      ((o.play != null && o.play >= s.T0 && o.play < s.T1) ? `<span class="pflag" style="margin-left:${X(s.xAt(o.play))}">${ic('player-play')}${mmss(o.play)}</span>` : '')}</div></div>`;
    if (marks.length) {
      rows += `<div class="srow r-marks"><div class="pname"></div><div class="music">${marks.map(m =>
        `<span class="mk" style="margin-left:${X(m.x)}">${reh(m.ev)}<span>${esc(markLabel(m, o))}</span></span>`).join('')}</div></div>`;
    }

    if (lanes.guest.length) {
      rows += `<div class="srow r-guest">${pn('guest', 'Guest', names.guest)}<div class="music"><span class="staff" style="width:${X(staffW)}"></span>${staffDeco()}${
        lanes.guest.map((it, i) => `<span class="note n-guest" style="margin-left:${X(it.x)};width:${X(durW(it))}"><i class="nh"></i><i class="dur"></i></span>` +
          `<div class="lyric l-guest" style="margin-left:${X(it.x)};width:${X(lyricW(lanes.guest, i))}">${esc(it.text)}</div>`).join('')}</div></div>`;
    }
    if (lanes.agent.length) {
      rows += `<div class="srow r-agent">${pn('agent', 'Kiku', 'Voice agent')}<div class="music"><span class="staff" style="width:${X(staffW)}"></span>${staffDeco()}${
        lanes.agent.map((it, i) => {
          const draft = it.kind === 'draft';
          const w = draft ? Math.max(40, it.need - 40) : durW(it);
          return `<span class="note n-agent${draft ? ' n-draft' : ''}" style="margin-left:${X(it.x)};width:${X(w)}"><i class="nh"></i><i class="dur"></i></span>` +
            `<div class="lyric l-agent${draft ? ' l-draft' : ''}" style="margin-left:${X(it.x)};width:${X(lyricW(lanes.agent, i))}">${draft ? '<span class="dtag">Drafting</span>' : ''}${esc(it.text)}</div>`;
        }).join('')}</div></div>`;
    }
    if (lanes.ossia.length) {
      rows += `<div class="srow r-ossia">${pn('ossia', 'Kiku wrote', o.ossiaSub)}<div class="music">${
        lanes.ossia.map((it, i) => {
          const w = lyricW(lanes.ossia, i);
          if (it.kind === 'queued') {
            return `<span class="ossia-staff" style="margin-left:${X(it.x)};width:${X(w)}"></span>` +
              `<span class="note n-wrote n-queued" style="margin-left:${X(it.x)};width:${X(Math.min(w, 120))}"><i class="nh"></i><i class="dur"></i></span>` +
              `<span class="otag" style="margin-left:${X(it.x + 16)}">${ic('corner-down-right')}Next line, queued</span>` +
              `<div class="lyric l-queued" style="margin-left:${X(it.x)};width:${X(w)}">${esc(it.text)}</div>`;
          }
          const u = it.u;
          const tag = u.asWritten ? `<span class="otag asw" style="margin-left:${X(it.x + 16)}">${ic('check')}Spoken as written</span>`
            : it.live ? `<span class="otag" style="margin-left:${X(it.x + 16)}">${ic('microphone')}Kiku wrote this at ${mmss(it.t)}. You are speaking now</span>`
            : `<span class="otag" style="margin-left:${X(it.x + 16)}">${u.match}% match</span>`;
          return `<span class="ossia-staff" style="margin-left:${X(it.x)};width:${X(w)}"></span>` +
            `<span class="note n-wrote" style="margin-left:${X(it.x)};width:${X(Math.min(durW(it), w))}"><i class="nh"></i><i class="dur"></i></span>` + tag +
            `<div class="lyric l-wrote" style="margin-left:${X(it.x)};width:${X(w)}">${wroteHTML(u, { live: it.live })}</div>`;
        }).join('')}</div></div>`;
    }
    if (lanes.spec.length) {
      const sp = firstName(o.specialist);
      rows += `<div class="srow r-spec">${pn('spec', o.specLabel || `${esc(sp)} said`, o.specSub || 'Specialist')}<div class="music"><span class="staff" style="width:${X(staffW)}"></span>${staffDeco()}${
        lanes.spec.map((it, i) => {
          if (it.kind === 'listen') {
            return `<span class="note n-listen" style="margin-left:${X(it.x)};width:14px"><i class="nh"></i></span>` +
              `<div class="lyric l-listen" style="margin-left:${X(it.x)};width:${X(Math.max(120, staffW - it.x - 10))}">${esc(it.text)}</div>`;
          }
          const w = it.live ? Math.max(20, s.xAt(o.now) - it.x) : durW(it);
          return `<span class="note n-spec" style="margin-left:${X(it.x)};width:${X(w)}"><i class="nh"></i><i class="dur"></i></span>` +
            `<div class="lyric l-spec" style="margin-left:${X(it.x)};width:${X(Math.min(lyricW(lanes.spec, i), (() => { const q = lanes.ossia.find(j => j.t > it.t); return q ? q.x - it.x - 28 : 1e9; })()))}">${it.kind === 'kar' ? saidHTML(it.u, { caret: it.live }) : esc(it.text)}</div>`;
        }).join('')}</div></div>`;
    }

    let over = '';
    if (isLast && o.now != null) {
      const px = s.xAt(o.now);
      if (o.curBar) {
        const b0 = Math.floor(o.now / 15) * 15, b1 = b0 + 15;
        over += `<i class="curbar" style="left:calc(var(--m) + ${X(s.xAt(b0))});width:${X(s.xAt(b1) - s.xAt(b0))}"></i>`;
      }
      over += o.fullPlayhead ? `<i class="phd" style="left:calc(var(--m) + ${X(px)})"><b>${mmss(o.now)}</b></i>` : `<i class="phd flag" style="left:calc(var(--m) + ${X(px)})"><b>${ic('player-play')}${mmss(o.now)}</b></i>`;
    }
    return `<section class="system" data-t0="${s.T0}">${over}${rows}</section>`;
  }

  /* ---------- libretto ---------- */
  function libretto(transcript, o) {
    o = o || {};
    const sp = firstName(o.specialist || '');
    return transcript.map(u => {
      const t = `<time>${u.t}</time>`;
      const cur = o.current === u.t ? ' is-current' : '';
      if (u.speaker === 'system') {
        if (u.kind === 'end') return `<li class="lib ev"${cur}>${t}<p>${G.done.replace('class="gl"', 'class="gl" style="color:var(--ink)"')}${esc(u.text)}</p></li>`;
        return `<li class="lib ev${cur}" data-t="${u.t}">${t}<p>${reh(u.kind, true)}<span>${esc(u.text)}</span></p></li>`;
      }
      if (u.karaoke) {
        const tag = u.asWritten ? `<span class="asw">${ic('check')}Spoken as written</span>` : `<span class="mt">${u.match}% match</span>`;
        return `<li class="lib${cur}" data-t="${u.t}">${t}<div><div class="lh"><span class="who spec">${esc(o.specialist)}</span>${tag}</div>
          <p class="w"><span class="k">Kiku wrote</span>${wroteHTML(u)}</p>
          <p class="s"><span class="k">${esc(sp)} said</span>${saidHTML(u)}</p></div></li>`;
      }
      const who = u.speaker === 'agent' ? 'Kiku' : (o.guest || 'Guest');
      return `<li class="lib${cur}" data-t="${u.t}">${t}<div><span class="who">${esc(who)}</span><p>${esc(u.text)}</p></div></li>`;
    }).join('');
  }

  /* ---------- mini staves for live calls ---------- */
  function mini(o) {
    const P = s => (s * o.pps).toFixed(1) + 'px';
    const d = o.dur;
    const ticks = [];
    for (let T = 15; T < d; T += 15) ticks.push(`<i class="tick" style="left:${P(T)}"></i>`);
    const stf = `<i class="stf" style="width:${P(d)}"></i>${ticks.join('')}`;
    const labels = [];
    for (let T = 60; T < d - 8; T += 60) if (!(o.marks || []).some(m => Math.abs(m.t - T) * o.pps < 34)) labels.push(`<span class="tl" style="left:${P(T)}">${tlab(T)}</span>`);
    const marks = (o.marks || []).map(m => `<span style="left:${P(m.t)}" class="reh reh-sm reh-${REH[m.ev][1]}">${REH[m.ev][0]}</span>`).join('');
    const now = `<i class="now" style="left:calc(84px + ${P(d)})"><b>${mmss(d)}</b></i>`;
    const row = (name, cls, inner) => `<div class="pn ${cls || ''}">${name}</div><div class="ln">${stf}${inner}</div>`;
    return `<div class="mini">
      <div></div><div class="marks">${marks}${labels.join('')}</div>
      ${row('Guest', '', `<i class="hd" style="left:0"></i><i class="blk" style="left:6px;width:calc(${P(d)} - 6px)"></i>`)}
      ${row('Kiku', '', o.kiku(P))}
      ${row(o.specName || 'Specialist', 'spec', o.spec(P))}
      ${now}
    </div>`;
  }

  function ready(fn) {
    const loads = ['400 14px Alegreya', 'italic 400 14px Alegreya', '500 14px Alegreya', '400 14px "Alegreya Sans"', '500 14px "Alegreya Sans"', '500 14px "Alegreya Sans SC"', '700 14px "Alegreya Sans SC"', '16px tabler-icons-300-outline']
      .map(f => document.fonts.load(f).catch(() => null));
    const go = () => { try { fn(); } catch (e) { document.body.insertAdjacentHTML('beforeend', `<pre style="position:fixed;bottom:0;left:0;background:#fff;color:#D7263D;z-index:99">${esc(e.stack)}</pre>`); } };
    Promise.all(loads).then(() => document.fonts.ready).then(() => {
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
    });
  }

  window.Kiku = { K, esc, ic, secs, mmss, tlab, G, reh, REH, status, avatar, shell, saidHTML, wroteHTML, renderSystems, libretto, mini, ready, firstName, $ };
})();
