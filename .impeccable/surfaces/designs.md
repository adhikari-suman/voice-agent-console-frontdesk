---
version: 1
slug: "designs"
primary_target: "designs"
related_targets: []
---

# Surface brief: Kiku design exploration (designs/)

Scope: ten alternative visual directions for the whole Kiku console. Each one covers the same 10 screens (see designs/_shared/SCREENS.md), is built as static HTML and rendered to PNG at 1440×900 (2x).
Mode: Operate. Staff complete tasks: monitoring, taking over, auditing, setting up outbound calls, managing users.
Audience: hotel guest-services specialists and admins.
Direction source: pinned by the user. Each direction was derived from a segment of a random alphanumeric string (kept out of the designs), so the concept-seed roll was not used.
Unresolved: which role owns outbound setup; the production stack; which direction goes forward. DESIGN.md is written only after the user picks one.

## Direction contract

## Design 1: "Mirror Spine" (International Typographic Style)

THESIS: A strict Swiss grid in which every call is two voices meeting at a central spine. It rejects the rounded-card SaaS dashboard: regions are separated by rules and whitespace, never by shadowed boxes.
SCENE: A bright day-shift guest-services office. Light theme.
OWN-WORLD:
- Palette: ground #F2F3F0, paper #FFFFFF (work surfaces), ink #0E0E0E, ink-2 #5A5D58, hairline #CFD2CC, rule 2px ink. Signal chartreuse #C8F03C is the single accent (primary actions, live state, selected row, improvised-word marker), always with ink text on it. Escalated #FF6A13, failed #E0342A. Completed uses ink (a filled square), In progress uses chartreuse (a filled circle), Escalated orange (a triangle), Failed red (a cross).
- Type: "Geist" for everything (display 700 at -0.03em, UI 400/500), "Geist Mono" only for timecodes, phone numbers, IDs and durations. Scale 12 / 14 / 16 / 20 / 32 / 52. 12-column grid, 24px gutters, 8px baseline rhythm.
- Icons: Lucide (CDN), 1.5 stroke, 16/20px.
- Radius 0 everywhere except pill-shaped status chips (2px). No shadows at all; depth comes from paper against ground.
TOPOLOGY: No sidebar. A 64px top bar with a large "Kiku" wordmark (Geist 700) at the left, nav as text tabs with a 2px ink underline on the current tab, and the role and user at the right. Pages use asymmetric column splits (4/8, 5/7, 3/9) and flush-left headings at 32 or 52px.
SIGNATURE (karaoke): the Mirror Spine. A vertical timecode spine runs down the centre of the transcript. For karaoke turns, "Kiku wrote" is right-aligned against the left of the spine and "Tomasz said" is left-aligned against its right, so the two versions face each other across the timecode. Words that match are ink. Dropped script words are struck through in ink-2. Improvised words sit on a chartreuse marker band. Guest lines and system events span the spine as centred, full-width rows in a distinct style. On the takeover screen the current line on the spine is set large, with the live partial speech on the right and the next line ghosted below.
OVERVIEW: Lead with the live calls as a large typographic timetable list, with the "Needs a specialist" row first. Put counts inline in section headings ("5 live · 1 needs you"). No stat tiles.
REFUSE: cards with shadows, gradients, colour beyond the palette, and decorative icons.

## Design 2: "Overprint" (two-ink risograph zine)

THESIS: A risograph print in which the AI's words are one ink and the human's words another, so where they agree the inks overprint. It rejects glossy SaaS with a printed, ink-on-stock world.
SCENE: A lively daytime desk and a team with some character. Light theme on cool paper stock.
OWN-WORLD:
- Palette: paper #E8EBE3 (cool grey-green stock; it must not read as cream), paper-2 #DCE0D5, ink #1D1D1B. Fluorescent pink #FF3EA5 is the Kiku/AI ink, Riso blue #0078BF the human/specialist ink, moss #56603E the secondary text and rules (verify it clears 4.5:1 on the paper). Overprint is pink and blue multiplied (`mix-blend-mode: multiply`), which gives a deep violet. Status: Completed moss plus a check, In progress blue plus a pulse dot, Escalated pink plus an exclamation, Failed ink plus a cross.
- Type: "Bricolage Grotesque" (headings in lowercase at 800 with tight tracking; UI at 400/500) and "Azeret Mono" for data only (times, phones, IDs, CSV cells). Headings, nav and buttons are all lowercase. Proper nouns and data keep their case.
- Texture: a fine SVG grain over the whole paper at low opacity. A slight 1.5px misregistration (a pink copy offset under a blue copy) only on large display headings and in the karaoke overprint, never on body text.
- Icons: Phosphor (CDN), bold weight.
- Radius 0, no shadows. Blocks are flat ink fields and ruled boxes, like cut paper. Buttons are solid pink or blue fields with ink text, or ink with paper text.
TOPOLOGY: Left sidebar of 220px on paper-2 with lowercase nav items and stamped counts (small ink circles). The content area is composed like zine spreads: big lowercase headings, ruled tables, and flat ink blocks for primary panels.
SIGNATURE (karaoke): Overprint lines. For each karaoke turn, the pink layer prints "kiku wrote" and the blue layer prints "tomasz said" directly beneath or overlapping. Matching words from the diff appear in overprint violet, dropped script words stay pink and are struck, improvised words are blue only. A small legend reads: pink = kiku wrote, blue = specialist said, violet = both. On the takeover screen the live line is printed large with the blue partial speech building over the pink script.
REFUSE: rounded cards, soft shadows, gradients, and glossy UI chrome.

## Design 3: "Score" (orchestral score engraving)

THESIS: A call is a performance on parallel staves. Guest, Kiku and specialist each get a part, and karaoke mode is literally a vocal line sung off the written notes. It rejects chat-bubble transcripts.
SCENE: Calm audit and QA work at a desk. Light theme, white engraving paper.
OWN-WORLD:
- Palette: paper #FFFFFF, panel #F3F4F6, staff lines #B9BCC2, ink #16181D, ink-2 #5B6270. Cobalt #1F4FD1 is the specialist's voice and primary actions. Rehearsal red #D7263D is used only for escalation marks and failure. Status: Completed ink plus a double barline glyph (authored SVG), In progress cobalt plus a filled notehead, Escalated red plus a boxed rehearsal letter, Failed ink-2 plus a cross.
- Type: "Alegreya" for transcript lyrics and page headings, "Alegreya Sans" for UI, and "Alegreya Sans SC" for part names, column heads and nav (small caps, +0.04em). Scale 12 / 14 / 16 / 20 / 28 / 40.
- Icons: Tabler (CDN), 1.5 stroke.
- Hairlines only. 4px radius on inputs and buttons. At most one soft offset shadow, on the floating player.
TOPOLOGY: A top bar with the Kiku wordmark and the nav as small-caps "movements" (Live · Call logs · Outbound · Users). Pages read like score pages. A left margin column carries part names (GUEST, KIKU, SPECIALIST) the way instrument names sit at the start of each system. Time markers act as barlines every 15 seconds, and events (escalation, join, takeover) are boxed rehearsal letters A, B, C with a legend.
SIGNATURE (karaoke): the audit transcript is set as score systems, each wrapping about 30 seconds. Each utterance is a note-block on its part's staff, with its words set as lyrics beneath. The specialist part has an ossia staff above it (the notation term for an alternative passage) carrying "Kiku wrote" small in ink-2. The main specialist line carries "Tomasz said" in cobalt, with improvised words underlined and dropped words struck on the ossia. A compact linear "libretto" list alongside keeps full readability. On the takeover screen a conductor-style playhead sits on the current bar, with the live partial words appearing and the next line on the ossia.
REFUSE: chat bubbles, heavy cards, and a cream background (the paper is white).

## Design 4: "Gallery" (broadcast control room)

THESIS: The console is a TV gallery. Live calls are sources on a multiviewer, Kiku's script is the teleprompter, and the specialist is the presenter who ad-libs. "Take over" is the vision mixer's TAKE key. It rejects the generic dark dashboard with neon glow.
SCENE: An evening shift in a dim room with several calls monitored at once. Dark theme.
OWN-WORLD:
- Palette: bg #0B0C0E, panel #14161A, bezel #1E2127, line #2C3038, text #E8EAED, text-2 #9AA0A8. UMD yellow #F5D90A is for the under-monitor-display labels. Tally red #FF3B30 means ON AIR (a human specialist is on the line). Tally green #2BD66B means Kiku is handling it (In progress). Blue #0088EE marks selection, focus and inbound sources. Amber #FF9F0A means Escalated and waiting. Failed is #C8453A with a cross. Tallies are flat solid bars and lamps with no glow and no blur halos.
- Type: "Barlow" for UI, and "Barlow Condensed" at 600, uppercase, +0.04em for UMD labels, source names, keys and table heads. Tabular numerals everywhere.
- Icons: Remix Icon (CDN), line style.
- Radius 3px. Monitor tiles carry a 1px bezel and an inner 1px black line. No drop shadows on a dark ground.
TOPOLOGY: A left source list (lines and channels: the hotel line, outbound queues), a centre multiviewer grid of live calls where each tile has a tally strip on top, an audio level meter, an excerpt of the latest line, and a yellow-on-black UMD label below, and a bottom "router / transport" bar with PFL (listen), JOIN and the red TAKE key for take over. Other pages keep the gallery grammar: logs as a rundown (the running order sheet), outbound as scheduling a rundown, users as a crew list.
SIGNATURE (karaoke): Prompter and captions. The upper area is a teleprompter: large left-aligned lines of Kiku's script with a reading-marker arrow on the current line. Below it is an ON AIR caption strip (subtitle style, white on black with a yellow speaker name) showing what the specialist actually said, with improvised words flagged as AD-LIB spans. The audit shows two synced columns, PROMPTER and ON AIR, with diff highlights.
REFUSE: glow, glass, gradients, and neon outlines.

## Design 5: "Deck" (1960s German audio equipment)

THESIS: The console as a calm piece of audio equipment: keys, dials, meters and a speaker grille, where every control looks like what it does. It rejects flat SaaS cards with an industrial-design grammar.
SCENE: A bright office where precision and calm matter. Light theme.
OWN-WORLD:
- Palette: chassis #D8D7D2 (aluminium grey, the app ground), panel #EFEFEC, faceplate #FAFAF8, dark #2B2B2A, graphite #55554F, label grey #62625B (verify 4.5:1 on faceplate). Key orange #EE6A1F is reserved for the single most important action per screen (Take over, Call now, Send invite). Live green #4BA35B is for indicator lamps and In progress. Escalated amber #D9950F, failed #C8412E. Status reads as a small round lamp plus its label.
- Type: "Hanken Grotesk" for everything. Labels are small and lowercase (11–12px, +0.02em), in the manner of equipment markings. Headings sit at 20–28px, 600. Tabular numerals.
- Icons: Iconoir (CDN), 1.5 stroke.
- Material: rounded keys (8px radius, a subtle top highlight, and a short soft shadow offset down by 1–2px). The display area is an inset screen with 12px radius and an inner shadow. The speaker-grille dot grid (radial-gradient dots every 8px) appears only on the audio panel of the live screens.
TOPOLOGY: A left "control column" of 248px in chassis grey, with the Kiku wordmark in a small badge at the top and nav as a vertical row of rectangular keys with an indicator lamp on the active one. The main area is the faceplate with an inset display. Tabs are rendered as a bank of toggle keys.
SIGNATURE (karaoke): Two-track tape. The audit timeline shows track A (Kiku script) and track B (specialist voice) as parallel horizontal bands with a playhead and the escalation and takeover markers. Below it, each karaoke turn shows track A and track B side by side, with changed words marked by a thin orange underline and dropped words in graphite strike. Live screens have two needle VU meters (guest and specialist), drawn as SVG, next to the speaker grille, plus a big orange TAKE OVER key.
REFUSE: gradients, glass, and flat stock components that ignore the material.

## Design 6: "Booth" (simultaneous-interpretation booth)

THESIS: The specialist is the interpreter. Kiku is the floor channel, the specialist speaks on the interpretation channel, and the console is the booth desk with channel selectors and a mic key. It rejects the chat UI.
SCENE: Specialists concentrating with headsets on, jumping between channels. Light content area with a committed deep-blue booth console.
OWN-WORLD:
- Palette: booth blue #0F2D6B (sidebar and top console strip, about 35% of the surface), booth-2 #1B3F8F, desk #F4F6FA, paper #FFFFFF, ink #0B1633, ink-2 #4A5575, hairline #D9DFEA. Mic-live red #E0142B means the specialist's microphone is on. Interpretation amber #F2A900 is the specialist channel colour. The floor blue #3D7BFF is Kiku's channel colour. Status: Completed #1E8E5A with a check, In progress #3D7BFF with a waveform icon, Escalated #F2A900 with a raised hand, Failed #E0142B with a cross.
- Type: "Atkinson Hyperlegible Next" for UI and headings (headings 700) and "Atkinson Hyperlegible Mono" for channel numbers, times, phones and IDs.
- Icons: Material Symbols Rounded (Google Fonts), weight 400.
- Radius 6px on controls and 10px on panels. Panels are white on the desk with a 1px hairline and a soft small shadow (0 1px 2px).
TOPOLOGY: A booth-blue left rail of 272px with the Kiku wordmark, the nav, and a "channels" block listing live calls as channel numbers (CH 01 to CH 05) with small level bars. The work area is white panels on the desk. The live screens carry a booth console strip across the bottom: channel selector, relay, a big MIC key (red when live), and handover.
SIGNATURE (karaoke): Floor and Interpretation lanes. Each karaoke turn is two stacked lanes aligned on one timecode: FLOOR · KIKU (script, blue-grey tint lane) and INTERPRETATION · TOMASZ (spoken, amber-marked lane). Improvised words get an amber underline and dropped words a strike. The takeover screen shows the live lane building word by word under the floor script, with the MIC ON state in red.
REFUSE: chat bubbles, gradients, and decorative illustrations.

## Design 7: "Title Strip" (jukebox and 45 rpm singles)

THESIS: Every call is a 45 single. The A-side is what Kiku wrote, the B-side is what the specialist actually sang, and the call log is the jukebox selector. It rejects neutral admin grey with one committed colour.
SCENE: Upbeat sales and upsell energy, daytime. The colour strategy is committed: violet carries 35 to 50% of the surface.
OWN-WORLD:
- Palette: violet #DC45FE (header band, nav, feature panels), deep plum #2A0B38 (text on violet, dark panels), strip white #FFFFFF, strip lilac #F6F0FA (content ground), strip red #E8313B (A-side border), strip blue #2457F5 (B-side border), chrome #C9C4CF (lines). Status: Completed #14894F with a check, In progress #2457F5 with a play glyph, Escalated #E07000 with an arrow-up, Failed #E8313B with a cross. Contrast: white on violet only at 24px+ bold, and body text on violet uses plum.
- Type: "Archivo" variable with the width axis. Title strips, headings and keys use wdth 62–75, weight 800, uppercase. UI text uses wdth 100, 400/500. Tabular numerals.
- Icons: Bootstrap Icons (CDN).
- Material: title strips are white cards with printed coloured border rules (a 2px red top rule and a 2px blue bottom rule, not side stripes) and a centre dotted tear line. There is a round "record label" motif (authored SVG: concentric grooves plus a centre label) used once per screen at most, for example as the live call timer.
TOPOLOGY: A top violet band of about 120px with the Kiku wordmark and nav as jukebox selector keys ("A · Live", "B · Call logs", "C · Outbound", "D · Users"), plus user and role. Content sits below on lilac as rows and grids of title strips. Tables still exist for dense data (logs, users, CSV preview) with condensed uppercase heads.
SIGNATURE (karaoke): A/B title strips. In the audit, each karaoke turn is a strip with the upper half "A · KIKU WROTE" (red rule) and the lower half "B · TOMASZ SAID" (blue rule). Improvised words are highlighted with a violet tint, dropped words are struck, and a match percentage sits on the tear line. On the takeover screen the current strip is large and "now playing", with the B-side filling as Priya speaks and the next A-side cued below.
REFUSE: grey admin sameness, gradients, and glass.

## Design 8: "Strip Bay" (air-traffic-control flight progress strips)

THESIS: Calls are flight strips. Inbound calls are arrival strips, outbound calls are departure strips, and escalations are handed off between bays. Specialists amend the strips by hand. It rejects the kanban card board.
SCENE: Control-tower calm under pressure. The ground is a dark slate-green strip bay, with light paper strips on it.
OWN-WORLD:
- Palette: bay #2E3733, bay-deep #232A27, rail #414B46, text-on-bay #E7ECE8, text-on-bay-2 #A9B4AE. Strips: arrival (inbound) #CFE6F2, departure (outbound) #F3E3A6, priority/escalated #F4B7AE, failed #D6D8D4 with struck text. Strip ink #121513, pen blue #1D3FA8 (specialist annotations), pen red #C62828 (escalation marks). Primary action is a bright strip-yellow key #F7D34A with ink text.
- Type: "B612" (designed for cockpit displays) for UI and strip text, "B612 Mono" for callsign-style IDs, times, phone numbers and CSV cells, and "Kalam" only for hand annotations by specialists. Uppercase labels are typical of ATC.
- Icons: Material Symbols Sharp (Google Fonts).
- Material: a strip is a long horizontal rectangle with a darker holder tab at its left end, a 1px ink border, and printed column boxes (time | callsign | guest | route/purpose | status | specialist). Strips sit in bays (rails with a subtle inset). Radius 2px.
TOPOLOGY: A top status bar with the Kiku wordmark, the hotel line, the local time "14:32 BST" as a large readout, and the user. Main nav sits in the bar. The live board is columns of bays: NEEDS SPECIALIST, SPECIALIST ON LINE, KIKU HANDLING, JUST LANDED (finished). Call logs is one long strip rack with filters as bay tabs. Forms are strip-shaped entry rows.
SIGNATURE (karaoke): Hand-amended strips. In the audit, each karaoke turn shows Kiku's script typed in B612 on the strip. Where the specialist deviated, the dropped words are struck with a pen line and the improvised words are handwritten in pen blue (Kalam) above, like a controller amending a strip. A margin tick marks the one line spoken as written. The takeover screen shows the active strip lifted out of the bay and enlarged, with live handwriting appearing.
REFUSE: kanban cards, rounded SaaS panels, and gradients.

## Design 9: "Night Desk" (the hotel lobby after dark)

THESIS: The console is the hotel's own night desk: green lacquer, brass rules and room-key fobs, with the audit read like a guest folio. It rejects generic dark SaaS and neon.
SCENE: The night manager at the front desk around 23:00, in low light. Dark theme.
OWN-WORLD:
- Palette: lacquer #0F2621 (ground), lacquer-deep #0A1B17 (rail), raised #16332C (panels), line #2A4A41, brass #C9A55B (rules, focus, and primary fills with lacquer text), brass-dim #8F7644, ivory #ECE5D5 (text), ivory-2 #B8B2A2 (secondary text). Status: Completed sage #8CC49E with a check, In progress brass with a dot, Escalated coral #EF8A62 with a bell icon, Failed #E2645C with a cross.
- Type: "Bodoni Moda" (500–600) only for page titles and guest names in headers, never in labels, buttons or data. Everything else is "Albert Sans" with tabular numerals.
- Icons: Phosphor (CDN), light weight.
- Material: brass hairlines and double rules (1px + 1px with a 2px gap) separate regions. Booking and room references sit in authored SVG brass key-fob tags. Panels have 4px radius and a soft deep shadow (0 8px 24px with black at 35% alpha) for raised elements only.
TOPOLOGY: A lacquer-deep left rail of 240px with a brass "K" monogram, the nav, and an on-duty block. The content has generous margins, and the headers pair the Bodoni title with a brass double rule underneath.
SIGNATURE (karaoke): the Folio ledger. The audit is a two-column ledger, AS WRITTEN (Kiku) and AS SPOKEN (Tomasz), under brass double rules, with timecodes in the left margin like folio dates. Improvised words carry a brass underline, dropped words an ivory-2 strike. The line spoken as written gets a small brass seal. On the takeover screen the current line sits in a raised lacquer panel with the live partial speech in ivory and the next line in brass-dim.
REFUSE: neon, glow, glass, and gradients.

## Design 10: "Phyllotaxis" (Kiku the chrysanthemum, built on Fibonacci)

THESIS: Every proportion is golden: 61.8/38.2 splits, Fibonacci spacing, and calls that bloom as florets around the present moment. It rejects the equal-column dashboard grid.
SCENE: A dim operations room in the evening. Dark indigo theme.
OWN-WORLD:
- Palette: night #0E1024 (ground), surface #171A36, surface-2 #20244A, line #2E3360, text #EEEAF6, text-2 #A5A3C4. Chrysanthemum gold #FFC23A is Kiku's voice, primary actions and live state. Petal pink #FF6F9E is the specialist's voice and escalations. Leaf #57D39B means Completed. Failed is a muted #8B8AA8 with a cross (failed calls are ended, not alarms). In progress is gold with a pulse dot, and Escalated is pink with a raised-hand icon.
- Type: "Epilogue" for everything, tabular numerals. Sizes follow Fibonacci numbers: 13 (dense data), 16 (body; the one exception), 21, 34, 55. Spacing only from 2, 3, 5, 8, 13, 21, 34, 55.
- Icons: Lucide (CDN), 1.5 stroke.
- Radius 8px on controls and 13px on panels. Panels are surface on night with a 1px line border and no shadow.
TOPOLOGY: A compact left icon-and-label rail of 89px (a Fibonacci number). The main content splits golden: 61.8% primary and 38.2% secondary. The live board centres on a phyllotaxis chart: today's 146 calls drawn as SVG florets from data at a 137.5° golden angle, newest at the centre, coloured by status, sized by duration, with the 5 live calls labelled. Beside it sit the Needs a specialist queue and the live list.
SIGNATURE (karaoke): Bloom lines. For each karaoke turn, Kiku's script sits as a smaller gold line above, and Tomasz's spoken words are the main line in text colour. Improvised words are set in petal pink, and dropped script words are struck in the gold line. "5 of 21 words as written" appears as plain text, not a ring or gauge. On the takeover screen the current line is set at 34px with the live partial in pink, building on the gold script above.
REFUSE: glow, neon edges, glass, gradients, and progress rings.

FORM: ten user-pinned directions, one per string segment, ordered by segment. Seed: user random-string procedure (no concept-seed key).
FINISH: unreviewed and undocumented is unfinished. This exploration ends with an inspection round across all ten directions, the detector run, and the user's pick. The finish review and DESIGN.md then run on the chosen direction.
